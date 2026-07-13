/* Morphology-First Taxonomy Viewer
 * Vanilla JS, no build step. Reads window.DATASET (from data/dataset.js).
 *
 * Two similarity numbers are shown for any pair:
 *   - Taxonomic reference : from the shared rank (the "gold" truth level).
 *   - Morphological match  : computed from the trait VALUES in the CSVs (Gower).
 * Comparing the two tells you whether your recorded characters actually capture
 * the known relationship, or whether more data is needed.
 */
(function () {
  "use strict";

  const DATA = window.DATASET;
  if (!DATA) {
    document.getElementById("tree").textContent =
      "Could not load data. Run: python3 tools/build.py";
    return;
  }

  const RANK_ORDER = DATA.meta.rank_order;
  const RANK_LABEL = DATA.meta.rank_labels;
  const SCHEMA = DATA.trait_schema; // { Animalia:[{key,label,type,min,max}], Plantae:[...] }
  const rankIndex = Object.fromEntries(RANK_ORDER.map((r, i) => [r, i]));
  const ANCHOR_I = rankIndex[DATA.meta.similarity_anchor || "species"];
  const ITALIC_FROM = rankIndex["genus"];
  // Compact rank label for pills/badges (full labels like "Phylum / Division" are
  // kept for prose): "species_complex" -> "Species complex", "subphylum" -> "Subphylum".
  const shortRank = (rank) =>
    rank.replace(/_/g, " ").replace(/^./, (c) => c.toUpperCase());

  // ---- index nodes: id, parent, kingdom ----
  const byId = new Map();
  let counter = 0;
  (function assign(node, parent) {
    node._id = "n" + counter++;
    node._parent = parent;
    byId.set(node._id, node);
    (node.children || []).forEach((c) => assign(c, node));
  })(DATA.tree, null);

  // kingdom of an internal node = kingdom shared by all its leaves, else null
  (function markKingdom(node) {
    if (!(node.children || []).length) return node.kingdom || null;
    const ks = new Set(node.children.map(markKingdom));
    node._kingdom = ks.size === 1 ? [...ks][0] : null;
    return node._kingdom;
  })(DATA.tree);
  const kingdomOf = (n) => n.kingdom || n._kingdom || null;

  const isItalic = (n) =>
    rankIndex[n.rank] >= ITALIC_FROM && n.rank !== "root";
  const nameHtml = (n) =>
    isItalic(n) ? `<i>${n.name}</i>` : `<span class="no-italic">${n.name}</span>`;
  const lineageOf = (n) => {
    const c = [];
    for (let x = n; x; x = x._parent) c.unshift(x);
    return c;
  };
  function descendantLeaves(n) {
    const out = [];
    (function w(x) {
      if (x._provisional) return; // a grafted "unknown" is never counted as a real member
      if (!(x.children || []).length) out.push(x);
      else x.children.forEach(w);
    })(n);
    return out;
  }
  const slugOf = (n) =>
    n.slug || n.name.toLowerCase().replace(/'/g, "").replace(/\./g, "").replace(/\s+/g, "_");

  // ------------------------------------------------ trait helpers
  function schemaFor(kingdom) {
    return (kingdom && SCHEMA[kingdom]) || [];
  }
  const valOf = (leaf, key) => (leaf.trait_values || {})[key];

  // Values that record the ABSENCE of a feature rather than a describable state of
  // one. Two organisms that BOTH lack a feature (human & cat both "antennae: none")
  // aren't visibly "alike" in that feature — a shared nothing is not a shared
  // character — so a mutual absence is dropped from the "Where they're alike" list.
  // A present-vs-absent pair is still a real, showable difference (a mosquito HAS
  // antennae, a human doesn't) and stays in the "Where they differ" list untouched.
  const ABSENCE_VALUES = new Set(["none", "absent", "no", "n/a", "na"]);
  const isAbsence = (v) =>
    v != null && ABSENCE_VALUES.has(String(v).trim().toLowerCase());

  // Characters that ALL members of a group share the same value for.
  function sharedTraits(node) {
    const k = kingdomOf(node);
    if (!k) return [];
    const leaves = descendantLeaves(node);
    const out = [];
    for (const t of schemaFor(k)) {
      const vals = leaves.map((l) => valOf(l, t.key));
      if (vals.some((v) => v == null)) continue; // some member missing data
      const first = vals[0];
      if (vals.every((v) => v === first)) out.push({ t, value: first });
    }
    return out;
  }

  // A comparable trait vector for EITHER a single organism OR a whole group.
  // For a group, a character's value is the one shared by every member (categorical)
  // or the mean across members (numeric); characters where members disagree are
  // left out — the same "diagnostic" logic used to describe a group. This lets you
  // compare e.g. Family Felidae vs Family Canidae, or a species vs a family, not just
  // two species.
  function comparable(node) {
    if (!(node.children || []).length) {
      return { node, name: node.name, kingdom: node.kingdom,
               trait_values: node.trait_values || {}, group: false, members: 1 };
    }
    const k = kingdomOf(node);
    const leaves = descendantLeaves(node);
    const values = {};
    if (k) {
      for (const t of schemaFor(k)) {
        const vals = leaves.map((l) => valOf(l, t.key));
        if (vals.some((v) => v == null)) continue; // not shared by all → not diagnostic
        if (t.type === "numeric") {
          values[t.key] = vals.reduce((s, v) => s + parseFloat(v), 0) / vals.length;
        } else if (vals.every((v) => v === vals[0])) {
          values[t.key] = vals[0];
        }
      }
    }
    return { node, name: node.name, kingdom: k, trait_values: values,
             group: true, members: leaves.length };
  }

  // Gower similarity between two trait vectors (organism or group) over shared chars.
  function morphSim(a, b) {
    if (a.kingdom !== b.kingdom || !a.kingdom) {
      return { sim: null, coverage: 0, total: 0, shared: [], diff: [] };
    }
    const schema = schemaFor(a.kingdom);
    let sum = 0, n = 0;
    const shared = [], diff = [];
    for (const t of schema) {
      const va = valOf(a, t.key), vb = valOf(b, t.key);
      if (va == null || vb == null) continue;
      let s;
      if (t.type === "numeric") {
        const range = t.max - t.min || 1;
        s = 1 - Math.abs(parseFloat(va) - parseFloat(vb)) / range;
        s = Math.max(0, Math.min(1, s));
      } else {
        s = va === vb ? 1 : 0;
      }
      sum += s; n++;
      (s >= 0.999 ? shared : diff).push({ t, va, vb, s });
    }
    return { sim: n ? sum / n : null, coverage: n, total: schema.length, shared, diff };
  }

  // ------------------------------------------------ images (offline placeholders)
  function svgURI(w, h, inner) {
    return (
      "data:image/svg+xml;utf8," +
      encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>${inner}</svg>`
      )
    );
  }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const escAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/'/g, "&#39;");
  const valueSlug = (v) =>
    String(v).trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");

  // Media connect purely by FILE NAME (no image columns in the CSV): drop a file and it
  // shows up. GIF / animated-WebP / APNG animate natively in an <img>; mp4 / webm play
  // as a looping muted <video>. A media box lists its candidate sources; hydrateMedia()
  // turns it into the right element after insertion, falling down the list on error and
  // finally to an offline placeholder.
  const VIDEO_EXT = /\.(mp4|webm|ogv|mov)$/i;
  function mediaTag(boxCls, alt, candidates, placeholder, zoom) {
    const list = candidates.concat([placeholder]);
    return (
      `<span class="media-box ${boxCls}${zoom ? " zoomable" : ""}" ` +
      `data-cands='${escAttr(JSON.stringify(list))}' data-alt='${escAttr(alt)}'` +
      `${zoom ? ' title="Click to enlarge"' : ""}></span>`
    );
  }

  function organismPlaceholder(node) {
    const plant = kingdomOf(node) === "Plantae";
    return svgURI(
      240, 240,
      `<rect width='100%' height='100%' fill='#1e2731'/>` +
      `<rect x='6' y='6' width='228' height='228' rx='12' fill='none' stroke='#2b3742'/>` +
      `<text x='120' y='112' font-size='56' text-anchor='middle'>${plant ? "🌿" : "🐾"}</text>` +
      `<text x='120' y='160' font-size='15' fill='#93a1b0' text-anchor='middle' font-family='sans-serif'>${esc(node.name)}</text>` +
      `<text x='120' y='184' font-size='11' fill='#4caf7d' text-anchor='middle' font-family='sans-serif'>no photo yet</text>`
    );
  }
  // Honest "no photo yet" card: a dashed camera frame, tinted to the A/B colour.
  // The trait's value is already printed under the card, so this only signals that
  // a real image is missing — and invites one to be dropped in (see docs/DATABASE).
  function traitPlaceholder(label, value, color) {
    return svgURI(
      200, 130,
      `<rect width='100%' height='100%' fill='#171e26'/>` +
      `<rect x='5' y='5' width='190' height='120' rx='10' fill='none' stroke='${color}' stroke-opacity='0.55' stroke-dasharray='6 5'/>` +
      `<g fill='none' stroke='#5f6f7e' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'>` +
      `<rect x='76' y='46' width='48' height='34' rx='6'/>` +
      `<circle cx='100' cy='63' r='9'/>` +
      `<path d='M86 46 l6 -9 h16 l6 9'/></g>` +
      `<text x='100' y='104' font-size='12' fill='#7c8a99' text-anchor='middle' font-family='sans-serif'>no photo yet</text>`
    );
  }
  function organismImg(node, cls) {
    const ph = organismPlaceholder(node);
    const slug = slugOf(node);
    const cands = [];
    if (node.image) cands.push(node.image);
    cands.push(
      `images/${slug}.jpg`, `images/${slug}.png`, `images/${slug}.webp`,
      `images/${slug}.gif`, `images/${slug}.mp4`, `images/${slug}.webm`
    );
    return mediaTag(cls, node.name, cands, ph, true);
  }
  // A character card shows the REAL organism, and lets a contributor drop in a real
  // close-up — photo, GIF or short video — of that organism's specific character.
  // Everything connects by file name; no image editing happens in code. Resolution,
  // most specific first:
  //   1. images/<species_slug>/<trait_key>.(jpg|png|webp|gif|mp4|webm) — this character
  //   2. the organism's own whole media (images/<species_slug>.*)      — default
  //   3. an honest "no photo yet" placeholder.
  // For a group, the representative is its first member (a real species, not a mock-up).
  function traitImg(node, key, label, value, color, cls) {
    const ph = traitPlaceholder(label, value, color);
    const photoNode = (node.children || []).length ? descendantLeaves(node)[0] : node;
    const slug = slugOf(node), pslug = slugOf(photoNode);
    const cands = [
      `images/${slug}/${key}.jpg`, `images/${slug}/${key}.png`, `images/${slug}/${key}.webp`,
      `images/${slug}/${key}.gif`, `images/${slug}/${key}.mp4`, `images/${slug}/${key}.webm`,
    ];
    if (photoNode && photoNode.image) cands.push(photoNode.image);
    cands.push(`images/${pslug}.jpg`, `images/${pslug}.png`, `images/${pslug}.webp`, `images/${pslug}.gif`);
    return mediaTag(cls, `${label}: ${value}`, cands, ph, true);
  }

  // Turn every .media-box into a real <img>/<video>, advancing down its candidate list
  // on error and finally landing on the offline placeholder. One pass after each render.
  function hydrateMedia(root) {
    root.querySelectorAll(".media-box[data-cands]").forEach((box) => {
      let list;
      try { list = JSON.parse(box.dataset.cands); } catch (e) { return; }
      box.removeAttribute("data-cands");
      const alt = box.dataset.alt || "";
      let i = 0;
      (function show() {
        if (i >= list.length) return;
        const src = list[i];
        const isVideo = VIDEO_EXT.test(src);
        const el = document.createElement(isVideo ? "video" : "img");
        el.className = "media-el";
        if (isVideo) {
          el.src = src; el.muted = true; el.loop = true;
          el.setAttribute("playsinline", ""); el.preload = "metadata";
          // respect the OS "reduce motion" setting — show controls instead of autoplay
          const still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (still) el.controls = true; else el.autoplay = true;
        } else {
          el.src = src; el.alt = alt;
        }
        el.addEventListener("error", () => { i += 1; box.innerHTML = ""; show(); }, { once: true });
        box.innerHTML = "";
        box.appendChild(el);
      })();
    });
  }

  // ------------------------------------------------ tree rendering
  const treeEl = document.getElementById("tree");

  function makeRow(node) {
    const row = document.createElement("div");
    row.className = "node-row" + (node._provisional ? " provisional" : "");
    row.dataset.id = node._id;
    const hasKids = (node.children || []).length > 0;

    const tw = document.createElement("span");
    tw.className = "twisty" + (hasKids ? "" : " leaf");
    tw.textContent = node._open ? "▾" : "▸";
    row.appendChild(tw);

    if (node.rank !== "root") {
      const badge = document.createElement("span");
      badge.className = "rank-badge";
      badge.textContent = shortRank(node.rank);
      row.appendChild(badge);
    }
    const name = document.createElement("span");
    name.className = "node-name" + (isItalic(node) ? "" : " no-italic");
    name.textContent = node.name;
    row.appendChild(name);

    if (node.common) {
      const c = document.createElement("span");
      c.className = "node-common";
      c.textContent = "· " + node.common;
      row.appendChild(c);
    }
    if (node.rank !== "root") {
      const cmp = document.createElement("button");
      cmp.className = "compare-btn";
      cmp.textContent = "Compare";
      cmp.title = "Put this in a compare slot";
      cmp.addEventListener("click", (e) => { e.stopPropagation(); addToCompare(node); });
      row.appendChild(cmp);
    }
    tw.addEventListener("click", (e) => {
      e.stopPropagation();
      if (hasKids) { node._open = !node._open; renderTree(); }
    });
    row.addEventListener("click", () => selectNode(node));
    return row;
  }

  // When comparing, the tree can focus on just the two lineages (a clean Y in
  // outline form) so unrelated branches don't clutter the view.
  let treeFocus = true;
  let focusIds = null;
  function computeFocusIds() {
    const s = new Set();
    if (slots.A) lineageOf(slots.A).forEach((n) => s.add(n._id));
    if (slots.B) lineageOf(slots.B).forEach((n) => s.add(n._id));
    return s;
  }
  const focusActive = () => slots.A && slots.B && treeFocus;

  function buildTree(node, container) {
    const filtering = focusActive() && focusIds;
    if (filtering && !focusIds.has(node._id)) return;
    container.appendChild(makeRow(node));
    const open = filtering ? true : node._open;
    if ((node.children || []).length && open) {
      const kids = document.createElement("div");
      kids.className = "children";
      node.children.forEach((c) => buildTree(c, kids));
      container.appendChild(kids);
    }
  }
  function renderTree() {
    focusIds = focusActive() ? computeFocusIds() : null;
    treeEl.innerHTML = "";
    buildTree(DATA.tree, treeEl);
    applyHighlights();
    // In the FULL tree, once two organisms are chosen, fade everything that is
    // not on either lineage so the compared paths read clearly without hiding
    // the rest of the tree (that is what "Focused" is for).
    treeEl.classList.toggle(
      "compare-dim",
      !!(slots.A && slots.B && view === "tree" && !focusActive())
    );
    updateFocusToggle();
  }
  function updateFocusToggle() {
    const btn = document.getElementById("treeFocusToggle");
    const show = slots.A && slots.B && view === "tree";
    btn.classList.toggle("hidden", !show);
    btn.classList.toggle("active", treeFocus);
    btn.textContent = treeFocus ? "Focused" : "Full tree";
  }
  function revealPath(n) { for (let x = n; x; x = x._parent) x._open = true; }
  function setOpenAll(n, open) { n._open = open; (n.children || []).forEach((c) => setOpenAll(c, open)); }

  // ------------------------------------------------ view switching (Tree | Y | Identify)
  let view = "tree";
  function setView(v) {
    view = v;
    document.getElementById("tree").classList.toggle("hidden", v !== "tree");
    document.getElementById("ydiagram").classList.toggle("hidden", v !== "compare");
    document.getElementById("identify").classList.toggle("hidden", v !== "identify");
    document.getElementById("viewTree").classList.toggle("active", v === "tree");
    document.getElementById("viewCompare").classList.toggle("active", v === "compare");
    document.getElementById("viewIdentify").classList.toggle("active", v === "identify");
    document.getElementById("viewTitle").textContent =
      v === "compare" ? "Comparison path" : v === "identify" ? "Identify an unknown" : "Tree of life";
    if (v === "compare") renderYDiagram();
    else if (v === "identify") renderIdentify();
    else renderTree();
    updateFocusToggle();
  }

  // ------------------------------------------------ selection / detail
  const detailEl = document.getElementById("detail");
  let selectedId = null;

  function selectNode(node) {
    selectedId = node._id;
    renderDetail(node);
    if (view === "tree") applyHighlights();
    const row = treeEl.querySelector(`.node-row[data-id="${node._id}"]`);
    if (row) row.scrollIntoView({ block: "nearest" });
  }

  function renderDetail(node) {
    const chain = lineageOf(node).filter((n) => n.rank !== "root");
    const crumbs = chain
      .map((n) => `<span class="crumb" data-id="${n._id}">${RANK_LABEL[n.rank]}: ${nameHtml(n)}</span>`)
      .join('<span class="sep">›</span>');
    const isGroup = (node.children || []).length > 0;

    let traitsBlock;
    if (isGroup) {
      const st = sharedTraits(node);
      const leaves = descendantLeaves(node);
      const list = st.length
        ? st.map((s) => `<li><b>${s.t.label}:</b> ${s.value}</li>`).join("")
        : "<li>No character is uniform across all members at this level.</li>";
      const subgroups = node.children
        .map((c) => `<button class="chip" data-id="${c._id}">${RANK_LABEL[c.rank]}: ${c.name} <span class="chip-n">${descendantLeaves(c).length}</span></button>`)
        .join("");
      const speciesList = leaves
        .map((l) => `<li><button class="leaf-link" data-id="${l._id}">${nameHtml(l)}</button>${l.common ? ` <span class="node-common">· ${l.common}</span>` : ""}</li>`)
        .join("");
      traitsBlock = `
        <h4>Characters shared by all ${leaves.length} members (computed)</h4>
        <ul class="trait-list">${list}</ul>
        <div class="group-summary">
          <h4>Inside this ${RANK_LABEL[node.rank]}</h4>
          <div class="subgroups">${subgroups}</div>
          <details class="species-browse" open>
            <summary>Browse all ${leaves.length} entries</summary>
            <ul class="species-list">${speciesList}</ul>
          </details>
        </div>`;
    } else {
      const k = kingdomOf(node);
      const rows = schemaFor(k)
        .filter((t) => valOf(node, t.key) != null)
        .map((t) => {
          const v = valOf(node, t.key);
          return `<div class="tv"><span class="tv-k">${t.label}</span><span class="tv-v">${v}</span></div>`;
        })
        .join("");
      traitsBlock = `<h4>Morphological characters</h4><div class="tv-grid">${rows || "<i>none recorded</i>"}</div>`;
    }

    detailEl.innerHTML = `
      <div class="detail-card">
        <div class="d-head">
          ${organismImg(node, "d-img")}
          <div>
            <h3 class="${isItalic(node) ? "" : "no-italic"}">${node.name}</h3>
            ${node.common ? `<div class="d-common">${node.common}</div>` : ""}
            <span class="d-rank">${RANK_LABEL[node.rank] || node.rank}</span>
            ${kingdomOf(node) ? `<span class="d-kingdom">${kingdomOf(node)}</span>` : ""}
          </div>
        </div>
        <div class="lineage">${crumbs}</div>
        ${traitsBlock}
        <div class="d-actions"><button class="btn" id="d-compare">Add to compare</button></div>
      </div>`;

    detailEl.querySelectorAll(".crumb, .leaf-link, .chip").forEach((c) =>
      c.addEventListener("click", () => selectNode(byId.get(c.dataset.id))));
    detailEl.querySelector("#d-compare").addEventListener("click", () => addToCompare(node));
    hydrateMedia(detailEl);
  }

  // ------------------------------------------------ compare
  const slots = { A: null, B: null };

  function addToCompare(node) {
    // Any node works — a species OR a group. A group is compared through its
    // consensus trait vector (see comparable()), so Family Felidae vs Family
    // Canidae is a valid comparison, not just Panthera leo vs Canis lupus.
    if (!slots.A) slots.A = node;
    else if (!slots.B) slots.B = node;
    else { slots.A = slots.B; slots.B = node; }
    revealPath(node);
    renderTree();
    renderCompareBar();
    renderComparison();
    if (!selectedId) renderDetailEmpty();
    if (slots.A && slots.B) setView("compare");
  }
  function clearCompare() {
    slots.A = null; slots.B = null;
    renderCompareBar();
    renderComparison();
    if (!selectedId) renderDetailEmpty();
    setView("tree");
    renderTree();
  }
  function renderCompareBar() {
    const set = (id, node) => {
      const el = document.getElementById(id).querySelector(".slot-name");
      el.textContent = node ? node.name : "pick an organism or group…";
      el.classList.toggle("no-italic", node ? !isItalic(node) : true);
      el.classList.toggle("placeholder", !node);
    };
    set("slotA", slots.A);
    set("slotB", slots.B);
  }

  // ---- searchable A/B picker (combobox) ----
  // Pickable = every taxon from phylum down (species AND groups), so a group can go
  // in a slot exactly like an organism. Species listed first, then groups, A→Z.
  const PHYLUM_I = rankIndex["phylum"];
  const ALL_ORGANISMS = (function () {
    const out = [];
    (function w(n) {
      if (rankIndex[n.rank] >= PHYLUM_I) out.push(n);
      (n.children || []).forEach(w);
    })(DATA.tree);
    return out.sort((a, b) => {
      const la = (a.children || []).length ? 1 : 0, lb = (b.children || []).length ? 1 : 0;
      return la - lb || a.name.localeCompare(b.name);
    });
  })();
  const pop = document.getElementById("pickerPop");
  const pickSearch = document.getElementById("pickerSearch");
  const pickList = document.getElementById("pickerList");
  let pickerSlot = null;
  let pickerMode = "species"; // "species" | "groups" | "all" — keeps the list uncluttered
  pop.querySelectorAll(".pk-mode").forEach((b) =>
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      pickerMode = b.dataset.mode;
      pop.querySelectorAll(".pk-mode").forEach((x) => x.classList.toggle("active", x === b));
      fillPicker(pickSearch.value);
      pickSearch.focus();
    })
  );

  function openPicker(slot, anchor) {
    pickerSlot = slot;
    const r = anchor.getBoundingClientRect();
    const width = 460;
    // keep the two-column popover on-screen
    const left = Math.max(8, Math.min(r.left, window.innerWidth - width - 8));
    pop.style.left = left + "px";
    pop.style.top = r.bottom + 4 + "px";
    pop.style.width = width + "px";
    pop.classList.remove("hidden");
    pickSearch.value = "";
    fillPicker("");
    pickSearch.focus();
  }
  function closePicker() { pop.classList.add("hidden"); pickerSlot = null; }

  function pickerItem(n) {
    const isGroup = (n.children || []).length > 0;
    const badge = isGroup
      ? `<span class="pk-badge">${shortRank(n.rank)}</span>`
      : "";
    const count = isGroup
      ? `<span class="pk-sep">·</span><span class="pk-common">${descendantLeaves(n).length} spp.</span>`
      : (n.common ? `<span class="pk-sep">·</span><span class="pk-common">${n.common}</span>` : "");
    return (
      `<li data-id="${n._id}">` +
      badge +
      `<span class="pk-name ${isItalic(n) ? "" : "no-italic"}">${n.name}</span>` +
      count +
      `</li>`
    );
  }
  function fillPicker(q) {
    q = q.trim().toLowerCase();
    const isLeaf = (n) => !(n.children || []).length;
    const items = ALL_ORGANISMS.filter((n) => {
      if (pickerMode === "species" && !isLeaf(n)) return false;
      if (pickerMode === "groups" && isLeaf(n)) return false;
      return !q || (n.name + " " + (n.common || "")).toLowerCase().includes(q);
    });
    const animals = items.filter((n) => kingdomOf(n) !== "Plantae");
    const plants = items.filter((n) => kingdomOf(n) === "Plantae");
    const col = (label, list) =>
      `<div class="pk-col"><div class="pk-col-head">${label} <span class="pk-count">${list.length}</span></div>` +
      (list.length ? `<ul>${list.map(pickerItem).join("")}</ul>` : `<div class="pk-empty">none</div>`) +
      `</div>`;
    pickList.innerHTML = items.length
      ? `<div class="pk-cols">${col("🐾 Animals", animals)}${col("🌿 Plants", plants)}</div>`
      : `<div class="pk-empty">no match</div>`;
    pickList.querySelectorAll("li[data-id]").forEach((li) =>
      li.addEventListener("click", () => {
        const node = byId.get(li.dataset.id);
        slots[pickerSlot] = node;
        revealPath(node);
        closePicker();
        renderCompareBar();
        renderComparison();
        if (!selectedId) renderDetailEmpty();
        if (slots.A && slots.B) setView("compare");
        else renderTree();
      })
    );
  }

  document.querySelectorAll(".slot-pick").forEach((b) =>
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      if (pickerSlot === b.dataset.slot) return closePicker();
      openPicker(b.dataset.slot, b);
    })
  );
  pickSearch.addEventListener("input", () => fillPicker(pickSearch.value));
  pickSearch.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closePicker();
    if (e.key === "Enter") {
      const first = pickList.querySelector("li[data-id]");
      if (first) first.click();
    }
  });
  document.addEventListener("click", (e) => {
    if (!pop.classList.contains("hidden") && !pop.contains(e.target) &&
        !e.target.closest(".slot-pick")) closePicker();
  });
  function lca(a, b) {
    const s = new Set();
    for (let x = a; x; x = x._parent) s.add(x._id);
    for (let y = b; y; y = y._parent) if (s.has(y._id)) return y;
    return DATA.tree;
  }

  function renderComparison() {
    const box = document.getElementById("comparison");
    if (!slots.A || !slots.B) { box.classList.add("hidden"); return; }
    box.classList.remove("hidden");
    const A = slots.A, B = slots.B;
    if (A._id === B._id) { box.innerHTML = `<div class="compare-line">Both slots are the same — pick a different B.</div>`; return; }

    // Taxonomic reference (truth level)
    const anc = lca(A, B);
    const taxPct = Math.min(100, Math.round((rankIndex[anc.rank] / ANCHOR_I) * 100));

    // Morphological similarity (data-driven). Works for organisms OR whole groups:
    // each group contributes the consensus of the characters all its members share.
    const cA = comparable(A), cB = comparable(B);
    const m = morphSim(cA, cB);
    const morphPct = m.sim == null ? null : Math.round(m.sim * 100);
    const isGroupCmp = cA.group || cB.group;
    const fmt = (v, t) =>
      t && t.type === "numeric" ? String(Math.round(parseFloat(v) * 10) / 10) : v;
    const modeNote = isGroupCmp
      ? `<p class="mode-note">Group comparison — each group is reduced to the characters <b>all</b> its members share${
          cA.group ? ` · A = ${cA.members} spp.` : ""}${cB.group ? ` · B = ${cB.members} spp.` : ""}.</p>`
      : "";

    // interpretation
    let interp;
    if (m.sim == null) {
      interp = `<b>No shared characters.</b> ${A.name} and ${B.name} use different trait vocabularies (animal vs plant), so morphology can't relate them — only lineage can. This is exactly why the two datasets are kept separate.`;
    } else if (m.coverage < 5) {
      interp = `<b>Low coverage:</b> only ${m.coverage} character(s) recorded for both. Add more shared columns for a reliable estimate.`;
    } else if (morphPct < taxPct) {
      interp = `Recorded morphology (<b>${morphPct}%</b>) sits <b>below</b> the taxonomic reference (<b>${taxPct}%</b>): the dataset probably lacks characters that capture this known relationship — <b>add more shared traits</b>.`;
    } else if (morphPct - taxPct > 30) {
      interp = `They look <b>far more alike</b> (${morphPct}%) than their lineage split suggests (${taxPct}%). Expected for a species complex or convergent forms — morphology alone can't fully separate them.`;
    } else {
      interp = `Recorded morphology (<b>${morphPct}%</b>) broadly agrees with the taxonomic reference (<b>${taxPct}%</b>).`;
    }

    const morphMeter = m.sim == null ? "" : `
      <div class="metric">
        <div class="metric-head"><span>Morphological match <span class="metric-sub">(from your data · ${m.coverage}/${m.total} characters)</span></span><b>${morphPct}%</b></div>
        <div class="meter"><span style="width:${morphPct}%"></span></div>
      </div>`;

    // One card style for BOTH sections: the two real organisms side by side, each
    // photo ANNOTATED for this specific character — the trait labelled on the image
    // plus a white marker drawn for that value (leaf = herbivore, fangs = carnivore,
    // spine = backbone, mirror-axis = bilateral…). So the same photo is never shown
    // "blank": every card points at the character it's comparing. A = amber (left),
    // B = blue (right), matching the slots; click any image to zoom.
    const side = (node, d, tint, cls, val) => `
      <div class="tcard ${cls}">
        ${traitImg(node, d.t.key, d.t.label, val, tint, "tcard-img")}
        <div class="tcard-name ${isItalic(node) ? "" : "no-italic"}">${node.name}</div>
        <div class="tcard-val">${val}</div>
      </div>`;
    const charCard = (d) => `
      <div class="trait-diff">
        <div class="trait-diff-label">${d.t.label}</div>
        <div class="trait-diff-cards">
          ${side(A, d, "#f2b134", "a", fmt(d.va, d.t))}
          ${side(B, d, "#6ea8fe", "b", fmt(d.vb, d.t))}
        </div>
      </div>`;

    // A shared feature only counts as "alike" if both organisms actually HAVE it.
    // Drop characters where both sides merely record the same absence (both "none"
    // / "absent" / "no"): human & cat both lacking antennae is not a shared trait
    // to show. (These still contribute to the morphological % above — two forms
    // that both lack a structure are genuinely more alike — this only trims the
    // visual card list.)
    const alike = m.shared.filter((d) => !(isAbsence(d.va) && isAbsence(d.vb)));
    const alikeCards = alike.length
      ? `<div class="diffs alikes"><h4>Where they’re alike — see it (${alike.length})</h4>${
          alike.map(charCard).join("")}</div>`
      : (m.sim != null ? `<p class="compare-line">No shared visible feature to show — any overlap is only in features both lack. See the differences below.</p>` : "");

    const diffCards = m.diff.length
      ? `<div class="diffs"><h4>Where they differ — see it (${m.diff.length})</h4>${
          m.diff.map(charCard).join("")}</div>`
      : (m.sim != null ? `<p class="compare-line">Every recorded character matches — identical on the traits in the dataset.</p>` : "");

    box.innerHTML = `
      <div class="verdict">
        <span class="pct">${morphPct == null ? "—" : morphPct + "%"}</span>
        <div>
          <span class="lca-rank">shared ${RANK_LABEL[anc.rank]}</span>
          <span class="lca-name ${isItalic(anc) ? "" : "no-italic"}">${anc.name}</span>
        </div>
      </div>
      <div class="compare-line"><b class="no-italic">${A.name}</b> vs <b class="no-italic">${B.name}</b></div>
      ${modeNote}
      ${morphMeter}
      <div class="metric">
        <div class="metric-head"><span>Taxonomic reference <span class="metric-sub">(truth · shared ${RANK_LABEL[anc.rank]})</span></span><b>${taxPct}%</b></div>
        <div class="meter ref"><span style="width:${taxPct}%"></span></div>
      </div>
      <p class="interp">${interp}</p>
      ${alikeCards}
      ${diffCards}`;

    hydrateMedia(box);
    if (view === "compare") renderYDiagram();
    applyHighlights(anc, lineageOf(A), lineageOf(B));
  }

  // ------------------------------------------------ vertical Y diagram
  const yEl = document.getElementById("ydiagram");
  function renderYDiagram() {
    if (!slots.A || !slots.B || slots.A._id === slots.B._id) {
      yEl.innerHTML = `<div class="y-empty">Pick two organisms (slots A and B) to draw the Y-shaped path between them.</div>`;
      return;
    }
    const A = slots.A, B = slots.B;
    const chainA = lineageOf(A), chainB = lineageOf(B);
    const anc = lca(A, B);
    const i = chainA.indexOf(anc);
    const armA = chainA.slice(i + 1), armB = chainB.slice(i + 1);

    const nodeBox = (n, cls) =>
      `<div class="y-node ${cls}"><span class="y-rank">${shortRank(n.rank)}</span><span class="y-name ${isItalic(n) ? "" : "no-italic"}">${n.name}</span></div>`;
    const leaf = (n, cls) =>
      `<div class="y-leaf ${cls}">${organismImg(n, "y-img")}<span class="y-name ${isItalic(n) ? "" : "no-italic"}">${n.name}</span>${n.common ? `<span class="y-common">${n.common}</span>` : ""}</div>`;
    const arm = (nodes, tip, cls) =>
      `<div class="y-arm ${cls}">${nodes.map((n) => nodeBox(n, cls)).join("")}${leaf(tip, cls)}</div>`;

    // shared spine above the fork (root..anc), compact
    const spine = chainA
      .slice(1, i + 1) // skip root, include anc
      .map((n) => nodeBox(n, "spine" + (n._id === anc._id ? " lca" : "")))
      .join('<div class="y-link"></div>');

    yEl.innerHTML = `
      <div class="ydiagram">
        <div class="y-spine">${spine}</div>
        <svg class="y-fork" viewBox="0 0 100 40" preserveAspectRatio="none">
          <line x1="50" y1="0" x2="23" y2="40"/><line x1="50" y1="0" x2="77" y2="40"/>
        </svg>
        <div class="y-arms">${arm(armA, A, "a")}${arm(armB, B, "b")}</div>
        <div class="y-caption">Shared down to <b>${RANK_LABEL[anc.rank]} ${anc.name}</b>, then the paths split.</div>
      </div>`;
    hydrateMedia(yEl);
  }

  // ------------------------------------------------ highlight (tree view)
  function applyHighlights(anc, chainA, chainB) {
    treeEl.querySelectorAll(".node-row").forEach((r) =>
      r.classList.remove("selected", "on-path", "is-lca", "slot-a", "slot-b"));
    if (selectedId) {
      const r = treeEl.querySelector(`.node-row[data-id="${selectedId}"]`);
      if (r) r.classList.add("selected");
    }
    if (slots.A) { const r = treeEl.querySelector(`.node-row[data-id="${slots.A._id}"]`); if (r) r.classList.add("slot-a"); }
    if (slots.B) { const r = treeEl.querySelector(`.node-row[data-id="${slots.B._id}"]`); if (r) r.classList.add("slot-b"); }
    if (slots.A && slots.B) {
      const a = anc || lca(slots.A, slots.B);
      const ca = chainA || lineageOf(slots.A), cb = chainB || lineageOf(slots.B);
      new Set([...ca, ...cb].map((n) => n._id)).forEach((id) => {
        const r = treeEl.querySelector(`.node-row[data-id="${id}"]`);
        if (r) r.classList.add("on-path");
      });
      const l = treeEl.querySelector(`.node-row[data-id="${a._id}"]`);
      if (l) { l.classList.remove("on-path"); l.classList.add("is-lca"); }
    }
  }

  // ------------------------------------------------ search
  document.getElementById("search").addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) return;
    let hit = null;
    (function f(n) {
      if (hit) return;
      if ((n.name + " " + (n.common || "")).toLowerCase().includes(q)) { hit = n; return; }
      (n.children || []).forEach(f);
    })(DATA.tree);
    if (hit) { setView("tree"); revealPath(hit); renderTree(); selectNode(hit); }
  });

  // ------------------------------------------------ examples
  const EXAMPLES = [
    ["Human", "Homo sapiens", "Mouse", "Mus musculus"],
    ["Cat", "Felis catus", "Lion", "Panthera leo"],
    ["Cat", "Felis catus", "Dog", "Canis lupus familiaris"],
    ["C. pipiens", "Culex pipiens", "C. quinquefasciatus", "Culex quinquefasciatus"],
    ["Wheat", "Triticum aestivum", "Rye", "Secale cereale"],
    ["Wheat", "Triticum aestivum", "Pea", "Pisum sativum"],
    ["Human", "Homo sapiens", "Bamboo", "Bambusa vulgaris"],
  ];
  // Group-vs-group comparisons — compare whole taxa by their consensus form.
  const GROUP_EXAMPLES = [
    ["Cat family", "Felidae", "Dog family", "Canidae"],
    ["Mammals", "Mammalia", "Insects", "Insecta"],
    ["Grasses", "Poaceae", "Bean family", "Fabaceae"],
  ];
  function findByName(name) {
    let hit = null;
    (function f(n) { if (hit) return; if (n.name === name) hit = n; (n.children || []).forEach(f); })(DATA.tree);
    return hit;
  }
  function runExample(na, nb) {
    const a = findByName(na), b = findByName(nb);
    if (!a || !b) return;
    slots.A = a; slots.B = b;
    revealPath(a); revealPath(b);
    renderTree(); renderCompareBar(); renderComparison();
    if (!selectedId) renderDetailEmpty();
    setView("compare");
  }
  // The detail panel's placeholder is context-aware: during a comparison it points
  // up at the metrics (instead of the misleading "nothing selected" onboarding).
  function renderDetailEmpty() {
    const A = slots.A, B = slots.B;
    if (A && B && A._id !== B._id) {
      const kind = (A.children || []).length || (B.children || []).length ? "taxa" : "organisms";
      detailEl.innerHTML =
        `<div class="detail-empty">` +
        `<h3>Comparing two ${kind}</h3>` +
        `<p>The similarity bars and the shared &amp; differing characters are shown <b>above</b>.</p>` +
        `<p>Inspect one in full here — or click any row in the tree.</p>` +
        `<div class="examples">` +
        `<button class="example-btn" data-inspect="A"><b>Inspect A:</b> ${A.name}</button>` +
        `<button class="example-btn" data-inspect="B"><b>Inspect B:</b> ${B.name}</button>` +
        `</div></div>`;
      detailEl.querySelectorAll("[data-inspect]").forEach((btn) =>
        btn.addEventListener("click", () => selectNode(slots[btn.dataset.inspect])));
    } else {
      detailEl.innerHTML =
        `<div class="detail-empty">` +
        `<h3>Nothing selected yet</h3>` +
        `<p>Pick any node in the tree to see its morphological characters and a picture.</p>` +
        `<p>Try the quick comparisons:</p>` +
        `<div class="examples" id="examples"></div></div>`;
      renderExamples();
    }
  }
  function renderExamples() {
    const box = document.getElementById("examples");
    if (!box) return;
    box.innerHTML = "";
    const addBtns = (list) =>
      list.forEach(([la, na, lb, nb]) => {
        const btn = document.createElement("button");
        btn.className = "example-btn";
        btn.innerHTML = `<b>${la}</b> vs <b>${lb}</b>`;
        btn.addEventListener("click", () => runExample(na, nb));
        box.appendChild(btn);
      });
    addBtns(EXAMPLES);
    const h = document.createElement("div");
    h.className = "examples-sub";
    h.textContent = "…or compare whole groups:";
    box.appendChild(h);
    addBtns(GROUP_EXAMPLES);
  }

  // ------------------------------------------------ Identify (classify an unknown)
  // Score the visible traits of an organism whose name you don't know; the tool
  // places it at the DEEPEST taxon its morphology supports by a "graded descent":
  // start at the kingdom and, at each level, score every child by how similar the
  // unknown is to that child's NEAREST member (best morphSim to any species under it),
  // then descend into the clear winner. It stops — and reports that node as the
  // placement — when the best child isn't a confident match, when too few characters
  // overlap, or when two branches fit about equally (genuinely unresolvable, e.g. a
  // cryptic pair). Nearest-member (not group-consensus) scoring is what lets a sparse
  // or partial trait set still descend: a high rank's consensus contains only the few
  // characters ALL its members share, so scoring against it stalls the moment the user
  // hasn't recorded one of those. Pure client-side: the unknown is an in-memory node
  // fed through the very same engine the rest of the app uses.
  const idEl = document.getElementById("identify");
  const ID_TH = 0.55, ID_MARGIN = 0.03, ID_MINCOV = 3;
  // One-click sample "unknowns" so anyone can try the classifier without typing.
  // Neither is a species in the dataset — each is a made-up field observation that
  // should land at a family (a carnivore near Felidae; a grass near Poaceae).
  const ID_DEMOS = [
    { label: "🐾 Mystery carnivore", kingdom: "Animalia", name: "Ignotus carnivorus",
      values: { body_covering: "hair", dentition: "carnassials", claw_type: "retractable claws",
                posture: "quadrupedal", backbone: "yes", symmetry: "bilateral", diet: "carnivore",
                tail: "present", eye_position: "frontal", limb_count: "4" } },
    { label: "🌿 Mystery grass", kingdom: "Plantae", name: "Herba incognita",
      values: { growth_form: "grass", leaf_venation: "parallel", leaf_shape: "strap",
                stem_type: "culm", root_system: "fibrous", leaf_arrangement: "alternate",
                flower_color: "green", pollination: "wind" } },
  ];
  let idKingdom = "Animalia";
  const idValues = {};       // trait key -> recorded value (form state, persists across views)
  let idName = "";
  let idManualOpen = false;  // is the "score one by hand" panel expanded
  let provisional = null;    // synthetic node currently grafted into the tree, or null

  function kingdomNodeOf(k) {
    let hit = null;
    (function w(n) { if (hit) return; if (n.rank === "kingdom" && n.name === k) hit = n; (n.children || []).forEach(w); })(DATA.tree);
    return hit;
  }
  // Distinct recorded values for a categorical character — the dropdown vocabulary.
  // (morphSim matches categoricals by EXACT string, so free text would never score.)
  function traitOptions(kingdom, key) {
    const set = new Set();
    descendantLeaves(kingdomNodeOf(kingdom)).forEach((l) => {
      const v = valOf(l, key);
      if (v != null && !(l._provisional)) set.add(v);
    });
    return [...set].sort((a, b) => String(a).localeCompare(String(b)));
  }

  const unknownFromEntry = (u) =>
    ({ kingdom: u.kingdom, name: u.name, common: u.common, trait_values: { ...(u.trait_values || {}) } });

  // The list of finds recorded (in the CSVs) as `unknown` — traits only, no taxonomy.
  function renderUnplaced() {
    const items = DATA.unplaced || [];
    if (!items.length) {
      return `<p class="id-none">No unidentified finds in your data yet. Add a row to
        <code>animals.csv</code>/<code>plants.csv</code> with the visible traits, set the
        <code>unknown</code> column to <b>yes</b> (leave the taxonomy blank), and rebuild —
        it appears here to classify.</p>`;
    }
    return `<ul class="id-unplaced">` + items.map((u, i) =>
      `<li data-uix="${i}"><span class="id-uk">${u.kingdom === "Plantae" ? "🌿" : "🐾"}</span>` +
      `<span class="id-uname">${esc(u.name)}</span>` +
      (u.common ? `<span class="id-ucommon">· ${esc(u.common)}</span>` : "") +
      `<span class="id-ucount">${Object.keys(u.trait_values || {}).length} traits</span>` +
      `<span class="id-go">Classify ›</span></li>`).join("") + `</ul>`;
  }

  function renderIdentify() {
    const schema = schemaFor(idKingdom);
    const fields = schema.map((t) => {
      const v = idValues[t.key] != null ? escAttr(idValues[t.key]) : "";
      if (t.type === "numeric") {
        return `<label class="id-field"><span>${t.label}</span>` +
          `<input type="number" step="any" data-key="${t.key}" value="${v}" ` +
          `placeholder="${Math.round(t.min)}–${Math.round(t.max)}"></label>`;
      }
      // free-text input with the recorded vocabulary as SUGGESTIONS (datalist) — you can
      // type a value never seen before, but consistent wording still matches best.
      const listId = "idopt-" + t.key;
      const opts = traitOptions(idKingdom, t.key).map((o) => `<option value="${escAttr(o)}"></option>`).join("");
      return `<label class="id-field"><span>${t.label}</span>` +
        `<input list="${listId}" data-key="${t.key}" value="${v}" autocomplete="off" placeholder="type or pick…">` +
        `<datalist id="${listId}">${opts}</datalist></label>`;
    }).join("");

    idEl.innerHTML = `
      <div class="id-form">
        <p class="id-intro">People record what they can <b>see</b> — but often can't name it. Enter such a find
          as a normal row in <code>animals.csv</code>/<code>plants.csv</code> with the <code>unknown</code>
          column set to <b>yes</b> and the taxonomy left blank; it stays out of the tree and lands here. This
          tool then places it at the <b>deepest taxon its morphology can support</b> and suggests how to graft
          it in.</p>
        <h4 class="id-h">Unidentified finds in your data <span class="id-hn">${(DATA.unplaced || []).length}</span></h4>
        ${renderUnplaced()}
        <details class="id-manual"${idManualOpen ? " open" : ""}>
          <summary>…or score one by hand</summary>
          <div class="id-demos"><span>Try a demo:</span>${ID_DEMOS
            .map((d, i) => `<button class="id-demo" data-demo="${i}">${d.label}</button>`).join("")}</div>
          <div class="id-head">
            <div class="id-kingdom">
              <button class="seg${idKingdom === "Animalia" ? " active" : ""}" data-k="Animalia">🐾 Animal</button>
              <button class="seg${idKingdom === "Plantae" ? " active" : ""}" data-k="Plantae">🌿 Plant</button>
            </div>
            <input id="idName" class="id-name" type="text" autocomplete="off"
              placeholder="Provisional name, e.g. Ignotus sp-1" value="${escAttr(idName)}">
          </div>
          <div class="id-grid">${fields}</div>
          <div class="id-actions">
            <button class="btn" id="idClassify">Classify</button>
            <button class="btn ghost" id="idReset">Reset</button>
            <span class="id-count"></span>
          </div>
        </details>
      </div>`;

    idEl.querySelectorAll(".id-unplaced li").forEach((li) =>
      li.addEventListener("click", () => identify(unknownFromEntry(DATA.unplaced[+li.dataset.uix]))));
    const det = idEl.querySelector(".id-manual");
    det.addEventListener("toggle", () => { idManualOpen = det.open; });
    idEl.querySelectorAll(".id-kingdom .seg").forEach((b) =>
      b.addEventListener("click", () => {
        if (idKingdom === b.dataset.k) return;
        idKingdom = b.dataset.k;
        for (const k in idValues) delete idValues[k];
        idManualOpen = true; removeProvisional(); renderIdentify();
      }));
    idEl.querySelectorAll("[data-key]").forEach((el) =>
      el.addEventListener("input", () => {
        const v = el.value.trim();
        if (v === "") delete idValues[el.dataset.key]; else idValues[el.dataset.key] = v;
        updateIdCount();
      }));
    const nm = idEl.querySelector("#idName");
    nm.addEventListener("input", () => { idName = nm.value; });
    idEl.querySelectorAll(".id-demo").forEach((b) =>
      b.addEventListener("click", () => {
        const d = ID_DEMOS[+b.dataset.demo];
        idKingdom = d.kingdom;
        for (const k in idValues) delete idValues[k];
        Object.assign(idValues, d.values);
        idName = d.name; idManualOpen = true;
        removeProvisional(); renderIdentify(); runIdentify();
      }));
    idEl.querySelector("#idClassify").addEventListener("click", runIdentify);
    idEl.querySelector("#idReset").addEventListener("click", () => {
      for (const k in idValues) delete idValues[k];
      idName = ""; removeProvisional(); renderIdentify(); renderDetailEmpty();
    });
    updateIdCount();
    if (!detailEl.querySelector(".id-result")) renderIdentifyHint();
  }
  function updateIdCount() {
    const el = idEl.querySelector(".id-count");
    if (el) {
      const n = Object.keys(idValues).length;
      el.textContent = `${n} trait${n === 1 ? "" : "s"} scored` + (n < ID_MINCOV ? ` · need ≥ ${ID_MINCOV}` : "");
      el.classList.toggle("thin", n < ID_MINCOV);
    }
  }
  function renderIdentifyHint() {
    detailEl.innerHTML =
      `<div class="detail-empty"><h3>Identify an unknown organism</h3>` +
      `<p>Pick one of your <b>unidentified finds</b> on the left (or score one by hand) and the tool places ` +
      `it at the lowest taxon its morphology supports — with its closest known species, why it fits, and how ` +
      `to graft it into the tree.</p></div>`;
  }

  // ---- the classifier ----
  // How well the unknown fits a child branch = similarity to its NEAREST member.
  function childFit(unknown, child) {
    let sim = null, cov = 0;
    for (const l of descendantLeaves(child)) { // descendantLeaves already skips provisionals
      const m = morphSim(unknown, l);
      if (m.sim != null && (sim == null || m.sim > sim)) { sim = m.sim; cov = m.coverage; }
    }
    return { sim, cov };
  }
  function classifyUnknown(unknown) {
    let node = kingdomNodeOf(unknown.kingdom);
    const trace = [];
    let stopReason = "descended to a single organism";
    while ((node.children || []).length) {
      const scored = node.children
        .map((c) => { const f = childFit(unknown, c); return { c, sim: f.sim, cov: f.cov }; })
        .filter((s) => s.sim != null)
        .sort((a, b) => b.sim - a.sim || b.cov - a.cov);
      if (!scored.length) { stopReason = "no comparable characters at this level"; break; }
      const best = scored[0], second = scored[1];
      trace.push({ from: node, best, second });
      if (best.cov < ID_MINCOV) { stopReason = `only ${best.cov} character(s) overlap here — too few to go deeper`; break; }
      if (best.sim < ID_TH) { stopReason = `no branch is a confident match (best was ${best.c.name}, ${Math.round(best.sim * 100)}%)`; break; }
      if (second && best.sim - second.sim < ID_MARGIN) {
        stopReason = `two branches fit about equally — ${best.c.name} (${Math.round(best.sim * 100)}%) vs ${second.c.name} (${Math.round(second.sim * 100)}%)`;
        break;
      }
      node = best.c;
    }
    return { placement: node, trace, stopReason };
  }
  function nearestSpecies(unknown) {
    let best = null, bestS = -1, cov = 0;
    descendantLeaves(kingdomNodeOf(unknown.kingdom)).forEach((l) => {
      if (l._provisional) return;
      const m = morphSim(unknown, comparable(l));
      if (m.sim != null && m.sim > bestS) { bestS = m.sim; best = l; cov = m.coverage; }
    });
    return { node: best, sim: bestS, cov };
  }

  // ---- graft the provisional organism into the live tree so it's visible ----
  function graftProvisional(unknown, placement) {
    removeProvisional();
    const node = {
      rank: "species", name: unknown.name, common: "provisional · unidentified",
      kingdom: unknown.kingdom, trait_values: { ...unknown.trait_values },
      children: [], _provisional: true,
    };
    (placement.children || (placement.children = [])).push(node);
    node._parent = placement;
    node._id = "prov" + counter++;
    byId.set(node._id, node);
    provisional = node;
    return node;
  }
  function removeProvisional() {
    if (!provisional) return;
    const p = provisional._parent;
    if (p && p.children) p.children = p.children.filter((c) => c !== provisional);
    byId.delete(provisional._id);
    provisional = null;
  }

  // Core: classify any unknown ({kingdom, name, trait_values}) — used by both the
  // "unidentified finds" list and the manual form.
  function identify(unknown) {
    const nRec = Object.keys(unknown.trait_values).length;
    if (nRec < ID_MINCOV) {
      detailEl.innerHTML =
        `<div class="detail-empty"><h3>Not enough traits</h3>` +
        `<p><b>${esc(unknown.name)}</b> has only ${nRec} recorded character(s). Record at least ` +
        `<b>${ID_MINCOV}</b> — with fewer, morphology can't place it reliably.</p></div>`;
      return;
    }
    removeProvisional();
    const res = classifyUnknown(unknown);
    const near = nearestSpecies(unknown);
    graftProvisional(unknown, res.placement);
    renderIdentifyResult(unknown, res, near, nRec);
  }
  function runIdentify() {
    identify({ kingdom: idKingdom, name: idName.trim() || "Unidentified sp.", trait_values: { ...idValues } });
  }

  // Deepest ancestor of `n` (inclusive) whose rank sits ABOVE genus — a valid parent
  // for a new genus row in lineage_ref.csv when suggesting how to graft the find in.
  function anchorAboveGenus(n) {
    const gi = rankIndex["genus"];
    for (let x = n; x; x = x._parent) if (x.rank !== "root" && rankIndex[x.rank] < gi) return x;
    return kingdomNodeOf(n && n.kingdom);
  }

  function renderIdentifyResult(unknown, res, near, nRec) {
    const placement = res.placement;
    const isLeaf = !(placement.children || []).filter((c) => !c._provisional).length;
    const chain = lineageOf(placement).filter((n) => n.rank !== "root");
    const crumbs = chain
      .map((n) => `<span class="crumb" data-id="${n._id}">${RANK_LABEL[n.rank]}: ${nameHtml(n)}</span>`)
      .join('<span class="sep">›</span>');
    const finalScore = res.trace.length ? Math.round(res.trace[res.trace.length - 1].best.sim * 100) : null;

    // diagnostics of the placement group that the unknown matches / conflicts with
    let diagBlock = "";
    if (!isLeaf) {
      const diag = sharedTraits(placement);
      const hit = diag.filter((d) => valOf(unknown, d.t.key) === d.value);
      const miss = diag.filter((d) => valOf(unknown, d.t.key) != null && valOf(unknown, d.t.key) !== d.value);
      if (diag.length) {
        diagBlock =
          `<h4>Why it fits ${esc(placement.name)} <span class="metric-sub">(${hit.length}/${diag.length} diagnostic characters)</span></h4>` +
          `<ul class="trait-list id-diag">` +
          hit.map((d) => `<li class="ok">✓ <b>${d.t.label}:</b> ${esc(d.value)}</li>`).join("") +
          miss.map((d) => `<li class="miss">✗ <b>${d.t.label}:</b> group is ${esc(d.value)}, yours is ${esc(valOf(unknown, d.t.key))}</li>`).join("") +
          `</ul>`;
      }
    }

    const placeName = `<span class="${isItalic(placement) ? "" : "no-italic"}">${esc(placement.name)}</span>`;
    const headline = isLeaf
      ? `Closest to species ${placeName}`
      : `${RANK_LABEL[placement.rank]} ${placeName}`;
    const nextNote = isLeaf
      ? `With finer or more traits it might separate further — morphology alone rarely proves a single species.`
      : `Add more visible traits to try to push the placement deeper.`;

    // "how to graft it in" suggestion
    const anchor = anchorAboveGenus(placement);
    const genusGuess = (unknown.name || "").trim().split(/\s+/)[0] || "Newgenus";
    const kingdomFile = unknown.kingdom === "Plantae" ? "plants.csv" : "animals.csv";
    const lineageLine = `${genusGuess},genus,${anchor.name}`;

    detailEl.innerHTML = `
      <div class="detail-card id-result">
        <h3 class="no-italic">${esc(unknown.name)}</h3>
        <div class="d-common">${idKingdom === "Plantae" ? "🌿 provisional plant" : "🐾 provisional animal"} · ${nRec} traits scored</div>
        <div class="id-verdict">
          <span class="id-rank">${RANK_LABEL[placement.rank]}</span>
          <span class="id-place-name">${headline}</span>
          ${finalScore != null ? `<span class="id-pct" title="morphological match to the nearest known member of this taxon">${finalScore}%</span>` : ""}
        </div>
        <div class="lineage">${crumbs}</div>
        <p class="interp">Stopped because ${res.stopReason}. ${nextNote}</p>
        ${diagBlock}
        <h4>Closest known species</h4>
        <p class="id-near">${near.node
          ? `<button class="leaf-link" data-id="${near.node._id}">${nameHtml(near.node)}</button> · <b>${Math.round(near.sim * 100)}%</b> over ${near.cov} shared characters`
          : "<i>none comparable</i>"}</p>
        <details class="id-trace-wrap"><summary>How it descended (${res.trace.length} steps)</summary>
          <ol class="id-trace">${res.trace.map((s) =>
            `<li>${RANK_LABEL[s.from.rank]} ${esc(s.from.name)} → <b>${esc(s.best.c.name)}</b> ${Math.round(s.best.sim * 100)}%` +
            `${s.second ? ` <span class="id-second">next: ${esc(s.second.c.name)} ${Math.round(s.second.sim * 100)}%</span>` : ""}</li>`).join("")}
          </ol></details>
        <h4>Add it to the tree</h4>
        <p class="id-howto">Morphology puts it within <b>${esc(anchor.name)}</b> (${RANK_LABEL[anchor.rank]}).
          To graft it in: add this line to <code>lineage_ref.csv</code>, set the row's <code>species</code> to a
          binomial starting with <code>${esc(genusGuess)}</code> in <code>${kingdomFile}</code>, clear its
          <code>unknown</code> flag, and run <code>tools/build.py</code>.</p>
        <pre class="id-line"><code>${esc(lineageLine)}</code></pre>
        <div class="d-actions">
          <button class="btn" id="idShowTree">Show in tree</button>
          <button class="btn ghost" id="idLine">Copy lineage line</button>
          <button class="btn ghost" id="idCsv">Copy CSV row</button>
        </div>
      </div>`;

    detailEl.querySelectorAll(".crumb, .leaf-link").forEach((c) =>
      c.addEventListener("click", () => { setView("tree"); selectNode(byId.get(c.dataset.id)); }));
    detailEl.querySelector("#idShowTree").addEventListener("click", () => {
      setView("tree"); revealPath(provisional); renderTree(); selectNode(provisional);
    });
    detailEl.querySelector("#idLine").addEventListener("click", (e) => copyText(lineageLine, e.currentTarget));
    detailEl.querySelector("#idCsv").addEventListener("click", (e) => copyText(csvRowText(unknown), e.currentTarget));
  }

  // Pasteable CSV row (header + values) for animals.csv / plants.csv — folds a
  // confirmed find back into the real pipeline (then run build.py).
  function csvRowText(unknown) {
    const schema = schemaFor(unknown.kingdom);
    const cell = (s) => /[",\n]/.test(String(s)) ? `"${String(s).replace(/"/g, '""')}"` : String(s);
    const cols = ["common_name", "species"].concat(schema.map((t) => t.key));
    const vals = ["", unknown.name].concat(schema.map((t) => { const v = valOf(unknown, t.key); return v == null ? "" : v; }));
    return cols.join(",") + "\n" + vals.map(cell).join(",") + "\n";
  }
  function copyText(text, btn) {
    const done = () => { const o = btn.textContent; btn.textContent = "Copied ✓"; setTimeout(() => { btn.textContent = o; }, 1400); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, () => alert(text));
    else alert(text);
  }

  // ------------------------------------------------ toolbar / view toggle
  document.getElementById("expandAll").addEventListener("click", () => { treeFocus = false; setView("tree"); setOpenAll(DATA.tree, true); renderTree(); });
  document.getElementById("collapseAll").addEventListener("click", () => {
    treeFocus = false; setView("tree"); setOpenAll(DATA.tree, false);
    DATA.tree._open = true; (DATA.tree.children || []).forEach((d) => { d._open = true; });
    renderTree();
  });
  document.getElementById("clearCompare").addEventListener("click", clearCompare);
  document.getElementById("viewTree").addEventListener("click", () => setView("tree"));
  document.getElementById("viewCompare").addEventListener("click", () => setView("compare"));
  document.getElementById("viewIdentify").addEventListener("click", () => setView("identify"));
  document.getElementById("treeFocusToggle").addEventListener("click", () => {
    treeFocus = !treeFocus;
    renderTree();
  });

  // ------------------------------------------------ media lightbox (zoom)
  const lightbox = document.getElementById("lightbox");
  const lbStage = lightbox.querySelector(".lb-stage");
  function openLightbox(src, isVideo, caption) {
    lbStage.innerHTML = "";
    const el = document.createElement(isVideo ? "video" : "img");
    el.className = "lb-media";
    if (isVideo) { el.src = src; el.controls = true; el.autoplay = true; el.loop = true; el.setAttribute("playsinline", ""); }
    else { el.src = src; el.alt = caption || ""; }
    el.addEventListener("click", (ev) => ev.stopPropagation()); // don't close when using the media
    lbStage.appendChild(el);
    lightbox.querySelector(".lb-cap").textContent = caption || "";
    lightbox.classList.remove("hidden");
  }
  function closeLightbox() {
    lightbox.classList.add("hidden");
    lbStage.innerHTML = "";
  }
  document.addEventListener("click", (e) => {
    const box = e.target.closest && e.target.closest(".media-box.zoomable");
    if (!box) return;
    const media = box.querySelector(".media-el");
    // only zoom REAL media — placeholders are inline data: URIs, skip them
    if (media && media.getAttribute("src") && !media.getAttribute("src").startsWith("data:")) {
      openLightbox(media.getAttribute("src"), media.tagName === "VIDEO", box.dataset.alt || "");
    }
  });
  lightbox.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !lightbox.classList.contains("hidden")) closeLightbox();
  });

  // ------------------------------------------------ stats + init
  (function stats() {
    let nodes = 0, leaves = 0;
    (function c(n) { nodes++; if (!(n.children || []).length) leaves++; (n.children || []).forEach(c); })(DATA.tree);
    document.getElementById("stats").textContent = `${leaves} organisms · ${nodes} nodes`;
  })();

  DATA.tree._open = true;
  (DATA.tree.children || []).forEach((domain) => {
    domain._open = true;
    (domain.children || []).forEach((k) => { k._open = true; });
  });
  renderTree();
  renderCompareBar();
  renderDetailEmpty();
})();

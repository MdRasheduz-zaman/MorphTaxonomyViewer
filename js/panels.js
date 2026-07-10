/* Resizable / collapsible panels — RStudio-style.
 * Three regions: the tree (left), the comparison and the details (stacked, right).
 * Drag a gutter to resize; double-click it to reset; use its button to collapse or
 * expand the adjacent region. No dependencies. */
(function () {
  "use strict";

  const layout = document.getElementById("layout");
  const paneSide = document.getElementById("paneSide");
  const sideStack = document.getElementById("sideStack");
  const gutterCol = document.getElementById("gutterCol");
  const gutterRow = document.getElementById("gutterRow");
  const regionCompare = document.getElementById("regionCompare");
  const comparison = document.getElementById("comparison");
  const collapseSide = document.getElementById("collapseSide");
  const collapseCompare = document.getElementById("collapseCompare");
  if (!layout) return;

  const DEFAULT_RIGHT = 420; // px
  const MIN_RIGHT = 260, MIN_LEFT = 300;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  // ---------- horizontal split: tree | side ----------
  function setRight(px) { layout.style.setProperty("--right-w", px + "px"); }

  makeDraggable(gutterCol, "x", (e) => {
    if (layout.classList.contains("side-collapsed")) return;
    const rect = layout.getBoundingClientRect();
    const maxRight = rect.width - MIN_LEFT;
    setRight(clamp(rect.right - e.clientX, MIN_RIGHT, maxRight));
  });
  gutterCol.addEventListener("dblclick", () => {
    layout.classList.remove("side-collapsed");
    setRight(DEFAULT_RIGHT);
    syncCollapseButtons();
  });
  collapseSide.addEventListener("click", (e) => {
    e.stopPropagation();
    layout.classList.toggle("side-collapsed");
    syncCollapseButtons();
  });

  // ---------- vertical split: comparison | details ----------
  const DEFAULT_CMP = 320; // px
  const MIN_CMP = 90, MIN_DETAIL = 140;
  function setCmp(px) { sideStack.style.setProperty("--cmp-h", px + "px"); }

  makeDraggable(gutterRow, "y", (e) => {
    if (sideStack.classList.contains("cmp-collapsed")) return;
    const rect = sideStack.getBoundingClientRect();
    const maxCmp = rect.height - MIN_DETAIL;
    setCmp(clamp(e.clientY - rect.top, MIN_CMP, maxCmp));
  });
  gutterRow.addEventListener("dblclick", () => {
    sideStack.classList.remove("cmp-collapsed");
    setCmp(DEFAULT_CMP);
    syncCollapseButtons();
  });
  collapseCompare.addEventListener("click", (e) => {
    e.stopPropagation();
    sideStack.classList.toggle("cmp-collapsed");
    syncCollapseButtons();
  });

  // ---------- the comparison region only exists while comparing ----------
  // app.js toggles #comparison.hidden; mirror that onto the region + its gutter.
  function syncCompareVisibility() {
    const shown = !comparison.classList.contains("hidden");
    regionCompare.classList.toggle("hidden", !shown);
    gutterRow.classList.toggle("hidden", !shown);
    if (!shown) sideStack.classList.remove("cmp-collapsed");
  }
  new MutationObserver(syncCompareVisibility).observe(comparison, {
    attributes: true, attributeFilter: ["class"],
  });

  function syncCollapseButtons() {
    collapseSide.textContent = layout.classList.contains("side-collapsed") ? "⟨" : "⟩";
    collapseSide.title = layout.classList.contains("side-collapsed")
      ? "Expand this panel" : "Collapse this panel";
    collapseCompare.textContent = sideStack.classList.contains("cmp-collapsed") ? "▾" : "▴";
  }

  // ---------- generic pointer-drag helper ----------
  function makeDraggable(handle, axis, onMove) {
    if (!handle) return;
    handle.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".gutter-collapse")) return; // let the button handle clicks
      e.preventDefault();
      handle.setPointerCapture(e.pointerId);
      document.body.classList.add(axis === "x" ? "resizing-x" : "resizing-y");
      const move = (ev) => onMove(ev);
      const up = (ev) => {
        handle.releasePointerCapture(e.pointerId);
        handle.removeEventListener("pointermove", move);
        handle.removeEventListener("pointerup", up);
        document.body.classList.remove("resizing-x", "resizing-y");
      };
      handle.addEventListener("pointermove", move);
      handle.addEventListener("pointerup", up);
    });
  }

  setRight(DEFAULT_RIGHT);
  setCmp(DEFAULT_CMP);
  syncCompareVisibility();
  syncCollapseButtons();
})();

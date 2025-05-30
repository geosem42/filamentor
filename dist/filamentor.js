document.addEventListener("alpine:init", () => {
  Alpine.store("rows", {
    items: [],
    init() {
    },
    setRows(o) {
      this.items = o;
    },
    getColumn(o, e) {
      var t;
      return ((t = this.items[o]) == null ? void 0 : t.columns[e]) || {};
    },
    getColumns(o) {
      var e;
      return ((e = this.items[o]) == null ? void 0 : e.columns) || [];
    },
    reorderRows(o) {
      if (!o || typeof o.newIndex > "u" || typeof o.oldIndex > "u")
        return this.items;
      const e = o.newIndex, t = o.oldIndex;
      let r = [...this.items];
      const n = r.splice(t, 1)[0];
      return r.splice(e, 0, n), r.forEach((s, i) => {
        s.order = i;
      }), this.items = r, this.items;
    },
    // Modified reorderColumns to handle columns within the same row (existing functionality)
    reorderColumns({ rowId: o, oldIndex: e, newIndex: t }) {
      const r = [...this.items], n = r.find((s) => s.id === o);
      if (n && Array.isArray(n.columns)) {
        const [s] = n.columns.splice(e, 1);
        n.columns.splice(t, 0, s), n.columns.forEach((i, l) => i.order = l);
      }
      return this.items = r, this.items;
    },
    // New method to move columns between rows or reorder within the same row
    moveColumnAndReorder({ sourceRowId: o, draggedColumnId: e, targetRowId: t, newIndexInTargetRow: r }) {
      const n = [...this.items], s = n.find((d) => d.id === o), i = n.find((d) => d.id === t);
      if (!s || !i)
        return console.error("Source or Target Row not found for moving column", { sourceRowId: o, targetRowId: t }), this.items;
      Array.isArray(s.columns) || (s.columns = []), Array.isArray(i.columns) || (i.columns = []);
      const l = s.columns.findIndex((d) => d.id === e);
      if (l === -1)
        return console.error("Dragged column not found in source row", { draggedColumnId: e, sourceRowId: o }), this.items;
      const [c] = s.columns.splice(l, 1), a = Math.max(0, Math.min(r, i.columns.length));
      return i.columns.splice(a, 0, c), s.columns.forEach((d, u) => d.order = u), i.columns.forEach((d, u) => d.order = u), this.items = n, this.items;
    }
  });
});
function f(o) {
  return {
    // Row drag handlers (existing - keep as is)
    handleDragStart(e, t) {
      e.dataTransfer.setData("text/plain", t.id.toString()), e.target.classList.add("dragging");
    },
    handleDragOver(e) {
      e.preventDefault();
      const t = e.target.closest(".bg-gray-50");
      t && !t.classList.contains("dragging") && (document.querySelectorAll(".drop-target").forEach((r) => r.classList.remove("drop-target")), t.classList.add("drop-target"));
    },
    handleDragEnd(e) {
      e.target.classList.remove("dragging"), document.querySelectorAll(".drop-target").forEach((t) => t.classList.remove("drop-target"));
    },
    handleDrop(e, t) {
      e.preventDefault(), document.querySelectorAll(".dragging, .drop-target").forEach((a) => a.classList.remove("dragging", "drop-target"));
      const r = e.dataTransfer.getData("text/plain"), n = Alpine.store("rows").items, s = n.findIndex((a) => a.id.toString() === r), i = n.findIndex((a) => a.id === t.id);
      if (s === -1 || i === -1) return;
      const l = Alpine.store("rows").reorderRows({
        newIndex: i,
        oldIndex: s
      });
      window.Livewire.find(document.querySelector("[wire\\:id]").getAttribute("wire:id")).saveLayout(JSON.stringify(l));
    },
    // Column drag handlers (updated)
    handleColumnDragStart(e, t, r) {
      e.stopPropagation(), e.dataTransfer.setData("text/plain", JSON.stringify({
        columnId: t.id,
        rowId: r.id,
        type: "column"
        // Add a type to distinguish from other draggables if any
      })), e.target.classList.add("dragging-column"), document.body.classList.add("dragging-active-column");
    },
    handleColumnDragEnd(e) {
      e.stopPropagation(), document.querySelectorAll(".dragging-column").forEach((t) => t.classList.remove("dragging-column")), document.querySelectorAll(".drop-before, .drop-after, .drop-inside").forEach((t) => t.classList.remove("drop-before", "drop-after", "drop-inside")), document.body.classList.remove("dragging-active-column");
    },
    // Drag over an existing column item
    handleColumnItemDragOver(e, t, r) {
      e.preventDefault(), e.stopPropagation();
      const n = e.dataTransfer.types.includes("text/plain") ? e.dataTransfer.getData("text/plain") : null;
      if (n)
        try {
          if (JSON.parse(n).type !== "column") return;
        } catch {
          return;
        }
      document.querySelectorAll(".drop-before, .drop-after, .drop-inside").forEach((i) => i.classList.remove("drop-before", "drop-after", "drop-inside"));
      const s = e.currentTarget;
      if (s && !s.classList.contains("dragging-column")) {
        const i = s.getBoundingClientRect();
        e.clientX > i.left + i.width / 2 ? s.classList.add("drop-after") : s.classList.add("drop-before");
      }
    },
    handleColumnItemDragLeave(e) {
      e.stopPropagation();
      const t = e.currentTarget;
      t && t.classList.remove("drop-before", "drop-after");
    },
    // Drag over the general columns container of a row (for empty rows or appending)
    handleColumnContainerDragOver(e, t) {
      e.preventDefault(), e.stopPropagation();
      const r = e.dataTransfer.types.includes("text/plain") ? e.dataTransfer.getData("text/plain") : null;
      if (r)
        try {
          if (JSON.parse(r).type !== "column") return;
        } catch {
          return;
        }
      else
        return;
      document.querySelectorAll(".drop-before, .drop-after, .drop-inside").forEach((l) => l.classList.remove("drop-before", "drop-after", "drop-inside"));
      const n = e.currentTarget, s = t.columns.length === 0, i = e.target === n || e.target.closest(".column-empty-state");
      (s || i) && n.classList.add("drop-inside");
    },
    handleColumnContainerDragLeave(e) {
      e.stopPropagation(), e.currentTarget.classList.remove("drop-inside");
    },
    // Drop onto an existing column item
    handleColumnDropOnItem(e, t, r) {
      e.preventDefault(), e.stopPropagation();
      const n = JSON.parse(e.dataTransfer.getData("text/plain"));
      if (n.type !== "column") return;
      const s = n.rowId, i = n.columnId, l = r.id, c = e.currentTarget;
      let a;
      const d = Alpine.store("rows").items.find((m) => m.id === l);
      if (!d) return;
      const u = d.columns.findIndex((m) => m.id === t.id);
      if (u === -1) return;
      c.classList.contains("drop-after") ? a = u + 1 : a = u, c.classList.remove("drop-before", "drop-after"), document.querySelectorAll(".dragging-column").forEach((m) => m.classList.remove("dragging-column")), document.body.classList.remove("dragging-active-column");
      const h = Alpine.store("rows").moveColumnAndReorder({
        sourceRowId: s,
        draggedColumnId: i,
        targetRowId: l,
        newIndexInTargetRow: a
      });
      h && window.Livewire.find(document.querySelector("[wire\\:id]").getAttribute("wire:id")).saveLayout(JSON.stringify(h));
    },
    // Drop into the general columns container of a row
    handleColumnDropInContainer(e, t) {
      e.preventDefault(), e.stopPropagation();
      const r = JSON.parse(e.dataTransfer.getData("text/plain"));
      if (r.type !== "column") return;
      const n = r.rowId, s = r.columnId, i = t.id;
      e.currentTarget.classList.remove("drop-inside"), document.querySelectorAll(".dragging-column").forEach((u) => u.classList.remove("dragging-column")), document.body.classList.remove("dragging-active-column");
      const c = Alpine.store("rows").items.find((u) => u.id === i);
      if (!c) return;
      const a = c.columns.length, d = Alpine.store("rows").moveColumnAndReorder({
        sourceRowId: n,
        draggedColumnId: s,
        targetRowId: i,
        newIndexInTargetRow: a
      });
      d && window.Livewire.find(document.querySelector("[wire\\:id]").getAttribute("wire:id")).saveLayout(JSON.stringify(d));
    }
  };
}
window.addEventListener("alpine:init", () => {
  Alpine.data("filamentor", () => ({
    showSettings: !1,
    activeRow: null,
    activeColumn: null,
    activeColumnIndex: null,
    activeElement: null,
    activeElementIndex: null,
    rowToDelete: null,
    columnToDeleteRowId: null,
    columnToDeleteIndex: null,
    elementData: {
      text: { content: null },
      image: { url: null, alt: null, thumbnail: null },
      video: { url: null }
    },
    ...f(),
    /**
     * Initializes the page builder with saved layout data
     * Parses saved JSON layout from the hidden input field and loads it into the Alpine store
     * Falls back to an empty layout if parsing fails or data is invalid
     */
    init() {
      try {
        if (!this.$refs.canvasData) {
          console.warn("Canvas data reference not found");
          return;
        }
        const o = this.$refs.canvasData.value;
        if (o)
          try {
            const e = JSON.parse(o);
            if (!Array.isArray(e)) {
              console.error("Parsed layout is not an array");
              return;
            }
            const t = e.sort((r, n) => {
              const s = r.order !== void 0 ? r.order : 0, i = n.order !== void 0 ? n.order : 0;
              return s - i;
            });
            Alpine.store("rows").setRows(t);
          } catch (e) {
            console.error("Failed to parse layout JSON:", e), Alpine.store("rows").setRows([]);
          }
      } catch (o) {
        console.error("Error initializing builder:", o), Alpine.store("rows").setRows([]);
      }
    },
    /**
     * Opens the settings panel for a specific row
     * Sets the row as active and initializes any missing properties with defaults
     * 
     * @param {Object} row - The row object to edit settings for
     */
    openRowSettings(o) {
      try {
        if (!o || !o.id) {
          console.error("Invalid row provided to openRowSettings");
          return;
        }
        if (this.activeRow = Alpine.store("rows").items.find((e) => e.id === o.id), !this.activeRow) {
          console.error(`Row with id ${o.id} not found`);
          return;
        }
        this.activeRow.padding = this.activeRow.padding || { top: 0, right: 0, bottom: 0, left: 0 }, this.activeRow.margin = this.activeRow.margin || { top: 0, right: 0, bottom: 0, left: 0 }, this.activeRow.customClasses = this.activeRow.customClasses || "", this.showSettings = !0;
      } catch (e) {
        console.error("Error opening row settings:", e), this.activeRow = null, this.showSettings = !1;
      }
    },
    /**
     * Saves settings for the currently active row
     * Updates the row in the store with validated values and saves the layout
     * Sends the updated layout to the server via Livewire
     */
    saveRowSettings() {
      try {
        if (!this.activeRow) {
          console.warn("No active row to save");
          return;
        }
        if (!this.activeRow.id) {
          console.error("Active row missing ID property");
          return;
        }
        const o = Alpine.store("rows").items.findIndex((n) => n.id === this.activeRow.id);
        if (o === -1) {
          console.error(`Row with id ${this.activeRow.id} not found in rows store`);
          return;
        }
        const e = this.activeRow.padding || {}, t = this.activeRow.margin || {}, r = {
          ...this.activeRow,
          padding: {
            top: this.safeParseNumber(e.top),
            right: this.safeParseNumber(e.right),
            bottom: this.safeParseNumber(e.bottom),
            left: this.safeParseNumber(e.left)
          },
          margin: {
            top: this.safeParseNumber(t.top),
            right: this.safeParseNumber(t.right),
            bottom: this.safeParseNumber(t.bottom),
            left: this.safeParseNumber(t.left)
          }
        };
        Alpine.store("rows").items[o] = r;
        try {
          const n = JSON.stringify(Alpine.store("rows").items);
          if (!this.$refs.canvasData) {
            console.error("Canvas data reference not found");
            return;
          }
          this.$refs.canvasData.value = n, this.$wire.saveLayout(n).then((s) => {
            s && s.success ? console.log("Layout saved successfully") : console.warn("Layout save returned unexpected result", s);
          }).catch((s) => {
            console.error("Error saving layout:", s);
          });
        } catch (n) {
          console.error("Error stringifying layout data:", n);
        }
      } catch (o) {
        console.error("Error in saveRowSettings:", o);
      }
    },
    /**
     * Adds a new row to the page builder canvas
     * Creates a default row with a single column and initializes
     * all required properties with sensible defaults
     */
    addRow() {
      try {
        const o = Date.now(), e = {
          id: o,
          // Unique identifier for the row
          order: Alpine.store("rows").items.length,
          // Position in the layout (zero-based)
          // Initialize padding values to zero
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          // Initialize margin values to zero
          margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          customClasses: "",
          // Optional CSS classes for styling
          // Each row starts with at least one column
          columns: [{
            id: o + 1,
            // Unique identifier for the column (timestamp + 1 to ensure uniqueness)
            width: "w-full",
            // Default to full width column
            // Initialize padding values to zero
            padding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            },
            // Initialize margin values to zero
            margin: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            },
            customClasses: "",
            // Optional CSS classes for styling
            elements: [],
            // Initially empty array of content elements
            order: 0
            // Position in the row (zero-based)
          }]
        };
        if (!Alpine.store("rows") || !Array.isArray(Alpine.store("rows").items)) {
          console.error("Rows store not properly initialized");
          return;
        }
        Alpine.store("rows").items.push(e), this.updateCanvasData();
        try {
          const t = JSON.stringify(Alpine.store("rows").items);
          this.$wire.saveLayout(t).then((r) => {
            r && r.success ? console.log("Row added and layout saved successfully") : console.warn("Layout saved but returned unexpected result", r);
          }).catch((r) => {
            console.error("Error saving layout after adding row:", r);
          });
        } catch (t) {
          console.error("Error stringifying layout after adding row:", t);
        }
      } catch (o) {
        console.error("Error adding new row:", o), this.updateCanvasData();
      }
    },
    /**
     * Initiates the row deletion process
     * If the row contains elements, shows a confirmation dialog first
     * 
     * @param {Object} row - The row object to be deleted
     */
    deleteRow(o) {
      try {
        if (!o || typeof o != "object" || !o.id) {
          console.error("Invalid row provided for deletion");
          return;
        }
        if (!Array.isArray(o.columns)) {
          console.warn("Row has no columns array, proceeding with deletion"), this.performRowDeletion(o);
          return;
        }
        o.columns.some(
          (t) => t.elements && Array.isArray(t.elements) && t.elements.length > 0
        ) ? (this.rowToDelete = o, this.$dispatch("open-modal", { id: "confirm-row-deletion" })) : this.performRowDeletion(o);
      } catch (e) {
        console.error("Error during row deletion process:", e), this.rowToDelete = null;
      }
    },
    /**
     * Confirms row deletion after user approval
     * Called from the confirmation modal
     */
    confirmRowDeletion() {
      try {
        if (!this.rowToDelete || !this.rowToDelete.id) {
          console.error("No valid row to delete"), this.$dispatch("close-modal", { id: "confirm-row-deletion" });
          return;
        }
        this.performRowDeletion(this.rowToDelete), this.$dispatch("close-modal", { id: "confirm-row-deletion" }), this.rowToDelete = null;
      } catch (o) {
        console.error("Error during row deletion confirmation:", o), this.$dispatch("close-modal", { id: "confirm-row-deletion" }), this.rowToDelete = null;
      }
    },
    /**
     * Performs the actual row deletion and reorders remaining rows
     * 
     * @param {Object} row - The row object to be deleted
     */
    performRowDeletion(o) {
      try {
        if (!o || !o.id) {
          console.error("Invalid row provided to performRowDeletion");
          return;
        }
        if (!Alpine.store("rows") || !Array.isArray(Alpine.store("rows").items)) {
          console.error("Rows store not properly initialized");
          return;
        }
        const e = Alpine.store("rows").items.findIndex((t) => t.id === o.id);
        if (e > -1) {
          Alpine.store("rows").items.splice(e, 1), Alpine.store("rows").items = Alpine.store("rows").items.map((t, r) => ({
            ...t,
            order: r
            // Reassign order based on array position
          }));
          try {
            const t = JSON.stringify(Alpine.store("rows").items);
            this.updateCanvasData(), this.$wire.saveLayout(t).then((r) => {
              r && r.success ? console.log("Row deleted and layout saved successfully") : console.warn("Layout saved after deletion but returned unexpected result", r);
            }).catch((r) => {
              console.error("Error saving layout after row deletion:", r);
            });
          } catch (t) {
            console.error("Error stringifying layout after row deletion:", t);
          }
        } else
          console.warn(`Row with id ${o.id} not found in rows store`);
      } catch (e) {
        console.error("Error performing row deletion:", e), this.updateCanvasData();
      }
    },
    /**
     * Opens the column settings modal and prepares column data for editing
     * 
     * @param {Object} row - The parent row object containing the column
     * @param {Object} column - The column object to be edited
     */
    openColumnSettings(o, e) {
      try {
        if (!o || !o.id) {
          console.error("Invalid row provided to openColumnSettings");
          return;
        }
        if (!e || !e.id) {
          console.error("Invalid column provided to openColumnSettings");
          return;
        }
        this.activeRow = o, this.activeColumn = e, this.activeColumn.padding = this.activeColumn.padding || { top: 0, right: 0, bottom: 0, left: 0 }, this.activeColumn.margin = this.activeColumn.margin || { top: 0, right: 0, bottom: 0, left: 0 }, this.activeColumn.customClasses = this.activeColumn.customClasses || "", typeof this.activeColumn.padding == "object" && (this.activeColumn.padding.top = this.safeParseNumber(this.activeColumn.padding.top), this.activeColumn.padding.right = this.safeParseNumber(this.activeColumn.padding.right), this.activeColumn.padding.bottom = this.safeParseNumber(this.activeColumn.padding.bottom), this.activeColumn.padding.left = this.safeParseNumber(this.activeColumn.padding.left)), typeof this.activeColumn.margin == "object" && (this.activeColumn.margin.top = this.safeParseNumber(this.activeColumn.margin.top), this.activeColumn.margin.right = this.safeParseNumber(this.activeColumn.margin.right), this.activeColumn.margin.bottom = this.safeParseNumber(this.activeColumn.margin.bottom), this.activeColumn.margin.left = this.safeParseNumber(this.activeColumn.margin.left));
      } catch (t) {
        console.error("Error opening column settings:", t), this.activeRow = null, this.activeColumn = null;
      }
    },
    /**
     * Saves the column settings and updates the layout
     * Called when user confirms changes in the column settings modal
     */
    saveColumnSettings() {
      try {
        if (!this.activeColumn || !this.activeColumn.id) {
          console.error("No valid column to save settings for"), this.$dispatch("close-modal", { id: "column-settings-modal" });
          return;
        }
        if (!this.activeRow || !this.activeRow.id) {
          console.error("No valid parent row for column settings"), this.$dispatch("close-modal", { id: "column-settings-modal" });
          return;
        }
        const o = Alpine.store("rows").items, e = o.findIndex((r) => r.id === this.activeRow.id);
        if (e === -1) {
          console.error(`Row with id ${this.activeRow.id} not found in rows store`), this.$dispatch("close-modal", { id: "column-settings-modal" });
          return;
        }
        const t = o[e].columns.findIndex((r) => r.id === this.activeColumn.id);
        if (t === -1) {
          console.error(`Column with id ${this.activeColumn.id} not found in row`), this.$dispatch("close-modal", { id: "column-settings-modal" });
          return;
        }
        o[e].columns[t] = {
          ...this.activeColumn,
          padding: {
            top: this.safeParseNumber(this.activeColumn.padding.top),
            right: this.safeParseNumber(this.activeColumn.padding.right),
            bottom: this.safeParseNumber(this.activeColumn.padding.bottom),
            left: this.safeParseNumber(this.activeColumn.padding.left)
          },
          margin: {
            top: this.safeParseNumber(this.activeColumn.margin.top),
            right: this.safeParseNumber(this.activeColumn.margin.right),
            bottom: this.safeParseNumber(this.activeColumn.margin.bottom),
            left: this.safeParseNumber(this.activeColumn.margin.left)
          }
        };
        try {
          const r = JSON.stringify(o);
          this.updateCanvasData(), this.$wire.saveLayout(r).then((n) => {
            n && n.success ? console.log("Column settings saved successfully") : console.warn("Layout saved but returned unexpected result", n);
          }).catch((n) => {
            console.error("Error saving layout after column settings update:", n);
          }), this.$dispatch("close-modal", { id: "column-settings-modal" });
        } catch (r) {
          console.error("Error stringifying layout after column settings update:", r), this.$dispatch("close-modal", { id: "column-settings-modal" });
        }
      } catch (o) {
        console.error("Error saving column settings:", o), this.$dispatch("close-modal", { id: "column-settings-modal" });
      }
    },
    /**
     * Adds a new column to an existing row
     * Creates a column with default settings and appends it to the row's columns array
     * 
     * @param {Object} row - The row object to add the column to
     */
    addColumn(o) {
      try {
        if (!o || typeof o != "object" || !o.id) {
          console.error("Invalid row provided to addColumn");
          return;
        }
        Array.isArray(o.columns) || (console.warn("Row has no columns array, initializing empty array"), o.columns = []);
        const t = {
          id: Date.now(),
          // Unique identifier for the column
          elements: [],
          // Initialize with no elements
          order: o.columns.length,
          // Position in the row (zero-based)
          width: "w-full",
          // Default width class (Tailwind full width)
          // Initialize padding values to zero
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          // Initialize margin values to zero
          margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          customClasses: ""
          // Optional CSS classes for styling
        }, r = [...o.columns, t];
        o.columns = r, this.$nextTick(() => {
          try {
            const n = Alpine.store("rows").items;
            if (!n || !Array.isArray(n)) {
              console.error("Rows store not properly initialized");
              return;
            }
            if (n.findIndex((l) => l.id === o.id) === -1) {
              console.error(`Row with id ${o.id} not found in rows store`);
              return;
            }
            this.updateCanvasData();
            const i = JSON.stringify(n);
            this.$wire.saveLayout(i).then((l) => {
              l && l.success ? console.log("Column added and layout saved successfully") : console.warn("Layout saved but returned unexpected result", l);
            }).catch((l) => {
              console.error("Error saving layout after adding column:", l);
            });
          } catch (n) {
            console.error("Error processing or saving layout after adding column:", n);
          }
        });
      } catch (e) {
        console.error("Error adding new column:", e);
      }
    },
    /**
     * Updates the number of columns in the active row
     * Adds new columns or shows confirmation dialog for column reduction
     * 
     * @param {number|string} newCount - The new number of columns to set
     */
    updateColumns(o) {
      try {
        if (!this.activeRow || typeof this.activeRow != "object") {
          console.error("No active row to update columns for");
          return;
        }
        Array.isArray(this.activeRow.columns) || (console.warn("Active row has no columns array, initializing empty array"), this.activeRow.columns = []);
        const e = parseInt(o);
        if (isNaN(e) || e < 1) {
          console.error(`Invalid column count: ${o}`);
          return;
        }
        const t = this.activeRow.columns;
        if (e > t.length)
          try {
            const r = e - t.length, n = Date.now();
            for (let i = 0; i < r; i++)
              t.push({
                id: n + i,
                // Ensure unique IDs across columns
                elements: [],
                // Start with empty elements array
                order: t.length,
                // Set order based on current position
                width: "w-full",
                // Default width class
                padding: { top: 0, right: 0, bottom: 0, left: 0 },
                margin: { top: 0, right: 0, bottom: 0, left: 0 },
                customClasses: ""
              });
            this.activeRow.columns.forEach((i, l) => {
              i.order = l;
            });
            const s = Alpine.store("rows").items;
            if (!s || !Array.isArray(s)) {
              console.error("Rows store not properly initialized");
              return;
            }
            this.updateCanvasData();
            try {
              const i = JSON.stringify(s);
              this.$wire.saveLayout(i).then((l) => {
                l && l.success ? console.log("Columns added and layout saved successfully") : console.warn("Layout saved but returned unexpected result", l);
              }).catch((l) => {
                console.error("Error saving layout after adding columns:", l);
              });
            } catch (i) {
              console.error("Error stringifying layout after adding columns:", i);
            }
          } catch (r) {
            console.error("Error adding columns:", r);
          }
        else if (e < t.length)
          try {
            this.newColumnCount = e, this.activeRow.columns.slice(e).some(
              (s) => s.elements && Array.isArray(s.elements) && s.elements.length > 0
            ) ? this.$dispatch("open-modal", { id: "confirm-column-reduction" }) : this.confirmColumnReduction();
          } catch (r) {
            console.error("Error preparing column reduction:", r);
          }
        else
          console.log("Column count unchanged");
      } catch (e) {
        console.error("Error updating columns:", e);
      }
    },
    /**
     * Initiates the column deletion process
     * If the column contains elements, shows a confirmation dialog first
     * 
     * @param {Object} row - The parent row object containing the column
     * @param {number} columnIndex - The index of the column to delete
     */
    deleteColumn(o, e) {
      try {
        if (!o || typeof o != "object" || !o.id) {
          console.error("Invalid row provided to deleteColumn");
          return;
        }
        if (e === void 0 || isNaN(parseInt(e))) {
          console.error("Invalid column index provided to deleteColumn");
          return;
        }
        const t = Alpine.store("rows").items;
        if (!t || !Array.isArray(t)) {
          console.error("Rows store not properly initialized");
          return;
        }
        const r = t.findIndex((i) => i.id === o.id);
        if (r === -1) {
          console.error(`Row with id ${o.id} not found in rows store`);
          return;
        }
        if (!Array.isArray(t[r].columns)) {
          console.error(`Row with id ${o.id} has no valid columns array`);
          return;
        }
        if (e < 0 || e >= t[r].columns.length) {
          console.error(`Column index ${e} out of bounds for row with id ${o.id}`);
          return;
        }
        const n = t[r].columns[e];
        n && n.elements && Array.isArray(n.elements) && n.elements.length > 0 ? (this.columnToDeleteRowId = o.id, this.columnToDeleteIndex = e, this.$dispatch("open-modal", { id: "confirm-column-deletion" })) : this.performColumnDeletion(o.id, e);
      } catch (t) {
        console.error("Error during column deletion process:", t), this.columnToDeleteRowId = null, this.columnToDeleteIndex = null;
      }
    },
    /**
     * Confirms column deletion after user approval
     * Called from the confirmation modal
     */
    confirmColumnDeletion() {
      try {
        if (this.columnToDeleteRowId === null || this.columnToDeleteIndex === null) {
          console.error("No valid column to delete"), this.$dispatch("close-modal", { id: "confirm-column-deletion" });
          return;
        }
        this.performColumnDeletion(this.columnToDeleteRowId, this.columnToDeleteIndex), this.$dispatch("close-modal", { id: "confirm-column-deletion" }), this.columnToDeleteRowId = null, this.columnToDeleteIndex = null;
      } catch (o) {
        console.error("Error during column deletion confirmation:", o), this.$dispatch("close-modal", { id: "confirm-column-deletion" }), this.columnToDeleteRowId = null, this.columnToDeleteIndex = null;
      }
    },
    /**
     * Performs the actual column deletion and updates the layout
     * 
     * @param {number|string} rowId - The ID of the row containing the column
     * @param {number} columnIndex - The index of the column to delete
     */
    performColumnDeletion(o, e) {
      try {
        if (o == null) {
          console.error("Invalid rowId provided to performColumnDeletion");
          return;
        }
        if (e == null || isNaN(parseInt(e))) {
          console.error("Invalid columnIndex provided to performColumnDeletion");
          return;
        }
        const t = Alpine.store("rows").items;
        if (!t || !Array.isArray(t)) {
          console.error("Rows store not properly initialized");
          return;
        }
        const r = t.findIndex((n) => n.id === o);
        if (r === -1) {
          console.error(`Row with id ${o} not found in rows store`);
          return;
        }
        if (!Array.isArray(t[r].columns)) {
          console.error(`Row with id ${o} has no valid columns array`);
          return;
        }
        if (e < 0 || e >= t[r].columns.length) {
          console.error(`Column index ${e} out of bounds for row with id ${o}`);
          return;
        }
        if (t[r].columns.length === 1) {
          const n = Date.now();
          t[r].columns = [{
            id: t[r].columns[0].id,
            // Keep the same ID
            elements: [],
            // Clear elements
            order: 0,
            // Reset order
            width: "w-full",
            // Reset width
            padding: { top: 0, right: 0, bottom: 0, left: 0 },
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
            customClasses: ""
          }], console.log("Column content cleared instead of deletion, as it was the last column in the row");
        } else
          t[r].columns.splice(e, 1), t[r].columns = t[r].columns.map((n, s) => ({
            ...n,
            order: s
            // Reassign order based on array position
          }));
        this.updateCanvasData();
        try {
          const n = JSON.stringify(t);
          this.$wire.saveLayout(n).then((s) => {
            s && s.success ? console.log("Layout updated and saved successfully") : console.warn("Layout saved but returned unexpected result", s);
          }).catch((s) => {
            console.error("Error saving layout after column operation:", s);
          });
        } catch (n) {
          console.error("Error stringifying layout after column operation:", n);
        }
      } catch (t) {
        console.error("Error performing column deletion:", t), this.updateCanvasData();
      }
    },
    /**
     * Sets the active column for adding elements
     * 
     * @param {Object} row - The parent row object
     * @param {number} index - The index of the column to set as active
     */
    setActiveColumn(o, e) {
      try {
        if (!o || typeof o != "object" || !o.id) {
          console.error("Invalid row provided to setActiveColumn");
          return;
        }
        if (e == null || isNaN(parseInt(e))) {
          console.error("Invalid column index provided to setActiveColumn");
          return;
        }
        const t = Alpine.store("rows").items;
        if (!t || !Array.isArray(t)) {
          console.error("Rows store not properly initialized");
          return;
        }
        const r = t.find((s) => s.id === o.id);
        if (!r) {
          console.error(`Row with id ${o.id} not found in rows store`);
          return;
        }
        if (e < 0 || e >= r.columns.length) {
          console.error(`Column index ${e} out of bounds for row with id ${o.id}`);
          return;
        }
        const n = r.columns[e];
        if (n.elements && Array.isArray(n.elements) && n.elements.length > 0) {
          console.warn("Column already has an element. Only one element per column is allowed.");
          return;
        }
        this.activeRow = r, this.activeColumnIndex = e, this.$dispatch("open-modal", { id: "element-picker-modal" });
      } catch (t) {
        console.error("Error setting active column:", t), this.activeRow = null, this.activeColumnIndex = null;
      }
    },
    /**
     * Adds a new element to the active column
     * 
     * @param {string} elementType - The type of element to add
     */
    addElement(o) {
      try {
        if (!o || typeof o != "string") {
          console.error("Invalid element type provided to addElement");
          return;
        }
        if (!this.activeRow || this.activeColumnIndex === null) {
          console.error("No active row or column to add element to"), this.$dispatch("close-modal", { id: "element-picker-modal" });
          return;
        }
        const e = Alpine.store("rows").items;
        if (!e || !Array.isArray(e)) {
          console.error("Rows store not properly initialized"), this.$dispatch("close-modal", { id: "element-picker-modal" });
          return;
        }
        const t = e.findIndex((l) => l.id === this.activeRow.id);
        if (t === -1) {
          console.error(`Row with id ${this.activeRow.id} not found in rows store`), this.$dispatch("close-modal", { id: "element-picker-modal" });
          return;
        }
        const r = e[t];
        if (!Array.isArray(r.columns)) {
          console.error(`Row with id ${r.id} has no valid columns array`), this.$dispatch("close-modal", { id: "element-picker-modal" });
          return;
        }
        if (this.activeColumnIndex < 0 || this.activeColumnIndex >= r.columns.length) {
          console.error(`Column index ${this.activeColumnIndex} out of bounds for row with id ${r.id}`), this.$dispatch("close-modal", { id: "element-picker-modal" });
          return;
        }
        const n = r.columns[this.activeColumnIndex];
        if (!Array.isArray(n.elements))
          n.elements = [];
        else if (n.elements.length > 0) {
          console.warn("Column already has an element. Only one element per column is allowed."), this.$dispatch("close-modal", { id: "element-picker-modal" });
          return;
        }
        const s = o.replace(/Filamentor/, "\\Filamentor\\").replace(/Elements/, "Elements\\");
        let i = {};
        s.includes("Text") ? i = { text: "" } : s.includes("Image") ? i = { url: null, alt: "", thumbnail: null } : s.includes("Video") && (i = { url: "" }), e[t].columns[this.activeColumnIndex].elements.push({
          id: Date.now(),
          // Add unique ID for the element
          type: s,
          content: i
        }), this.updateCanvasData();
        try {
          const l = JSON.stringify(e);
          this.$wire.saveLayout(l).then((c) => {
            c && c.success ? console.log("Element added and layout saved successfully") : console.warn("Layout saved but returned unexpected result", c);
          }).catch((c) => {
            console.error("Error saving layout after adding element:", c);
          });
        } catch (l) {
          console.error("Error stringifying layout after adding element:", l);
        }
        this.$dispatch("close-modal", { id: "element-picker-modal" }), this.activeRow = null, this.activeColumnIndex = null;
      } catch (e) {
        console.error("Error adding element:", e), this.$dispatch("close-modal", { id: "element-picker-modal" }), this.activeRow = null, this.activeColumnIndex = null;
      }
    },
    /**
     * Opens the element editor modal for editing an existing element
     * 
     * @param {Object} row - The row object containing the element
     * @param {number} columnIndex - The index of the column containing the element
     * @param {number} elementIndex - The index of the element to edit (defaults to 0)
     */
    editElement(o, e, t = 0) {
      try {
        if (!o || typeof o != "object" || !o.id) {
          console.error("Invalid row provided to editElement");
          return;
        }
        if (e == null || isNaN(parseInt(e))) {
          console.error("Invalid column index provided to editElement");
          return;
        }
        if (t == null || isNaN(parseInt(t))) {
          console.error("Invalid element index provided to editElement");
          return;
        }
        const r = Alpine.store("rows").items;
        if (!r || !Array.isArray(r)) {
          console.error("Rows store not properly initialized");
          return;
        }
        const n = r.find((a) => a.id === o.id);
        if (!n) {
          console.error(`Row with id ${o.id} not found in rows store`);
          return;
        }
        if (!Array.isArray(n.columns) || e >= n.columns.length) {
          console.error(`Column index ${e} out of bounds for row with id ${o.id}`);
          return;
        }
        const s = n.columns[e];
        if (!Array.isArray(s.elements) || s.elements.length === 0) {
          console.error(`No elements found in column ${e} of row with id ${o.id}`);
          return;
        }
        if (t >= s.elements.length) {
          console.error(`Element index ${t} out of bounds for column ${e}`);
          return;
        }
        const i = s.elements[t];
        if (!i || !i.type) {
          console.error(`Invalid element at index ${t}`);
          return;
        }
        this.activeRow = n, this.activeColumnIndex = e, this.activeElementIndex = t, this.activeElement = i;
        const l = i.type;
        if (!l) {
          console.error("Element has no type");
          return;
        }
        try {
          this.$wire.set("elementData", {
            text: { content: null },
            image: { url: null, alt: null, thumbnail: null },
            video: { url: null }
          });
        } catch (a) {
          console.error("Error resetting element data:", a);
          return;
        }
        try {
          if (l.includes("Text")) {
            const a = i.content && typeof i.content.text < "u" ? i.content.text : "";
            this.$wire.set("elementData.text.content", a);
          } else if (l.includes("Image")) {
            const a = {
              url: i.content && i.content.url ? i.content.url : null,
              alt: i.content && i.content.alt ? i.content.alt : "",
              thumbnail: i.content && i.content.thumbnail ? i.content.thumbnail : null
            };
            this.$wire.set("elementData.image", a);
          } else if (l.includes("Video")) {
            const a = i.content && i.content.url ? i.content.url : "";
            this.$wire.set("elementData.video.url", a);
          } else
            console.warn(`Unknown element type: ${l}`);
        } catch (a) {
          console.error("Error setting element data:", a);
          return;
        }
        try {
          this.$wire.editElement(l, i.content || {}, i.id).catch((a) => {
            console.error("Error in Livewire editElement method:", a);
          });
        } catch (a) {
          console.error("Error calling Livewire editElement method:", a);
          return;
        }
        const c = l.split("\\").pop() || "Unknown";
        this.$dispatch("open-modal", {
          id: "element-editor-modal",
          title: `Edit ${c} Element`
        });
      } catch (r) {
        console.error("Error editing element:", r), this.activeRow = null, this.activeColumnIndex = null, this.activeElementIndex = null, this.activeElement = null;
      }
    },
    /**
     * Saves the edited element content back to the data store
     * 
     * @param {Object} content - The content object from the editor (optional, may not be used)
     */
    saveElementContent(o) {
      try {
        if (!this.activeElement) {
          console.error("No active element to save content for"), this.$dispatch("close-modal", { id: "element-editor-modal" });
          return;
        }
        if (!this.activeRow || this.activeColumnIndex === null || this.activeElementIndex === null) {
          console.error("Missing required references for element update"), this.$dispatch("close-modal", { id: "element-editor-modal" });
          return;
        }
        const e = Alpine.store("rows").items;
        if (!e || !Array.isArray(e)) {
          console.error("Rows store not properly initialized"), this.$dispatch("close-modal", { id: "element-editor-modal" });
          return;
        }
        const t = e.findIndex((l) => l.id === this.activeRow.id);
        if (t === -1) {
          console.error(`Row with id ${this.activeRow.id} not found in rows store`), this.$dispatch("close-modal", { id: "element-editor-modal" });
          return;
        }
        const r = e[t];
        if (!Array.isArray(r.columns) || this.activeColumnIndex >= r.columns.length) {
          console.error(`Column index ${this.activeColumnIndex} out of bounds for row with id ${r.id}`), this.$dispatch("close-modal", { id: "element-editor-modal" });
          return;
        }
        const n = r.columns[this.activeColumnIndex];
        if (!Array.isArray(n.elements) || this.activeElementIndex >= n.elements.length) {
          console.error(`Element index ${this.activeElementIndex} out of bounds for column ${this.activeColumnIndex}`), this.$dispatch("close-modal", { id: "element-editor-modal" });
          return;
        }
        const s = this.activeElement.type, i = () => {
          try {
            const l = JSON.stringify(e);
            this.$wire.saveLayout(l).then((c) => {
              c && c.success ? console.log("Element content updated and layout saved successfully") : console.warn("Layout saved but returned unexpected result", c), this.$dispatch("close-modal", { id: "element-editor-modal" });
            }).catch((c) => {
              console.error("Error saving layout after updating element content:", c), this.$dispatch("close-modal", { id: "element-editor-modal" });
            });
          } catch (l) {
            console.error("Error processing layout data:", l), this.$dispatch("close-modal", { id: "element-editor-modal" });
          }
        };
        if (s.includes("Image")) {
          const l = this.$wire.get("elementData.image.alt") || "";
          this.$wire.uploadMedia().then((c) => {
            if (c && c.url)
              e[t].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
                ...this.activeElement,
                content: {
                  url: c.url,
                  thumbnail: c.thumbnail,
                  alt: l
                  // Use the alt text we captured earlier
                }
              };
            else {
              const a = this.activeElement.content || {};
              e[t].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
                ...this.activeElement,
                content: {
                  url: a.url || "",
                  thumbnail: a.thumbnail || "",
                  alt: l
                  // Update only the alt text
                }
              };
            }
            i();
          }).catch((c) => {
            console.error("Error during image processing:", c);
            try {
              const a = this.activeElement.content || {};
              e[t].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
                ...this.activeElement,
                content: {
                  url: a.url || "",
                  thumbnail: a.thumbnail || "",
                  alt: l
                }
              }, i();
            } catch (a) {
              console.error("Error saving alt text after upload failure:", a), this.$dispatch("close-modal", { id: "element-editor-modal" });
            }
          });
        } else if (s.includes("Video"))
          try {
            const l = this.$wire.get("elementData.video.url");
            l || console.warn("Empty video URL provided"), e[t].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
              ...this.activeElement,
              content: {
                url: l || ""
              }
            }, i();
          } catch (l) {
            console.error("Error updating video element:", l), this.$dispatch("close-modal", { id: "element-editor-modal" });
          }
        else if (s.includes("Text"))
          try {
            const l = this.$wire.get("elementData.text.content");
            e[t].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
              ...this.activeElement,
              content: {
                text: l || ""
              }
            }, i();
          } catch (l) {
            console.error("Error updating text element:", l), this.$dispatch("close-modal", { id: "element-editor-modal" });
          }
        else
          console.error(`Unknown element type: ${s}`), this.$dispatch("close-modal", { id: "element-editor-modal" });
      } catch (e) {
        console.error("Error saving element content:", e), this.$dispatch("close-modal", { id: "element-editor-modal" }), this.activeRow = null, this.activeColumnIndex = null, this.activeElementIndex = null, this.activeElement = null;
      }
    },
    /**
     * Deletes an element from a column
     * 
     * @param {Object} row - The row object containing the element
     * @param {number} columnIndex - The index of the column containing the element
     * @param {number} elementIndex - The index of the element to delete (defaults to 0)
     */
    deleteElement(o, e, t = 0) {
      try {
        if (!o || typeof o != "object" || !o.id) {
          console.error("Invalid row provided to deleteElement");
          return;
        }
        if (e == null || isNaN(parseInt(e))) {
          console.error("Invalid column index provided to deleteElement");
          return;
        }
        if (t == null || isNaN(parseInt(t))) {
          console.error("Invalid element index provided to deleteElement");
          return;
        }
        const r = Alpine.store("rows").items;
        if (!r || !Array.isArray(r)) {
          console.error("Rows store not properly initialized");
          return;
        }
        const n = r.findIndex((i) => i.id === o.id);
        if (n === -1) {
          console.error(`Row with id ${o.id} not found in rows store`);
          return;
        }
        if (!Array.isArray(r[n].columns) || e >= r[n].columns.length) {
          console.error(`Column index ${e} out of bounds for row with id ${o.id}`);
          return;
        }
        const s = r[n].columns[e];
        if (!Array.isArray(s.elements)) {
          console.error(`Column ${e} has no elements array`);
          return;
        }
        if (t >= s.elements.length) {
          console.error(`Element index ${t} out of bounds for column ${e}`);
          return;
        }
        r[n].columns[e].elements.splice(t, 1), this.updateCanvasData();
        try {
          const i = JSON.stringify(r);
          this.$wire.saveLayout(i).then((l) => {
            l && l.success ? console.log("Element deleted and layout saved successfully") : console.warn("Layout saved after element deletion but returned unexpected result", l);
          }).catch((l) => {
            console.error("Error saving layout after element deletion:", l);
          });
        } catch (i) {
          console.error("Error stringifying layout after element deletion:", i);
        }
      } catch (r) {
        console.error("Error deleting element:", r), this.updateCanvasData();
      }
    },
    /**
     * Updates the canvas data in both the DOM and Livewire component
     * Synchronizes the Alpine store data with the form input and Livewire state
     */
    updateCanvasData() {
      try {
        const o = Alpine.store("rows").items;
        if (!o) {
          console.error("Rows store is not properly initialized");
          return;
        }
        let e;
        try {
          e = JSON.stringify(o);
        } catch (t) {
          console.error("Error converting layout data to JSON:", t);
          return;
        }
        if (this.$refs.canvasData)
          try {
            this.$refs.canvasData.value = e;
          } catch (t) {
            console.error("Error updating canvas data reference:", t);
          }
        else
          console.warn("Canvas data reference not found in DOM");
        try {
          this.$wire.set("data.layout", e).catch((t) => {
            console.error("Error updating Livewire data.layout property:", t);
          });
        } catch (t) {
          console.error("Error calling Livewire set method:", t);
        }
        console.log("Canvas data updated successfully");
      } catch (o) {
        console.error("Unexpected error in updateCanvasData:", o);
      }
    },
    // Helper function to safely parse numbers
    safeParseNumber(o) {
      try {
        const e = Number(o);
        return isNaN(e) ? 0 : e;
      } catch {
        return 0;
      }
    }
  }));
});

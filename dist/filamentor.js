document.addEventListener("alpine:init", () => {
  Alpine.store("rows", {
    items: [],
    init() {
    },
    setRows(t) {
      this.items = t;
    },
    getColumn(t, e) {
      var o;
      return ((o = this.items[t]) == null ? void 0 : o.columns[e]) || {};
    },
    getColumns(t) {
      var e;
      return ((e = this.items[t]) == null ? void 0 : e.columns) || [];
    },
    reorderRows(t) {
      if (!t || typeof t.newIndex > "u" || typeof t.oldIndex > "u")
        return this.items;
      const e = t.newIndex, o = t.oldIndex;
      let r = [...this.items];
      const n = r.splice(o, 1)[0];
      return r.splice(e, 0, n), r.forEach((l, i) => {
        l.order = i;
      }), this.items = r, this.items;
    },
    reorderColumns({ sourceRowId: t, targetRowId: e, oldIndex: o, newIndex: r }) {
      const n = [...this.items], l = n.find((c) => c.id === parseInt(t)), i = n.find((c) => c.id === parseInt(e)), [s] = l.columns.splice(o, 1);
      return i.columns.splice(r, 0, s), this.items = n, n;
    }
  });
});
function d(t) {
  return {
    handleDragStart(e, o) {
      e.dataTransfer.setData("text/plain", o.id), e.target.classList.add("dragging");
    },
    handleDragOver(e) {
      e.preventDefault();
      const o = e.target.closest(".bg-gray-50");
      o && (document.querySelectorAll(".drop-target").forEach((r) => {
        r.classList.remove("drop-target");
      }), o.classList.add("drop-target"));
    },
    handleDragEnd(e) {
      e.target.classList.remove("dragging"), document.querySelectorAll(".drop-target").forEach((o) => {
        o.classList.remove("drop-target");
      });
    },
    handleDrop(e, o) {
      e.preventDefault(), document.querySelectorAll(".dragging, .drop-target").forEach((a) => {
        a.classList.remove("dragging", "drop-target");
      });
      const r = e.dataTransfer.getData("text/plain"), n = Alpine.store("rows").items, l = n.findIndex((a) => a.id.toString() === r), i = n.findIndex((a) => a.id === o.id), s = Alpine.store("rows").reorderRows({
        newIndex: i,
        oldIndex: l
      });
      window.Livewire.find(
        document.querySelector("[wire\\:id]").getAttribute("wire:id")
      ).saveLayout(JSON.stringify(s));
    },
    handleColumnDragStart(e, o, r) {
      e.stopPropagation(), e.dataTransfer.setData("text/plain", JSON.stringify({
        columnId: o.id,
        rowId: r.id
      })), e.target.classList.add("dragging-column");
    },
    handleColumnDragOver(e) {
      e.stopPropagation(), e.preventDefault();
      const o = e.target.closest('[draggable="true"]');
      o && !o.classList.contains("dragging-column") && (document.querySelectorAll(".drop-target-column").forEach((r) => {
        r.classList.remove("drop-target-column");
      }), o.classList.add("drop-target-column"));
    },
    handleColumnDragEnd(e) {
      e.stopPropagation(), document.querySelectorAll(".dragging-column, .drop-target-column").forEach((o) => {
        o.classList.remove("dragging-column", "drop-target-column");
      });
    },
    handleColumnDrop(e, o, r) {
      e.stopPropagation(), e.preventDefault();
      const n = JSON.parse(e.dataTransfer.getData("text/plain"));
      if (n.rowId !== r.id) return;
      const l = r.columns.findIndex((a) => a.id === n.columnId), i = r.columns.findIndex((a) => a.id === o.id), s = Alpine.store("rows").reorderColumns({
        sourceRowId: r.id,
        targetRowId: r.id,
        oldIndex: l,
        newIndex: i
      });
      window.Livewire.find(
        document.querySelector("[wire\\:id]").getAttribute("wire:id")
      ).saveLayout(JSON.stringify(s));
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
    ...d(),
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
        const t = this.$refs.canvasData.value;
        if (t)
          try {
            const e = JSON.parse(t);
            if (!Array.isArray(e)) {
              console.error("Parsed layout is not an array");
              return;
            }
            const o = e.sort((r, n) => {
              const l = r.order !== void 0 ? r.order : 0, i = n.order !== void 0 ? n.order : 0;
              return l - i;
            });
            Alpine.store("rows").setRows(o);
          } catch (e) {
            console.error("Failed to parse layout JSON:", e), Alpine.store("rows").setRows([]);
          }
      } catch (t) {
        console.error("Error initializing builder:", t), Alpine.store("rows").setRows([]);
      }
    },
    /**
     * Opens the settings panel for a specific row
     * Sets the row as active and initializes any missing properties with defaults
     * 
     * @param {Object} row - The row object to edit settings for
     */
    openRowSettings(t) {
      try {
        if (!t || !t.id) {
          console.error("Invalid row provided to openRowSettings");
          return;
        }
        if (this.activeRow = Alpine.store("rows").items.find((e) => e.id === t.id), !this.activeRow) {
          console.error(`Row with id ${t.id} not found`);
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
        const t = Alpine.store("rows").items.findIndex((n) => n.id === this.activeRow.id);
        if (t === -1) {
          console.error(`Row with id ${this.activeRow.id} not found in rows store`);
          return;
        }
        const e = this.activeRow.padding || {}, o = this.activeRow.margin || {}, r = {
          ...this.activeRow,
          padding: {
            top: this.safeParseNumber(e.top),
            right: this.safeParseNumber(e.right),
            bottom: this.safeParseNumber(e.bottom),
            left: this.safeParseNumber(e.left)
          },
          margin: {
            top: this.safeParseNumber(o.top),
            right: this.safeParseNumber(o.right),
            bottom: this.safeParseNumber(o.bottom),
            left: this.safeParseNumber(o.left)
          }
        };
        Alpine.store("rows").items[t] = r;
        try {
          const n = JSON.stringify(Alpine.store("rows").items);
          if (!this.$refs.canvasData) {
            console.error("Canvas data reference not found");
            return;
          }
          this.$refs.canvasData.value = n, this.$wire.saveLayout(n).then((l) => {
            l && l.success ? console.log("Layout saved successfully") : console.warn("Layout save returned unexpected result", l);
          }).catch((l) => {
            console.error("Error saving layout:", l);
          });
        } catch (n) {
          console.error("Error stringifying layout data:", n);
        }
      } catch (t) {
        console.error("Error in saveRowSettings:", t);
      }
    },
    /**
     * Adds a new row to the page builder canvas
     * Creates a default row with a single column and initializes
     * all required properties with sensible defaults
     */
    addRow() {
      try {
        const t = Date.now(), e = {
          id: t,
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
            id: t + 1,
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
          const o = JSON.stringify(Alpine.store("rows").items);
          this.$wire.saveLayout(o).then((r) => {
            r && r.success ? console.log("Row added and layout saved successfully") : console.warn("Layout saved but returned unexpected result", r);
          }).catch((r) => {
            console.error("Error saving layout after adding row:", r);
          });
        } catch (o) {
          console.error("Error stringifying layout after adding row:", o);
        }
      } catch (t) {
        console.error("Error adding new row:", t), this.updateCanvasData();
      }
    },
    /**
     * Initiates the row deletion process
     * If the row contains elements, shows a confirmation dialog first
     * 
     * @param {Object} row - The row object to be deleted
     */
    deleteRow(t) {
      try {
        if (!t || typeof t != "object" || !t.id) {
          console.error("Invalid row provided for deletion");
          return;
        }
        if (!Array.isArray(t.columns)) {
          console.warn("Row has no columns array, proceeding with deletion"), this.performRowDeletion(t);
          return;
        }
        t.columns.some(
          (o) => o.elements && Array.isArray(o.elements) && o.elements.length > 0
        ) ? (this.rowToDelete = t, this.$dispatch("open-modal", { id: "confirm-row-deletion" })) : this.performRowDeletion(t);
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
      } catch (t) {
        console.error("Error during row deletion confirmation:", t), this.$dispatch("close-modal", { id: "confirm-row-deletion" }), this.rowToDelete = null;
      }
    },
    /**
     * Performs the actual row deletion and reorders remaining rows
     * 
     * @param {Object} row - The row object to be deleted
     */
    performRowDeletion(t) {
      try {
        if (!t || !t.id) {
          console.error("Invalid row provided to performRowDeletion");
          return;
        }
        if (!Alpine.store("rows") || !Array.isArray(Alpine.store("rows").items)) {
          console.error("Rows store not properly initialized");
          return;
        }
        const e = Alpine.store("rows").items.findIndex((o) => o.id === t.id);
        if (e > -1) {
          Alpine.store("rows").items.splice(e, 1), Alpine.store("rows").items = Alpine.store("rows").items.map((o, r) => ({
            ...o,
            order: r
            // Reassign order based on array position
          }));
          try {
            const o = JSON.stringify(Alpine.store("rows").items);
            this.updateCanvasData(), this.$wire.saveLayout(o).then((r) => {
              r && r.success ? console.log("Row deleted and layout saved successfully") : console.warn("Layout saved after deletion but returned unexpected result", r);
            }).catch((r) => {
              console.error("Error saving layout after row deletion:", r);
            });
          } catch (o) {
            console.error("Error stringifying layout after row deletion:", o);
          }
        } else
          console.warn(`Row with id ${t.id} not found in rows store`);
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
    openColumnSettings(t, e) {
      try {
        if (!t || !t.id) {
          console.error("Invalid row provided to openColumnSettings");
          return;
        }
        if (!e || !e.id) {
          console.error("Invalid column provided to openColumnSettings");
          return;
        }
        this.activeRow = t, this.activeColumn = e, this.activeColumn.padding = this.activeColumn.padding || { top: 0, right: 0, bottom: 0, left: 0 }, this.activeColumn.margin = this.activeColumn.margin || { top: 0, right: 0, bottom: 0, left: 0 }, this.activeColumn.customClasses = this.activeColumn.customClasses || "", typeof this.activeColumn.padding == "object" && (this.activeColumn.padding.top = this.safeParseNumber(this.activeColumn.padding.top), this.activeColumn.padding.right = this.safeParseNumber(this.activeColumn.padding.right), this.activeColumn.padding.bottom = this.safeParseNumber(this.activeColumn.padding.bottom), this.activeColumn.padding.left = this.safeParseNumber(this.activeColumn.padding.left)), typeof this.activeColumn.margin == "object" && (this.activeColumn.margin.top = this.safeParseNumber(this.activeColumn.margin.top), this.activeColumn.margin.right = this.safeParseNumber(this.activeColumn.margin.right), this.activeColumn.margin.bottom = this.safeParseNumber(this.activeColumn.margin.bottom), this.activeColumn.margin.left = this.safeParseNumber(this.activeColumn.margin.left));
      } catch (o) {
        console.error("Error opening column settings:", o), this.activeRow = null, this.activeColumn = null;
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
        const t = Alpine.store("rows").items, e = t.findIndex((r) => r.id === this.activeRow.id);
        if (e === -1) {
          console.error(`Row with id ${this.activeRow.id} not found in rows store`), this.$dispatch("close-modal", { id: "column-settings-modal" });
          return;
        }
        const o = t[e].columns.findIndex((r) => r.id === this.activeColumn.id);
        if (o === -1) {
          console.error(`Column with id ${this.activeColumn.id} not found in row`), this.$dispatch("close-modal", { id: "column-settings-modal" });
          return;
        }
        t[e].columns[o] = {
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
          const r = JSON.stringify(t);
          this.updateCanvasData(), this.$wire.saveLayout(r).then((n) => {
            n && n.success ? console.log("Column settings saved successfully") : console.warn("Layout saved but returned unexpected result", n);
          }).catch((n) => {
            console.error("Error saving layout after column settings update:", n);
          }), this.$dispatch("close-modal", { id: "column-settings-modal" });
        } catch (r) {
          console.error("Error stringifying layout after column settings update:", r), this.$dispatch("close-modal", { id: "column-settings-modal" });
        }
      } catch (t) {
        console.error("Error saving column settings:", t), this.$dispatch("close-modal", { id: "column-settings-modal" });
      }
    },
    /**
     * Adds a new column to an existing row
     * Creates a column with default settings and appends it to the row's columns array
     * 
     * @param {Object} row - The row object to add the column to
     */
    addColumn(t) {
      try {
        if (!t || typeof t != "object" || !t.id) {
          console.error("Invalid row provided to addColumn");
          return;
        }
        Array.isArray(t.columns) || (console.warn("Row has no columns array, initializing empty array"), t.columns = []);
        const o = {
          id: Date.now(),
          // Unique identifier for the column
          elements: [],
          // Initialize with no elements
          order: t.columns.length,
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
        }, r = [...t.columns, o];
        t.columns = r, this.$nextTick(() => {
          try {
            const n = Alpine.store("rows").items;
            if (!n || !Array.isArray(n)) {
              console.error("Rows store not properly initialized");
              return;
            }
            if (n.findIndex((s) => s.id === t.id) === -1) {
              console.error(`Row with id ${t.id} not found in rows store`);
              return;
            }
            this.updateCanvasData();
            const i = JSON.stringify(n);
            this.$wire.saveLayout(i).then((s) => {
              s && s.success ? console.log("Column added and layout saved successfully") : console.warn("Layout saved but returned unexpected result", s);
            }).catch((s) => {
              console.error("Error saving layout after adding column:", s);
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
    updateColumns(t) {
      try {
        if (!this.activeRow || typeof this.activeRow != "object") {
          console.error("No active row to update columns for");
          return;
        }
        Array.isArray(this.activeRow.columns) || (console.warn("Active row has no columns array, initializing empty array"), this.activeRow.columns = []);
        const e = parseInt(t);
        if (isNaN(e) || e < 1) {
          console.error(`Invalid column count: ${t}`);
          return;
        }
        const o = this.activeRow.columns;
        if (e > o.length)
          try {
            const r = e - o.length, n = Date.now();
            for (let i = 0; i < r; i++)
              o.push({
                id: n + i,
                // Ensure unique IDs across columns
                elements: [],
                // Start with empty elements array
                order: o.length,
                // Set order based on current position
                width: "w-full",
                // Default width class
                padding: { top: 0, right: 0, bottom: 0, left: 0 },
                margin: { top: 0, right: 0, bottom: 0, left: 0 },
                customClasses: ""
              });
            this.activeRow.columns.forEach((i, s) => {
              i.order = s;
            });
            const l = Alpine.store("rows").items;
            if (!l || !Array.isArray(l)) {
              console.error("Rows store not properly initialized");
              return;
            }
            this.updateCanvasData();
            try {
              const i = JSON.stringify(l);
              this.$wire.saveLayout(i).then((s) => {
                s && s.success ? console.log("Columns added and layout saved successfully") : console.warn("Layout saved but returned unexpected result", s);
              }).catch((s) => {
                console.error("Error saving layout after adding columns:", s);
              });
            } catch (i) {
              console.error("Error stringifying layout after adding columns:", i);
            }
          } catch (r) {
            console.error("Error adding columns:", r);
          }
        else if (e < o.length)
          try {
            this.newColumnCount = e, this.activeRow.columns.slice(e).some(
              (l) => l.elements && Array.isArray(l.elements) && l.elements.length > 0
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
    deleteColumn(t, e) {
      try {
        if (!t || typeof t != "object" || !t.id) {
          console.error("Invalid row provided to deleteColumn");
          return;
        }
        if (e === void 0 || isNaN(parseInt(e))) {
          console.error("Invalid column index provided to deleteColumn");
          return;
        }
        const o = Alpine.store("rows").items;
        if (!o || !Array.isArray(o)) {
          console.error("Rows store not properly initialized");
          return;
        }
        const r = o.findIndex((i) => i.id === t.id);
        if (r === -1) {
          console.error(`Row with id ${t.id} not found in rows store`);
          return;
        }
        if (!Array.isArray(o[r].columns)) {
          console.error(`Row with id ${t.id} has no valid columns array`);
          return;
        }
        if (e < 0 || e >= o[r].columns.length) {
          console.error(`Column index ${e} out of bounds for row with id ${t.id}`);
          return;
        }
        const n = o[r].columns[e];
        n && n.elements && Array.isArray(n.elements) && n.elements.length > 0 ? (this.columnToDeleteRowId = t.id, this.columnToDeleteIndex = e, this.$dispatch("open-modal", { id: "confirm-column-deletion" })) : this.performColumnDeletion(t.id, e);
      } catch (o) {
        console.error("Error during column deletion process:", o), this.columnToDeleteRowId = null, this.columnToDeleteIndex = null;
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
      } catch (t) {
        console.error("Error during column deletion confirmation:", t), this.$dispatch("close-modal", { id: "confirm-column-deletion" }), this.columnToDeleteRowId = null, this.columnToDeleteIndex = null;
      }
    },
    /**
     * Performs the actual column deletion and updates the layout
     * 
     * @param {number|string} rowId - The ID of the row containing the column
     * @param {number} columnIndex - The index of the column to delete
     */
    performColumnDeletion(t, e) {
      try {
        if (t == null) {
          console.error("Invalid rowId provided to performColumnDeletion");
          return;
        }
        if (e == null || isNaN(parseInt(e))) {
          console.error("Invalid columnIndex provided to performColumnDeletion");
          return;
        }
        const o = Alpine.store("rows").items;
        if (!o || !Array.isArray(o)) {
          console.error("Rows store not properly initialized");
          return;
        }
        const r = o.findIndex((n) => n.id === t);
        if (r === -1) {
          console.error(`Row with id ${t} not found in rows store`);
          return;
        }
        if (!Array.isArray(o[r].columns)) {
          console.error(`Row with id ${t} has no valid columns array`);
          return;
        }
        if (e < 0 || e >= o[r].columns.length) {
          console.error(`Column index ${e} out of bounds for row with id ${t}`);
          return;
        }
        if (o[r].columns.length === 1) {
          const n = Date.now();
          o[r].columns = [{
            id: o[r].columns[0].id,
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
          o[r].columns.splice(e, 1), o[r].columns = o[r].columns.map((n, l) => ({
            ...n,
            order: l
            // Reassign order based on array position
          }));
        this.updateCanvasData();
        try {
          const n = JSON.stringify(o);
          this.$wire.saveLayout(n).then((l) => {
            l && l.success ? console.log("Layout updated and saved successfully") : console.warn("Layout saved but returned unexpected result", l);
          }).catch((l) => {
            console.error("Error saving layout after column operation:", l);
          });
        } catch (n) {
          console.error("Error stringifying layout after column operation:", n);
        }
      } catch (o) {
        console.error("Error performing column deletion:", o), this.updateCanvasData();
      }
    },
    /**
     * Sets the active column for adding elements
     * 
     * @param {Object} row - The parent row object
     * @param {number} index - The index of the column to set as active
     */
    setActiveColumn(t, e) {
      try {
        if (!t || typeof t != "object" || !t.id) {
          console.error("Invalid row provided to setActiveColumn");
          return;
        }
        if (e == null || isNaN(parseInt(e))) {
          console.error("Invalid column index provided to setActiveColumn");
          return;
        }
        const o = Alpine.store("rows").items;
        if (!o || !Array.isArray(o)) {
          console.error("Rows store not properly initialized");
          return;
        }
        const r = o.find((l) => l.id === t.id);
        if (!r) {
          console.error(`Row with id ${t.id} not found in rows store`);
          return;
        }
        if (e < 0 || e >= r.columns.length) {
          console.error(`Column index ${e} out of bounds for row with id ${t.id}`);
          return;
        }
        const n = r.columns[e];
        if (n.elements && Array.isArray(n.elements) && n.elements.length > 0) {
          console.warn("Column already has an element. Only one element per column is allowed.");
          return;
        }
        this.activeRow = r, this.activeColumnIndex = e, this.$dispatch("open-modal", { id: "element-picker-modal" });
      } catch (o) {
        console.error("Error setting active column:", o), this.activeRow = null, this.activeColumnIndex = null;
      }
    },
    /**
     * Adds a new element to the active column
     * 
     * @param {string} elementType - The type of element to add
     */
    addElement(t) {
      try {
        if (!t || typeof t != "string") {
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
        const o = e.findIndex((s) => s.id === this.activeRow.id);
        if (o === -1) {
          console.error(`Row with id ${this.activeRow.id} not found in rows store`), this.$dispatch("close-modal", { id: "element-picker-modal" });
          return;
        }
        const r = e[o];
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
        const l = t.replace(/Filamentor/, "\\Filamentor\\").replace(/Elements/, "Elements\\");
        let i = {};
        l.includes("Text") ? i = { text: "" } : l.includes("Image") ? i = { url: null, alt: "", thumbnail: null } : l.includes("Video") && (i = { url: "" }), e[o].columns[this.activeColumnIndex].elements.push({
          id: Date.now(),
          // Add unique ID for the element
          type: l,
          content: i
        }), this.updateCanvasData();
        try {
          const s = JSON.stringify(e);
          this.$wire.saveLayout(s).then((c) => {
            c && c.success ? console.log("Element added and layout saved successfully") : console.warn("Layout saved but returned unexpected result", c);
          }).catch((c) => {
            console.error("Error saving layout after adding element:", c);
          });
        } catch (s) {
          console.error("Error stringifying layout after adding element:", s);
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
    editElement(t, e, o = 0) {
      try {
        if (!t || typeof t != "object" || !t.id) {
          console.error("Invalid row provided to editElement");
          return;
        }
        if (e == null || isNaN(parseInt(e))) {
          console.error("Invalid column index provided to editElement");
          return;
        }
        if (o == null || isNaN(parseInt(o))) {
          console.error("Invalid element index provided to editElement");
          return;
        }
        const r = Alpine.store("rows").items;
        if (!r || !Array.isArray(r)) {
          console.error("Rows store not properly initialized");
          return;
        }
        const n = r.find((a) => a.id === t.id);
        if (!n) {
          console.error(`Row with id ${t.id} not found in rows store`);
          return;
        }
        if (!Array.isArray(n.columns) || e >= n.columns.length) {
          console.error(`Column index ${e} out of bounds for row with id ${t.id}`);
          return;
        }
        const l = n.columns[e];
        if (!Array.isArray(l.elements) || l.elements.length === 0) {
          console.error(`No elements found in column ${e} of row with id ${t.id}`);
          return;
        }
        if (o >= l.elements.length) {
          console.error(`Element index ${o} out of bounds for column ${e}`);
          return;
        }
        const i = l.elements[o];
        if (!i || !i.type) {
          console.error(`Invalid element at index ${o}`);
          return;
        }
        this.activeRow = n, this.activeColumnIndex = e, this.activeElementIndex = o, this.activeElement = i;
        const s = i.type;
        if (!s) {
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
          if (s.includes("Text")) {
            const a = i.content && typeof i.content.text < "u" ? i.content.text : "";
            this.$wire.set("elementData.text.content", a);
          } else if (s.includes("Image")) {
            const a = {
              url: i.content && i.content.url ? i.content.url : null,
              alt: i.content && i.content.alt ? i.content.alt : "",
              thumbnail: i.content && i.content.thumbnail ? i.content.thumbnail : null
            };
            this.$wire.set("elementData.image", a);
          } else if (s.includes("Video")) {
            const a = i.content && i.content.url ? i.content.url : "";
            this.$wire.set("elementData.video.url", a);
          } else
            console.warn(`Unknown element type: ${s}`);
        } catch (a) {
          console.error("Error setting element data:", a);
          return;
        }
        try {
          this.$wire.editElement(s, i.content || {}, i.id).catch((a) => {
            console.error("Error in Livewire editElement method:", a);
          });
        } catch (a) {
          console.error("Error calling Livewire editElement method:", a);
          return;
        }
        const c = s.split("\\").pop() || "Unknown";
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
    saveElementContent(t) {
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
        const o = e.findIndex((s) => s.id === this.activeRow.id);
        if (o === -1) {
          console.error(`Row with id ${this.activeRow.id} not found in rows store`), this.$dispatch("close-modal", { id: "element-editor-modal" });
          return;
        }
        const r = e[o];
        if (!Array.isArray(r.columns) || this.activeColumnIndex >= r.columns.length) {
          console.error(`Column index ${this.activeColumnIndex} out of bounds for row with id ${r.id}`), this.$dispatch("close-modal", { id: "element-editor-modal" });
          return;
        }
        const n = r.columns[this.activeColumnIndex];
        if (!Array.isArray(n.elements) || this.activeElementIndex >= n.elements.length) {
          console.error(`Element index ${this.activeElementIndex} out of bounds for column ${this.activeColumnIndex}`), this.$dispatch("close-modal", { id: "element-editor-modal" });
          return;
        }
        const l = this.activeElement.type, i = () => {
          try {
            const s = JSON.stringify(e);
            this.$wire.saveLayout(s).then((c) => {
              c && c.success ? console.log("Element content updated and layout saved successfully") : console.warn("Layout saved but returned unexpected result", c), this.$dispatch("close-modal", { id: "element-editor-modal" });
            }).catch((c) => {
              console.error("Error saving layout after updating element content:", c), this.$dispatch("close-modal", { id: "element-editor-modal" });
            });
          } catch (s) {
            console.error("Error processing layout data:", s), this.$dispatch("close-modal", { id: "element-editor-modal" });
          }
        };
        if (l.includes("Image")) {
          const s = this.$wire.get("elementData.image.alt") || "";
          this.$wire.uploadMedia().then((c) => {
            if (c && c.url)
              e[o].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
                ...this.activeElement,
                content: {
                  url: c.url,
                  thumbnail: c.thumbnail,
                  alt: s
                  // Use the alt text we captured earlier
                }
              };
            else {
              const a = this.activeElement.content || {};
              e[o].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
                ...this.activeElement,
                content: {
                  url: a.url || "",
                  thumbnail: a.thumbnail || "",
                  alt: s
                  // Update only the alt text
                }
              };
            }
            i();
          }).catch((c) => {
            console.error("Error during image processing:", c);
            try {
              const a = this.activeElement.content || {};
              e[o].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
                ...this.activeElement,
                content: {
                  url: a.url || "",
                  thumbnail: a.thumbnail || "",
                  alt: s
                }
              }, i();
            } catch (a) {
              console.error("Error saving alt text after upload failure:", a), this.$dispatch("close-modal", { id: "element-editor-modal" });
            }
          });
        } else if (l.includes("Video"))
          try {
            const s = this.$wire.get("elementData.video.url");
            s || console.warn("Empty video URL provided"), e[o].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
              ...this.activeElement,
              content: {
                url: s || ""
              }
            }, i();
          } catch (s) {
            console.error("Error updating video element:", s), this.$dispatch("close-modal", { id: "element-editor-modal" });
          }
        else if (l.includes("Text"))
          try {
            const s = this.$wire.get("elementData.text.content");
            e[o].columns[this.activeColumnIndex].elements[this.activeElementIndex] = {
              ...this.activeElement,
              content: {
                text: s || ""
              }
            }, i();
          } catch (s) {
            console.error("Error updating text element:", s), this.$dispatch("close-modal", { id: "element-editor-modal" });
          }
        else
          console.error(`Unknown element type: ${l}`), this.$dispatch("close-modal", { id: "element-editor-modal" });
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
    deleteElement(t, e, o = 0) {
      try {
        if (!t || typeof t != "object" || !t.id) {
          console.error("Invalid row provided to deleteElement");
          return;
        }
        if (e == null || isNaN(parseInt(e))) {
          console.error("Invalid column index provided to deleteElement");
          return;
        }
        if (o == null || isNaN(parseInt(o))) {
          console.error("Invalid element index provided to deleteElement");
          return;
        }
        const r = Alpine.store("rows").items;
        if (!r || !Array.isArray(r)) {
          console.error("Rows store not properly initialized");
          return;
        }
        const n = r.findIndex((i) => i.id === t.id);
        if (n === -1) {
          console.error(`Row with id ${t.id} not found in rows store`);
          return;
        }
        if (!Array.isArray(r[n].columns) || e >= r[n].columns.length) {
          console.error(`Column index ${e} out of bounds for row with id ${t.id}`);
          return;
        }
        const l = r[n].columns[e];
        if (!Array.isArray(l.elements)) {
          console.error(`Column ${e} has no elements array`);
          return;
        }
        if (o >= l.elements.length) {
          console.error(`Element index ${o} out of bounds for column ${e}`);
          return;
        }
        r[n].columns[e].elements.splice(o, 1), this.updateCanvasData();
        try {
          const i = JSON.stringify(r);
          this.$wire.saveLayout(i).then((s) => {
            s && s.success ? console.log("Element deleted and layout saved successfully") : console.warn("Layout saved after element deletion but returned unexpected result", s);
          }).catch((s) => {
            console.error("Error saving layout after element deletion:", s);
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
        const t = Alpine.store("rows").items;
        if (!t) {
          console.error("Rows store is not properly initialized");
          return;
        }
        let e;
        try {
          e = JSON.stringify(t);
        } catch (o) {
          console.error("Error converting layout data to JSON:", o);
          return;
        }
        if (this.$refs.canvasData)
          try {
            this.$refs.canvasData.value = e;
          } catch (o) {
            console.error("Error updating canvas data reference:", o);
          }
        else
          console.warn("Canvas data reference not found in DOM");
        try {
          this.$wire.set("data.layout", e).catch((o) => {
            console.error("Error updating Livewire data.layout property:", o);
          });
        } catch (o) {
          console.error("Error calling Livewire set method:", o);
        }
        console.log("Canvas data updated successfully");
      } catch (t) {
        console.error("Unexpected error in updateCanvasData:", t);
      }
    },
    // Helper function to safely parse numbers
    safeParseNumber(t) {
      try {
        const e = Number(t);
        return isNaN(e) ? 0 : e;
      } catch {
        return 0;
      }
    }
  }));
});

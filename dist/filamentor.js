document.addEventListener("alpine:init", () => {
  Alpine.store("rows", {
    items: [],
    init() {
      console.log("Store initialized");
    },
    setRows(i) {
      this.items = i, console.log("Rows set in store:", this.items);
    },
    getColumn(i, e) {
      var t;
      return ((t = this.items[i]) == null ? void 0 : t.columns[e]) || {};
    },
    getColumns(i) {
      var e;
      return ((e = this.items[i]) == null ? void 0 : e.columns) || [];
    },
    reorderRows(i) {
      if (!i || typeof i.newIndex > "u" || typeof i.oldIndex > "u")
        return this.items;
      console.log("Before reorder:", [...this.items]);
      const e = i.newIndex, t = i.oldIndex;
      let o = [...this.items];
      const n = o.splice(t, 1)[0];
      return o.splice(e, 0, n), o.forEach((s, r) => {
        s.order = r;
      }), this.items = o, console.log("After reorder:", this.items), this.items;
    },
    reorderColumns({ sourceRowId: i, targetRowId: e, oldIndex: t, newIndex: o }) {
      const n = [...this.items], s = n.find((d) => d.id === parseInt(i)), r = n.find((d) => d.id === parseInt(e)), [a] = s.columns.splice(t, 1);
      return r.columns.splice(o, 0, a), this.items = n, n;
    }
  });
});
function c(i) {
  return {
    handleDragStart(e, t) {
      e.dataTransfer.setData("text/plain", t.id), e.target.classList.add("dragging");
    },
    handleDragOver(e) {
      e.preventDefault();
      const t = e.target.closest(".bg-gray-50");
      t && (document.querySelectorAll(".drop-target").forEach((o) => {
        o.classList.remove("drop-target");
      }), t.classList.add("drop-target"));
    },
    handleDragEnd(e) {
      e.target.classList.remove("dragging"), document.querySelectorAll(".drop-target").forEach((t) => {
        t.classList.remove("drop-target");
      });
    },
    handleDrop(e, t) {
      e.preventDefault(), document.querySelectorAll(".dragging, .drop-target").forEach((l) => {
        l.classList.remove("dragging", "drop-target");
      });
      const o = e.dataTransfer.getData("text/plain"), n = Alpine.store("rows").items, s = n.findIndex((l) => l.id.toString() === o), r = n.findIndex((l) => l.id === t.id), a = Alpine.store("rows").reorderRows({
        newIndex: r,
        oldIndex: s
      });
      window.Livewire.find(
        document.querySelector("[wire\\:id]").getAttribute("wire:id")
      ).saveLayout(JSON.stringify(a));
    },
    handleColumnDragStart(e, t, o) {
      e.stopPropagation(), e.dataTransfer.setData("text/plain", JSON.stringify({
        columnId: t.id,
        rowId: o.id
      })), e.target.classList.add("dragging-column");
    },
    handleColumnDragOver(e) {
      e.stopPropagation(), e.preventDefault();
      const t = e.target.closest('[draggable="true"]');
      t && !t.classList.contains("dragging-column") && (document.querySelectorAll(".drop-target-column").forEach((o) => {
        o.classList.remove("drop-target-column");
      }), t.classList.add("drop-target-column"));
    },
    handleColumnDragEnd(e) {
      e.stopPropagation(), document.querySelectorAll(".dragging-column, .drop-target-column").forEach((t) => {
        t.classList.remove("dragging-column", "drop-target-column");
      });
    },
    handleColumnDrop(e, t, o) {
      e.stopPropagation(), e.preventDefault();
      const n = JSON.parse(e.dataTransfer.getData("text/plain"));
      if (n.rowId !== o.id) return;
      const s = o.columns.findIndex((l) => l.id === n.columnId), r = o.columns.findIndex((l) => l.id === t.id), a = Alpine.store("rows").reorderColumns({
        sourceRowId: o.id,
        targetRowId: o.id,
        oldIndex: s,
        newIndex: r
      });
      window.Livewire.find(
        document.querySelector("[wire\\:id]").getAttribute("wire:id")
      ).saveLayout(JSON.stringify(a));
    }
  };
}
console.log("Filamentor loaded!");
window.addEventListener("alpine:init", () => {
  console.log("Alpine init event fired!"), Alpine.data("filamentor", () => (console.log("Component definition called"), {
    showSettings: !1,
    activeRow: null,
    activeColumn: null,
    activeColumnIndex: null,
    activeElement: null,
    activeElementIndex: null,
    rowToDelete: null,
    elementData: {
      text: { content: null },
      image: { url: null, alt: null, thumbnail: null },
      video: { url: null }
    },
    ...c(),
    init() {
      const i = this.$refs.canvasData.value;
      if (i) {
        const e = JSON.parse(i).sort((t, o) => t.order - o.order);
        Alpine.store("rows").setRows(e);
      }
    },
    openRowSettings(i) {
      this.activeRow = Alpine.store("rows").items.find((e) => e.id === i.id), this.activeRow.padding || (this.activeRow.padding = { top: 0, right: 0, bottom: 0, left: 0 }), this.activeRow.margin || (this.activeRow.margin = { top: 0, right: 0, bottom: 0, left: 0 }), this.activeRow.customClasses || (this.activeRow.customClasses = ""), this.showSettings = !0;
    },
    saveRowSettings() {
      if (!this.activeRow) return;
      console.log("Saving row settings:", this.activeRow);
      const i = Alpine.store("rows").items.findIndex((t) => t.id === this.activeRow.id);
      console.log("Found Index:", i), Alpine.store("rows").items[i] = {
        ...this.activeRow,
        padding: {
          top: Number(this.activeRow.padding.top) || 0,
          right: Number(this.activeRow.padding.right) || 0,
          bottom: Number(this.activeRow.padding.bottom) || 0,
          left: Number(this.activeRow.padding.left) || 0
        },
        margin: {
          top: Number(this.activeRow.margin.top) || 0,
          right: Number(this.activeRow.margin.right) || 0,
          bottom: Number(this.activeRow.margin.bottom) || 0,
          left: Number(this.activeRow.margin.left) || 0
        }
      };
      const e = JSON.stringify(Alpine.store("rows").items);
      console.log("Layout Data:", e), this.$refs.canvasData.value = e, this.$wire.saveLayout(e);
    },
    addRow() {
      console.log("Adding new row");
      const i = {
        id: Date.now(),
        order: Alpine.store("rows").items.length,
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        margin: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        customClasses: "",
        columns: [{
          id: Date.now() + 1,
          width: "w-full",
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          },
          customClasses: "",
          elements: [],
          order: 0
        }]
      };
      Alpine.store("rows").items.push(i), this.updateCanvasData(), this.$wire.saveLayout(JSON.stringify(Alpine.store("rows").items));
    },
    deleteRow(i) {
      i.columns.some((t) => t.elements && t.elements.length > 0) ? (this.rowToDelete = i, this.$dispatch("open-modal", { id: "confirm-row-deletion" })) : this.performRowDeletion(i);
    },
    confirmRowDeletion() {
      this.performRowDeletion(this.rowToDelete), this.$dispatch("close-modal", { id: "confirm-row-deletion" }), this.rowToDelete = null;
    },
    performRowDeletion(i) {
      const e = Alpine.store("rows").items.findIndex((t) => t.id === i.id);
      e > -1 && (Alpine.store("rows").items.splice(e, 1), Alpine.store("rows").items = Alpine.store("rows").items.map((t, o) => ({
        ...t,
        order: o
      })), this.$wire.saveLayout(JSON.stringify(Alpine.store("rows").items)));
    },
    openColumnSettings(i, e) {
      this.activeRow = i, this.activeColumn = e, this.activeColumn.padding || (this.activeColumn.padding = { top: 0, right: 0, bottom: 0, left: 0 }), this.activeColumn.margin || (this.activeColumn.margin = { top: 0, right: 0, bottom: 0, left: 0 }), this.activeColumn.customClasses || (this.activeColumn.customClasses = "");
    },
    saveColumnSettings() {
      if (!this.activeColumn) return;
      const i = Alpine.store("rows").items, e = i.findIndex((o) => o.id === this.activeRow.id), t = i[e].columns.findIndex((o) => o.id === this.activeColumn.id);
      i[e].columns[t] = {
        ...this.activeColumn,
        padding: {
          top: Number(this.activeColumn.padding.top) || 0,
          right: Number(this.activeColumn.padding.right) || 0,
          bottom: Number(this.activeColumn.padding.bottom) || 0,
          left: Number(this.activeColumn.padding.left) || 0
        },
        margin: {
          top: Number(this.activeColumn.margin.top) || 0,
          right: Number(this.activeColumn.margin.right) || 0,
          bottom: Number(this.activeColumn.margin.bottom) || 0,
          left: Number(this.activeColumn.margin.left) || 0
        }
      }, this.$wire.saveLayout(JSON.stringify(i)), this.$dispatch("close-modal", { id: "column-settings-modal" });
    },
    addColumn(i) {
      const e = {
        id: Date.now(),
        elements: [],
        order: i.columns.length,
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        customClasses: ""
      }, t = [...i.columns, e];
      i.columns = t, this.$nextTick(() => {
        const o = Alpine.store("rows").items;
        this.$wire.saveLayout(JSON.stringify(o));
      });
    },
    updateColumns(i) {
      i = parseInt(i);
      const e = this.activeRow.columns;
      if (i > e.length) {
        const t = i - e.length;
        for (let n = 0; n < t; n++)
          e.push({
            id: Date.now() + n,
            elements: [],
            order: e.length,
            padding: { top: 0, right: 0, bottom: 0, left: 0 },
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
            customClasses: ""
          });
        this.activeRow.columns.forEach((n, s) => {
          n.order = s;
        });
        const o = Alpine.store("rows").items;
        this.$wire.saveLayout(JSON.stringify(o));
      } else
        this.newColumnCount = i, this.$dispatch("open-modal", { id: "confirm-column-reduction" });
    },
    deleteColumn(i, e) {
      const t = Alpine.store("rows").items, o = t.findIndex((n) => n.id === i.id);
      t[o].columns.splice(e, 1), this.$wire.saveLayout(JSON.stringify(t));
    },
    setActiveColumn(i, e) {
      this.activeRow = Alpine.store("rows").items.find((t) => t.id === i.id), this.activeColumnIndex = e, this.$dispatch("open-modal", { id: "element-picker-modal" });
    },
    addElement(i) {
      if (this.activeRow && this.activeColumnIndex !== null) {
        const e = i.replace(/Filamentor/, "\\Filamentor\\").replace(/Elements/, "Elements\\");
        let t = {};
        e.includes("Text") ? t = { text: "" } : e.includes("Image") ? t = { url: null, alt: "", thumbnail: null } : e.includes("Video") && (t = { url: "" });
        const o = Alpine.store("rows").items.findIndex((n) => n.id === this.activeRow.id);
        o > -1 && (Alpine.store("rows").items[o].columns[this.activeColumnIndex].elements.push({
          id: Date.now(),
          // Add unique ID for the element
          type: e,
          content: t
        }), this.$wire.saveLayout(JSON.stringify(Alpine.store("rows").items)), this.$dispatch("close-modal", { id: "element-picker-modal" }));
      }
    },
    editElement(i, e, t = 0) {
      var r, a, d, l;
      const o = Alpine.store("rows").items.find((m) => m.id === i.id);
      if (!o || !o.columns[e].elements.length)
        return;
      const n = o.columns[e].elements[t];
      console.log("Element being edited:", n), console.log("Element type:", n.type), console.log("Element content:", n.content), this.activeRow = o, this.activeColumnIndex = e, this.activeElementIndex = t, this.activeElement = n, this.$wire.set("elementData", {
        text: { content: null },
        image: { url: null, alt: null, thumbnail: null },
        video: { url: null }
      });
      const s = n.type;
      s.includes("Text") ? this.$wire.set("elementData.text.content", n.content.text || "") : s.includes("Image") ? this.$wire.set("elementData.image", {
        url: ((r = n.content) == null ? void 0 : r.url) || null,
        alt: ((a = n.content) == null ? void 0 : a.alt) || "",
        thumbnail: ((d = n.content) == null ? void 0 : d.thumbnail) || null
      }) : s.includes("Video") && this.$wire.set("elementData.video.url", ((l = n.content) == null ? void 0 : l.url) || ""), this.$wire.editElement(s, n.content, n.id), this.$dispatch("open-modal", {
        id: "element-editor-modal",
        title: `Edit ${s.split("\\").pop()} Element`
      });
    },
    saveElementContent(i) {
      if (!this.activeElement) return;
      const e = Alpine.store("rows").items.findIndex((t) => t.id === this.activeRow.id);
      if (e !== -1)
        if (this.activeElement.type.includes("Image"))
          this.$wire.uploadMedia().then((t) => {
            const o = this.activeElementIndex || 0;
            Alpine.store("rows").items[e].columns[this.activeColumnIndex].elements[o] = {
              ...this.activeElement,
              content: {
                url: t.url,
                thumbnail: t.thumbnail,
                alt: this.$wire.get("elementData.image.alt") || ""
              }
            }, this.$wire.saveLayout(JSON.stringify(Alpine.store("rows").items)), this.$dispatch("close-modal", { id: "element-editor-modal" });
          });
        else if (this.activeElement.type.includes("Video")) {
          const t = this.activeElementIndex || 0;
          Alpine.store("rows").items[e].columns[this.activeColumnIndex].elements[t] = {
            ...this.activeElement,
            content: {
              url: this.$wire.get("elementData.video.url")
            }
          }, this.$wire.saveLayout(JSON.stringify(Alpine.store("rows").items)), this.$dispatch("close-modal", { id: "element-editor-modal" });
        } else {
          const t = this.activeElementIndex || 0;
          Alpine.store("rows").items[e].columns[this.activeColumnIndex].elements[t] = {
            ...this.activeElement,
            content: {
              text: this.$wire.get("elementData.text.content")
            }
          }, this.$wire.saveLayout(JSON.stringify(Alpine.store("rows").items)), this.$dispatch("close-modal", { id: "element-editor-modal" });
        }
    },
    deleteElement(i, e, t = 0) {
      const o = Alpine.store("rows").items.findIndex((n) => n.id === i.id);
      o !== -1 && (Alpine.store("rows").items[o].columns[e].elements.splice(t, 1), this.$wire.saveLayout(JSON.stringify(Alpine.store("rows").items)));
    },
    updateCanvasData() {
      const i = JSON.stringify(Alpine.store("rows").items);
      this.$refs.canvasData.value = i, this.$wire.set("data.layout", i);
    }
  }));
});

document.addEventListener("alpine:init", () => {
  Alpine.store("rows", {
    items: [],
    init() {
    },
    setRows(i) {
      this.items = i;
    },
    getColumn(i, t) {
      var e;
      return ((e = this.items[i]) == null ? void 0 : e.columns[t]) || {};
    },
    getColumns(i) {
      var t;
      return ((t = this.items[i]) == null ? void 0 : t.columns) || [];
    },
    reorderRows(i) {
      if (!i || typeof i.newIndex > "u" || typeof i.oldIndex > "u")
        return this.items;
      const t = i.newIndex, e = i.oldIndex;
      let s = [...this.items];
      const n = s.splice(e, 1)[0];
      return s.splice(t, 0, n), s.forEach((o, r) => {
        o.order = r;
      }), this.items = s, this.items;
    },
    reorderColumns({ sourceRowId: i, targetRowId: t, oldIndex: e, newIndex: s }) {
      const n = [...this.items], o = n.find((d) => d.id === parseInt(i)), r = n.find((d) => d.id === parseInt(t)), [a] = o.columns.splice(e, 1);
      return r.columns.splice(s, 0, a), this.items = n, n;
    }
  });
});
function c(i) {
  return {
    handleDragStart(t, e) {
      t.dataTransfer.setData("text/plain", e.id), t.target.classList.add("dragging");
    },
    handleDragOver(t) {
      t.preventDefault();
      const e = t.target.closest(".bg-gray-50");
      e && (document.querySelectorAll(".drop-target").forEach((s) => {
        s.classList.remove("drop-target");
      }), e.classList.add("drop-target"));
    },
    handleDragEnd(t) {
      t.target.classList.remove("dragging"), document.querySelectorAll(".drop-target").forEach((e) => {
        e.classList.remove("drop-target");
      });
    },
    handleDrop(t, e) {
      t.preventDefault(), document.querySelectorAll(".dragging, .drop-target").forEach((l) => {
        l.classList.remove("dragging", "drop-target");
      });
      const s = t.dataTransfer.getData("text/plain"), n = Alpine.store("rows").items, o = n.findIndex((l) => l.id.toString() === s), r = n.findIndex((l) => l.id === e.id), a = Alpine.store("rows").reorderRows({
        newIndex: r,
        oldIndex: o
      });
      window.Livewire.find(
        document.querySelector("[wire\\:id]").getAttribute("wire:id")
      ).saveLayout(JSON.stringify(a));
    },
    handleColumnDragStart(t, e, s) {
      t.stopPropagation(), t.dataTransfer.setData("text/plain", JSON.stringify({
        columnId: e.id,
        rowId: s.id
      })), t.target.classList.add("dragging-column");
    },
    handleColumnDragOver(t) {
      t.stopPropagation(), t.preventDefault();
      const e = t.target.closest('[draggable="true"]');
      e && !e.classList.contains("dragging-column") && (document.querySelectorAll(".drop-target-column").forEach((s) => {
        s.classList.remove("drop-target-column");
      }), e.classList.add("drop-target-column"));
    },
    handleColumnDragEnd(t) {
      t.stopPropagation(), document.querySelectorAll(".dragging-column, .drop-target-column").forEach((e) => {
        e.classList.remove("dragging-column", "drop-target-column");
      });
    },
    handleColumnDrop(t, e, s) {
      t.stopPropagation(), t.preventDefault();
      const n = JSON.parse(t.dataTransfer.getData("text/plain"));
      if (n.rowId !== s.id) return;
      const o = s.columns.findIndex((l) => l.id === n.columnId), r = s.columns.findIndex((l) => l.id === e.id), a = Alpine.store("rows").reorderColumns({
        sourceRowId: s.id,
        targetRowId: s.id,
        oldIndex: o,
        newIndex: r
      });
      window.Livewire.find(
        document.querySelector("[wire\\:id]").getAttribute("wire:id")
      ).saveLayout(JSON.stringify(a));
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
    elementData: {
      text: { content: null },
      image: { url: null, alt: null, thumbnail: null },
      video: { url: null }
    },
    ...c(),
    init() {
      const i = this.$refs.canvasData.value;
      if (i) {
        const t = JSON.parse(i).sort((e, s) => e.order - s.order);
        Alpine.store("rows").setRows(t);
      }
    },
    openRowSettings(i) {
      this.activeRow = Alpine.store("rows").items.find((t) => t.id === i.id), this.activeRow.padding || (this.activeRow.padding = { top: 0, right: 0, bottom: 0, left: 0 }), this.activeRow.margin || (this.activeRow.margin = { top: 0, right: 0, bottom: 0, left: 0 }), this.activeRow.customClasses || (this.activeRow.customClasses = ""), this.showSettings = !0;
    },
    saveRowSettings() {
      if (!this.activeRow) return;
      const i = Alpine.store("rows").items.findIndex((e) => e.id === this.activeRow.id);
      Alpine.store("rows").items[i] = {
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
      const t = JSON.stringify(Alpine.store("rows").items);
      this.$refs.canvasData.value = t, this.$wire.saveLayout(t);
    },
    addRow() {
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
      i.columns.some((e) => e.elements && e.elements.length > 0) ? (this.rowToDelete = i, this.$dispatch("open-modal", { id: "confirm-row-deletion" })) : this.performRowDeletion(i);
    },
    confirmRowDeletion() {
      this.performRowDeletion(this.rowToDelete), this.$dispatch("close-modal", { id: "confirm-row-deletion" }), this.rowToDelete = null;
    },
    performRowDeletion(i) {
      const t = Alpine.store("rows").items.findIndex((e) => e.id === i.id);
      t > -1 && (Alpine.store("rows").items.splice(t, 1), Alpine.store("rows").items = Alpine.store("rows").items.map((e, s) => ({
        ...e,
        order: s
      })), this.$wire.saveLayout(JSON.stringify(Alpine.store("rows").items)));
    },
    openColumnSettings(i, t) {
      this.activeRow = i, this.activeColumn = t, this.activeColumn.padding || (this.activeColumn.padding = { top: 0, right: 0, bottom: 0, left: 0 }), this.activeColumn.margin || (this.activeColumn.margin = { top: 0, right: 0, bottom: 0, left: 0 }), this.activeColumn.customClasses || (this.activeColumn.customClasses = "");
    },
    saveColumnSettings() {
      if (!this.activeColumn) return;
      const i = Alpine.store("rows").items, t = i.findIndex((s) => s.id === this.activeRow.id), e = i[t].columns.findIndex((s) => s.id === this.activeColumn.id);
      i[t].columns[e] = {
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
      const t = {
        id: Date.now(),
        elements: [],
        order: i.columns.length,
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
        customClasses: ""
      }, e = [...i.columns, t];
      i.columns = e, this.$nextTick(() => {
        const s = Alpine.store("rows").items;
        this.$wire.saveLayout(JSON.stringify(s));
      });
    },
    updateColumns(i) {
      i = parseInt(i);
      const t = this.activeRow.columns;
      if (i > t.length) {
        const e = i - t.length;
        for (let n = 0; n < e; n++)
          t.push({
            id: Date.now() + n,
            elements: [],
            order: t.length,
            padding: { top: 0, right: 0, bottom: 0, left: 0 },
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
            customClasses: ""
          });
        this.activeRow.columns.forEach((n, o) => {
          n.order = o;
        });
        const s = Alpine.store("rows").items;
        this.$wire.saveLayout(JSON.stringify(s));
      } else
        this.newColumnCount = i, this.$dispatch("open-modal", { id: "confirm-column-reduction" });
    },
    deleteColumn(i, t) {
      const e = Alpine.store("rows").items, s = e.findIndex((n) => n.id === i.id);
      e[s].columns.splice(t, 1), this.$wire.saveLayout(JSON.stringify(e));
    },
    setActiveColumn(i, t) {
      this.activeRow = Alpine.store("rows").items.find((e) => e.id === i.id), this.activeColumnIndex = t, this.$dispatch("open-modal", { id: "element-picker-modal" });
    },
    addElement(i) {
      if (this.activeRow && this.activeColumnIndex !== null) {
        const t = i.replace(/Filamentor/, "\\Filamentor\\").replace(/Elements/, "Elements\\");
        let e = {};
        t.includes("Text") ? e = { text: "" } : t.includes("Image") ? e = { url: null, alt: "", thumbnail: null } : t.includes("Video") && (e = { url: "" });
        const s = Alpine.store("rows").items.findIndex((n) => n.id === this.activeRow.id);
        s > -1 && (Alpine.store("rows").items[s].columns[this.activeColumnIndex].elements.push({
          id: Date.now(),
          // Add unique ID for the element
          type: t,
          content: e
        }), this.$wire.saveLayout(JSON.stringify(Alpine.store("rows").items)), this.$dispatch("close-modal", { id: "element-picker-modal" }));
      }
    },
    editElement(i, t, e = 0) {
      var r, a, d, l;
      const s = Alpine.store("rows").items.find((m) => m.id === i.id);
      if (!s || !s.columns[t].elements.length)
        return;
      const n = s.columns[t].elements[e];
      this.activeRow = s, this.activeColumnIndex = t, this.activeElementIndex = e, this.activeElement = n, this.$wire.set("elementData", {
        text: { content: null },
        image: { url: null, alt: null, thumbnail: null },
        video: { url: null }
      });
      const o = n.type;
      o.includes("Text") ? this.$wire.set("elementData.text.content", n.content.text || "") : o.includes("Image") ? this.$wire.set("elementData.image", {
        url: ((r = n.content) == null ? void 0 : r.url) || null,
        alt: ((a = n.content) == null ? void 0 : a.alt) || "",
        thumbnail: ((d = n.content) == null ? void 0 : d.thumbnail) || null
      }) : o.includes("Video") && this.$wire.set("elementData.video.url", ((l = n.content) == null ? void 0 : l.url) || ""), this.$wire.editElement(o, n.content, n.id), this.$dispatch("open-modal", {
        id: "element-editor-modal",
        title: `Edit ${o.split("\\").pop()} Element`
      });
    },
    saveElementContent(i) {
      if (!this.activeElement) return;
      const t = Alpine.store("rows").items.findIndex((e) => e.id === this.activeRow.id);
      if (t !== -1)
        if (this.activeElement.type.includes("Image"))
          this.$wire.uploadMedia().then((e) => {
            const s = this.activeElementIndex || 0;
            Alpine.store("rows").items[t].columns[this.activeColumnIndex].elements[s] = {
              ...this.activeElement,
              content: {
                url: e.url,
                thumbnail: e.thumbnail,
                alt: this.$wire.get("elementData.image.alt") || ""
              }
            }, this.$wire.saveLayout(JSON.stringify(Alpine.store("rows").items)), this.$dispatch("close-modal", { id: "element-editor-modal" });
          });
        else if (this.activeElement.type.includes("Video")) {
          const e = this.activeElementIndex || 0;
          Alpine.store("rows").items[t].columns[this.activeColumnIndex].elements[e] = {
            ...this.activeElement,
            content: {
              url: this.$wire.get("elementData.video.url")
            }
          }, this.$wire.saveLayout(JSON.stringify(Alpine.store("rows").items)), this.$dispatch("close-modal", { id: "element-editor-modal" });
        } else {
          const e = this.activeElementIndex || 0;
          Alpine.store("rows").items[t].columns[this.activeColumnIndex].elements[e] = {
            ...this.activeElement,
            content: {
              text: this.$wire.get("elementData.text.content")
            }
          }, this.$wire.saveLayout(JSON.stringify(Alpine.store("rows").items)), this.$dispatch("close-modal", { id: "element-editor-modal" });
        }
    },
    deleteElement(i, t, e = 0) {
      const s = Alpine.store("rows").items.findIndex((n) => n.id === i.id);
      s !== -1 && (Alpine.store("rows").items[s].columns[t].elements.splice(e, 1), this.$wire.saveLayout(JSON.stringify(Alpine.store("rows").items)));
    },
    updateCanvasData() {
      const i = JSON.stringify(Alpine.store("rows").items);
      this.$refs.canvasData.value = i, this.$wire.set("data.layout", i);
    }
  }));
});

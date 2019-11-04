<template>
  <div class="editor">
    <editor-menu-bar
      v-slot="{ commands, isActive }"
      :editor="editor"
    >
      <div class="menubar">
        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <b>B</b>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <i>I</i>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <strike>S</strike>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <u>U</u>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <pre>&lt;&gt;</pre>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          <p>P</p>
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          UL
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          OL
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          ""
        </button>

        <button
          type="button"
          class="menubar__button"
          @click="commands.horizontal_rule"
        >
          HR
        </button>

        <button
          type="button"
          class="menubar__button"
          @click="commands.undo"
        >
          Prev
        </button>

        <button
          type="button"
          class="menubar__button"
          @click="commands.redo"
        >
          Next
        </button>
        <button
          type="button"
          class="menubar__button"
          @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
        >
          Table
        </button>

        <span v-if="isActive.table()">
          <button
            type="button"
            class="menubar__button"
            @click="commands.deleteTable"
          >
            Remove table
          </button>
          <button
            type="button"
            class="menubar__button"
            @click="commands.addColumnBefore"
          >
            Add col before
          </button>
          <button
            type="button"
            class="menubar__button"
            @click="commands.addColumnAfter"
          >
            Add col after
          </button>
          <button
            type="button"
            class="menubar__button"
            @click="commands.deleteColumn"
          >
            Delete col
          </button>
          <button
            type="button"
            class="menubar__button"
            @click="commands.addRowBefore"
          >
            Add row before
          </button>
          <button
            type="button"
            class="menubar__button"
            @click="commands.addRowAfter"
          >
            Add row after
          </button>
          <button
            type="button"
            class="menubar__button"
            @click="commands.deleteRow"
          >
            Delete row
          </button>
          <button
            type="button"
            class="menubar__button"
            @click="commands.toggleCellMerge"
          >
            Combine cells
          </button>
        </span>
      </div>
    </editor-menu-bar>

    <editor-content
      class="editor__content"
      :editor="editor"
    />
  </div>
</template>

<script lang="ts">
// @ts-ignore
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import Vue from "vue";
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  // @ts-ignore
} from "tiptap-extensions";

export default Vue.extend({
  components: {
    EditorContent,
    EditorMenuBar,
  },

  props: {
    value: {
      type: String,
      default: "",
    },
  },

  data(vm: any) {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Table(
            { resizable: true },
          ),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
        ],
        content: vm.value,
        onUpdate: ({ getHTML }: any) => vm.$emit("input", getHTML()),
      }),
    };
  },
  beforeDestroy() {
    // @ts-ignore
    this.editor.destroy();
  },
});
</script>

<style lang="scss">
@import "~@/assets/scss/editor.scss";
@import "~@/assets/scss/menubar.scss";
@import "~@/assets/scss/menububble.scss";

.editor {
  min-height: 250px;

  .editor__content, .ProseMirror {
    height: 100%;
  }

  .ProseMirror {
    border: 1px solid $--divider;
    min-height: 250px;
  }
}
</style>

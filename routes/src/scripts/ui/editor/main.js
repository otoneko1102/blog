import { contentArea, state, setState } from "../../state.js";
import { fetchWithAuth } from "../../auth.js";
import { parseMarkdown, runMermaid } from "../../utils/markdown.js";
import { syncPaneHeights } from "../../utils/helpers.js";
import { renderNotFoundView } from "../global/errorViews.js";
import { renderImageGallery, initializeUploader } from "./fileManager.js";
import { initializeTagManager } from "./tagManager.js";
import { initializeCoreEditorEvents } from "./editorEvents.js";
import {
  BackToListLink,
  Button,
  EditorViewToggle,
  TagEditor,
  FileUploader,
} from "../../../components/index.js";
import Prism from "prismjs";

export const renderEditorView = async (id) => {
  contentArea.innerHTML = `
    ${BackToListLink("admin")}
    <div class="editor-main-container">
      <div class="flex">
        <div id="edit" class="editor-pane"><p>記事を読み込み中...</p></div>
        <div id="view" class="editor-pane"></div>
      </div>
    </div>`;

  const menuContainer = document.getElementById("editor-menu-container");
  menuContainer.innerHTML = `
    <div class="editor-menu-header">
      <h3>設定とファイル</h3>
      ${Button({
        id: "editor-menu-close-btn",
        className: "icon-btn",
        title: "閉じる",
        text: '<span class="icon close-icon"></span>',
      })}
    </div>
    <div class="editor-menu-content">
      ${EditorViewToggle()}
      <div class="editor-actions"></div>
      ${TagEditor()}
      ${FileUploader()}
      <h4>クリックして挿入</h4>
      <div id="image-gallery" class="image-gallery">
        <p>画像を読み込み中...</p>
      </div>
    </div>`;

  try {
    const response = await fetchWithAuth(`/api/articles/${id}`);
    if (!response.ok) {
      return await renderNotFoundView("記事の読み込みに失敗しました。");
    }
    const { content, meta: articleData } = await response.json();

    document.getElementById("edit").innerHTML =
      `<textarea id="editor">${content || ""}</textarea>`;
    const view = document.getElementById("view");
    const editor = document.getElementById("editor");
    view.innerHTML = await parseMarkdown(content || "");

    initializeUploader(id);
    const tagManager = initializeTagManager(articleData.tags);
    initializeCoreEditorEvents(id, articleData, tagManager.getTags);
    await renderImageGallery(id);

    editor.addEventListener("input", async () => {
      view.innerHTML = await parseMarkdown(editor.value);
      await runMermaid();
      Prism.highlightAll();
      if (window.initializeXpdfViewers) {
        setTimeout(() => window.initializeXpdfViewers(), 0);
      }
      syncPaneHeights();
      setState({ hasUnsavedChanges: true });
    });

    const beforeUnloadHandler = (e) => {
      if (state.hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", beforeUnloadHandler);
    setState({ beforeUnloadHandler });

    document
      .getElementById("editor-menu-close-btn")
      ?.addEventListener("click", () => {
        menuContainer.classList.remove("is-open");
        document.getElementById("editor-menu-overlay").classList.add("hidden");
      });

    const flexContainer = document.querySelector(".flex");
    document
      .getElementById("show-editor-btn")
      ?.addEventListener("click", (e) => {
        flexContainer.classList.remove("show-preview");
        e.currentTarget.classList.add("active");
        document.getElementById("show-preview-btn").classList.remove("active");
      });
    document
      .getElementById("show-preview-btn")
      ?.addEventListener("click", (e) => {
        flexContainer.classList.add("show-preview");
        e.currentTarget.classList.add("active");
        document.getElementById("show-editor-btn").classList.remove("active");
      });

    document.getElementById("editor-menu-open-btn").classList.remove("hidden");
    syncPaneHeights();

    await runMermaid();
    Prism.highlightAll();
    if (window.initializeXpdfViewers) {
      setTimeout(() => window.initializeXpdfViewers(), 0);
    }
  } catch (err) {
    contentArea.innerHTML = `<p>${err.message}</p>`;
  }
};

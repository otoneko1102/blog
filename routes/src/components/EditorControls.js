/**
 * EditorControls Component
 * エディター制御ボタンコンポーネント
 */

import { Button } from "./Button.js";

export const EditorActionButtons = ({
  isPublic,
  isHidden,
  isPinned,
  createdAt,
}) => {
  const publicButtonText = isPublic ? "非公開にする" : "公開する";
  const hiddenButtonText = isHidden ? "表示する" : "非表示する";
  const pinnedButtonText = isPinned ? "ピン止め解除" : "ピン止めする";
  const currentDate = createdAt
    ? new Date(createdAt).toISOString().split("T")[0]
    : "";

  return `
    <div class="buttons">
      ${Button({ id: "save-btn", text: "保存" })}
      ${Button({ id: "settings-btn", text: "記事設定" })}
      <div class="buttons-block">
        ${Button({
          id: "toggle-public-btn",
          text: publicButtonText,
          className: isPublic ? "public" : "private",
        })}
        <br />
        ${Button({
          id: "toggle-hidden-btn",
          text: hiddenButtonText,
          className: isHidden ? "hidden" : "visible",
        })}
        <br />
        ${Button({
          id: "toggle-pinned-btn",
          text: pinnedButtonText,
          className: isPinned ? "pinned" : "unpinned",
        })}
      </div>
    </div>
    <br />
    <div class="date-editor">
      <h4>投稿日を編集</h4>
      <input type="date" id="date-input" value="${currentDate}" />
      ${Button({ id: "update-date-btn", text: "更新" })}
    </div>
  `;
};

export const EditorViewToggle = () => {
  return `
    <div class="view-toggle">
      ${Button({
        id: "show-editor-btn",
        text: "編集",
        className: "view-toggle-btn active",
      })}
      ${Button({
        id: "show-preview-btn",
        text: "プレビュー",
        className: "view-toggle-btn",
      })}
    </div>
  `;
};

export const TagEditor = () => {
  return `
    <div class="tags-container">
      <h4>タグ編集</h4>
      <div id="tags-list"></div>
      <div class="tag-input-group">
        <input type="text" id="tag-input" placeholder="新しいタグを追加" />
        ${Button({ id: "add-tag-btn", text: "+" })}
      </div>
    </div>
  `;
};

export const FileUploader = () => {
  return `
    <div class="upload-container">
      <h4>ファイル管理</h4>
      <div class="file-input-wrapper">
        <input type="file" id="file-input" class="file-input-hidden" />
        <label for="file-input" class="button">ファイルを選択</label>
        <span id="file-name-display">選択されていません</span>
      </div>
      <input type="text" id="filename-input" placeholder="保存ファイル名 (拡張子不要)" autocomplete="off" />
      ${Button({ id: "upload-btn", text: "アップロード" })}
    </div>
  `;
};

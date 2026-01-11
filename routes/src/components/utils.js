/**
 * Component Utilities
 * コンポーネント用ユーティリティ関数
 */

/**
 * 日付をフォーマット
 */
export const formatDate = (dateString) => {
  if (!dateString) return "---";
  return new Date(dateString).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * HTML文字列をエスケープ
 */
export const escapeHtml = (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

/**
 * 属性オブジェクトをHTML属性文字列に変換
 */
export const attrsToString = (attrs) => {
  return Object.entries(attrs)
    .filter(([_, value]) => value !== false && value != null)
    .map(([key, value]) => {
      if (value === true) return key;
      return `${key}="${escapeHtml(String(value))}"`;
    })
    .join(" ");
};

/**
 * クラス名を結合
 */
export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

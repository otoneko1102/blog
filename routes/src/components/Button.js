/**
 * Button Component
 * 再利用可能なボタンコンポーネント
 */

export const Button = ({
  text,
  id = "",
  className = "",
  onClick = null,
  type = "button",
  disabled = false,
  title = "",
}) => {
  const classes = ["button", className].filter(Boolean).join(" ");
  const attrs = [
    id && `id="${id}"`,
    `class="${classes}"`,
    `type="${type}"`,
    disabled && "disabled",
    title && `title="${title}"`,
  ]
    .filter(Boolean)
    .join(" ");

  return `<button ${attrs}>${text}</button>`;
};

/**
 * ボタン要素を作成してイベントリスナーを設定
 */
export const createButtonWithListener = (
  container,
  selector,
  config,
  onClick,
) => {
  const button = container.querySelector(selector);
  if (button && onClick) {
    button.addEventListener("click", onClick);
  }
  return button;
};

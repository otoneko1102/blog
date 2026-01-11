/**
 * Link Component
 * 再利用可能なリンクコンポーネント
 */

export const Link = ({
  href,
  text,
  className = "",
  target = "",
  rel = "",
  title = "",
}) => {
  const classes = className ? ` class="${className}"` : "";
  const targetAttr = target ? ` target="${target}"` : "";
  const relAttr = rel ? ` rel="${rel}"` : "";
  const titleAttr = title ? ` title="${title}"` : "";

  return `<a href="${href}"${classes}${targetAttr}${relAttr}${titleAttr}>${text}</a>`;
};

export const BackToListLink = (mode = "public") => {
  const href = mode === "admin" ? "/a" : "/";
  return Link({
    href,
    text: "&larr; 記事一覧に戻る",
    className: "back-to-list-link",
  });
};

export const ExternalLink = ({ href, text }) =>
  Link({
    href,
    text,
    target: "_blank",
    rel: "noopener noreferrer",
  });

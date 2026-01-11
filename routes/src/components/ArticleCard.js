/**
 * ArticleCard Component
 * 記事カードの表示コンポーネント
 */

import { formatDate } from "./utils.js";

export const ArticleCard = ({
  article,
  mode = "public",
}) => {
  const link = mode === "admin" ? `/a/${article.id}` : `/b/${article.id}`;
  const createdDate = formatDate(article.createdAt);
  const updatedDate = formatDate(article.updatedAt);
  const isUpdated =
    article.createdAt &&
    article.updatedAt &&
    new Date(article.createdAt).toDateString() !==
      new Date(article.updatedAt).toDateString();

  const tagsHTML = article.tags
    ?.map((tag) => `<span class="tag">${tag}</span>`)
    .join(" / ") || '<span class="tag"></span>';

  const hiddenClass = mode === "admin" && article.hidden ? " hidden-article" : "";
  const pinnedIcon = article.pinned ? '<span class="pinned-icon"></span>' : "";
  const hiddenIcon = article.hidden ? '<span class="hidden-icon"></span>' : "";

  const adminControls = mode === "admin"
    ? `
      <span class="status ${article.public ? "public" : "private"}">
        ${article.public ? "公開" : "非公開"}
      </span>
      <button class="article-delete-btn" data-id="${article.id}" data-title="${article.title}">
        削除
      </button>
    `
    : "";

  return `
    <div class="article-card${article.pinned ? " pinned" : ""}${hiddenClass}">
      <div class="article-tags">${tagsHTML}</div>
      <a href="${link}" class="article-title${article.pinned ? " pinned" : ""}${article.hidden ? " hidden-article" : ""}">
        ${pinnedIcon}${hiddenIcon}<h2>${article.title}</h2>
      </a>
      <div class="article-meta">
        <div class="article-dates">
          <span>投稿日: <time datetime="${article.createdAt}">${createdDate}</time></span>
          <span>更新日: ${isUpdated ? `<time datetime="${article.updatedAt}">${updatedDate}</time>` : "---"}</span>
        </div>
        <div class="article-meta-right">
          ${adminControls}
        </div>
      </div>
    </div>
  `;
};

/**
 * 記事リストを生成
 */
export const ArticleList = (articles, mode = "public") => {
  if (articles.length === 0) {
    return "<p>該当する記事がありません。</p>";
  }

  return articles
    .map((article) => ArticleCard({ article, mode }))
    .join("");
};

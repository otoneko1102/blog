/**
 * Pagination Component
 * ページネーションコンポーネント
 */

export const Pagination = ({
  mode,
  totalPages,
  currentPage,
  showHidden = false,
}) => {
  if (totalPages <= 1) return "";

  const basePath = mode === "admin" ? "/a" : "/";
  let queryParams = "page=";
  if (mode === "admin" && showHidden) {
    queryParams = "range=all&page=";
  }

  const prevLink =
    currentPage > 1
      ? `<a href="${basePath}?${queryParams}${currentPage - 1}" class="page-link" data-page="${currentPage - 1}">&laquo; 前へ</a>`
      : `<span class="page-link disabled">&laquo; 前へ</span>`;

  const pageLinks = Array.from({ length: totalPages }, (_, i) => {
    const pageNum = i + 1;
    return `<a href="${basePath}?${queryParams}${pageNum}" class="page-link ${pageNum === currentPage ? "active" : ""}" data-page="${pageNum}">${pageNum}</a>`;
  }).join("");

  const nextLink =
    currentPage < totalPages
      ? `<a href="${basePath}?${queryParams}${currentPage + 1}" class="page-link" data-page="${currentPage + 1}">次へ &raquo;</a>`
      : `<span class="page-link disabled">次へ &raquo;</span>`;

  return `${prevLink}${pageLinks}${nextLink}`;
};

/**
 * ページネーションリンクにイベントリスナーを追加
 */
export const attachPaginationListeners = (container, onPageChange) => {
  container.querySelectorAll(".page-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageToGo = parseInt(e.currentTarget.dataset.page, 10);
      if (pageToGo && onPageChange) {
        const newUrl = new URL(window.location);
        newUrl.searchParams.set("page", pageToGo);
        history.pushState({}, "", newUrl);
        onPageChange(pageToGo);
      }
    });
  });
};

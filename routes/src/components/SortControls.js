/**
 * SortControls Component
 * ソート制御コンポーネント
 */

export const SortControls = ({
  sortKey = "createdAt",
  sortOrder = "desc",
}) => {
  return `
    <div class="sort-options">
      <select id="sort-key">
        <option value="createdAt" ${sortKey === "createdAt" ? "selected" : ""}>作成日</option>
        <option value="updatedAt" ${sortKey === "updatedAt" ? "selected" : ""}>更新日</option>
        <option value="title" ${sortKey === "title" ? "selected" : ""}>タイトル</option>
      </select>
      <select id="sort-order">
        <option value="desc" ${sortOrder === "desc" ? "selected" : ""}>降順</option>
        <option value="asc" ${sortOrder === "asc" ? "selected" : ""}>昇順</option>
      </select>
    </div>
  `;
};

/**
 * ソートコントロールにイベントリスナーを追加
 */
export const attachSortListeners = (
  container,
  onSortKeyChange,
  onSortOrderChange,
) => {
  const sortKeySelect = container.querySelector("#sort-key");
  const sortOrderSelect = container.querySelector("#sort-order");

  if (sortKeySelect && onSortKeyChange) {
    sortKeySelect.addEventListener("change", (e) => {
      onSortKeyChange(e.target.value);
    });
  }

  if (sortOrderSelect && onSortOrderChange) {
    sortOrderSelect.addEventListener("change", (e) => {
      onSortOrderChange(e.target.value);
    });
  }
};

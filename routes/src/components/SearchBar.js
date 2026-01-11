/**
 * SearchBar Component
 * 検索バーコンポーネント
 */

export const SearchBar = ({
  id = "search-input",
  placeholder = "記事名またはタグで検索...",
}) => {
  return `
    <div class="search-container">
      <input 
        type="search" 
        id="${id}" 
        placeholder="${placeholder}"
      >
    </div>
  `;
};

/**
 * 検索バーにデバウンス付きイベントリスナーを追加
 */
export const attachSearchListener = (
  container,
  selector,
  onSearch,
  debounceMs = 300,
) => {
  const searchInput = container.querySelector(selector);
  if (!searchInput) return;

  let debounceTimer;
  searchInput.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (onSearch) {
        onSearch(e.target.value);
      }
    }, debounceMs);
  });
};

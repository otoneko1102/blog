import { contentArea } from "../../state.js";
import { handleNewArticle, handleDeleteArticle } from "./articleHandlers.js";
import router from "../../router.js";
import {
  ArticleList,
  Pagination,
  attachPaginationListeners,
  SearchBar,
  attachSearchListener,
  SortControls,
  attachSortListeners,
  Button,
} from "../../../components/index.js";

export const renderArticleList = async (mode, page = 1) => {
  let searchTerm = "";
  let sortKey = "createdAt";
  let sortOrder = "desc";
  let showHidden = false;

  const setupDynamicEventListeners = () => {
    attachPaginationListeners(document, (pageToGo) => render(pageToGo));

    if (mode === "admin") {
      document.querySelectorAll(".article-delete-btn").forEach((btn) => {
        btn.addEventListener("click", () =>
          handleDeleteArticle(btn.dataset.id, btn.dataset.title),
        );
      });
    }
  };

  const render = async (currentPage) => {
    const range = showHidden ? "all" : "notHidden";
    let apiUrl = `/api/articles?view=${mode}&q=${encodeURIComponent(
      searchTerm,
    )}&page=${currentPage}&sortKey=${sortKey}&sortOrder=${sortOrder}`;
    if (mode === "admin") {
      apiUrl += `&range=${range}`;
    }
    const response = await fetch(apiUrl);
    const {
      articles,
      totalPages,
      currentPage: returnedPage,
    } = await response.json();

    const articlesHTML = ArticleList(articles, mode);
    document.getElementById("articles-grid").innerHTML = articlesHTML;
    document.getElementById("pagination-container").innerHTML = Pagination({
      mode,
      totalPages,
      currentPage: returnedPage,
      showHidden,
    });

    setupDynamicEventListeners();
  };

  const adminControlsHTML =
    mode === "admin"
      ? `
    <div class="admin-controls">
      ${Button({ id: "new-article-btn", text: "新規作成" })}
      <div class="checkbox-container">
        <input type="checkbox" id="show-hidden-checkbox" />
        <label for="show-hidden-checkbox">非表示の記事を表示</label>
      </div>
    </div>
  `
      : "";

  contentArea.innerHTML = `
    <div class="list-header">
      <h2>${mode === "admin" ? "記事管理" : "記事一覧"}</h2>
      ${SortControls({ sortKey, sortOrder })}
    </div>
    ${adminControlsHTML}
    ${SearchBar({})}
    <div id="articles-grid"></div>
    <div id="pagination-container" class="pagination"></div>
  `;

  attachSearchListener(document, "#search-input", (value) => {
    searchTerm = value;
    render(1);
  });

  attachSortListeners(
    document,
    (value) => {
      sortKey = value;
      render(1);
    },
    (value) => {
      sortOrder = value;
      render(1);
    },
  );

  if (mode === "admin") {
    document
      .getElementById("new-article-btn")
      ?.addEventListener("click", handleNewArticle);

    const showHiddenCheckbox = document.getElementById("show-hidden-checkbox");
    if (showHiddenCheckbox) {
      showHiddenCheckbox.checked = showHidden;
      showHiddenCheckbox.addEventListener("change", (e) => {
        showHidden = e.target.checked;
        render(1);
      });
    }
  }

  await render(page);
};

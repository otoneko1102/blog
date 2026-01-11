/**
 * ErrorView Component
 * エラーページ表示コンポーネント
 */

export const ErrorView = ({
  code,
  title,
  message,
  emoji = "",
  errorDetails = "",
  showHomeButton = true,
}) => {
  return `
    <div class="static-page-container error">
      <h1>${code}</h1>
      ${emoji ? `<p style="font-size: 2rem;">${emoji}</p>` : ""}
      <p>${message}</p>
      ${errorDetails ? `<p style="color: red;">${errorDetails}</p>` : ""}
      ${showHomeButton ? '<a href="/" class="button">&larr; ホームに戻る</a>' : ""}
    </div>
  `;
};

export const TeapotView = () =>
  ErrorView({
    code: "418",
    emoji: "🫖",
    title: "I'm a teapot!",
    message: "このサーバーはティーポットなので、コーヒーを入れることはできません。",
  });

export const NotFoundView = (errorDetails = "") =>
  ErrorView({
    code: "404",
    title: "Not Found",
    message: "お探しのページは見つかりませんでした。",
    errorDetails,
  });

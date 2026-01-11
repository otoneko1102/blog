import { contentArea } from "../../state.js";
import { TeapotView, NotFoundView } from "../../../components/index.js";

// 418 I'm a teapot!
export const renderTeapotView = () => {
  contentArea.innerHTML = TeapotView();
};

// 404 Not Found
export const renderNotFoundView = (error) => {
  contentArea.innerHTML = NotFoundView(error);
};

import { checkAuth } from "../../auth.js";
import { Link } from "../../../components/index.js";

export const updateGlobalUI = async () => {
  const adminLinkContainer = document.getElementById("admin-link-container");
  if (adminLinkContainer) {
    const authenticated = await checkAuth();
    adminLinkContainer.innerHTML = authenticated
      ? Link({ href: "/a", text: "管理画面" })
      : "";
  }
};

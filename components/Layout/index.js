import HomePage from "@/pages";
import Header from "../Header";
import Navigation from "../Navgation";

import { useRouter } from "next/router";

export default function Layout() {
  const router = useRouter();
  const path = router.pathname;

  const navAndHeader =
    path === "/" ||
    path === "/recipes" ||
    path === "/drugstore" ||
    path === "/shopping-list";

  if (navAndHeader)
    return (
      <>
        <Header title={path} />
        <Navigation currentPage={path} />
      </>
    );
  return;
}

import React from "react";
import { useLocation } from "react-router-dom";

/**
 * SPAs don’t reload the document, so scroll position is kept by default.
 * Scroll to top when the route path changes (normal “new page” behaviour).
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

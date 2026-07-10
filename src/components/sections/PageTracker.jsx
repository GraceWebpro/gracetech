import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pageView } from "../../config/analytics";

export default function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    pageView(location.pathname + location.search);
  }, [location]);

  return null;
}
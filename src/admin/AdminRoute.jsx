import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../config/supabase";
import { useAuth } from "../config/AuthProvider";

export const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true); // 👈 ADD THIS

  useEffect(() => {
    const checkAdmin = async () => {
      if (!currentUser) {
        setAdminLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("admins")
        .select("*")
        .eq("email", currentUser.email.toLowerCase());

      console.log("AUTH USER:", currentUser);
      console.log("ADMIN DATA:", data);

      if (!error && data.length > 0) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }

      setAdminLoading(false); // 👈 IMPORTANT
    };

    checkAdmin();
  }, [currentUser]);

  // ⛔ WAIT for BOTH auth and admin check
  if (loading || adminLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};
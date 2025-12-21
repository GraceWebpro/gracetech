import { useEffect, useState } from "react";
import { db } from "../../server/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../server/AuthProvider";

const Overview = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({ downloads: 0, orders: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const downloadsSnap = await getDocs(
        query(collection(db, "downloads"), where("userId", "==", currentUser.uid))
      );

      const ordersSnap = await getDocs(
        query(collection(db, "orders"), where("userId", "==", currentUser.uid))
      );

      setStats({
        downloads: downloadsSnap.size,
        orders: ordersSnap.size,
      });
    };

    fetchStats();
  }, [currentUser]);

  return (
    <div className="overview-cards">
      <div className="card">Downloads: {stats.downloads}</div>
      <div className="card">Orders: {stats.orders}</div>
    </div>
  );
};

export default Overview;

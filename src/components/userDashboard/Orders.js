import { useEffect, useState } from "react";
import { db } from "../../server/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../server/AuthProvider";

const Orders = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", currentUser.uid)
      );
      const snap = await getDocs(q);

      setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchOrders();
  }, [currentUser]);

  return (
    <div>
      <h3>Order History</h3>
      {orders.map(o => (
        <div key={o.id}>
          <p>₦{o.amount} — {o.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;

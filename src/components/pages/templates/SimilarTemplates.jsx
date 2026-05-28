import { useEffect, useState } from "react";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../server/firebase";
import { Link } from "react-router-dom";

const SimilarTemplates = ({ category, currentId }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchSimilar = async () => {
      const q = query(
        collection(db, "templates"),
        where("category", "==", category),
        limit(4)
      );

      const snap = await getDocs(q);

      const data = snap.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(item => item.id !== currentId);

      setItems(data);
    };

    fetchSimilar();
  }, [category, currentId]);

  return (
    <div className="mt-24">

      <h2 className="text-xl font-semibold mb-8">
        Similar Templates
      </h2>

      <div className="grid md:grid-cols-4 gap-6">

        {items.map(item => (
          <Link
            key={item.id}
            to={`/templates/${item.slug}`}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition"
          >
            <img src={item.thumbnail} loading="lazy" className="h-40 w-full object-cover" />
            <div className="p-4">
              <p className="text-sm">{item.title}</p>
            </div>
          </Link>
          
        ))}
      </div>
    </div>
  );
};

export default SimilarTemplates;

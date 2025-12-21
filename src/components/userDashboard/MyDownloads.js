import { useEffect, useState } from "react";
import { db } from "../../server/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../../server/AuthProvider";

const MyDownloads = () => {
  const { currentUser } = useAuth();
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    const fetchDownloads = async () => {
      const q = query(
        collection(db, "downloads"),
        where("userId", "==", currentUser.uid)
      );
      const snap = await getDocs(q);

      setDownloads(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchDownloads();
  }, [currentUser]);

  return (
    <div>
      <h3>My Downloads</h3>
      {downloads.map(d => (
        <div key={d.id} className="download-item">
          <p>{d.templateName}</p>
          <a href={d.downloadUrl} target="_blank">Download</a>
        </div>
      ))}
    </div>
  );
};

export default MyDownloads;

const Downloads = () => {
    const [downloads, setDownloads] = useState([]);
  
    useEffect(() => {
      const fetchDownloads = async () => {
        const q = query(
          collection(db, "downloads"),
          where("userId", "==", auth.currentUser.uid)
        );
        const snapshot = await getDocs(q);
        setDownloads(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      };
      fetchDownloads();
    }, []);
  
    return (
      <div>
        <h2>My Downloads</h2>
        {downloads.map(d => (
          <a key={d.id} href={d.downloadUrl} target="_blank" rel="noreferrer">
            Download Template
          </a>
        ))}
      </div>
    );
  };
  
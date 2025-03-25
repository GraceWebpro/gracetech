import { useState, useEffect } from "react";
import { auth, db, storage, loginWithGoogle, logout } from "../server/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function UploadImages() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  // Monitor Auth State
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  // Fetch images from Firestore
  useEffect(() => {
    const fetchImages = async () => {
      const querySnapshot = await getDocs(collection(db, "images"));
      const imageList = querySnapshot.docs.map(doc => doc.data().url);
      setImages(imageList);
    };
    fetchImages();
  }, []);

  // Upload Image
  const uploadImage = async () => {
    if (!image) return alert("Please select an image!");

    const imageRef = ref(storage, `projects/${image.name}`);
    await uploadBytes(imageRef, image);

    const downloadURL = await getDownloadURL(imageRef);
    await addDoc(collection(db, "images"), { url: downloadURL });

    setImages((prev) => [...prev, downloadURL]); // Update state
    alert("Image uploaded successfully!");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {user ? (
        <>
          <h2>Welcome, {user.displayName}</h2>
          <button onClick={logout}>Logout</button>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <button onClick={uploadImage}>Upload</button>
        </>
      ) : (
        <>
          <h2>Please log in to upload images</h2>
          <button onClick={loginWithGoogle}>Login with Google</button>
        </>
      )}

      <h3>Uploaded Images</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
        {images.map((img, index) => (
          <img key={index} src={img} alt="Uploaded" style={{ width: "150px", height: "150px", objectFit: "cover" }} />
        ))}
      </div>
    </div>
  );
}

export default UploadImages;

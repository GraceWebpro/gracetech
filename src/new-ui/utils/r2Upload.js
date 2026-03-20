export const uploadToR2 = async (file, slug, onProgress) => {
  if (!slug) throw new Error("Slug is required for R2 upload");
  
  // 1️⃣ Get signed URL from your server
  const res = await fetch("http://localhost:5000/get-signed-url", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
  fileName: file.name,
  contentType: file.type,
  slug,
  }),
  });
  
  const data = await res.json();
  
  if (!res.ok) throw new Error(data.error || "Failed to get signed URL");
  
  // 2️⃣ Upload file to R2 with progress tracking
  return new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open("PUT", data.signedUrl);
  
  ```
  xhr.setRequestHeader(
    "Content-Type",
    file.type || "application/octet-stream"
  );
  
  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable && onProgress) {
      onProgress(Math.round((event.loaded / event.total) * 100));
    }
  };
  
  xhr.onload = () => {
    if (xhr.status === 200 || xhr.status === 204) {
      resolve(data.publicUrl);
    } else {
      reject(new Error("Upload failed"));
    }
  };
  
  xhr.onerror = () => reject(new Error("Network error during upload"));
  
  xhr.send(file);
  ```
  
  });
  };
  
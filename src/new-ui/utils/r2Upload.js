// r2Upload.js

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Upload a file to Cloudflare R2 using signed URL
 * @param {File} file
 * @param {string} slug
 * @param {(progress: number) => void} [onProgress]
 * @returns {Promise<string>} public URL
 */
export const uploadToR2 = async (file, slug, onProgress) => {
  if (!file) throw new Error("File is required");
  if (!slug) throw new Error("Slug is required");

  try {
    // ------------------- 1️⃣ Get signed URL -------------------
    const res = await fetch(`${API_URL}/get-signed-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type || "application/octet-stream",
        slug,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to get signed URL");
    }

    if (!data.signedUrl || !data.publicUrl) {
      throw new Error("Invalid response from server");
    }

    // ------------------- 2️⃣ Upload file -------------------
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("PUT", data.signedUrl);
      xhr.setRequestHeader(
        "Content-Type",
        file.type || "application/octet-stream"
      );

      // ✅ Progress tracking
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };

      // ✅ Success / failure handling
      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 204) {
          resolve(data.publicUrl);
        } else {
          reject(
            new Error(`Upload failed with status ${xhr.status}`)
          );
        }
      };

      xhr.onerror = () => {
        reject(new Error("Network error during upload"));
      };

      xhr.send(file);
    });
  } catch (error) {
    console.error("R2 UPLOAD ERROR:", error);
    throw error;
  }
};
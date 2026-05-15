export const uploadToR2 = async (file, fileName, onProgress) => {
  if (!file) throw new Error("No file provided");

  try {
    // ------------------- 1️⃣ Get Signed URL from YOUR EXPRESS SERVER -------------------
    const res = await fetch("http://localhost:5000/get-signed-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: fileName,
        contentType: file.type || "application/octet-stream",
        slug: "uploads", // you can pass dynamic slug if needed
      }),
    });

    // 👇 Handle non-JSON errors properly
    const text = await res.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("❌ RAW RESPONSE:", text);
      throw new Error("Server did not return valid JSON");
    }

    if (!res.ok) {
      throw new Error(data.error || "Failed to get signed URL");
    }

    if (!data.signedUrl || !data.publicUrl) {
      throw new Error("Invalid response from server");
    }

    // ------------------- 2️⃣ Upload file directly to R2 -------------------
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open("PUT", data.signedUrl);

      xhr.setRequestHeader(
        "Content-Type",
        file.type || "application/octet-stream"
      );

      // ✅ Progress tracking
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable && onProgress) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      };

      // ✅ Success
      xhr.onload = () => {
        if (xhr.status === 200 || xhr.status === 204) {
          resolve(data.publicUrl);
        } else {
          reject(
            new Error(`Upload failed with status ${xhr.status}`)
          );
        }
      };

      // ❌ Network error
      xhr.onerror = () => {
        reject(new Error("Network error during upload"));
      };

      // ❌ Timeout
      xhr.ontimeout = () => {
        reject(new Error("Upload timed out"));
      };

      xhr.timeout = 1000 * 60 * 5;

      xhr.send(file);
    });

  } catch (error) {
    console.error("❌ R2 UPLOAD ERROR:", error);
    throw error;
  }
};
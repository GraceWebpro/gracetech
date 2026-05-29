import imageCompression from "browser-image-compression";

export const compressImage = async (file) => {
  const options = {
    maxSizeMB: 0.3,          // 300KB max
    maxWidthOrHeight: 1200,  // resize large images
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error("Compression failed:", error);
    return file; // fallback
  }
};
import { useEffect } from "react";
import './syles.css'

const MouseCursor = () => {
  useEffect(() => {
    // Create the dot element
    const dot = document.createElement("div");
    dot.classList.add("cursor-dot");
    document.body.appendChild(dot);

    // Update the position of the dot on mouse move
    const moveDot = (event) => {
      dot.style.left = `${event.clientX}px`;
      dot.style.top = `${event.clientY}px`;
    };

    // Add event listener for mouse move
    document.addEventListener("mousemove", moveDot);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousemove", moveDot);
      document.body.removeChild(dot);
    };
  }, []);

  return null;
};

export default MouseCursor;

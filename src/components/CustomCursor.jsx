import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import "../components/home/Home.css";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorBorderRef = useRef(null);

  // detect mobile
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  useEffect(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    const border = cursorBorderRef.current;

    // hide default cursor
    document.body.style.cursor = "none";

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;

      // dot follows quickly
      gsap.to(cursor, {
        x,
        y,
        duration: 0.1,
        ease: "power2.out",
      });

      // border follows with lag
      gsap.to(border, {
        x,
        y,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // grow/shrink on hover elements
    const hoverables = document.querySelectorAll("a, button");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(border, { scale: 1.5, duration: 0.3, ease: "power3.out" });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(border, { scale: 1, duration: 0.3, ease: "power3.out" });
      });
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.style.cursor = "auto"; // reset default cursor
    };
  }, [isMobile]);

  return (
    <>
      {!isMobile && (
        <>
          <div ref={cursorRef} className="curs-ref" />
          <div ref={cursorBorderRef} className="curs-bor" />
        </>
      )}
    </>
  );
};

export default CustomCursor;

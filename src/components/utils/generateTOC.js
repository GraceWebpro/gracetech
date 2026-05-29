export const generateTOC = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
  
    const headings = [...doc.querySelectorAll("h1, h2, h3")];
  
    return headings.map((h) => {
      const id = h.innerText
        .toLowerCase()
        .replace(/\s+/g, "-");
  
      return {
        text: h.innerText,
        id,
        level: h.tagName,
      };
    });
  };
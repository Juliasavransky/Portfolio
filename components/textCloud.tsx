// @ts-nocheck
import React, { useEffect, useState } from "react";
import TagCloud from "TagCloud";

const TextCloud = () => {
  const [radius, setRadius] = useState(450); // ברירת מחדל

  useEffect(() => {
    if (typeof window === "undefined") return; // מוודא שהקוד רץ רק בדפדפן

    const getResponsiveRadius = () => (window.innerWidth < 768 ? 150 : 450);
    setRadius(getResponsiveRadius());

    const updateRadius = () => setRadius(getResponsiveRadius());
    window.addEventListener("resize", updateRadius);

    const container = ".tagcloud";
    const text = [
      "HTML", "CSS", "JavaScript", "React JS", "Redux", "SCSS",
      "TypeScript", "Context", "Node.js", "Git", "Material-UI",
      "Figma", "JSON", "Zeplin", "Ajax", "API", "Next.js",
      "MUI", "WordPress", "UX", "UI","Gutenberg", "Headless"
    ];

    const options = {
      radius: getResponsiveRadius(),
      keep: true,
      maxSpeed: window.innerWidth < 768 ? "slow" : "normal",
      initSpeed: window.innerWidth < 768 ? "normal" : "fast",
      direction: 135,
    };

    const tagCloud = TagCloud(container, text, options);

    return () => {
      tagCloud.destroy();
      window.removeEventListener("resize", updateRadius);
    };
  }, []); // רץ רק אחרי שהקומפוננטה נטענת

  return (
    <div>
      <div
        style={{
          color: "#ffcc00",
          fontSize: "clamp(1rem, 1.6vw, 1.6rem)",
          letterSpacing: "2px",
        }}
        className="tagcloud"
      >
        <span className="tagcloud--item"></span>
      </div>
    </div>
  );
};

export default TextCloud;

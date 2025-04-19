import React, { useEffect, useState } from "react";

const DiamondGrid = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { width, height } = windowSize;
  const size = 40;
  const diamonds = [];

  for (let y = -size; y < height + size; y += size) {
    for (let x = -size; x < width + size; x += size) {
      const dx = size / 2;
      const dy = size / 2;

      const points = [
        `${x},${y}`,
        `${x + dx},${y + dy}`,
        `${x},${y + size}`,
        `${x - dx},${y + dy}`,
      ].join(" ");

      const baseClasses = `fill-transparent stroke-gray-800 stroke-[0.4] transition duration-200`;
      const hoverClasses = `hover:fill-gray-400 hover:drop-shadow-md `;

      diamonds.push(
        <polygon
          key={`${x}-${y}`}
          points={points}
          className={`${baseClasses} ${hoverClasses}`}
        />
      );
    }
  }

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full"
      width={width}
      height={height}
    >
      {diamonds}
    </svg>
  );
};

export default DiamondGrid;

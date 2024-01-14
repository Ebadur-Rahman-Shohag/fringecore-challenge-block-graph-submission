import React, { useState } from "react";
import "./App.css"; // We'll use this for global styles
import "./index.css"; // Import Tailwind CSS styles

function App() {
  const [blocks, setBlocks] = useState([
    {
      id: 1,
      x: Math.floor(Math.random() * (window.innerWidth - 100)),
      y: Math.floor(Math.random() * (window.innerHeight - 100)),
      isDragging: false,
      offsetX: 0,
      offsetY: 0,
      count: 0,
    },
  ]);

  const handleButtonClick = () => {
    setBlocks((prevBlocks) => {
      const updatedBlocks = [...prevBlocks];
      
      // Increase the count for the new block based on its latest state
      const newBlock = {
        id: updatedBlocks.length + 1,
        x: Math.floor(Math.random() * (window.innerWidth - 100)),
        y: Math.floor(Math.random() * (window.innerHeight - 100)),
        isDragging: false,
        offsetX: 0,
        offsetY: 0,
        count: updatedBlocks[updatedBlocks.length - 1].count + 1,
      };

      return [...updatedBlocks, newBlock];
    });
  };

  const handleMouseDown = (index, e) => {
    setBlocks((prevBlocks) => {
      const updatedBlocks = prevBlocks.map((block, i) => ({
        ...block,
        isDragging: i === index,
        offsetX: e.clientX - block.x,
        offsetY: e.clientY - block.y,
      }));
      return updatedBlocks;
    });

    // Attach event listeners to the document for smooth dragging
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    setBlocks((prevBlocks) => {
      const updatedBlocks = prevBlocks.map((block) => ({
        ...block,
        isDragging: false,
      }));
      return updatedBlocks;
    });

    // Remove event listeners when the mouse is released
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    setBlocks((prevBlocks) => {
      const updatedBlocks = prevBlocks.map((block) => ({
        ...block,
        x: block.isDragging ? e.clientX - block.offsetX : block.x,
        y: block.isDragging ? e.clientY - block.offsetY : block.y,
      }));
      return updatedBlocks;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {blocks.map((block, index) => (
        <div
          key={block.id}
          style={{ left: `${block.x}px`, top: `${block.y}px` }}
          className="bg-pink-600 w-24 h-24 absolute"
          onMouseDown={(e) => handleMouseDown(index, e)}
        >
          <div className="text-white text-center mt-2">{block.count}</div>
          <button
            className="bg-gray-200 text-pink-500 absolute h-8 right-4 bottom-3 p-2 w-16 text-center"
            onClick={handleButtonClick}
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
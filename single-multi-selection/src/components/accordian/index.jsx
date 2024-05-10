// single selection
// multi selection

import React, { useState } from "react";
import dummyData from "./data";

export default function Accordion() {
  const [selected, setSelected] = useState([]);
  const [multiSelectionMode, setMultiSelectionMode] = useState(false);

  const handleItemClick = (id) => {
    if (multiSelectionMode) {
      // If in multi-selection mode, toggle the selected state of the item
      setSelected((prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((selectedId) => selectedId !== id)
          : [...prevSelected, id]
      );
    } else {
      // If not in multi-selection mode, select only the clicked item
      setSelected([id]);
    }
  };

  const toggleMultiSelectionMode = () => {
    setMultiSelectionMode((prevState) => !prevState);
    if (!multiSelectionMode) {
      // If switching to multi-selection mode, preserve existing selected items
      setSelected([]);
    }
  };

  return (
    <div className="wrapper">
      <div>
        <button onClick={toggleMultiSelectionMode}>
          {multiSelectionMode ? "Single Selection" : "Multi Selection"}
        </button>
      </div>
      <div className="accordion">
        {dummyData && dummyData.length > 0 ? (
          dummyData.map((item) => (
            <div
              key={item.id}
              className={`accordion-item ${selected.includes(item.id) ? "active" : ""}`}
              onClick={() => handleItemClick(item.id)}
            >
              <div className="accordion-title">
                {item.name}
                {multiSelectionMode && <span>+</span>}
              </div>
              {selected.includes(item.id) && (
                <div className="accordion-content">
                  <p>Age: {item.age}</p>
                  <p>Email: {item.email}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}



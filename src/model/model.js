import React from "react";
import { useEventModel } from "../context/eventModelContext";
import "./model.css";

const Model = ({ children }) => {
  const { isOpen, openModel, closeModel } = useEventModel();

  if (!isOpen) return null;

  return (
    <div className="modelParent" role="dialog" aria-modal="true">
      <div className="modelContent">
        {children}
        <button onClick={closeModel} style={{ marginLeft: "8px" }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Model;

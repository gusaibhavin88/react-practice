import React, { createContext, useContext, useState } from "react";

const ModelContext = createContext();
export const useEventModel = () => useContext(ModelContext);

const EventModelContext = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("add");

  const openModel = () => {
    setIsOpen(true);
  };
  const closeModel = () => {
    setIsOpen(false);
  };

  return (
    <ModelContext.Provider
      value={{ isOpen, openModel, closeModel, setType, type }}
    >
      {children}
    </ModelContext.Provider>
  );
};

export default EventModelContext;

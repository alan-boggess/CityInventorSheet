// Modal.js

import React from "react";
const MODAL_STYLE = {
  position: "absolute",
  backgroundColor: "#2187e7ff",
  color: "#FFF",
  padding: "15px",
  zIndex: "1000",
  width: "35%",
  borderRadius: ".5em"
};

const OVERLAY_STYLE = {
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0, .8)",
  zIndex: "1000",
  overflowY: "auto"
};

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div onClick={onClose} style={OVERLAY_STYLE}>
            <div style={MODAL_STYLE}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
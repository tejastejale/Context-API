import React, {useEffect, useRef} from "react";
import {createPortal} from "react-dom";

function Modal({children, open, className, onClose}) {
  const dialoag = useRef();
  useEffect(() => {
    if (open) {
      dialoag.current.showModal();
    }
    return () => dialoag.current.close();
  }, [open]);
  return createPortal(
    <dialog ref={dialoag} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

export default Modal;

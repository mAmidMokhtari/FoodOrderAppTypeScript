import React, { FC, Fragment, ReactNode } from "react";
import ReactDOM from "react-dom";

import styles from "./styles.module.scss";

interface IClosePortal {
  onClose?: () => void;
  children?: ReactNode;
}
const Backdrop: FC<IClosePortal> = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose}></div>;
};
const ModalOverlay: FC<IClosePortal> = (props) => {
  return <div className={styles.modal}>{props.children}</div>;
};

const ModalPortal: FC<IClosePortal> = (props) => {
  const modalRoot = document.getElementById("modal");

  return (
    <Fragment>
      {/* Use createPortal to render the child at the placeholder */}
      {modalRoot &&
        ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, modalRoot)}

      {/* Use createPortal to render the child at the placeholder */}
      {modalRoot &&
        ReactDOM.createPortal(
          <ModalOverlay>{props.children}</ModalOverlay>,
          modalRoot
        )}
    </Fragment>
  );
};

export default ModalPortal;

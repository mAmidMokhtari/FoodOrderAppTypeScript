import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react";

import CartModal from "../modal/CartModal";
import ModalPortal from "../modal/ModalPortal";

interface IModalContext {
  openModal: () => void;
  closeModal: () => void;
}

const initialModalValues: IModalContext = {
  openModal: () => {},
  closeModal: () => {},
};

// Create a new context instance
const ModalContext = createContext(initialModalValues);

interface IModalProvider {
  children: ReactNode;
}

export const ModalProvider: FC<IModalProvider> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {showModal && (
        <ModalPortal onClose={closeModal}>
          <CartModal />
        </ModalPortal>
      )}
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const { openModal, closeModal } = useContext(ModalContext);

  return { openModal, closeModal };
};

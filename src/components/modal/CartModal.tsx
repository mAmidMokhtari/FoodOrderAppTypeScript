import { useState } from "react";

import { useModalContext } from "../store/useModalContext";
import styles from "./styles.module.scss";

const CartModal = () => {
  const { closeModal } = useModalContext();
  const [isShowForm, setShowForm] = useState(false);
  const showForm = () => {
    setShowForm(true);
  };

  return (
    <div className={styles.cart}>
      <ul>
        <li>
          <div className={styles.order}>
            <h2>Sushi</h2>
            <div className={styles.detail}>
              <span className={styles.price}>$22.99</span>
              <span className={styles.icon}>x 2</span>
            </div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.plus}>-</button>
            <button className={styles.plus}>+</button>
          </div>
        </li>
      </ul>
      <form>
        <header className={styles.head}>
          <h2>Total Amount</h2>
          <p>$22.99</p>
        </header>
        {isShowForm && (
          <div className={styles.form}>
            <label>Your Name</label>
            <input type="text"></input>
            <label>Street</label>
            <input type="text"></input>
            <label>Postal Code</label>
            <input type="number"></input>
            <label>City</label>
            <input type="text"></input>
          </div>
        )}
        <div className={styles.order}>
          <button className={styles["cancel-button"]} onClick={closeModal}>
            Cancel
          </button>
          {isShowForm && (
            <button
              className={styles["confirm-button"]}
              onClick={(e) => e.preventDefault()}
            >
              Confirm
            </button>
          )}
          {!isShowForm && (
            <button className={styles["confirm-button"]} onClick={showForm}>
              Order
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CartModal;

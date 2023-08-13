import { useRef, useState } from "react";

import { useDataContext } from "../store/useDataContext";
import { useModalContext } from "../store/useModalContext";
import styles from "./styles.module.scss";

interface IUserData {
  name: string;
  street: string;
  postalCode: string;
  city: string;
}

interface PostData {
  title: string[];
  body: {};
  userId: number;
}

const isEmpty = (value: string) => value.trim() === "";
const isFiveChars = (value: string) => value.trim().length === 5;

const CartModal = () => {
  const cartCtx = useDataContext();
  const { closeModal } = useModalContext();

  const [validForm, setValidForm] = useState<any>({
    nameIsValid: true,
    streetIsValid: true,
    postalIsValid: true,
    cityIsValid: true,
  });
  const nameInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const postalCodeInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const confirmHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredName = nameInputRef.current!.value;
    const enteredStreet = streetInputRef.current!.value;
    const enteredPostalCode = postalCodeInputRef.current!.value;
    const enteredCity = cityInputRef.current!.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setValidForm({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    const userData: IUserData = {
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    };
  };
  const nameControlClasses = `${styles.control} ${
    validForm.name ? "" : styles.invalid
  }`;
  const streetControlClasses = `${styles.control} ${
    validForm.street ? "" : styles.invalid
  }`;
  const postalCodeControlClasses = `${styles.control} ${
    validForm.postalCode ? "" : styles.invalid
  }`;
  const cityControlClasses = `${styles.control} ${
    validForm.city ? "" : styles.invalid
  }`;

  const [isShowForm, setShowForm] = useState(false);
  const showForm = () => {
    setShowForm(true);
  };

  return (
    <div className={styles.cart}>
      <ul>
        {cartCtx.items.map((item) => (
          <li key={item.id}>
            <div className={styles.order}>
              <h2>{item.name}</h2>
              <div className={styles.detail}>
                <span className={styles.price}>{item.price.toFixed(2)}</span>
                <span className={styles.icon}>x {item.amount}</span>
              </div>
            </div>
            <div className={styles.buttons}>
              <button
                onClick={cartCtx.removeItem.bind(null, item.id)}
                className={styles.plus}
              >
                -
              </button>
              <button
                onClick={cartCtx.addItem.bind(null, { ...item, amount: 1 })}
                className={styles.plus}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.form}>
        <header className={styles.head}>
          <h2>Total Amount</h2>
          <p>${cartCtx.totalAmount.toFixed(2)}</p>
        </header>
        {isShowForm && (
          <form>
            <div className={nameControlClasses}>
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" ref={nameInputRef} />
              {!validForm.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetControlClasses}>
              <label htmlFor="street">Street</label>
              <input type="text" id="street" ref={streetInputRef} />
              {!validForm.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={postalCodeControlClasses}>
              <label htmlFor="postal">Postal Code</label>
              <input type="text" id="postal" ref={postalCodeInputRef} />
              {!validForm.postalCode && (
                <p>Please enter a valid postal code (5 characters long)!</p>
              )}
            </div>
            <div className={cityControlClasses}>
              <label htmlFor="city">City</label>
              <input type="text" id="city" ref={cityInputRef} />
              {!validForm.city && <p>Please enter a valid city!</p>}
            </div>
          </form>
        )}
        <div className={styles.order}>
          <button
            className={styles["cancel-button"]}
            onClick={(e) => {
              e.preventDefault();
              closeModal();
            }}
          >
            Cancel
          </button>

          {!isShowForm && (
            <button
              className={styles["confirm-button"]}
              onClick={(e) => {
                e.preventDefault();
                showForm();
              }}
            >
              Order
            </button>
          )}
          {isShowForm && (
            <button
              className={styles["confirm-button"]}
              onClick={(e) => {
                e.preventDefault();
                closeModal();
                cartCtx.clearCart();
              }}
            >
              Order Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;

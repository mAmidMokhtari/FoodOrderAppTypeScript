import { useRef, useState } from "react";

import axios from "axios";

import { IFoodItem, useDataContext } from "../store/useDataContext";
import { useModalContext } from "../store/useModalContext";
import styles from "./styles.module.scss";

interface IUserData {
  name: string;
  street: string;
  postalCode: string;
  city: string;
}

interface IValidForm {
  nameIsValid: boolean;
  streetIsValid: boolean;
  postalIsValid: boolean;
  cityIsValid: boolean;
}

const CartModal = () => {
  const cartCtx = useDataContext();
  const { closeModal } = useModalContext();

  const isEmpty = (value: string) => value.trim() === "";
  const isFiveChars = (value: string) => value.trim().length === 5;

  const [validForm, setValidForm] = useState<IValidForm>({
    nameIsValid: false,
    streetIsValid: false,
    postalIsValid: false,
    cityIsValid: false,
  });
  const nameInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const postalCodeInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);

  const inputNameBlurHandler = () => {
    nameInputRef.current!.value &&
      setValidForm((prevState) => ({
        ...prevState,
        nameIsValid: true,
      }));
  };

  const postOrder = async (userData: IUserData, orderFoods: IFoodItem[]) => {
    try {
      const { data, status } = await axios.post<{
        user: IUserData;
        items: IFoodItem[];
      }>(
        "https://food-order-app-6ef33-default-rtdb.firebaseio.com/orders.json",
        { user: userData, order: cartCtx.items },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      closeModal();
      cartCtx.clearCart();

      return data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        // 👇️ error: AxiosError<any, any>
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  };

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
      nameIsValid: enteredNameIsValid,
      streetIsValid: enteredStreetIsValid,
      postalIsValid: enteredPostalCodeIsValid,
      cityIsValid: enteredCityIsValid,
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

    postOrder(userData, cartCtx.items);
  };
  const nameControlClasses = `${styles.control} ${
    validForm.nameIsValid ? "" : styles.invalid
  }`;
  const streetControlClasses = `${styles.control} ${
    validForm.streetIsValid ? "" : styles.invalid
  }`;
  const postalCodeControlClasses = `${styles.control} ${
    validForm.postalIsValid ? "" : styles.invalid
  }`;
  const cityControlClasses = `${styles.control} ${
    validForm.cityIsValid ? "" : styles.invalid
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
              <input
                type="text"
                id="name"
                ref={nameInputRef}
                onBlur={inputNameBlurHandler}
              />
              {!validForm.nameIsValid && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetControlClasses}>
              <label htmlFor="street">Street</label>
              <input type="text" id="street" ref={streetInputRef} />
              {!validForm.streetIsValid && <p>Please enter a valid street!</p>}
            </div>
            <div className={postalCodeControlClasses}>
              <label htmlFor="postal">Postal Code</label>
              <input type="text" id="postal" ref={postalCodeInputRef} />
              {!validForm.postalIsValid && (
                <p>Please enter a valid postal code (5 characters long)!</p>
              )}
            </div>
            <div className={cityControlClasses}>
              <label htmlFor="city">City</label>
              <input type="text" id="city" ref={cityInputRef} />
              {!validForm.cityIsValid && <p>Please enter a valid city!</p>}
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
                confirmHandler(e);
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

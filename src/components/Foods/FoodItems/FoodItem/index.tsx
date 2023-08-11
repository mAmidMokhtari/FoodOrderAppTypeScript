import { FC } from "react";

import styles from "./styles.module.scss";

interface IFoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

const FoodItem: FC<IFoodItem> = (props) => {
  return (
    <li className={styles["food-list-wrapper"]}>
      <div className={styles["food-detail"]}>
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <span>${props.price.toFixed(2)}</span>
      </div>
      <div className={styles["control-wrapper"]}>
        <div className={styles["amount-control"]}>
          <label htmlFor="amount">Amount</label>
          <input defaultValue={0} type="number" min="1" max="5" step="1" />
        </div>
        <button>+ Add</button>
      </div>
    </li>
  );
};

export default FoodItem;

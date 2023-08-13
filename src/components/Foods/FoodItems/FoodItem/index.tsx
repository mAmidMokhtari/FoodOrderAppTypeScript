import { FC, useState } from "react";

import { useDataContext } from "../../../store/useDataContext";
import styles from "./styles.module.scss";

interface IFoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  amount: number;
}

const FoodItem: FC<IFoodItem> = (props) => {
  const cartCtx = useDataContext();
  const [items, setItems] = useState(props);
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
          <input
            onChange={(e) =>
              setItems((prevState) => ({
                ...prevState,
                amount: parseInt(e.target.value),
              }))
            }
            defaultValue={1}
            type="number"
            min="1"
            max="5"
            step="1"
          />
        </div>
        <button onClick={cartCtx.addItem.bind(null, items)}>+ Add</button>
      </div>
    </li>
  );
};

export default FoodItem;

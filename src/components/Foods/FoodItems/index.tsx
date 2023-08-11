import FoodItem from "./FoodItem";
import styles from "./styles.module.scss";

interface IFoodMenu {
  id: string;
  name: string;
  description: string;
  price: number;
}
const FOOD_MENU: IFoodMenu[] = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];

const FoodItems = () => {
  return (
    <ul className={styles["foods-wrapper"]}>
      {FOOD_MENU.map((item) => (
        <FoodItem
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
        />
      ))}
    </ul>
  );
};

export default FoodItems;

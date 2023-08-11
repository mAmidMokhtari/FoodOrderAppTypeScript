import FoodImage from "../../assets/meals.jpg";
import FoodDescription from "./FoodDescription";
import FoodItems from "./FoodItems";
import styles from "./styles.module.scss";

const Foods = () => {
  return (
    <div className={styles.container}>
      <div className={styles["image-wrapper"]}>
        <img src={FoodImage} alt="A table full of food" />
      </div>
      <FoodDescription />
      <FoodItems />
    </div>
  );
};

export default Foods;

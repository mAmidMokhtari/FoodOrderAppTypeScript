import React, { useEffect, useState } from "react";

import axios from "axios";

import FoodItem from "./FoodItem";
import styles from "./styles.module.scss";

interface IFoodMenu {
  id: string;
  name: string;
  description: string;
  price: number;
}

const FoodItems = () => {
  const [loadFood, setLoadFood] = useState<IFoodMenu[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<IFoodMenu[]>(
          "https://food-order-app-6ef33-default-rtdb.firebaseio.com/meals.json"
        );

        const foodMenu: IFoodMenu[] = [];
        for (const key in response.data) {
          foodMenu.push({
            id: key,
            name: response.data[key].name,
            description: response.data[key].description,
            price: response.data[key].price,
          });
        }
        setLoadFood(foodMenu);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setHttpError(error?.message);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className={styles.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <ul className={styles["foods-wrapper"]}>
      {loadFood.map((item) => (
        <FoodItem
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
          amount={1}
        />
      ))}
    </ul>
  );
};

export default FoodItems;

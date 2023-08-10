import Cart from "./Cart";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <h1>Food Order App</h1>
        </div>
        <Cart cartCounter={3} />
      </div>
    </div>
  );
};

export default Header;

import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from "react";

export interface IFoodItem {
  id: string;
  name: string;
  amount: number;
  price: number;
}

interface IDataContext {
  items: IFoodItem[];
  totalAmount: number;
  addItem: (item: IFoodItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const initialDataValues: IDataContext = {
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
};

// Create a new context instance
const CartContext = createContext(initialDataValues);

interface IDataProvider {
  children: ReactNode;
}

interface IStoreItems {
  items: IFoodItem[];
  totalAmount: number;
}

const defaultCartState: IStoreItems = {
  items: [],
  totalAmount: 0,
};

type IAction =
  | { type: "CLEAR" }
  | { type: "ADD"; item: IFoodItem }
  | { type: "REMOVE"; id: string };

const cartReducer = (state: IStoreItems, action: IAction) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // updatedItems = state.items.concat(action.item);
      updatedItems = [...state.items, action.item];
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

export const DataProvider: FC<IDataProvider> = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  // useEffect(() => {
  //   const postCartItems = async (cartItems: IStoreItems) => {
  //     try {
  //       const { data } = await axios.post<{
  //         items: IStoreItems;
  //       }>(
  //         "https://food-order-app-6ef33-default-rtdb.firebaseio.com/cartItems.json",
  //         { cartItems: cartState },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Accept: "application/json",
  //           },
  //         }
  //       );

  //       return data;
  //     } catch (error: any) {
  //       if (axios.isAxiosError(error)) {
  //         console.log("error message: ", error.message);
  //         // 👇️ error: AxiosError<any, any>
  //         return error.message;
  //       } else {
  //         console.log("unexpected error: ", error);
  //         return "An unexpected error occurred";
  //       }
  //     }
  //   };

  //   cartState.items.length > 0 && postCartItems(cartState);
  // }, [cartState]);

  const addItemToCartHandler = (item: IFoodItem) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id: string) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

// export const useDataContext = () => {
//   const { items, totalAmount, addItem, removeItem, clearCart } =
//     useContext(CartContext);

//   return { items, totalAmount, addItem, removeItem, clearCart };
// };
export const useDataContext = () => {
  const { items, totalAmount, addItem, removeItem, clearCart } =
    useContext(CartContext);

  const memoizedData = useMemo(
    () => ({
      items,
      totalAmount,
      addItem,
      removeItem,
      clearCart,
    }),
    [items, totalAmount, addItem, removeItem, clearCart]
  );

  return memoizedData;
};

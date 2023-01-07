import React from "react";
import { cloneElement } from "react";
import CartItem from "./CartItem";
import cartItems from "./data";


const AppContext=React.createContext();

const AppProvider = ({children}) => {
  const[cart, setCartItems]=React.useState(cartItems);
  const[loading, setLoading]=React.useState(false);
  const[total, setTotal]=React.useState(0);

  const clearCart = () => {
    setCartItems([]);
  }

  const removeCart = (id) => {
    let remainedItems=cart.filter((cartItems) => cartItems.id !== id);
    setCartItems(remainedItems);
  }


  const increaseItem = (id) => {
    let carts=cart.map((cartItem) => {
      if(cartItem.id === id) {
        return {...cartItem, amount: cartItem.amount+1}
      }
        return cartItem;
    })
    setCartItems(carts);
  }


  const decreaseItem = (id) => {
    let carts=cart.map((cartItem) => {
      if(cartItem.id === id) {
        return {...cartItem, amount: cartItem.amount-1}
      }
    return cartItem
    })
    let remainedCarts=carts.filter((item) => {return item.amount !==0 })
    setCartItems(remainedCarts);
  }

  React.useEffect (() => {
    let total = cart.reduce((acc, curr) => {
      return acc+curr.price*curr.amount
    }, 0)
    setTotal(total.toFixed(2));
  }, [cart])


  return <AppContext.Provider value={{
    cart,
    loading,
    clearCart,
    removeCart,
    increaseItem,
    decreaseItem,
    total
  }}>

    {children}
  </AppContext.Provider>
}

export {AppProvider, AppContext};


export const useGlobalContext = () => {
  return React.useContext(AppContext);
}
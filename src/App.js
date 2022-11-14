import { Fragment, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartShowm, setCartShown] = useState(false)

  const shwoCartHandler = () => {
    setCartShown(true)
  }

  const hideCartHandlr = () => {
    setCartShown(false)
  }

  return (
    <CartProvider>
      { cartShowm && <Cart onCloseCart={hideCartHandlr} />}
      <Header onShowCart={shwoCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;

import React, { useState } from 'react';

import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)

  const showCartHandler = () => {
    setCartIsShown(true)
  }

  const hideCartHandler = () => {
    setCartIsShown(false)
  }

  return (
    // 모든 컴포넌트는 CartProvider의 데이터들을 사용해야 하기때문에 Fragment대신 CartProvider로 대체한다
      <CartProvider>

        {/* <Cart/> */}
        {/* cartIsShown이 true면 cart가 보이고, false면 안 보임 */}
        {cartIsShown && <Cart onCloseCart={hideCartHandler}/>}

        <Header onShowCart={showCartHandler}/>

        <main>
          <Meals/>
        </main>

      </CartProvider>
  );
}

export default App;

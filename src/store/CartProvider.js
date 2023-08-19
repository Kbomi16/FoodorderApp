// 음식이 이미 장바구니에 있는지 여부를 확인하기 위해 + 삭제용 : useReducer
import { useReducer } from 'react';

import CartContext from './cart-context';

// 기본 장바구니 값
const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    // concat: 새로운 배열 만들기
    // action.item: 장바구니에 추가될 항목
    const updatedItems = state.items.concat(action.item);

    // 총 금액 계산
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    // 계산 후 최종 업데이트된 항목과 총 금액을 반환한다
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: 'ADD', item: item});
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE', id: id});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
import { useContext, useState } from 'react';
import React from 'react';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

  const cartCtx = useContext(CartContext)

  const totalAmount = `${cartCtx.totalAmount}원`
  const hasItems = cartCtx.items.length > 0

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id)
  }
  const cartItemAddHandler = item => {
    cartCtx.addItem({...item, amount: 1})
  }

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true)

    await fetch('https://foodorderapp-48c1e-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItems: cartCtx.items,
      })
    })
    // 해당 요청 완료 후
    setIsSubmitting(false)
    setDidSubmit(true)
    // 주문 완료 후 장바구니 비우기
    cartCtx.clearCart()
  }


  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem 
        key={item.id} 
        name={item.name} 
        amount={item.amount} 
        price={item.price}
        // 추가, 삭제된 항목의 id가 remove 핸들러로 전달
        onRemove = {cartItemRemoveHandler.bind(null, item.id)}
        onAdd = {cartItemAddHandler.bind(null, item)}/>
      ))}
    </ul>
  )

  const modalActions = (
  <div className={classes.actions}>
  {hasItems && <button className={classes.button} onClick={orderHandler}>주문하기</button>}
  <button className={classes['button--alt']} onClick={props.onCloseCart}>닫기</button>
</div>
  )

  const cartModalContent = (
  <React.Fragment>
  {cartItems}
  <div className={classes.total}>
    <span>총액</span>
    <span>{totalAmount}</span>
  </div>

      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart} />}
      {!isCheckout && modalActions}
  </React.Fragment>
  )

  const isSubmittingModalContent = <p>주문 데이터 전송 중...</p>

  const didSubmitModalContent = (
    <React.Fragment>
      <p>주문이 완료되었습니다!</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onCloseCart}>
        닫기
      </button>
    </div>
    </React.Fragment>
  )

  return (
    <Modal onClose={props.onCloseCart}>
      {/* 제출 중이지 않거나 제출이 아직 이루어지지 않은 경우 cartModalContent를 보여줌. */}
      {!isSubmitting && !didSubmit && cartModalContent}
      {/* 제출 중일 때 "주문 데이터 전송 중..."이 뜸 */}
      {isSubmitting && isSubmittingModalContent}
      {/* 제출이 완료되었을 때 "주문이 완료되었습니다!" 뜸 */}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}

export default Cart
import { useContext, useState } from 'react';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState()

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

  const modalActions = 
  <div className={classes.actions}>
  {hasItems && <button className={classes.button} onClick={orderHandler}>주문하기</button>}
  <button className={classes['button--alt']} onClick={props.onCloseCart}>닫기</button>
</div>

  return (
    <Modal onClose={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>총액</span>
        <span>{totalAmount}</span>
      </div>

      {isCheckout && <Checkout onCancel={props.onCloseCart} />}
      {!isCheckout && modalActions}

      
    </Modal>
  )
}

export default Cart
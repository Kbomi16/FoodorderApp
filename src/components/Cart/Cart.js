import classes from './Cart.module.css';
import Modal from '../UI/Modal';

const Cart = (props) => {
  const cartItems = (
    <ul className={classes['cart-items']}>
      {[{ id: 'm1', name: '캐슈 국물 떡국', amount: 2, price: 11000 }].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  )

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>전체 수량</span>
        <span>22000원</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']}>닫기</button>
        <button className={classes.button}>주문하기</button>
      </div>
    </Modal>
  )
}

export default Cart
import { useContext } from "react"

import CartIcon from "../Cart/CartIcon"
import classes from './HeaderCartButton.module.css'
import CartContext from "../../store/cart-context"

const HeaderCartButton = props => {
  const cartCtx = useContext(CartContext)

  // reduce(): 데이터 배열을 값 하나로 변환
  const  numberOfCartItems = cartCtx.items.reduce((nowNum, item) => {
    // CarItem 객체에 amount가 있어서 항목 유형별로 항목 수를 저장할 수 있음
    return nowNum + item.amount
  }, 0)

  return(
    <button className={classes.button} onClick = {props.onClick}>
      <span className={classes.icon}>
        <CartIcon/>
      </span>
      <span>
        장바구니
      </span>
      <span className={classes.badge}>
        {numberOfCartItems}
      </span>
    </button>
  )
}

export default HeaderCartButton
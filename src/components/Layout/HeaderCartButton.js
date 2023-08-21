import { useContext, useEffect, useState } from "react"

import CartIcon from "../Cart/CartIcon"
import classes from './HeaderCartButton.module.css'
import CartContext from "../../store/cart-context"

const HeaderCartButton = props => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)

  const cartCtx = useContext(CartContext)

  // reduce(): 데이터 배열을 값 하나로 변환
  const  numberOfCartItems = cartCtx.items.reduce((nowNum, item) => {
    // CarItem 객체에 amount가 있어서 항목 유형별로 항목 수를 저장할 수 있음
    return nowNum + item.amount
  }, 0)

  const {items} = cartCtx

  // 장바구니에 상품 추가될 때 애니메이션 발생(useEffect)
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    // 장바구니에 항목이 하나 이상있는 경우만 실행되어야 함
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]); // cartCtx를 쓰면 이펙트가 cartCtx가 바뀔 때마다 항상 다시 실행됨

  return(
    <button className={btnClasses} onClick = {props.onClick}>
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
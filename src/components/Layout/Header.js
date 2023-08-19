import { Fragment } from "react"

import mealsImage from '../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton"

const Header = props => {
  return (
  <Fragment>
    <header className={classes.header}>
      <h1>FoodOrder</h1>
      
      {/* 장바구니 버튼 클릭시 App.js의 onShowCart가 실행됨 */}
      <HeaderCartButton onClick={props.onShowCart}/>
    </header>
    <div className={classes['main-image']}>
      <img src={mealsImage} alt="맛있는 음식이 있어요!"/>
    </div>
  </Fragment>
  )
}

export default Header
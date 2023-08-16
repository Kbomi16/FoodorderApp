import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'

const MealItemForm = props => {
  return(
    <form className={classes.form}>
      {/* <input/> */}
      {/* 값으로 전달되는 자바스크립트 표현 */}
      {/* input 기본 요소 */}
      <Input 
      label="수량" 
      input={{
        id: 'amount_' + props.id,
        type: 'number',
        min: '1',
        max: '5',
        step: '1',
        defaultValue: '1'
      }}/>
      <button>+ 담기</button>
    </form>
  )
}

export default MealItemForm
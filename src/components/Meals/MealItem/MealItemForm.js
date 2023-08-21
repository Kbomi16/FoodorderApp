import { useRef, useState } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {
  const [amountIsValid, setAmountIsValid] = useState(true)

  const amountInputRef = useRef()

  // input.js에서 입력된 amount를 가져올 것임
  const submitHandler = event => {
    // 브라우저가 기본적으로 페이지를 다시 로드하는 것을 방지
    event.preventDefault();

    // useRef로 생성된 ref에 대해서는 항상 current씀
    // ref에 저장된 input 요소를 가리킴
    const enteredAmount = amountInputRef.current.value
    // 항상 value 값은 문자열이라 +를 붙여 숫자로 만듦
    const enteredAmountNumber = +enteredAmount

    // 에러
    if(enteredAmount.trim().length === 0 || 
    enteredAmountNumber < 1 || 
    enteredAmountNumber > 5) {
      setAmountIsValid(false)
      return
    } 

    // 추가하려는 장바구니 항목은 입력된 수량 외에도 더 많은 데이터 필요
    // 장바구니에는 수량만 필요
    props.onAddToCart(enteredAmountNumber)
  }

  return(
    <form className={classes.form} onSubmit={submitHandler}>
      {/* <input/> */}
      {/* 값으로 전달되는 자바스크립트 표현 */}
      {/* input 기본 요소 */}
      <Input 
      ref={amountInputRef}
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
      {/* 에러 메시지 */}
      {!amountIsValid && <p>유효한 값을 입력해주세요.(1-5)</p>}
    </form>
  )
}

export default MealItemForm
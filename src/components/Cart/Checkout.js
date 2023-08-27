import { useRef, useState } from 'react';

import classes from './Checkout.module.css'

const isEmpty = value => value.trim() === ''

// 현재 입력 필드들의 유효성 상태를 나타내는 상태 변수 
// 각 필드에 대한 유효성 상태는 초기값으로 true가 설정
const Checkout = props => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    address: true,
    phone: true,
    demand: true 
  })

  // 이름, 주소, 전화번호, 요청사항의 입력 요소에 대한 참조를 생성
  const nameInputRef = useRef()
  const addressInputRef = useRef()
  const phoneInputRef = useRef()
  const demandInputRef = useRef()

  // 입력된 값들을 참조를 통해 가져와 유효성을 검사하고, 검사 결과에 따라 에러 표시를 업데이트하고 주문을 확인
  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value
    const enteredAddress = addressInputRef.current.value
    const enteredPhone = phoneInputRef.current.value
    const enteredDemand = demandInputRef.current.value

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredAddressIsValid = !isEmpty(enteredAddress)
    const enteredPhoneIsValid = !isEmpty(enteredPhone)
    const enteredDemandIsValid = !isEmpty(enteredDemand)

    setFormInputsValidity({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      phone: enteredPhoneIsValid,
      demand: enteredDemandIsValid 
    })

    // 양식 값이 모두 입력되었을 때
    const formIsValid = enteredNameIsValid && enteredAddressIsValid && enteredPhoneIsValid && enteredDemandIsValid
  
    if(!formIsValid) {
      return
    }
    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      phone: enteredPhone,
      demand: enteredDemand,
    })
    }

    // 만약 해당 필드의 유효성이 false인 경우 classes.invalid 클래스를 추가하여 에러 스타일을 적용한다.
    const nameControlClasses = `${classes.control} ${
      formInputsValidity.name ? '' : classes.invalid
    }`;
    const addressControlClasses = `${classes.control} ${
      formInputsValidity.street ? '' : classes.invalid
    }`;
    const phoneControlClasses = `${classes.control} ${
      formInputsValidity.postalCode ? '' : classes.invalid
    }`;
    const demandControlClasses = `${classes.control} ${
      formInputsValidity.city ? '' : classes.invalid
    }`;

  return(
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>이름</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputsValidity.name && <p>이름을 입력해주세요.</p>}
      </div>

      <div className={addressControlClasses}>
        <label htmlFor='address'>주소</label>
        <input type='text' id='address' ref={addressInputRef}/>
        {!formInputsValidity.address && <p>주소를 입력해주세요.</p>}
      </div>

      <div className={phoneControlClasses}>
        <label htmlFor='phone'>전화번호</label>
        <input type='text' id='phone' placeholder='"-"표시 없이 번호만 작성하세요.' ref={phoneInputRef}/>
        {!formInputsValidity.phone && <p>전화번호를 입력해주세요.</p>}
      </div>

      <div className={demandControlClasses}>
        <label htmlFor='demand'>요청사항</label>
        <input type='text' id='demand' ref={demandInputRef}/>
        {!formInputsValidity.demand && <p>요청사항을 입력해주세요.</p>}
      </div>

      <div className={classes.actions}>
        <button className={classes.submit}>확인</button>
        <button type='button' onClick={props.onCancel}>취소</button>
      </div>
      
    </form>
  )
}

export default Checkout
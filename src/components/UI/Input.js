import classes from './Input.module.css'
import React from 'react'

// 컴포넌트 함수는 forwarRef의 인수가 된다.
const Input = React.forwardRef((props, ref) => {
  return(
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* input객체에 있는 모든 키-값 쌍이 input에 나옴 */}
      {/* input 기본 요소 */}
      <input ref={ref} {...props.input} />
    </div>
  )
})

export default Input
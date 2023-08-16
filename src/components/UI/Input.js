import classes from './Input.module.css'

const Input = props => {
  return(
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* input객체에 있는 모든 키-값 쌍이 input에 나옴 */}
      {/* input 기본 요소 */}
      <input {...props.input} />
    </div>
  )
}

export default Input
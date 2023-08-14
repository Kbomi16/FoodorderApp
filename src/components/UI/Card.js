import classes from './Card.module.css'

// props.children에 접근할거임
const Card = props => {
  return(
    <div className={classes.card}>
      {props.children}
    </div>
  )
}

export default Card
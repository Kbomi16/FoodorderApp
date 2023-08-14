import MealsSummaty from './MealsSummary'
import AvailableMeals from './AvailableMeals'
import { Fragment } from 'react'

const Meals = () => {
  return(
    <Fragment>
      <MealsSummaty/>
      <AvailableMeals/>
    </Fragment>
  )
}

export default Meals
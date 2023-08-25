import { useEffect, useState } from 'react';

import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState(null)

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true)

      const response = await fetch('https://foodorderapp-48c1e-default-rtdb.firebaseio.com/meals.json')
      
      // 오류났을 때
      if(!response.ok) {
        throw new Error('알 수 없는 오류가 발생했습니다!')
      }
      
      const responseData = await response.json()

      const loadedMeals = []

      for(const key in responseData) {
        loadedMeals.push({
          // key는 개별 meals의 id
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price          
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    } 

    // try {
    //   fetchMeals()
    // } catch(error) {
    //   setIsLoading(false)
    //   setHttpError(error.message)
    // }
    fetchMeals().catch(error => {
      setIsLoading(false)
      setHttpError(error.message)
    })
  }, [])

  // meals를 매핑하기전에 확인
  if(isLoading) {
    return (
    <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>
    )
  }

  if(httpError) {
    return(
      <section className={classes.MealsLoading}>
      <p>{httpError}</p>
    </section>
    )
  }

  const mealsList = meals.map(meal => 
    <MealItem
    id={meal.id}
    key={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price}
  />
  )

  return(
    <section className={classes.meals}>
      <Card>
        <ul>
        {mealsList}
      </ul>
      </Card>
      
    </section>
  )
}

export default AvailableMeals
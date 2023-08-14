import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem';

// 음식배열
const DUMMY_MEALS = [
  {
    id: 'm1',
    name: '캐슈 국물 떡국',
    description: '사골 대신 캐슈 드슈!',
    price: 11000,
  },
  {
    id: 'm2',
    name: '비건 라따뚜이',
    description: ' 프랑스식 채소 스튜 라따뚜이',
    price: 15000,
  },
  {
    id: 'm3',
    name: '두부 동그랑땡',
    description: '색도 맛도 예쁜!',
    price: 8000,
  },
  {
    id: 'm4',
    name: '채소 전골',
    description: ' 채소와 다시마가 우러난 전골의 따듯하고 담백한 맛',
    price: 19000,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map(meal => 
  <MealItem 
    key={meal.id} 
    name={meal.name} 
    description = {meal.description}
    price = {meal.price}
  />)

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
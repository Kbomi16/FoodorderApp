import classes from './MealsSummary.module.css'

const MealsSummary = () => {
  return ( 
  <section className={classes.summary}>
    <h2> 건강한 음식을, 당신에게로. </h2> 
    <p> 다양한 종류의 식사 중에서 가장 좋아하는 식사를 선택하세요. <br/>그리고 집에서 맛있는 식사를 하세요!</p> 
    <p> 우리의 모든 식사는 최고의 셰프가 양질의 재료로 요리합니다.</p> 
    </section>
  )
}

export default MealsSummary
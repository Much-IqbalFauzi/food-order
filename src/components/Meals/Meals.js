import React, { Fragment } from 'react'
import AvalableMeals from './AvalableMeals'
import MealsSummary from './MealsSummary'

const Meals = () => {
  return (
    <Fragment>
        <MealsSummary />
        <AvalableMeals />
    </Fragment>
  )
}

export default Meals
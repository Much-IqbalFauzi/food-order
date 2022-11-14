import React from 'react'
import Card from '../UI/Card';

import styles from './AvailableMeals.module.css'
import MealItem from './MealsItem/MealItem';

const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },
];


const AvalableMeals = () => {

    const miscMeals = DUMMY_MEALS.map((meals) => (
        <MealItem 
            key={meals.id} 
            id={meals.id} 
            title={meals.name} 
            description={meals.description} 
            price={meals.price} />
    ))

    return (
        <section className={styles['meals']}>
            <ul>
                <Card>{miscMeals}</Card>
            </ul>
            
        </section>
  )
}

export default AvalableMeals
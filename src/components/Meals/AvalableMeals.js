import React, { useEffect, useState } from 'react'
import Card from '../UI/Card';

import styles from './AvailableMeals.module.css'
import MealItem from './MealsItem/MealItem';

const AvalableMeals = () => {

    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [err, setErr] = useState()
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://react-swapi-a1040-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json')
            
            if(!response.ok) {
                console.info('something wrong')
                throw new Error('Something wrong!')
            }

            const data = await response.json()

            const mealsData = []

            for (const key in data) {
                mealsData.push({...data[key], id: key})
            }
            setMeals(mealsData)
            setIsLoading(false)
        }
        
        fetchData().catch((error) => {
            setIsLoading(false)
            setErr(error.message)
        })
        
    }, [])


    if (isLoading) {
        return (
            <section className={styles['meals-loading']}>
                <p>Loading. . . </p>
            </section>
        )
    }

    if (err) {
        return (
            <section className={styles['meals-loading']}>
                <p>{err}</p>
            </section>
        )
    }

    const miscMeals = meals.map((meal) => (
        <MealItem 
            key={meal.id} 
            id={meal.id} 
            title={meal.name} 
            description={meal.description} 
            price={meal.price} />
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
"use client"
import React, { useState } from 'react'
import dishesData  from './DataDishes'
import { useDispatch } from 'react-redux';
import { addCart } from '../ReduxToolKit/Slices/cartFunc';
interface IDishes {
    id: number;
    name: string;
    price: number;
    
}
export default function DishList() {
    const dataDishes: IDishes[] =dishesData
    
    const dispatch = useDispatch()
    const handleAddToCart = (dish: IDishes) => {
        dispatch(addCart(dish))
        console.log("clicked")
    }
    
    
  return (
    <section>
        <div className='flex flex-col justify-center align-middle text-center mt-5 py-4'>
            <h1 className='font-bold text-2xl'>Dish List</h1>
            <p className='text-lg font-extralight'>Here are all the dishes.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
            {dataDishes.map((dish) => (
                <div key={dish.id} className="bg-blue-200 p-4">
                    <p className='text-lg font-serif'>Dish Name: {dish.name}</p>
                    <p className='text-lg font-serif'>Price : {dish.price}$</p>
                    <button onClick={() => handleAddToCart(dish)}  className='p-2 bg-blue-700 text-white'>Add to cart</button>
                </div>
            ))}
        
        </div>
    </section>
  )
}

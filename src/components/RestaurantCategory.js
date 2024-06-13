import React from 'react';
import CategoryItems from './CategoryItems';
import { useState } from 'react';

const RestaurantCategory = ({foodData, expand, changeIndexValue}) => {

  // const [expand, setExpand] = useState(false)

  const toggleExpand = () => {
    changeIndexValue();
  }

  console.log('Expand ',expand)

  return (
    <div>
        <div className='mx-auto my-4 w-1/2 p-2 bg-gray-100 shadow-lg'>
            <div className='flex justify-between cursor-pointer' onClick={toggleExpand}>
                <h1 className='font-bold text-lg'>{foodData.title} ({foodData.itemCards.length})</h1>
                {
                  expand ? <p className='text-sm'>&#708;</p> : <p className='text-sm'>&#709;</p>
                }
                
            </div>

            {expand &&  
            foodData.itemCards.map((item) => <CategoryItems key={item.card.info.name} item={item}/>)}
            
        </div>
    </div>
  )
}


export default RestaurantCategory;
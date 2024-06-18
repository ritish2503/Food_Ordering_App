import React from 'react';
import { CDN_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';

const CategoryItems = ({item}) => {
    // console.log('items :',item);

  const {name,description, itemAttribute, imageId, price, defaultPrice, ratings} = item.card.info;
  // console.log(itemAttribute.vegClassifier);

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
      //Dispatch an action to reducer to add item
      dispatch(addItem(item));
  }

  return (
    <div className='flex justify-between my-4 border-b-2 border-gray-400'>
      <div className='w-9/12'>
        <p className='text-sm'>{itemAttribute.vegClassifier === 'VEG' ? '🟢' : '🔴'}</p>
        <p className='font-bold'>{name}</p>
        <p className='font-bold'>&#x20B9;{price ? price/100 : defaultPrice/100}</p>
        <p className='mb-4 text-sm'>{description}</p>
      </div>
      <div className='w-3/12'>
        <div className='absolute'>
          <button onClick={() => handleAddItem(item)}
            className='w-24 h-8 text-green-600 font-bold bg-white z-10 ml-11 rounded-2xl shadow-lg mt-[136px]'>
            ADD
          </button>
        </div>
        <img src={CDN_URL + imageId} alt="food-image" className='p-8' />
      </div>
    </div>
  )
}

export default CategoryItems;
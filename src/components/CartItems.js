import React from 'react';
import { CDN_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeItem } from '../utils/cartSlice';

const CartItems = ({cartItem}) => {

    const {name,description, itemAttribute, imageId, price, defaultPrice} = cartItem.card.info;
    const dispatch = useDispatch();

    const handleRemoveItem = (cartItem) => {
        dispatch(removeItem(cartItem));
    }

  return (
    <div className='mx-auto my-4 w-1/2 p-2 bg-gray-100 shadow-lg'>
        <div className='flex justify-between my-4 border-gray-400'>
            <div className='w-9/12'>
                <p className='text-sm'>{itemAttribute.vegClassifier === 'VEG' ? '🟢' : '🔴'}</p>
                <p className='font-bold'>{name}</p>
                <p className='font-bold'>&#x20B9;{price ? price/100 : defaultPrice/100}</p>
                <p className='mb-4 text-sm'>{description}</p>
            </div>
            <div className='w-3/12'>
                <div className='absolute'>
                <button onClick={() => handleRemoveItem(cartItem)}
                    className='w-24 h-8 text-green-600 font-bold bg-white z-10 ml-11 rounded-2xl shadow-lg mt-[136px]'>
                    Remove
                </button>
                </div>
                <img src={CDN_URL + imageId} alt="food-image" className='p-8' />
            </div>
        </div>
    </div>
  )
}

export default CartItems;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItems from './CartItems';
import { clearCart } from '../utils/cartSlice';
// import { clearCart } from '../utils/cartSlice';

const Cart = () => {

    //Subscribing to store
    const cartItemList = useSelector((store) => store.cart.items);
    console.log('Cart :', cartItemList);
    // console.log('name:', cartItemList[0].card.info.name)
    const dispatch = useDispatch();

    const handleClearItems = () => {
        dispatch(clearCart());
    }

    return (
        <div className='m-4 p-4'>
            <h1 className='font-bold text-2xl text-center'>Cart</h1>
            {cartItemList &&
                cartItemList.map((item) => <CartItems key={item.card.info.name} cartItem={item} />)
            }
            <div className='mx-auto my-4 w-1/2'>
                {cartItemList.length === 0 ? 
                    <h1 className='font-bold text-xl text-center'>Your cart is empty😞! Please add some items to proceed.</h1>
                    :
                    <button onClick={handleClearItems}
                        className='w-full p-2 bg-yellow-300 font-bold text-xl rounded-2xl shadow-2xl'>
                        Clear Cart
                    </button>
                }
            </div>
        </div>
    )
}

export default Cart;
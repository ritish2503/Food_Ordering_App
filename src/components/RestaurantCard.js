import React from 'react';
import { CDN_URL } from '../utils/constants';

const RestaurantCard = ({ resData }) => {

    const {cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla} = resData?.info;    

    return (
        <div className="m-4 p-4 w-[270px] rounded-lg bg-gray-200 hover:bg-gray-300 hover:-translate-y-5">
            <img className="rounded-lg hover:scale-105" src={CDN_URL + cloudinaryImageId} alt="res-image" />
            <h2 className='font-bold py-4 text-lg'>{name}</h2>
            <h4 className=''>{cuisines.join(', ')}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{costForTwo}</h4>
            <h4>{sla?.slaString}</h4>
        </div>
    )
}

export default RestaurantCard;

import React from 'react';
import { CDN_URL } from '../utils/constants';

const RestaurantCard = ({ resData }) => {

    const {cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla} = resData?.info;

    return (
        <div className="restaurant-card">
            <img className="res-logo" src={CDN_URL + cloudinaryImageId} alt="Meghana Foods" />
            <h3>{name}</h3>
            <h4>{cuisines.join(', ')}</h4>
            <h4>{avgRating} stars</h4>
            <h4>{costForTwo}</h4>
            <h4>{sla.slaString}</h4>
        </div>
    )
}

export default RestaurantCard;
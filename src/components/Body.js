import React, { useState } from 'react';
import RestaurantCard from './RestaurantCard';
import resList from '../utils/mockData';

const Body = () => {

    const [restaurantsList, setRestaurantsList] = useState(resList);

    const FilterTopRestaurants = () => {
        const updatedList = restaurantsList.filter(res => res.info.avgRating >= 4.5);
        setRestaurantsList(updatedList);
    }

    return (
        <div className="body">
            {/* <div className="search-container">Search</div> */}
            <div className="filter">
                <button className='filter-btn' onClick={FilterTopRestaurants}>Top Rated Restaurant</button>
            </div>
            <div className="restaurant-container">
                {
                    restaurantsList.map((restaurant) => (
                        <RestaurantCard key={restaurant.info.id} resData={restaurant} />
                    ))
                }
            </div>
        </div>
    )
}

export default Body
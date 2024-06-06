import React, { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import Shimmer from './Shimmer';
// import resList from '../utils/mockData';


const Body = () => {

    const [restaurantsList, setRestaurantsList] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState('');

    //Whenever state variable updates, react triggers a re-conciliation cycle.
    //console.log("Body rendered : " ,searchText);

    //const API_URL = 'https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';
    const API_URL = 'https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.96340&lng=77.58550&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';


    const FilterTopRestaurants = () => {
        const updatedList = restaurantsList.filter(res => res.info.avgRating > 4);
        setRestaurantsList(updatedList);
    }

    const searchRestaurant = () => {
        const filteredRes = restaurantsList.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredRestaurant(filteredRes);
    }

    const fetchData = async () => {
        const response = await fetch(API_URL,{
            headers: {
                'x-cors-api-key' : 'temp_416f8e8c644f7f4a2b29b8338ff1efb6'
            }
        });

        const result = await response.json();

        setRestaurantsList(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }


    useEffect(() => {
        fetchData();
    }, [])


    return restaurantsList.length === 0 ? (
        <Shimmer />
        ) : 
        (
            <div className="body">
                <div className="filter-search">
                    <div className="search">
                        <input type="text" className='search-box' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        <button className='search-btn' onClick={searchRestaurant}>Search</button>
                    </div>
                    <div className="filter">
                        <button className='filter-btn' onClick={FilterTopRestaurants}>Top Rated Restaurant</button>
                    </div>
                </div>

                <div className="restaurant-container">
                    {
                        filteredRestaurant.map((restaurant) => (
                            <RestaurantCard key={restaurant.info.id} resData={restaurant} />
                        ))
                    }
                </div>
            </div>
        )
}

export default Body;


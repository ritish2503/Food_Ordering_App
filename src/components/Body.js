import React, { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import useFetchAPIData from '../utils/useFetchAPIData';
import { API_URL, PROXY_URL } from '../utils/constants';


const Body = () => {

    const onlineStatus = useOnlineStatus();
    const list = useFetchAPIData();

    const [restaurantsList, setRestaurantsList] = useState(null);
    const [filteredRestaurant, setFilteredRestaurant] = useState(null);
    const [searchText, setSearchText] = useState('');

    //Whenever state variable updates, react triggers a re-conciliation cycle.
    //console.log("Body rendered : " ,searchText);


    useEffect(() => {
        setRestaurantsList(list);
        setFilteredRestaurant(list);
    },[list])


    const FilterTopRestaurants = () => {
        const updatedList = restaurantsList.filter(res => res.info.avgRating > 4.2);
        setFilteredRestaurant(updatedList);
        
    }

    console.log('Filtered :',filteredRestaurant)
    const searchRestaurant = () => {
        if(searchText.length > 0){
            const filteredRes = restaurantsList.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
            setFilteredRestaurant(filteredRes);
        }else{
            setFilteredRestaurant(list);
        }

    }


    if(onlineStatus === false){
        return (
            <div>
                <h1>Looks like you're offline!</h1>
                <h3>Please consider connecting to the internet.</h3>
            </div>
        )
    }


    return list.length === 0 ? (
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
                        <Link to={'/restaurants/' + restaurant.info.id} key={restaurant.info.id}><RestaurantCard resData={restaurant} /></Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Body;


import React, { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import useFetchAPIData from '../utils/useFetchAPIData';


const Body = () => {

    const onlineStatus = useOnlineStatus();
    const list = useFetchAPIData();

    const [restaurantsList, setRestaurantsList] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [theme, setTheme] = useState('bg-white');

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

    // console.log('Filtered :',filteredRestaurant)
    const searchRestaurant = () => {
        if(searchText.length > 0){
            const filteredRes = restaurantsList.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
            setFilteredRestaurant(filteredRes);
        }else{
            setFilteredRestaurant(list);
        }

    }

    const toggleTheme = () => {
        const updatedTheme = theme === 'bg-white' ? 'bg-zinc-900' : 'bg-white';
        setTheme(updatedTheme);
    }


    if(onlineStatus === false){
        return (
            <div>
                <h1>Looks like you're offline!</h1>
                <h3>Please consider connecting to the internet.</h3>
            </div>
        )
    }


    return restaurantsList.length === 0 ? (
        <Shimmer />
    ) :
    (
        <div className={`${theme}`}>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <div className="m-2 p-4">
                        <input type="text" className='p-1 border border-1 border-solid border-black rounded-lg hover:shadow-lg' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        <button className='px-6 py-1 m-3 bg-green-300 rounded-lg' onClick={searchRestaurant}>Search</button>
                    </div>
                    <div className="m-2 p-4">
                        <button className='px-6 py-1 m-3 bg-gray-200 rounded-lg' onClick={FilterTopRestaurants}>Top Rated Restaurant</button>
                    </div>

                </div>
                <div className='m-4 p-4 flex justify-center items-center'>
                    <span className='px-2 text-gray-400'>Light / Dark</span>
                    <label htmlFor="switch" className='w-16 h-8 bg-gray-300 rounded-full relative cursor-pointer'>
                        <input type="checkbox" name="switch" id="switch" className='sr-only peer' onClick={toggleTheme}/>
                        <span className='w-2/5 h-4/5 bg-black absolute rounded-full left-1 top-1
                            peer-checked:bg-white peer-checked:left-9 transition-all duration-500'>
                        </span>
                    </label>
                </div>
            </div>

            <div className="flex flex-wrap justify-evenly">
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


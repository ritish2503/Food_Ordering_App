import React, { useState, useEffect } from 'react';
import Shimmer from './Shimmer';
import { MENU_API, PROXY_URL } from '../utils/constants';
import { useParams } from 'react-router-dom';

const RestaurantMenuInfo = () => {

    const [resInfo, setResInfo] = useState(null);

    const params = useParams();
    console.log(params)
    const {restaurantId} = params;

    useEffect(() => {
        fetchMenu();
    }, []);


    //https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.96340&lng=77.58550&restaurantId=788303&catalog_qa=undefined&submitAction=ENTER
    //https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.96340&lng=77.58550&restaurantId=43836&catalog_qa=undefined&submitAction=ENTER
    //https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.96340&lng=77.58550&restaurantId=23846&catalog_qa=undefined&submitAction=ENTER
    const fetchMenu = async () => {
        const response = await fetch(PROXY_URL + MENU_API + restaurantId,
            {
                headers: {
                    'x-cors-api-key' : 'temp_416f8e8c644f7f4a2b29b8338ff1efb6'
                }
            }
        );

        const result = await response.json();
        console.log('Hello :',result?.data?.cards[2]?.card?.card?.info);
        console.log('Hi : ',result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card);
        // console.log('New :', result.data.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.categories[0])
        setResInfo(result?.data);

    }


  if(resInfo === null) {
    return <Shimmer />
  }

  const {name, avgRating, totalRatingsString, costForTwoMessage, areaName, sla, feeDetails, cuisines, cloudinaryImageId } = resInfo?.cards[2]?.card?.card?.info;
  //   console.log('HI :',resInfo?.cards)
  const {slaString, lastMileTravelString} = sla;

  const {itemCards} =  resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card || resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.categories[0];
  //For few restaurants, itemCards is in the first path of the above line. For few other restaurants, the itemCards is in the 2nd path. So I have used both to nullify error.  

  return (
    <div className='restaurant-menu-info'>
        <h1>{name}</h1>
        <div className="restaurant-info">
            <h3>{avgRating} ({totalRatingsString}) &#8226; {costForTwoMessage}</h3>
            <h4>{cuisines.join(', ')}</h4>
            <div className="outlet">
                <h4>Outlet  {areaName}</h4>
                <h4>{slaString}</h4>
            </div>
            <h4>{lastMileTravelString} | &#x20B9;{feeDetails.totalFee / 100} Delivery fee will apply</h4>
        </div>
        <h2>Menu</h2>
        <ul>
            {itemCards.map((item) => <li key={item.card.info.id}>{item.card.info.name} - &#x20B9;{parseInt(item.card.info.price / 100) || parseInt(item.card.info.defaultPrice / 100)}</li>)}
        </ul>
    </div>
  )
}

export default RestaurantMenuInfo
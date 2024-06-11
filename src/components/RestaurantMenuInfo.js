import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';

const RestaurantMenuInfo = () => {

    const params = useParams();
    const {restaurantId} = params;

    const resInfo = useRestaurantMenu(restaurantId);


  if(resInfo === null) {
    return <Shimmer />
  }

  const {name, avgRating, totalRatingsString, costForTwoMessage, areaName, sla, feeDetails, cuisines, cloudinaryImageId } = resInfo?.cards[2]?.card?.card?.info;
  
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
            {itemCards.map((item) => 
                <li key={item.card.info.id}>
                    {item.card.info.name} - &#x20B9;{parseInt(item.card.info.price / 100) || parseInt(item.card.info.defaultPrice / 100)}
                </li>
            )}
        </ul>
    </div>
  )
}

export default RestaurantMenuInfo
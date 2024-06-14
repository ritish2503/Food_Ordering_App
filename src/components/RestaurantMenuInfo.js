import Shimmer from './Shimmer';
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';
import { useState } from 'react';

const RestaurantMenuInfo = () => {

    const params = useParams();
    const {restaurantId} = params;

    const resInfo = useRestaurantMenu(restaurantId);

    const [showIndex, setShowIndex] = useState();


  if(resInfo === null) {
    return <Shimmer />
  }

  const {name, avgRating, totalRatingsString, costForTwoMessage, areaName, sla, feeDetails, cuisines, cloudinaryImageId } = resInfo?.cards[2]?.card?.card?.info;
  
  const {slaString, lastMileTravelString} = sla;

  const {itemCards} =  resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card || resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.categories[0];
  //For few restaurants, itemCards is in the first path of the above line. For few other restaurants, the itemCards is in the 2nd path. So I have used both to nullify error.  

  const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c) => c.card?.card?.['@type'] === 'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
  );
  console.log('Categories :',categories);

  return (
    <div>
        <h1 className='font-bold text-3xl m-auto my-6 w-1/2'>{name}</h1>
        <div className="p-5 border border-1 border-solid border-gray-300 rounded-3xl shadow-2xl m-auto w-1/2 text-sm">
            <h3 className='font-bold'>⭐ {avgRating} ({totalRatingsString}) <span className='text-gray-400'>&#8226;</span> {costForTwoMessage}</h3>
            <h4 className='text-orange-500 font-bold text-sm my-2 underline'>{cuisines.join(', ')}</h4>
            <div className='font-bold'>
                <h4 className='my-2'>Outlet <span className='font-semibold text-gray-500'>{areaName}</span></h4>
                <h4 className='text-sm'>{slaString}</h4>
            </div>
            <h4 className='mt-4 font-semibold text-gray-500'>{lastMileTravelString} | &#x20B9;{feeDetails.totalFee / 100} Delivery fee will apply</h4>
        </div>
        <h2 className='my-6 text-center text-gray-500'>-- MENU --</h2>

        {/* Categories Accordion */}
        {categories.map((category,index) => 
          //Lifting the state up Concept used below
          //Controlled Component because parent(RestaurantMenuInfo) is controlling child(RestaurantCategory) whether to expand or not by sending expand.
          <RestaurantCategory key={category.card.card.title} 
                              foodData={category?.card?.card} 
                              expand={index === showIndex ? true : false} 
                              changeIndexValue={() => setShowIndex(index)}
          />
        )}
    </div>
  )
}

export default RestaurantMenuInfo
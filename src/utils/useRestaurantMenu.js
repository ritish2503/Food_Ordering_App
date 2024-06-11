import { useEffect, useState } from "react";
import { MENU_API, PROXY_URL } from '../utils/constants';

const useRestaurantMenu = (restaurantId) => {  

    const [resInfo, setResInfo] = useState(null);

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const response = await fetch(PROXY_URL + MENU_API + restaurantId,
            {
                headers: {
                    'x-cors-api-key' : 'temp_416f8e8c644f7f4a2b29b8338ff1efb6'
                }
            }
        );

        const result = await response.json();
        // console.log('Hello :',result?.data?.cards[2]?.card?.card?.info);
        // console.log('Hi : ',result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card);
        // console.log('New :', result.data.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.categories[0])
        setResInfo(result?.data);

    }

    return resInfo;
}

export default useRestaurantMenu;
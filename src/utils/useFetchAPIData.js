import { useState, useEffect } from "react";
import { PROXY_URL, API_URL } from "./constants";

const useFetchAPIData = () => {

    const [list, setList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            const response = await fetch(PROXY_URL + API_URL,{
                headers: {
                    'x-cors-api-key' : 'temp_416f8e8c644f7f4a2b29b8338ff1efb6'
                }
            });
            if(!response.ok){
                throw new Error('Network response was not ok.')
            }
            const result = await response.json();
            console.log('Fetch : ', result.data.cards)
            setList(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        }catch(error){
            console.log(error);
        }
    }

    return list;

}

export default useFetchAPIData;
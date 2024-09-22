import RestaurantCard from "./RestaurantCard";
import { useState } from "react";
import resList from "../utils/mockData";


const Body = () => {

    const [listOfRestaurant, setlistOfRestaurant] = useState(resList);

    return (
        <div className="body">
            <div className="filter"> 
                <button className="filter-btn"
                onClick={() => {
                    const filteredList = listOfRestaurant.filter(
                    (res) => res.data.avgRating > 4
                    );
                    setlistOfRestaurant(filteredList);
    
    
                }}
                >
                    Top Rated Restaurant
                    </button>
            </div>
            <div className="res-container">
                {listOfRestaurant.map((restaurant) => (
                  <RestaurantCard key={restaurant.data.id} resData= {restaurant} />
                ))}
              
            </div>

        </div>
    );
};

export default Body;
import RestaurantCard, {withPromotedLabels} from "./RestaurantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link, useLocation } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const isOnline = useOnlineStatus();
  const RestaurantCardPromoted = withPromotedLabels(RestaurantCard);
  useEffect(() => {
    fetchData();
  }, []);

  console.log(listOfRestaurant);

  // Reset filters when returning to home page
  useEffect(() => {
    if (location.pathname === '/') {
      setFilteredRestaurant(listOfRestaurant);
      setSearchText("");
    }
  }, [location, listOfRestaurant]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.7630356&lng=76.6528225&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      
      let restaurants = [];
      if (json?.data?.cards) {
        for (const card of json.data.cards) {
          const restaurantData = 
            card?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
            card?.card?.card?.restaurants ||
            card?.restaurants;
          
          if (restaurantData && restaurantData.length > 0) {
            restaurants = restaurantData;
            break;
          }
        }
      }

      console.log("API Response:", json?.data?.cards); // Debug the entire API response
      console.log("Parsed Restaurants:", restaurants); // Debug the extracted restaurants
      console.log("Number of Restaurants:", restaurants.length); // Debug restaurant count
  

      if (restaurants.length === 0) {
        setError("No restaurants found in the API response");
        console.error("Restaurant data structure:", json?.data?.cards);
      }

      setListOfRestaurant(restaurants);
      setFilteredRestaurant(restaurants);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      setError("Failed to fetch restaurants. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleTopRatedFilter = () => {
    const filteredList = listOfRestaurant.filter((restaurant) => {
      const rating = restaurant?.info?.avgRating;
      return rating && Number(rating) > 4;
    });
    setFilteredRestaurant(filteredList);
  };

  const handleSearch = () => {
    const filtered = listOfRestaurant.filter((res) =>
      res?.info?.name?.toLowerCase()?.includes(searchText.toLowerCase())
    );
    setFilteredRestaurant(filtered);
  };

  const resetFilters = () => {
    setFilteredRestaurant(listOfRestaurant);
    setSearchText("");
  };

  if (loading) return <Shimmer />;
  if (error) return <div className="error-container">{error}</div>;
  
  if (!isOnline) {
    alert("You're offline, Please check your internet connection");
  }


  return (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4 ">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search restaurants..."
          />
          <button className="px-4 py-2 bg-green-100 m-4 rounded-lg" onClick={handleSearch}>Search</button>
          <button className="px-4 py-2 bg-green-100 m-4 rounded-lg" onClick={resetFilters}>Reset</button>
        </div>
        <div className="search m-4 p-4 flex items-center">
        <button
          className="px-4 py-2 bg-blue-100 m-4 rounded-lg"
          onClick={handleTopRatedFilter}
        >
          Top Rated Restaurants
        </button>
        </div>
      </div>
      <div className="flex flex-wrap ">
        {filteredRestaurant.length > 0 ? (
          filteredRestaurant.map((restaurant) => (
            
            <Link 
              key={restaurant?.info?.id} 
              to={`/restaurants/${restaurant?.info?.id}`}

            >
               {restaurant.info.promoted ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
            </Link>
          ))
        ) : (
          <div>No restaurants found matching your criteria</div>
        )}
      </div>
    </div>
  );
};

export default Body;
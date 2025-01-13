// RestaurantMenu.js
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantmenu";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const { resId } = useParams();
  console.log("ResId from params:", resId);
  
  const { restInfo, isLoading, error } = useRestaurantMenu(resId);
  
  console.log("Component received:", { restInfo, isLoading, error });

  if (isLoading) return <Shimmer />;
  if (error) return <div className="text-red-500 text-center mt-8">Error: {error}</div>;
  if (!restInfo) return <div className="text-gray-500 text-center mt-8">No restaurant information available</div>;

  // Find restaurant info
  const restaurantInfo = restInfo?.cards?.find(card => 
    card?.card?.card?.info)?.card?.card?.info;
  console.log("Restaurant Info:", restaurantInfo);

  // Find menu cards
  const menuCardsGroup = restInfo?.cards?.find(card => 
    card?.groupedCard?.cardGroupMap?.REGULAR)?.groupedCard?.cardGroupMap?.REGULAR?.cards;
  console.log("Menu Cards Group:", menuCardsGroup);

  // Get item cards
  const itemCards = menuCardsGroup?.find(card => 
    card?.card?.card?.itemCards)?.card?.card?.itemCards || [];
  console.log("Item Cards:", itemCards);

  if (!restaurantInfo) return <div className="text-gray-500 text-center mt-8">Restaurant information not found</div>;

  const { name, cuisines, costForTwoMessage } = restaurantInfo;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-100 to-purple-200 rounded-lg shadow-lg mt-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-700">{name || 'Restaurant Name Not Available'}</h1>
        <p className="text-blue-600 mt-2">{cuisines?.join(", ") || 'Cuisines Not Available'}</p>
        <p className="text-pink-600 mt-1">{costForTwoMessage || 'Price information not available'}</p>
      </div>
      
      <h2 className="text-3xl font-semibold text-teal-600 mt-6">Menu</h2>
      {itemCards.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {itemCards.map((item) => (
            <li
              key={item?.card?.info?.id || Math.random()}
              className="flex justify-between items-center border-b border-teal-300 pb-2 hover:bg-teal-50 rounded transition"
            >
              <span className="text-teal-700 font-medium">{item?.card?.info?.name || 'Item Name Not Available'}</span>
              <span className="text-teal-500 font-semibold">
                Rs {(item?.card?.info?.price / 100)?.toFixed(2) || 'Price Not Available'}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-teal-500 mt-4">No menu items available</p>
      )}
    </div>
  );
};

export default RestaurantMenu;

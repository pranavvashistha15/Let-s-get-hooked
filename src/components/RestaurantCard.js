import { CDN_URL } from '../utils/constant';

const RestaurantCard = (props) => {
    const { resData } = props;
     const info = resData?.info;

    const {
        cloudinaryImageId,
        name,
        cuisines,
        avgRating,
        costForTwo,
        sla,
    } = info;

    return (
        <div
            className="m-4 p-4 w-[225px] rounded-lg bg-gray-100 hover:bg-gray-300"
        
        >
            <img
                className="rounded-lg"
                src={CDN_URL + cloudinaryImageId}
                alt="res-logo"
            />

            <h3 className="font-bold py-4 text-lg ">{name}</h3>
            <h4 className="m-[2px] font-Arvo text-sm black-[#484848] ">{cuisines.join(', ')}</h4>
            <h4 className="w-[25%] text-center bg-green-300 mx-2 rounded-md p-2 m-2">
  <span className="flex justify-center items-center text-black text-sm font-semibold">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className="w-5 h-5 text-yellow-500 mr-1"
    >
      <path d="M12 .587l3.668 7.431L24 9.75l-6 5.851L19.336 24 12 20.01 4.664 24 6 15.601 0 9.75l8.332-1.732L12 .587z" />
    </svg>

    {avgRating}
  </span>
</h4>

            <h4 className='m-[2px] font-Arvo text-sm black-[#484848] '>{costForTwo}</h4>
            <h4 className='m-[2px] font-Arvo text-sm black-[#484848] '>{sla.slaString}</h4>
        </div>
    );
};
export const withPromotedLabels = (RestaurantCard) => {
  return (props) => {
    const { resData } = props;
    return (
      <div className="restaurant-card">
        {resData.info.promoted && ( 
          <label className="bg-yellow-300 text-black font-bold p-1 rounded">
            Promoted
          </label>
        )}
        <RestaurantCard {...props} /> {}
      </div>
    );
  };
};



export default RestaurantCard;
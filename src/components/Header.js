import { LOGO_URL } from "../utils/constant";
import { useState } from "react";
import { Link } from "react-router-dom";




const Header = () => {

    
const [btnNameReact, setbtnNameReact] = useState("Login");


    return (
        <div className="flex justify-between bg-green-100 shadow-lg sm:bg-yellow-100 lg:bg-pink-100" >
            <div 
            className="logo">
                <img className= "w-56"src={LOGO_URL}></img>
                </div>
            <div className="flex items-center">  
                <ul className="flex p-4 m-4">
                    <li className="px-4"> <Link to="/">Home</Link></li>
                    <li className="px-4"><Link to="/about">About Us</Link> </li>
                    <li className="px-4"><Link to="/contact">Contact Us</Link> </li>
                    <li className="px-4"><Link to="/grocery">Grocery</Link> </li>
                         <li className="px-4">Cart</li> 
                    <button className="Login"
                    onClick={() =>{
                        btnNameReact === "Login" 
                        ? setbtnNameReact("Logout")
                        : setbtnNameReact("Login");
                    }}
                    >
                        {btnNameReact}
                        </button>
                </ul>
                </div>

        </div>
    );
};

export default Header;
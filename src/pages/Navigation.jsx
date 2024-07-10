import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from '../assets/Icon (6).svg?react';
import { postApiCall } from "../utils/apiCaller";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";


const Navigation = ({lists = [],  setTableHeading=()=>{}}) => {
  const navigate = useNavigate();
 const {user} = useContext(AuthContext);
  const handleLogout = () =>{
    postApiCall('/user/logout')
    .then((response) => {
      if (response && response.data) {
         // Display success message
         toast.success(`${user.userName} Logged Out!`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          theme: "dark",
          });
      } else {
        toast.error("An error occurred during logout"); // Display error message
      }
      navigate('/login'); // Always navigate to /login, regardless of success or failure
    })
    .catch((error) => {
      console.error("Logout failed:", error);
      toast.error("An error occurred during logout"); // Display error message
      navigate('/login'); // Navigate to /login in case of error
    });
  }

  return (
    <div className={``}>
      <div className="flex justify-center items-center h-[70px] border-b border-blue-700">
        <h1 className=" text-[22px] text-[#0094ff] select-none">Uplon</h1>
      </div>
      <div className="m-5">
        <ul className="text-white ">
          {lists.map((item, index) => (
            <NavLink
              key={index}
              to={item.route}
              className={({ isActive }) => {
                if (isActive) {
                  setTableHeading(item.text)
                  return 'flex items-center gap-2 mb-1 p-3 cursor-pointer hover:rounded-md hover:bg-[#0d2f56] bg-[#0d2f56] rounded-md';
                } else {
                  return 'flex items-center gap-2 mb-1 p-3 cursor-pointer hover:rounded-md hover:bg-[#0d2f56]';
                }
              }}
            >
              {item.icon}
              <li>{item.text}</li>
            </NavLink>
          ))}
          <li
           className="flex items-center gap-2 p-3 cursor-pointer hover:rounded-md hover:bg-red-400 rounded-md select-none"
           onClick={handleLogout}
           ><LogoutIcon/>Logout</li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;

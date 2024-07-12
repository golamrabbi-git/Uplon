import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
// import image1 from '../assets/BgTop.png';
// import image2 from '../assets/TopLeft.png';
// import image3 from '../assets/Rignt.png'
import  { AuthContext } from "./AuthProvider";
import { postApiCall } from "../utils/apiCaller";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "./ForgotPasswordModal";

const LoginPage = () => {
    const {user,setUser} = useContext(AuthContext);
    const navigate= useNavigate();
    const [isForgotPasswordModalOpen,setIsForgotPasswordModalOpen] =useState(false);
  
  

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {

    },
  });

  const onSubmit = (data) => {
    // console.log(data); 
    // Making a POST request to '/admin' endpoint with the data
    postApiCall('/user/login', data)
       .then(response => {
          // process the response here
          if(response.status === 200) {
          setUser(response.data);
          navigate('/');
          }
          else {
            console.log(response.data);
          }
       })
       .catch(error => {
          console.error('Error:', error);

       });
 };

 const handleForgetPassword =()=>{
  setIsForgotPasswordModalOpen(true);
  
 }

//  useEffect(()=>{
//   console.log(user);
//  },[user])
 

  return (
    <div className="relative">
        <div className="flex items-center justify-center min-h-screen gap-1">
          <div className="relative bg-[#141C29] w-96 lg:w-1/3 p-[50px] rounded-lg shadow-lg border border-sky-500 ">
            <div className="flex flex-col items-center">
              <h1 className="text-[32px] text-[#0094ff]">Uplon</h1>
              <p className="text-white text-xl text-bold">Welcome Back</p>
              <p className="text-[#717c8b] text-[14px]">
                Login to Uplon
              </p>
            </div>
            <div className="w-full">
              {
                isForgotPasswordModalOpen && (
                  <ForgotPasswordModal 
                  setIsModalOpen={setIsForgotPasswordModalOpen}
                  />
                )
              }

              <form className="" action="" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  label="Email"
                  placeholder="Type your Email"
                  register={() =>
                    register("email", {
                      required: "  Email required",
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })
                  }
                  errors={errors?.email?.message}
                />
                <Input
                  label="Password"
                  type="password"
                  showPassword={true}
                  placeholder="Type your Password"
                  register={() =>
                    register("password", {
                      required: true,
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                        message:
                          "Password must contain at least 1 Capital letter, 1 small letter , 1 digit and a special character",
                      },
                    })
                  }
                  errors={errors?.password?.message}
                />

                <button className="w-full h-10 mt-4 mx-auto rounded  bg-blue-500">
                  <span className="text-white" onClick={() => clearErrors()}>
                    Login
                  </span>
                </button>
              </form>
              <div className="flex justify-end">
              <a href="#" className="text-[#717c8b]" onClick={handleForgetPassword}>Forget Password</a>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default LoginPage;

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import  register from "../assets/register.webp"
import login from "../assets/login.jpg";
import { registerUser } from "../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slice/cartSlice";

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation()
 const {user, guestId}  = useSelector((state) => state.auth);
 const {cart} = useSelector((state) => state.cart)

 //get redirect parameter and check if it's checkout  or not
 const redirect = new URLSearchParams(location.search).get("redirect") || "/"

 const isCheckoutRedirect = redirect.includes("checkout")

 useEffect(() => {
  if(user) {
    if(cart?.products.length > 0 && guestId ){
      dispatch(mergeCart({guestId, user})).then(() => {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      });
    }else{
      navigate(isCheckoutRedirect ?  "/checkout" : "/")
    }
  }
 }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch])

const handleSumbit = (e) => {
e.preventDefault()
dispatch(registerUser({name, email, password}))

setName("")
setEmail("")
setPassword("")
}

  return (
    <div className="d-flex container justify-content-center align-items-center ">
      <div className="justify-content-center align-items-center row  w-100 ">

        {/*Left Side */}
        <div className="d-flex  my-5 col-md-6 col-lg-6">
          <form onSubmit={handleSumbit}
          className=" bg-white px-5 py-1 border shadow" style={{ borderRadius: "20px" }}>
            <div className="text-center mb-1">
              <h2 className="display-6">Fashora</h2>
            </div>
            <h2 className="text-center fw-bold">Hey there!</h2>
             
            <p className="text-center mb-3">Enter your email and password to Login. </p>

<div className="mb-2">
  <label className="d-block mb-1 fw-bold">Name</label>
  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-100 p-2 border rounded"
    placeholder="Enter your Name"
  />
</div>

          

            <div className="mb-2">
              <label className="d-block mb-1 fw-bold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-100 p-2 border rounded"
                placeholder="Enter your email address"
              />
            </div>

            <div className="mb-3">
              <label className="d-block mb-1 fw-bold">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-100 p-2 border rounded"
                placeholder="Enter Your Password"
              />
            </div>

            <button type="submit" 
            className="w-100 bg-dark text-white p-2 rounded fw-bold">
              Sign Up
            </button>
            <p className="mt-2 text-center">
              Don't have an account ? {" "}
              <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-primary text-decoration-none">
                Login
              </Link>
            </p>
          </form>
        </div>

        {/* Right Side */}
        
        <div className="d-none d-lg-block  col-lg-6 col-md-4">
          <img src={register} alt="Login Visual" className="rounded w-100" />
        
        </div>
      </div>
    </div>
  );
};

export default Register;

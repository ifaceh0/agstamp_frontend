import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUserCartItemQuery, useUserLoginMutation } from "../../Redux/Api/userApi";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/Reducer/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import FullscreenLoader from "../../Components/Loader/FullscreenLoader";
import { addToCartAction } from "../../Redux/Reducer/cartSlice";

const Login = () => {
  const [userLogin, { isLoading, error }] = useUserLoginMutation();
  const {data:cartData} = useUserCartItemQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector<RootState>(state=> state.userSlice.user) as User
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    if(cartData){
      dispatch(addToCartAction({CartData:cartData,ShippingType:""}));
    }
  },[cartData]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await userLogin(form).unwrap();
      toast.success(response.message);
      dispatch(setUser(response.user))
      // Redirect to dashboard or home
      navigate("/");
    } catch (err: any) {
      console.error(err);
      toast.error(err.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    !user ? <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
    <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg">
      {isLoading && <FullscreenLoader/>}
      <h2 className="text-center text-2xl font-bold text-gray-700">Login</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Show error message */}
      {error && <p className="text-center text-sm text-red-500">Login failed. Please check credentials.</p>}

      <p className="text-center text-sm text-gray-600">
        Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
      </p>
      <p className="text-center text-sm text-gray-600">
        <a href="#" className="text-indigo-600 hover:underline">Forgot Password?</a>
      </p>
    </div>
  </div>:<Navigate to={"/"}/>
  );
};

export default Login;

import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUserRegisterMutation } from "../../Redux/Api/userApi";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import FullscreenLoader from "../../Components/Loader/FullscreenLoader";

const SignUp = () => {
  const [userRegister, { isLoading, error }] = useUserRegisterMutation();
  const navigate = useNavigate();
  const user = useSelector<RootState>(state=> state.userSlice.user) as User
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await userRegister(form).unwrap();
      toast.success(response.message);
      setForm({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
      })
      navigate("/login")
    } catch (err:any) {
      console.log(err)
      toast.error(err.data?.error)
        }
  };

  return (
    !user ? <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg">
        {isLoading && <FullscreenLoader/>}
        <h2 className="text-center text-2xl font-bold text-blue-600">Create Account</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex space-x-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-600">First Name *</label>
              <input
                type="text"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-600">Last Name *</label>
              <input
                type="text"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">User Name *</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Email *</label>
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
            <label className="block text-sm font-medium text-gray-600">Password *</label>
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
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Show error message */}
        {error && <p className="text-center text-sm text-red-500">Registration failed. Please try again.</p>}

        <p className="text-center text-sm text-gray-600">
          Have an account? <Link to={"/login"} className="text-blue-600 hover:underline">Sign-In</Link>
        </p>
      </div>
    </div> : <Navigate to={"/"}/>
  );
};

export default SignUp;

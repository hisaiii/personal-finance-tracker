import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/Inputs/Input'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const {updateUser}= useContext(UserContext)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
      //if we wont return then even with no password login api call hojayega

    }
    setError("")

    //api call

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user)
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  }

  return (
    <AuthLayout>
      <div className='  flex flex-col justify-center lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 '>
        <h3 className='text-xl font-semibold text-black '>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter Your login details</p>

        <form onSubmit={handleLogin}>

          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}

            //or onChange={({target})=>setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}

            //or onChange={({target})=>setEmail(target.value)}
            label="Password"
            placeholder="Min 8 char"
            type="password"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}


          <div className="flex flex-col items-center mt-4">
            <button type='submit' className='btn-primary'>LOGIN</button>

            <p className='text-[13px] text-slate-800 mt-3'>Doesn't have an accout?{" "}
              <Link className='font-medium text-primary underline' to='/signup'>Sign Up</Link>
            </p>
          </div>
        </form>

      </div>
    </AuthLayout>



  )
}

export default Login

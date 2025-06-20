import React, { useState, useContext } from 'react';
import AuthLayout from '../../components/layout/AuthLayout'
import Input from '../../components/Inputs/Input'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext)

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()

    let profileImageURL = ""

    if (!fullName) {
      setError("Please enter your Name")
      return;
    }
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

    //signup api call

    try {

      //upload image if present
      if(profilePic){
        const imgUploadRes=await uploadImage(profilePic)
        profileImageURL=imgUploadRes.imageUrl ||""
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageURL
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
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
      <div className='flex flex-col justify-center lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 '>
        <h3 className='text-xl font-semibold text-black '>Create an account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us today by entering your details below</p>
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-col-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              label="Full Name"
              placeholder="John"
              type="text"

            />
            <Input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              label="Email Address"
              placeholder="john@example.com"
              type="text"
            />
            <div className='col-span-2'>
              <Input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                label="Password"
                placeholder="Min 8 char"
                type="password"
              /></div>


          </div>
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <div className="flex flex-col items-center mt-4">
            <button type='submit' className='btn-primary'>SIGN UP</button>

            <p className='text-[13px] text-slate-800 mt-3'>Already have an accout?{" "}
              <Link className='font-medium text-primary underline' to='/login'>Login</Link>
            </p>
          </div>

        </form>
      </div>

    </AuthLayout>
  )
}

export default SignUp

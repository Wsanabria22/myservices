"use client";
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, MouseEvent, useState } from 'react'
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useSession, signIn, signOut } from "next-auth/react";
import { ChangeStreamDeleteDocument } from 'mongodb';

type UserData = {
  email: string;
  password: string;
}
const LoginForm = ({showSocial = true}: { showSocial : boolean}) => {
  const { data: session, status } = useSession();
  // const { accessToken } = session;
  const router = useRouter();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [localUser, setLocalUser] = useState<UserData>({
    email: "",
    password:"",
  })

  const validateData = (userData:UserData) => {
    let dataErrors = [];
    if(userData.email === "") { 
      dataErrors.push("El email es requerido");
    } else if(userData.email.length < 6) { 
      dataErrors.push("El email no es valido");
    };
    if(userData.password === "") {
      dataErrors.push("El password es requerido");
    } else if(userData.password.length < 6) {
      dataErrors.push("El password debe tener minimo 6 caracteres");
    };
    return dataErrors;
  }

  const handleShowPass = (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPass(!showPass)
  }

  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLocalUser(prevState => ({...prevState, [e.target.name]:e.target.value}))
  };

  const handleRegisger = () => {
    router.push("/auth/register");
  };

  const handleLoginSocial = async (provider: string) => {
    const authResponse = await signIn(provider, { callbackUrl: '/' }
      // { callbackUrl: DEFAULT_LOGIN_REDIRECT }
    );
    console.log({authResponse});
    console.log(session, status);
    router.push('/');
  }

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    setErrors([]);
    e.preventDefault();
    let dataErrors: string[] = validateData(localUser);
    setErrors(dataErrors);
    console.log('dataErrors',dataErrors);
    console.log('localUser',localUser)
    if(dataErrors.length > 0) return;
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(localUser),
        headers: {"Content-Type" : "application/json"}
      })
      console.log(response);
      if(!response.ok) {
        let error = await response.json();
        dataErrors.push(error.message)
        console.log(dataErrors);
        setErrors(() => dataErrors);
        router.refresh();
      } else {
        let data = await response.json();
        console.log({data});
        const authResponse = await signIn("credentials", {
          email: localUser.email,
          password: localUser.password,
          redirect: false,
        });
        console.log({authResponse});
        console.log(session, status);
        router.push('/');
      }
    } catch (error) {
      console.log('Failed to login user', error);
    }
  };

  return (
    <div className='w-[400px] shadow-md bg-slate-200 rounded-md'>
      <section className='w-full flex flex-col gap-4 items-center justify-center mb-2 pt-2'>
        <h1 className='text-2xl font-semibold'>Bienvenido!</h1>
        <p className='font-semibold text-sm'>Ingresa los datos de tu cuenta:</p>
      </section>
      <section>

      <section>
  
        <form className='bg-white px-5 py-2 w-full flex flex-col gap-4 items-center'
           onSubmit={(e)=>handleSubmit(e)}>

          <div className="flex flex-col w-[95%]">
            <label className="block">
              <span className="text-sm text-satoshi font-semibold text-gray-700">
                Email
              </span>    
            </label> 
            <input type='email' name='email' placeholder='email...'
              className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"  
              onChange={handleChange} value={localUser.email}
              required>
            </input>
          </div>

          <div className="flex flex-col w-[95%]">
            <label className="block">
              <span className="text-sm text-satoshi font-semibold text-gray-700">
                Password
              </span>    
            </label> 
            <div className='flex flex-row items-center'>
              <input type={showPass ? "text" : "password"} name='password' placeholder='password...'
                className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1 w-full"  
                onChange={handleChange} value={localUser.password}
                required>
              </input>
              <button className='ml-1' onClick={handleShowPass}>
                { !showPass ? <IoMdEye /> :  <IoMdEyeOff /> 
                }
              </button>
            </div>
          </div>

          <div className='flex justify-between w-[95%] mt-1'>
            <button type='submit'
              className='bg-blue-400 border-blue-300 md:font-semibold sm:px-3 sm:py-1.5 hover:bg-blue-300 hover:text-black
              text-sm hover:border-blue-400 border rounded-md font-normal px-2 py-1 w-full'>
              Ingresar
            </button>
          </div>

          { errors.length > 0 ?
              (
              <div className='bg-white w-[95%] text-center'>
                <p className='p-1 bg-red-200 rounded-md border-red-600'>
                  {errors[0]}
                </p>
              </div>
              )
            :
              null
          }
        </form>
      </section>

      <hr className="bg-slate-700 border w-full"></hr>
      <section className='bg-white flex items-center w-full gap-x-2 py-2 px-5'>
        <button className='w-full flex flex-row items-center justify-center md:font-semibold sm:px-3 sm:py-1.5
         bg-black p-2 m-1.5 border text-white rounded-md hover:bg-slate-600 hover:border-black'
         onClick={handleRegisger}>
          No tienes cuenta, Registrate!
        </button>
      </section>

      </section>
      <hr className="bg-slate-700 border w-full"></hr>
      {showSocial && (
        <section className='flex flex-col items-center w-full py-2 px-5'>
          <div className="text-center">
            <p className='font-semibold text-sm '>O</p> 
            <p className='font-semibold text-sm '>Ingresa con tu cuenta de:</p> 
          </div>
          <div className='flex items-center w-full gap-x-2'>
            <button className='w-full flex flex-row items-center justify-center bg-slate-400 p-2 m-2 border
              border-slate-300 rounded-md hover:bg-slate-300 hover:border-slate-400'
              onClick={() => handleLoginSocial("google")}>
              <FcGoogle className='h-5 w-5'/>
            </button>
            <button className='w-full flex flex-row items-center justify-center bg-slate-400 p-2 m-2 border
              border-slate-300 rounded-md hover:bg-slate-300 hover:border-slate-400'
              onClick={() => handleLoginSocial("facebook")}>
              <FaFacebook className='h-5 w-5 text-blue-600'/>
            </button>
          </div>
        </section>
        )
      }

    </div>
  )
}

export default LoginForm;
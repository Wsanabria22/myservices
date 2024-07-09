'use client';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, MouseEvent, MouseEventHandler, useState } from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import StrengthPassword from "./StrengthPassword";
import { signIn } from 'next-auth/react';

type UserData = {
  name: string;
  email: string;
  password: string;
  isSocialUser?: boolean,
  subId?: string;
  origin?: string;
}

const RegisterForm: React.FC = () => {

  const router = useRouter();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [checkPass, setCheckPass] = useState<number>(0);
  const [localUser, setLocalUser] = useState<UserData>({
    name: "",
    email: "",
    password:"",
    isSocialUser: false,
    subId: "",
    origin: 'credentials'
  })

  const validateData = (userData:UserData) => {
    let dataErrors: string[] = [];
    if(userData.name === "") { 
      dataErrors.push("El nombre es requerido");
    } else if(userData.email.length < 3) { 
      dataErrors.push("El nombre no es valido");
    };
    if(userData.email === "") { 
      dataErrors.push("El email es requerido");
    } else if(userData.email.length < 6) { 
      dataErrors.push("El email no es valido");
    };
    if(userData.password === "") {
      dataErrors.push("El password es requerido");
    } else if(checkPass < 5) {
      dataErrors.push("El password debe cumplir las reglas establecidas");
    };
    return dataErrors;
  }

  const handleShowPass = (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPass(!showPass)
  }

  const checkPassword = (password:string) => {
    console.log("validando reglas de: ", password)
    let numRules = 0;
    let regexp = new RegExp(/(?=.*?[A-Z])/)
    if (regexp.test(password)) { numRules = numRules+1; }
    regexp = new RegExp(/(?=.*?[a-z])/)
    if (regexp.test(password)) { numRules = numRules+1; }    
    regexp = new RegExp(/(?=.*?[0-9])/)
    if (regexp.test(password)) { numRules = numRules+1; }    
    regexp = new RegExp(/(?=.*?[#?!@$ %^&*-+])/)
    if (regexp.test(password)) { numRules = numRules+1; }
    if (password.length >= 8) { numRules = numRules+1; }
    return numRules;
  }
  
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLocalUser(prevState => ({...prevState, [e.target.name]:e.target.value}))
    console.log(e.target.name);
    if(e.target.name === "password") {
      const passRules = checkPassword(e.target.value)
      console.log(passRules);
      setCheckPass(passRules);
    }
  };

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    setErrors([]);
    e.preventDefault();
    let dataErrors: string[] = validateData(localUser);
    setErrors(dataErrors);
    console.log('dataErrors',dataErrors);
    console.log('localUser',localUser)
    if(dataErrors.length > 0) return;
    try {
      const response = await fetch('/api/localusers',{
        method: "POST",
        body: JSON.stringify(localUser),
        headers: {"Content-Type" : "application/json"}
      })
      console.log(response);
      if(response.ok) {
        const responseLogIn = await signIn('credentials',{
          email: localUser.email,
          password: localUser.password,
          redirect: false,
        })
        console.log(responseLogIn)
        if(responseLogIn?.ok) router.push('/');
      } else {
        const error = await response.json();
        dataErrors.push(error.message);
        console.log(dataErrors)
        setErrors(() => dataErrors);
      }
    } catch (error) {
      console.log('Failed to register a new User', error);
      if (error instanceof Error) {
        dataErrors.push(error.message);
        console.log(dataErrors)
        setErrors(() => dataErrors);
      }

    }
  }

  return (
    <div className='w-[400px] shadow-md bg-slate-200 rounded-md'>
      <section className='w-full flex flex-col gap-4 items-center justify-center mb-2 pt-2'>
        <h1 className='text-2xl font-semibold'>Crea tu Cuenta</h1>
        <p className='font-semibold text-sm'>Ingresa tus datos:</p>
      </section>
      <section>
        <form className='bg-white px-5 py-2 w-full flex flex-col gap-4 items-center'
           onSubmit={handleSubmit}>

          <div className="flex flex-col w-[95%]">
            <label className="block">
              <span className="text-sm text-satoshi font-semibold text-gray-700">
                Nombre:
              </span>    
            </label> 
            <input type='text' name='name' placeholder='nombres...'
              className="invalid:border-red-500 bg-slate-50 text-sm border rounded border-slate-200 px-2 py-1"  
              onChange={handleChange} value={localUser.name}
              required>
            </input>
          </div>

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
              <button type='button' className='ml-1' onClick={handleShowPass}>
                { !showPass ? <IoMdEye /> :  <IoMdEyeOff /> 
                }
              </button>
            </div>
          </div>

          <div className='flex justify-between w-[95%] mt-1'>
            <button type='submit'
              className='bg-blue-400 border-blue-300 md:font-semibold sm:px-3 sm:py-1.5 hover:bg-blue-300 hover:text-black
              text-sm hover:border-blue-400 border rounded-md font-normal px-2 py-1 w-full'>
              Crear Usuario
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

      <section className='flex flex-col items-center w-full py-2 px-5'>
        <div className='flex flex-col items-center w-full gap-x-2'>
          <StrengthPassword checkPass={checkPass}/>
        </div>
      </section>

    </div>
  )
}

export default RegisterForm
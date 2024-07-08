"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: Boolean;
}

const LoginButton = ({children, mode="redirect", asChild} : LoginButtonProps) => {
  const router = useRouter();
  
  const handleClick = () => {
    router.push("/auth/login");
  };

  // if(mode === "modal") {
  //   return (
  //     <span>
  //       TODO: IMPLEMENTE MODAL
  //     </span>
  //   )
  // }

  return (
    <span onClick={handleClick} className='cursor-pointer'>
      {children}
    </span>
  )
}

export default LoginButton
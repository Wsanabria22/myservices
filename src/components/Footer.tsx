import Image from 'next/image'
import React from 'react'
import logo from '../public/assets/images/WAPJA-sm.png';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t border-gray-100">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">

        <div className="flex flex-col justify-start items-start gap-6">
          <Image src={logo} alt="Logo" width={118} height={18} className="object-contain" />
          <p className="text-base text-gray-700">
            My Services 2023 <br />
            All rigths reserved &copy;
          </p>
        </div>

      </div>

      <div className="flex justify-between items-center flex-wrap mt-10 border-t 
        border-gray-100 sm:px-16 px-6 py-10">
        <p>@2023 MyServices. All Rigths Reserved</p>
          <div className="footer__copyrights-link">
            <Link href="/" className="text-gray-500">
              Politica de privacidad
            </Link>
            <Link href="/" className="text-gray-500">
              Terminos de uso
            </Link>
          </div>
      </div>

    </footer>
  )
}

export default Footer
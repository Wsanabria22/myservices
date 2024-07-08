'use client';
import React, { useState } from 'react';
import CustomButtom from './CustomButton';
import Image from 'next/image';
import Link from 'next/link';

const ServiceCard1 = ({service}) => {
  const {name, description, duration, price, category, picturePath, _id} = service;
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='service-card group shadow-md'>
      <div className='service-card__content'>
        <h2 className='service-card__content-title'>{name}</h2>
      </div>
      <p className='service-card__price'>
        <span className='service-card__price-dollar'>$ </span>
        {price}
        <span className='service-card__price-session'>/ Sesion</span>
      </p>

      <div className='service-card__image border border-slate-400'>
        { picturePath &&
        <Image 
          src={`/images/${picturePath}`}
          alt={name}
          width={200}
          height={100}
          priority
          className='object-fill h-full w-full'
        /> 
        }
      </div>

      <div className='relative flex w-full mt-2'>
        <div className='service-card__icon-container'>
          <div className='service-card__icon'>
            <Image src='/clock.svg' width={20} height={20} alt='steering wheel' />
            <p className='text-[14px] leading-[17px] font-bold'>
              {duration}
              <span className='self-end font-bold text-[14px]'> Min.</span>
            </p>
          </div>

          <div className='service-card__icon'>
            {/* <Image src='/tire.svg' width={20} height={20} alt='tire' /> */}
            <p className='text-[14px]'>
              {category}
            </p>
          </div>

        </div>
        <div className='service-card__btn-container'>
        <Link href={"/appointments/front/"+_id} className="flex gap-1 w-full">
          <CustomButtom 
            title='Agendar el Servicio'
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
            className="w-full"
          />
          </Link>
        </div>
      </div>

    </div>
  )
}


export default ServiceCard1
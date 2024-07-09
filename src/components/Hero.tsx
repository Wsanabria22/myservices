'use client'
import React from 'react';
import CustomButtom from '@/components/CustomButton';
import Image from 'next/image';
import heroImage from '@/public/assets/images/hero.jpeg';

const Hero = () => {

  const handleScroll = ()=> {}


  return (
    <div className='hero'>
      <div className='hero__text-container'>
        <h1 className='hero__title'>
          Reserva tus servicios -- facil y rapidamente!
        </h1>
        <p className='hero__subtitle'>
          Disfruta de nuestros servicios sin esfuerzo, agendadolos y pagandolos en linea.
        </p>
      </div>
      <div className='hero__image-container'>
        <div className='hero__image'>
          <Image src={heroImage} alt='hero' fill className='object-contain'
           sizes="(max-width: 768px) 25vw, (max-width: 1200px) 25vw, 25vw"
          />
        </div>
        {/* <div className='hero__image-overlay'/> */}
      </div>
    </div>
  )
}

export default Hero
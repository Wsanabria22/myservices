import Image from 'next/image'
import Hero from '@/components/Hero';
import ServiceCard1 from '@/components/ServiceCard1';
import { connectToDB } from '../utils/database';
import Service from '../models/Service';

const loadServices = async () =>{
  try {
    await connectToDB();
    const services = await Service.find();
    // console.log(services)
    return services;
  } catch (error) {
    console.log('Error al cargar los servicios', error)
  }
}

export default async function Home() {
  const allServices = await loadServices();
  
  return (
    <main className="overflow-hidden">
      <Hero/>

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-3xl font-extrabold'>Catalogo de servicios</h1>
          <p>Explore los servicios deseados</p>
        </div>
      </div>

      <section>
          <div className='home__service-wrapper px-4'>
            {
              allServices && allServices?.map((service) => (
              <ServiceCard1 key={service._id} service={service} />
              ))
            }
          </div>
        </section>

    </main>
  )
}

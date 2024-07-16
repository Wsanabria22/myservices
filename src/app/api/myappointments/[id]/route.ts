import { connectToDB } from '@/utils/database';
import Appointment from '@/models/Appointment';
import Professional from '@/models/Professional';
import Service from '@/models/Service';
import { NextResponse } from 'next/server';

export async function GET(request: Request, {params}: any) {
  try {
    await connectToDB();
    const appointments = await Appointment.find({client: params.id})
    .populate({ path:'professional', model: Professional }).populate({ path: 'service', model: Service })
    if(!appointments) return NextResponse.json({message:'Client appointments not found'}, {status:404})
    return NextResponse.json(appointments, {status:200})
  } catch (error) {
    console.log('Failed to get client appointments information', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    } 
  }
};

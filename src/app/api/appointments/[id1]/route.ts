import { connectToDB } from '@/utils/database';
import Appointment from '@/models/Appointment';
import { NextResponse } from 'next/server';

export async function GET(request: Request, {params}: any) {
  try {
    await connectToDB();
    console.log('trayendo datos de la BD')
    const appointment = await Appointment.findById(params.id1)
    if(!appointment) return NextResponse.json({message:'Appointment not found'}, {status:404})
    return NextResponse.json(appointment, {status:200})
  } catch (error) {
    console.log('Failed to get appointment information', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    }
  }
};

export async function PUT(request: Request, {params}: any) {
  try {
    await connectToDB();
    const data = await request.json();
    const appointment = await Appointment.findByIdAndUpdate(params.id1, data, {new:true});
    if(!appointment) return NextResponse.json({message:'Appointment not found'}, {status:404})
    return NextResponse.json(appointment, {message:'Appointment updated successfully'}, {status:201})
  } catch (error) {
    console.log('Failed to get Appointment information', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    }
  }
};

export async function DELETE(request: Request, {params}: any) {
  try {
    console.log('Borrando appointment de la BD')
    await connectToDB();
    const appointment = await Appointment.findByIdAndDelete(params.id1);
    if(!appointment) return NextResponse.json({message:'Appointment not found'}, {status:404})
    return NextResponse.json(appointment, {message:'Appointment deleted successfully'}, {status:201})
  } catch (error) {
    console.log('Failed to delete appointment information', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    }
  }
};
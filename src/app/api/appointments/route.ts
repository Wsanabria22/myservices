import { connectToDB } from '@/utils/database';
import Appointment from '@/models/Appointment';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
  try {
    await connectToDB();
    const appointments = await Appointment.find();
    return NextResponse.json(appointments, {status:200})
  } catch (error) {
    console.log('Failed to fetch all appointments', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    }
  }
};

export async function POST(req: Request, rest: Response) {
  try {
    const {user, client, service, quantity, professional, serviceDate, idxStartHour, idxFinalHour} = await req.json();
    await connectToDB();
    const newAppointment = await new Appointment({user, client, service, quantity, professional, serviceDate, idxStartHour, idxFinalHour});
    const appointment = await newAppointment.save();
    return NextResponse.json(appointment, {status: 201})
  } catch (error) {
    console.log('Failed to create a new appointment', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    }
  }
};

const { NextResponse } = require("next/server");
import Service from '@/models/Service';
import { connectToDB } from '@/utils/database';


export async function GET () {
  try {
    await connectToDB();
    const services = await Service.find();
    return NextResponse.json(services, { status: 200 })
  } catch (error) {
    console.log('Failed to fetch all services', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    } 
  }
};

export async function POST(req: Request, res: Response) {
  try {
    const {name, description, duration, price, picturePath} = await req.json();
    await connectToDB();
    const newService = new Service({ name, description, duration, price, picturePath });
    const savedService = await newService.save();
    return NextResponse.json(savedService, { status: 201 });
  } catch (error) {
    console.log("Failed to create a new service", error)
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    } 
  }
};


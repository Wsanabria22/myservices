import { connectToDB } from '@/utils/database';
import Client from '@/models/Client';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
  try {
    await connectToDB();
    const clients = await Client.find();
    return NextResponse.json(clients, {status:200})
  } catch (error) {
    console.log('Failed to fetch all Clients', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    } 
  }
};

export async function POST(req: Request, rest: any) {
  try {
    const {firstName, lastName, idNumber, celPhone, address, email} = await req.json();
    console.log(firstName, lastName, idNumber, celPhone, address, email);
    await connectToDB();
    const newClient = await new Client({firstName, lastName, idNumber, celPhone, address, email});
    const saveClient = await newClient.save();
    return NextResponse.json(saveClient, {status: 201})
  } catch (error) {
    console.log('Failed to create a new client', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    } 
  }
};




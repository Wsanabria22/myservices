import { connectToDB } from '@/utils/database';
import Client from '@/models/Client';
import { NextResponse } from 'next/server';

export async function GET(request: Request, {params}: any) {
  try {
    console.log('params',params);
    await connectToDB();
    const client = await Client.findOne({email: params.email});
    if (!client) return NextResponse.json(null, {status:404});
    return NextResponse.json(client, {status:200})
  } catch (error) {
    console.log('Failed to get client information by email', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    } 
  }
};
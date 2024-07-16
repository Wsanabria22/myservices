import { connectToDB } from '@/utils/database';
import Client from '@/models/Client';
import { NextResponse } from 'next/server';

export async function GET(request: Request, {params}: any) {
  try {
    await connectToDB();
    const client = await Client.findById(params.id);
    if (!client) return NextResponse.json({message:'Client not found'}, {status:404});
    return NextResponse.json(client, {status:200})
  } catch (error) {
    console.log('Failed to get client information', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    } 
  }
};

export async function PUT(request: Request, {params}: any) {
  try {
    const data = await request.json();
    await connectToDB();
    const client = await Client.findByIdAndUpdate(params.id, data, {new:true});
    if (!client) return NextResponse.json({message:'Client not found'}, {status:404});
    return NextResponse.json(client, {message:'Client updated successfully'}, {status:201})
  } catch (error) {
    console.log('Failed to update client information', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    } 
  }
};

export async function DELETE(request: Request, {params}: any) {
  try {
    await connectToDB();
    const client = await Client.findByIdAndDelete(params.id)
    if (!client) return NextResponse.json({message:'Client not found'}, {status:404});
    return NextResponse.json(client, {message:'Client deleted successfully'}, {status:201})
  } catch (error) {
    console.log('Failed to delete client information', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    } 
  }
};

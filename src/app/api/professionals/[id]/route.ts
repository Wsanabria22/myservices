import { NextResponse } from 'next/server';
import Professional from '@/models/Professional';
import { connectToDB } from '@/utils/database';

export async function GET(request: Request, {params}: any) {
  try {
    await connectToDB();
    const professional = await Professional.findById(params.id);
    if (!professional) return NextResponse.json({message:'Professional not found'}, {status:404});
    return NextResponse.json(professional, {status:200})
  } catch (error) {
    console.log('Failed to get professional information', error)
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    }
  }
};

export async function PUT(request: Request, {params}: any) {
  try {
    const data = await request.json();
    await connectToDB();
    const professional = await Professional.findByIdAndUpdate(params.id, data, {new:true});
    if (!professional) return NextResponse.json({message:'Professional not found'}, {status:404})
    return NextResponse.json(professional, {message:'Professional updated successfully'},{status:201})
  } catch (error) {
    console.log('Failed to update professional information', error)
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    } 
  }
};

export async function DELETE(request: Request, {params}: any) {
  try {
    await connectToDB();
    const professional = await Professional.findByIdAndDelete(params.id);
    if (!professional) return NextResponse.json({message:'Professional not found'}, {status:404})
    return NextResponse.json(professional, {message:'Professional deleted successfully'},{status:201})
  } catch (error) {
    console.log('Failed to delete professional', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    } 
  }
};


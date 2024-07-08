import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import LocalUser from '@/models/Localusers';

export async function GET(req: Request, {params} : any) {
  try {
    await connectToDB();
    const localUser = await LocalUser.find({email:params.email});
    console.log('localUser', localUser[0]);
    if(!localUser[0]) return NextResponse.json({message:'Email no registered with any user'}, {status:404});
    return NextResponse.json(localUser[0], {status:200});
  } catch (error) {
    console.log('Failed to fetch local user data', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    } 
  }
};


import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import LocalUser from '@/models/Localusers';
import bcrypt from 'bcryptjs';

export async function GET(req: Request, res: Response) {
  try {
    await connectToDB();
    const localUsers = await LocalUser.find();
    if(!localUsers) return NextResponse.json({error:'Failed to fetch all local users'}, {status:400});
    return NextResponse.json(localUsers, {status:201})
  } catch (error) {
    console.log('Failed to fetch all local users', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    } 
  }
};

export async function POST(req: Request, res: Response) {
  try {
    console.log('creating new user')
    const {name, email, password, subId, origin, isSocialUser} = await req.json();
    await connectToDB();
    const existingUser = await LocalUser.findOne({email});
    console.log('existingUser', existingUser);
    if(existingUser) return NextResponse.json({error:'Email ya esta asociado a una cuenta'}, {status: 409});
    let hashPassword: string;
    if(!isSocialUser) hashPassword = await bcrypt.hash(password, 10)
      else hashPassword = password;
    const newUser = await new LocalUser({name, email, password: hashPassword, subId, origin, isSocialUser });
    const localUser = await newUser.save();
    return NextResponse.json(localUser, {status: 200});
  } catch (error) {
    console.log('Failed to fetch user', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    } 
  }
};
import { NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import LocalUser from '@/models/Localusers';
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import { serialize } from 'cookie';
import { cookies } from 'next/headers';

// export async function GET(req, res) {
//   try {

//     await connectToDB();

//   } catch (error) {
//     console.log(error)
//   }
// };

type payloadData = {
  id: string;
  email: string;
  isAdmin: boolean;
  name: string;
}

export async function POST(req: Request, res: Response) {
  try {
    const {email, password} = await req.json();
    console.log({email, password});
    await connectToDB();
    const existingUser = await LocalUser.findOne({email});
    console.log('existingUser', existingUser);
    if(!existingUser) return NextResponse.json({message:'Email no existe!. Registrate primero'}, {status: 400});
    const validPassword = await bcrypt.compare(password, existingUser.password);
    console.log({validPassword})
    if(validPassword) {
      let JWT_KEY: Secret;
      if (process.env.JWT_KEY) JWT_KEY = process.env.JWT_KEY
      else throw Error('JWT_KEY must be defined in .env file');
      let payload: payloadData = { 
        "id": existingUser._id, 
        "email": existingUser.email, 
        "isAdmin": existingUser.isadmin, 
        "name": existingUser.name};
      let serverToken = jwt.sign(payload, JWT_KEY, {expiresIn: "1h"})
      let loginData = {...payload, serverToken}
      // const serialised = serialize('Token', serverToken, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   sameSite: 'strict',
      //   maxage: 1000 * 60 * 60,
      //   path:'/'
      // });
      // res.setHeader('Set-Cookie', serialised);
      cookies().set({
        name: 'serverToken',
        value: serverToken,
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        path:'/'
      })
      console.log({loginData});
      return NextResponse.json(loginData, {status:201})
    } else return NextResponse.json({message: 'Password incorrecto!, intente de nuevo'}, {status: 400});
  } catch (error) {
    console.log('Failed to login user', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    } 
  }
};




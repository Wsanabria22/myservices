import { connectToDB } from '@/utils/database';
import Journal from '@/models/Journal';
import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
  try {
    await connectToDB();
    const journals = await Journal.find();
    return NextResponse.json(journals, {status:200})
  } catch (error) {
    console.log('Failed to fetch all Journal', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    } 
  }
};

export async function POST(req: Request, rest: Response) {
  try {
    const {professional, journalDate, indexHour, appointment, journalStatus} = await req.json();
    await connectToDB();
    const newJournal = await new Journal({professional, journalDate, indexHour, appointment, journalStatus});
    const journal = await newJournal.save();
    return NextResponse.json(journal, {status: 201})
  } catch (error) {
    console.log('Failed to create a new journal', error);
    if (error instanceof Error) {
      return NextResponse.json({message: error.message} , {status: 500});
    } 
  }
};
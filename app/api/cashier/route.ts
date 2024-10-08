import { connectMongo } from '@/lib/connection';
import Cashier from '@/models/cashier';
import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: NextApiRequest) {
  try {
    //@ts-ignore
    const {
      date,
      userName,
      servicesReceived,
      externalClient,
      pointOfOrigin,
      officeVisited,
      internalClient,
      sex,
      reliability,
      responsiveness,
      access,
      communication,
      costs,
      integrity,
      assurance,
      outcome,
      message,
      mean,
      comments
      //@ts-ignore
    } = await req.json();
    await connectMongo();
    await Cashier.create({
      date,
      userName,
      servicesReceived,
      externalClient,
      pointOfOrigin,
      officeVisited,
      internalClient,
      sex,
      reliability,
      responsiveness,
      access,
      communication,
      costs,
      integrity,
      assurance,
      outcome,
      message,
      mean,
      comments
    });
    console.log('Cashier Information Sent');
    return NextResponse.json({ message: 'Cashier Information Sent' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'An Error Occured While Sending Personal Informaton' },
      { status: 500 }
    );
  }
}

export async function GET() {
  await connectMongo();
  const cashiers = await Cashier.find();
  const cashiersConverted = cashiers.map((cashier) => ({
    ...cashier._doc,
    date: cashier.date.toISOString().split('T')[0]
  }));
  console.log('Logg BAC Information', cashiers);
  return NextResponse.json({ cashiers: cashiersConverted }, { status: 200 });
}

'use client';
import { useState, useEffect } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { MedicalColumns } from '@/app/payments/MedicalColumns';
import Example from '@/components/Loader';
import GradualSpacing from '@/components/ui/gradual-spacing';
import { HoverImageLinksData } from '@/components/ui/HoverLinkComponent';
export default function DemoPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/medical');
        if (!res.ok) {
          throw new Error(`API call failed with status: ${res.status} ${res.statusText}`);
        }
        const jsonResponse = await res.json();
        console.log('Raw JSON Response:', jsonResponse);

        if (!jsonResponse.hasOwnProperty('medicals')) {
          throw new Error('Expected property Medicals not found in the response');
        }

        const { medicals } = jsonResponse;
        console.log('This is Cashiers Info', medicals);
        setData(medicals); // Update the state with the fetched data
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount

  console.log(data);

  if (!data.length) {
    return (
      <div className='w-screen h-screen flex justify-center items-center '>
        <Example />
      </div>
    );
  }

  return (
    // <div className="container mx-auto py-10">
    //   <DataTable columns={MedicalColumns} data={data} />
    // </div>
    <div className='container mx-auto h-auto  flex flex-col gap-5   py-10'>
      <div className='w-full  '>
        <GradualSpacing text='Medical Admin' className='text-center text-6xl' />
      </div>

      <div className=''>
        <DataTable columns={MedicalColumns} data={data} />
      </div>

      <div className='w-full    '>
        <GradualSpacing text='Filter By Month' className='text-center text-6xl' />
      </div>

      <div>
        <HoverImageLinksData data={data} />
      </div>
    </div>
  );
}

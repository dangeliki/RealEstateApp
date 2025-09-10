import React, { useEffect, useState } from 'react'
import home from '../assets/home.png'
import { Link } from 'react-router-dom'
import ListingItems from '../components/ListingItems';

export default function Home() {

  const [saleListings,setSaleListings] = useState([]);
  const [rentListings,setRentListings] = useState([]);
  console.log(saleListings);

  useEffect(() => {


    const fetchSaleListings = async () => {
      try {
        const res = await fetch ('/api/listing/get?type=sale&limit=3');
        const data = await res.json();
        setSaleListings(data);
        fetchRentListings();

      } catch (error) {
        console.log(error);
      }
    }


    const fetchRentListings = async () => {
      try {
        const res = await fetch ('/api/listing/get?type=rent&limit=3');
        const data = await res.json();
        setRentListings(data);

      } catch (error) {
        console.log(error);
      }
    }
    fetchSaleListings();
  },[]);

  return (

    // Τίτλος
    <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>

      <div>
        <h1 style={{color:'#42263C'}} className='font-bold text-3xl lg:text-6xl'>
          Your Trusted Partner in Real Estate
        </h1>
      </div>

      <Link to={'/search'} style={{color:'#42263C'}} className='text-xs sm:text-sm font-bold hover:underline'>
        Get Started...
      </Link>

      {/* Image */}

      <img className='rounded-3xl shadow-amber-500' src={home} alt="home" />

      {/* Αποτελέσματα εγγραφών */}

      <div className='p-7 md:min-h-screen'>

        {/* Πρόσφατα προς πώληση */}
        {saleListings && saleListings.length>0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent property for sale</h2>
              <Link className='text-sm text-slate-400 hover:underline' to={'/search?type=sale'}>Show more</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItems listing={listing} key={listing._id}/>
              ))}
            </div>
          </div>
        )}

        {/* Πρόσφατα προς ενοικίαση */}
        {rentListings && rentListings.length>0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-600'>Recent property for rent</h2>
              <Link className='text-sm text-slate-400 hover:underline' to={'/search?type=rent'}>Show more</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItems listing={listing} key={listing._id}/>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  )
}

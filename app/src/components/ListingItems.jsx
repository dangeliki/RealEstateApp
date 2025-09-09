import React from 'react'
import { Link } from 'react-router-dom'
import realestateapp from '../assets/realestateapp.png'
import { FaMapMarkedAlt } from 'react-icons/fa'

export default function ListingItems({listing}) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-xl w-full sm:w-[330px]'>

        <Link>

            {/* Εμφάνιση εικόνας */}
            <img className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-110 transition-scale duration-300' src={realestateapp} alt="listing" />
        
        <div className='p-3 flex flex-col gap-2'>

            {/* Εμφάνιση τιτλου - summary */}
            <p className='text-lg font-semibold text-slate-700 truncate'>{listing.summary}</p>

            {/* Εμφάνιση τοποθεσίας */}
            <div className='flex items-center gap-2 w-full'>
                <FaMapMarkedAlt className='h-4- w-4 text-green-700'/>
                <p className='text-sm text-gray-600 truncate w-full'>{listing.address}</p>
            </div>

            {/* Εμφάνιση description */}
            <div>
                <p className='text-sm text-gray-600 truncate'>{listing.description}</p>
            </div>

            {/* Εμφάνιση τιμής */}
            <div className='flex items-center gap-2 w-full'>
                <p className='text-sm text-slate-500 font-semibold truncate'>€{listing.price}</p>
                {listing.type === 'rent' ? <p className='text-sm text-slate-500 font-semibold truncate'>/ month</p> : ''}
            </div>

            {/* Bedrooms */}
            <div className='text-slate-700 flex gap-4'>


                <div className='font-bold text-xs'>
                    <p>{listing.bedrooms} bedroom(s)</p>
                </div>

                <div className='font-bold text-xs'>
                    <p>{listing.bathrooms} bathroom(s)</p>
                </div>

            </div>

        </div>


        
        </Link>

    </div>
  )
}

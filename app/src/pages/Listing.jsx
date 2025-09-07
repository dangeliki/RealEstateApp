import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import realestateapp from '../assets/realestateapp.png'
import { FaBath, FaBed, FaChair, FaCopy, FaMapMarkedAlt, FaParking } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import Contact from '../components/Contact';

export default function Listing() {
    const [listing,setListing] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [copied,setCopied] = useState(false);
    const params = useParams();
    const {currentUser} = useSelector((state) => state.user);
    const [contact, setContact] = useState(false);

    useEffect(() =>{

        const fetchListing = async() => {
        try{
            
            setLoading(true);

            // Fetch data
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if (data.success === false)  {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            }

            catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchListing();
    },[params.listingId]
);

  return (

      <main>
        {/* Loading Effect */}
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && <p className='text-center my-7 text-2xl' >Something went wrong</p>}


        {/*If everything is fine, Load Listing */}
        {listing && !loading && !error && (
        <div>
            <img src={realestateapp} className='w-100 mx-auto' alt="Listing" />
            {/* Για να εμφανίζονται τα στοιχεία της εγγραφής  */}
            <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
              <p className='text-2xl font-semibold'>
                  {`${listing.summary} - ${listing.price}€`}
                  {listing.type === 'rent' && '/month'}
              </p>

              <p className='flex items-center gap-2 text-slate-600 my-2 text-sm'>
                <FaMapMarkedAlt className='text-green-700'/>
                  {listing.address}
              </p>

              <div className='flex gap-4'>

                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  {listing.type == 'rent' ? 'For Rent' : 'For Sale'}
                </p>

                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>€{listing.price}</p>
                {listing.type === 'rent' && (
                                <span className='text-xs'>(€ / Month)</span>
                            )}

              </div>


      <p className='text-slate-800'>
        <span className='font-semibold text-black'>
          Description - {' '}
        </span>
        {listing.description}
      </p>

      <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>

        <li className='flex items-center gap-1 whitespace-nowrap'>
          <FaBed className='text-lg'/>
          {`${listing.bedrooms} bedrooms`}
        </li>

        <li className='flex items-center gap-1 whitespace-nowrap'>
          <FaBath className='text-lg'/>
          {`${listing.bathrooms} bathrooms`}
        </li>

        <li className='flex items-center gap-1 whitespace-nowrap'>
          <FaParking className='text-lg'/>
          {listing.parking ? 'Parking' : 'No Parking'}
        </li>

        <li className='flex items-center gap-1 whitespace-nowrap'>
          <FaChair className='text-lg'/>
          {listing.furnished ? 'Furnished' : 'No Furnished'}
        </li>
        
      </ul>


      {/* Αποστολή email στον ιδιοκτητη */}
      {currentUser && listing.userRef !== currentUser._id && !contact && (
        <button className='bg-slate-700 text-white rounded-lg hover:opacity-95 p-3' onClick={() => setContact(true)}>Contact Owner</button>

      )}

      {contact && <Contact listing = {listing} />}


            </div>
        </div>
        )}


      {/* Για να κάνει copy το url link */}
      <div className='fixed top-[13%] right-[3%] z-10 text-2xl border rounded-full w-15 h-15 flex justify-center items-center cursor-pointer'>
        <FaCopy className='text-blue-950'
        onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            setCopied(true);
        }}
        />
      </div>
      {copied && setTimeout(()=>{
        setCopied(false)
      },2000) &&
      <p className='fixed top-[23%] right-[5%] z-10 rounded-lg '>Link copied</p>
      }


    </main>


  );
}

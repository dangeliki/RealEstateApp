import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ListingItems from '../components/ListingItems';

export default function Search() {

    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [listings,setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const [searchdata,setSearchData] = useState({
        search: '',
        type: 'all',
        parking: false,
        furnished: false,
        sort: 'created_at',
        order: 'desc',
    });

    useEffect(() => {

        const urlParams = new URLSearchParams(location.search);
        const searchFromUrl = urlParams.get('search');
        const typeFromUrl = urlParams.get('type');
        const furnishedFromUrl = urlParams.get('furnished');
        const parkingFromUrl = urlParams.get('parking');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
        
        if(
            searchFromUrl ||
            typeFromUrl ||
            furnishedFromUrl ||
            parkingFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setSearchData({
                search: searchFromUrl || '',
                type: typeFromUrl || 'all',
                furnished: furnishedFromUrl === 'true'?true : false,
                parking: parkingFromUrl === 'true'?true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchListings = async () => {
            setShowMore(false);
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();

            if(data.length > 8) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }

            setListings(data);
            setLoading(false);
        }
        fetchListings();

    }, [location.search]);

    // Κουμπί show more αν οι εγγραφές ειναι πάνω από 9

    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex',startIndex);
        const searchQuery = urlParams.toString();
        const res= await fetch (`/api/listing/get?${searchQuery}`);
        const data = await res.json();

        if(data.length < 9) {
            setShowMore(false);
        }
        setListings([...listings,...data]);
    };

    const handleChange = (e) => {

        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSearchData({...searchdata,type:e.target.id})
        }

        if(e.target.id === 'search') {
            setSearchData({...searchdata,search:e.target.value})
        }

        if(e.target.id === 'parking' || e.target.id === 'furnished') {
            setSearchData({...searchdata,[e.target.id] : e.target.checked? true:false})
        }
        if(e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSearchData({...searchdata,sort, order});
        }
    };

    // Για να κρατάει το url τα queries
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('search',searchdata.search);
        urlParams.set('type',searchdata.type);
        urlParams.set('furnished',searchdata.furnished);
        urlParams.set('parking',searchdata.parking);
        urlParams.set('sort',searchdata.sort);
        urlParams.set('order',searchdata.order);

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

  return (
    <div className='flex flex-col md:flex-row'>
      
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                <input type="text" id="search" placeholder='Search' className='border rounded-lg p-3 w-full' value={searchdata.search} onChange={handleChange}/>
            </div>

            <div className="flex gap-2 flex-wrap items-center">

                <label className='font-semibold'>Type:</label>
                <div className="flex gap-2">
                    <input type="checkbox" id="all" className='w-5' onChange={handleChange} checked={searchdata.type === 'all'} />
                    <span>Rent&Sale</span>
                </div>

                <div className="flex gap-2">
                    <input type="checkbox" id="rent" className='w-5' onChange={handleChange} checked={searchdata.type === 'rent'} />
                    <span>Rent</span>
                </div>

                <div className="flex gap-2">
                    <input type="checkbox" id="sale" className='w-5' onChange={handleChange} checked={searchdata.type === 'sale'} />
                    <span>Sale</span>
                </div>


            </div>

            <div className="flex gap-2 flex-wrap items-center">

                <label className='font-semibold'>Characteristics:</label>
                <div className="flex gap-2">
                    <input type="checkbox" id="furnished" className='w-5' onChange={handleChange} checked={searchdata.furnished} />
                    <span>Furnished</span>
                </div>

                <div className="flex gap-2">
                    <input type="checkbox" id="parking" className='w-5' onChange={handleChange} checked={searchdata.parking} />
                    <span>Parking</span>
                </div>

            </div>

            <div className='flex items-center gap-2'>
                <label className='font-semibold'>Sort:</label>
                <select onChange={handleChange} defaultValue={'created_at_desc'} id="sort_order" className='border rounded-lg p-3'>
                    <option value="price_desc">Price (High to Low)</option>
                    <option value="price_asc">Price (Low to High)</option>
                    <option value="createdAt_desc">Latest</option>
                    <option value="createdAt_asc">Oldest</option>
                </select>
            </div>

            <button className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95'>Search</button>

        </form>
      </div>





        <div className='flex-1'>

            <h1 className='text-3xl font-semibold border-b p-3 text-slate-700'>Listing Results:</h1>

            <div className='p-7 flex flex-wrap gap-4'>

                {!loading && listings.length == 0 && (

                    <p className='text-xl text-slate-700'>No listing found</p>

                )}

                {loading && (
                    <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
                )}

                
                {!loading && 
                listings && 
                listings.map((listing) => ( 
                    <ListingItems key = {listing._id} listing={listing}/>
                    ))}

                {showMore && (
                    <button className='text-slate-700 hover:underline p-7 text-center w-full' onClick={onShowMoreClick}>Show more</button>
                )}

            </div>

        </div>


    </div>
  )
}

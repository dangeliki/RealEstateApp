import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {

    const [formData, setFormData] = useState({
        title: '',
        description:'',
        address: '',
        type:'rent',
        bedrooms: 1,
        bathrooms:1,
        phone: 69,
        price: 500,
        parking: false,
        furnished: false,
    });

    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);
    const {currentUser} = useSelector(state => state.user)
    const navigate = useNavigate()

    console.log(formData);
    const handleChange = (e) => {
        if(e.target.id === 'sell' || e.target.id === 'rent'){
            setFormData({
                ...formData,
                type: e.target.id
            })
        }

        if(e.target.id === 'parking' || e.target.id === 'furnished') {
            setFormData({
                ...formData,
                [e.target.id] : e.target.checked
            })
        }

        if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea' || e.target.type === 'tel' ) {
            setFormData({
                ...formData,
                [e.target.id] : e.target.value,
            })
        }
    } ;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(false);
            const res = await fetch ('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });

            const data = await res.json();
            setLoading(false);

            if(data.success === false) {
                setError(data.message);
            }
            navigate(`/listing/${data._id}`)

        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a listing
      </h1>

        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row'>

            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" placeholder='Title' className='border p-3 rounded-lg' id='title' maxLength='62' minLength='10' required onChange={handleChange} value={formData.title} />

                <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required onChange={handleChange} value={formData.description} />

                <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' required onChange={handleChange} value={formData.address} />

                <div className='flex gap-6 flex-wrap'>

                    <div className='flex gap-2'>
                        <input type="checkbox" id='sell' className='w-5' onChange={handleChange} checked={formData.type === 'sell'} />
                        <span>For Sale</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type="checkbox" id='rent' className='w-5' onChange={handleChange} checked={formData.type === 'rent'} />
                        <span>For Rent</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type="checkbox" id='furnished' className='w-5' onChange={handleChange} checked={formData.furnished} />
                        <span>Furnished</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type="checkbox" id='parking' className='w-5' onChange={handleChange} checked={formData.parking} />
                        <span>Parking</span>
                    </div>

                </div>

                <div className='flex flex-wrap gap-6'>

                    <div className='flex items-center gap-2'>
                        <input type="number" id='bedrooms' min='0' max='10' required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.bedrooms} />
                        <p>Bedrooms</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number" id='bathrooms' min='0' max='10' required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.bathrooms} />
                        <p>Bathrooms</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <input type="number" id='price' min='1' max='999999999' required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.price} />
                        
                        <div className='flex flex-col items-center'>
                            <p>Price</p>
                            <span className='text-xs'>(€ / Month)</span>
                        </div>

                    </div>

                    <div>
                        <input type="tel" id='phone' required pattern="^69\d{8}$" className='p-3 border border-gray-300 rounded-lg invalid:border-red-500 focus:invalid:ring-red-500' placeholder='69XXXXXXXX' onChange={handleChange} value={formData.phone} />

                        <div className='flex flex-col items-center'>
                            <p>Phone Number</p>
                        </div>
                        <input type="text" placeholder='Owner Name' className='mt-3 border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required onChange={handleChange} value={formData.name} />

                        <div className='flex flex-col items-center'>
                            <p>Owner Name</p>
                        </div>
                        
                    </div>

                    

                </div>

                <button className='p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80'>
                {loading ? 'Creating...' : 'Create listing'}
                </button>
                {error && <p className='text-red-700 text-sm'>{error}</p>}
            </div>

            
        </form>

    </main>
  )
}

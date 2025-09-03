import React from 'react'

export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Create a listing
      </h1>

        <form className='flex flex-col sm:flex-row'>

            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" placeholder='Title' className='border p-3 rounded-lg' id='title' maxLength='62' minLength='10' required />

                <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required />

                <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' required />

                <div className='flex gap-6 flex-wrap'>

                    <div className='flex gap-2'>
                        <input type="checkbox" id='sell' className='w-5' />
                        <span>For Sale</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type="checkbox" id='rent' className='w-5' />
                        <span>For Rent</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type="checkbox" id='parking' className='w-5' />
                        <span>Furnished</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type="checkbox" id='parking' className='w-5' />
                        <span>Parking</span>
                    </div>

                </div>

                <div className='flex flex-wrap gap-6'>

                    <div className='flex items-center gap-2'>
                        <input type="number" id='bedrooms' min='0' max='10' required className='p-3 border border-gray-300 rounded-lg' />
                        <p>Bedrooms</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number" id='bathrooms' min='0' max='10' required className='p-3 border border-gray-300 rounded-lg' />
                        <p>Bathrooms</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <input type="number" id='price' min='1' max='999999999' required className='p-3 border border-gray-300 rounded-lg' />
                        
                        <div className='flex flex-col items-center'>
                            <p>Price</p>
                            <span className='text-xs'>(€ / Month)</span>
                        </div>

                    </div>

                    <div>
                        <input type="tel" id='phone' pattern="^69\d{8}$" className='p-3 border border-gray-300 rounded-lg invalid:border-red-500 focus:invalid:ring-red-500' placeholder='69XXXXXXXX' />

                        <div className='flex flex-col items-center'>
                            <p>Phone Number</p>
                        </div>
                    </div>

                    

                </div>

                <button className='p-3 bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80'>
                Create Listing
                </button>
            </div>

            
        </form>

    </main>
  )
}

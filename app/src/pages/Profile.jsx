import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { updateUserStart, updateUserSuccess,updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import EditListing from './EditListing.jsx';

export default function Profile() {
  const {currentUser, loading, error} = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const [showListingsError,setShowListingsError] = useState(false);
  const [userListings,setUserListings] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // // Διαγραφή λογαριασμού χρήστη
  // const handleDeleteUser = async () => {
  //   try {
  //     dispatch(deleteUserStart());
  //     const res = await fetch(`/api/user/delete/${currentUser._id}`, {
  //       method: 'DELETE',
  //     });
  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(deleteUserFailure(data.message));
  //       return;
  //     }
  //     dispatch(deleteUserSuccess(data));
  //   } catch (error) {
  //     dispatch(deleteUserFailure(error.message));
  //   }
  // };

  // Sign Out
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };


  // Καταχώρηση αλλαγής στα στοιχεία του χρήστη
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        credentials: 'include',
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  // Εμφάνιση καταχωρήσεων ακινήτων
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  // Διαγραφή εγγραφής από τη λίστα
  const handleDeleteListing = async(listingId) => {
    try {

      const res= await fetch(`/api/listing/delete/${listingId}`,{
        method: 'DELETE',
      });

      const data = await res.json();
      if(data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));

    } catch (error) {
      console.log(error.message);
    }

  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
        
        <input type="text" id='username' placeholder='username' defaultValue={currentUser.username} className='border p-3 rounded-lg' onChange={handleChange}/>
        
        <input type="email" id='email' placeholder='email' defaultValue={currentUser.email} className='border p-3 rounded-lg' onChange={handleChange}/>
        
        <input type="password" id='password' placeholder='password' className='border p-3 rounded-lg' onChange={handleChange}/>
        
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading..' : 'Update'}</button>

        <Link className='bg-green-700 text-white p-3 rounded-lg text-center hover:opacity-95' to={"/create-listing"} >
          Create Listing
        </Link>

      </form>

      <div className='flex justify-between mt-5'>
        {/* <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>
          Delete Account
        </span> */}
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign Out
        </span>
      </div>

      <p className='text-red-700 mt-5'>{error ? error: ''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess ? 'User updated successfully': ''}</p>

      <button onClick={handleShowListings} className='bg-gray-400 text-white p-3 rounded-lg text-center hover:opacity-95 w-full'>
        Show listings
      </button>

      <p className='text-red-700 mt-5'>
        {showListingsError ?'Error showing listings' : ''}
      </p>

      {userListings && userListings.length > 0 && (
  <div className="flex flex-col gap-4">
    <h1 className='text-center mt-7 text-2xl font-semibold'>My listings</h1>

      {userListings.map((listing) => (
        <div
          key={listing._id}
          className="border rounded-lg p-3 flex justify-between items-center gap-4"
        >
          <Link
            className="text-slate-700 font-semibold hover:underline truncate flex-1"
            to={`/listing/${listing._id}`}
          >
            <p>{listing.summary}</p>
          </Link>

          <div className="flex flex-col items-center">
            <button onClick={()=>handleDeleteListing(listing._id)} className="text-red-700">Delete</button>

            <Link to={`/edit-listing/${listing._id}`}>
              <button className="text-green-700">Edit</button>
            </Link>
            
          </div>
        </div>
      ))}
    </div>
  )}
</div> 
);
}

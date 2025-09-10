import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth';

// Για να κρατάει το πεδίο όταν το συμπληρώσουμε και πάμε στο επόμενο πεδίο
export default function Signup() {
  const [formData, setFormData]= useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true);

    const res= await fetch('/api/auth/signup',{
      method:'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if(data.success === false) {
      setError(data.message);
      setLoading(false);
      return;
    }

    setLoading(false);

    // Αν υπάρχει από πριν το error, αν διορθωθεί η εγγραφή , εξαφανίζεται το error. Αν όλα πάνε καλά και δημιουργηθεί ο χρήστης, οδηγούμαστε στην σελίδα sign-in
    setError(null);
    navigate('/sign-in')
    console.log(data);
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        {/* Πεδία που συμπληρώνει ο χρήστης για την εγγραφή */}
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />

        {/* Κουμπί εγγραφής */}
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>

        {/* Κουμπί Google */}
        <button>
          <OAuth>
                    
          </OAuth>
        </button>

      </form>
      {/* Σύνδεση αν ο χρήστης έχει ήδη λογαριασμό */}
      <div className='flex gap-2 mt-5'>
        <p>Already have an account?</p>
        <Link to={"/sign-in"}>
        <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>

      {/* Σε περίπτωση σφάλματος, εμφανίζει την περιγραφή του error με κόκκινα γράμματα */}
      {error && <p className='text-red-500 mt-5'>{error}</p>}

    </div>
  )
}

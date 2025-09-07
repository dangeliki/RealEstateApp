import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {

  const [owner,setOwner] = useState(null);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(()=> {

    const fetchOwner = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setOwner(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchOwner();

  },[listing.userRef])

  return (
    <>
    {owner && (
      <div className='flex flex-col gap-2'>
        <p>
          Contact <span className='font-semibold'>{owner.username}</span> for <span className='font-semibold'>{listing.summary}</span>
        </p>

        <textarea name="message" id="message" rows='2' value={message} onChange={onChange} placeholder='Enter your message here' className='w-full border p-3 rounded-lg '></textarea>

        {/* Κάνει redirect για την αποστολή email στον ιδιοκτητη */}
        <Link to={`mailto:${owner.email}?subject=Regarding ${listing.summary}&body=${message}`}  target= "_blank" rel='noopener noreferrer' className='bg-slate-700 text-white text-center p-3 rounded-lg hover:opacity-95'>
          Send Message
        </Link>

      </div>
    )}
    </>
  )
}

import React from 'react'
import cf_aueb from '../assets/cf_aueb.png'

export default function About() {
  return (
    <div className='py-20 px-5 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>About RealEstateApp</h1>
      <p className='mb-4 text-slate-700'>Το RealEstateApp είναι μια εφαρμογή που έχει δημιουργηθεί για εκπαιδευτικούς σκοπούς και μπορείτε να την βρείτε στο παρακάτω Link, κάνοντας κλίκ <a className='mb-4 text-blue-600 hover:underline' href="https://github.com/dangeliki/RealEstateApp">εδώ.</a> </p>
      
      <p className='mb-4 text-slate-700'>Ευχαριστώ που χρησιμοποιήσατε την εφαρμογή και είμαι ευγνώμων για την κατανόησή σας.</p>

      <p className='mb-4 text-slate-700'>Αγγελική Δονά</p>
      <p className='mb-4 text-slate-700'>Find me at : angeliki.donta@outlook.com</p>

      <div className='mt-20 flex justify-center '>
      <img src={cf_aueb} alt="" />

      </div>
    </div>
  )
}

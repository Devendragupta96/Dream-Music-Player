// src/components/ArtistInfo.js
import React from 'react';
import MichaelJackson from '../assets/MichaelJackson.png'
import Verified from '../assets/Verified.png'

const ArtistInfo = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="h-[200px] md:h-[300px] w-full md:w-[600px] relative rounded-3xl flex items-center bg-cover bg-center">
        <div className="absolute w-full rounded-3xl h-[200px] md:h-[300px] -z-0 bg-cover"  style={{ backgroundImage: `url(${MichaelJackson})` }}></div>
        <div className="p-4 md:p-8 z-10 mt-10">
          <div className="flex gap-1 items-center">
            <img src={Verified} style={{height:'20px'}} alt='verfied'/>
          </div>
          <h2 className="text-xl md:text-3xl font-bold mt-3 text-white">Michael Jackson</h2>
          <p className="text-xs md:text-sm text-left text-gray-400 mt-4 md:mt-8">27,808,202 monthly listeners</p>
        </div>
      </div>
    </div>
    
  );
};

export default ArtistInfo;

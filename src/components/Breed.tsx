import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { BsChevronLeft } from 'react-icons/bs';

const Breed: React.FC = () => {
  const [breedData, setBreedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reference_image_id = location.state?.reference_image_id;
        if (!reference_image_id) {
          setError('Reference image ID not found');
          return;
        }
        
        const response = await axios.get(`https://api.thecatapi.com/v1/images/${reference_image_id}`);
        setBreedData(response.data);
      } catch (error) {
        console.error('Error fetching breed data:', error);
        setError('Failed to fetch breed data');
      }
    };

    fetchData();
  }, [location.state]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-[700px] bg-red-200 rounded-lg p-8">
          <p className="font-bold text-red-700">Error:</p>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!breedData) {
    return <div className="flex items-center justify-center h-screen">
      <img src='loader.gif'></img>
    </div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-slate-300 to-slate-400">
      <div className="relative w-full h-screen max-w-3xl px-4 py-8 mx-auto overflow-hidden rounded-lg shadow-2xl bg-slate-200 sm:h-auto"> 
        <button 
          className="absolute px-4 py-2 text-white rounded-lg top-4 left-4"
          onClick={() => navigate(-1)}
        >
          <BsChevronLeft className="text-black" />
        </button>
        <div className="flex flex-col space-y-8"> 
          <h1 className="text-3xl font-bold text-center text-black">{breedData.breeds[0]?.name}</h1> 
          <div className="flex items-center justify-center">
            <img src={breedData.url} alt={breedData.breeds[0]?.name} className="w-[50hw] rounded-lg shadow-md max-h-[40vh] object-cover" /> 
          </div>
          <div className="text-gray-700"> 
            <p>
              <strong>Origin:</strong> {breedData.breeds[0]?.origin}
            </p>
            <p>
              <strong>Life Span:</strong> {breedData.breeds[0]?.life_span}
            </p>
            <p>
              <strong>Description:</strong> {breedData.breeds[0]?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Breed;

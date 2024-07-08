import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { getCats } from '../redux/catSlice';
import { useNavigate } from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cat = useSelector((state: RootState) => state.cat.breeds);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    dispatch(getCats());
  }, [dispatch]);

  const handleButtonClick = (catData: any) => {
    navigate('/breed', { state: { reference_image_id: catData.reference_image_id } });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCats = cat?.filter((catData: any) =>
    catData.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-300 to-slate-400">
      <div className="flex flex-col items-center justify-center w-full max-w-5xl px-4 py-8 mx-auto overflow-hidden rounded-lg shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-black sm:text-4xl md:text-5xl ">Cat Catalogue</h1>
        <div className="flex items-center justify-center w-full mt-6">
          <input
            type="text"
            placeholder="Search cats by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 text-white rounded-lg shadow-xl bg-slate-200 md:w-2/3 lg:w-1/2"
          />
        </div>
        <div className="mt-8 overflow-y-auto sm:h-auto max-h-[80vh]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredCats?.map((catData) => (
              <button
                key={catData.id}
                className="flex items-center justify-between p-4 rounded-lg shadow-md cursor-pointer bg-slate-100 hover:bg-white hover:shadow-xl focus:outline-none "
                onClick={() => handleButtonClick(catData)}
              >
                <h3 className="text-xl font-medium">{catData.name}</h3>
                <BsChevronRight className="text-black" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import axios from 'axios';

export const fetchBreedData = async (reference_image_id: string) => {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/${reference_image_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching breed data:', error);
    throw error;
  }
};

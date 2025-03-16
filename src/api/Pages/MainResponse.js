import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const fetchNewBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/books/new-books`);

    if (response.status === 200 && response.data?.response) {
      return response.data.response;
    } else {
      console.warn('API Response Error:', response.data);
      return [];
    }
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    return [];
  }
};

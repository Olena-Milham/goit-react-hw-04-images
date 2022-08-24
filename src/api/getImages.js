import axios from 'axios';
import { BASE_URL, KEY } from 'constants/api';
import { toast } from 'react-toastify';

export const getImages = async (page, q) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: KEY,
        page,
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: '12',
      },
    });
    return response.data;
  } catch (error) {
    toast.error(error);
  }
};

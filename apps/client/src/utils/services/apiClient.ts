import axios from 'axios';

import { baseUrl } from '../../config/environment';

export const apiClient = axios.create({
  baseURL: `${baseUrl}/api/v1`,
  withCredentials: true,
});

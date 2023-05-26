import axios from 'axios';

import { baseUrl } from '../config/environment';

export const uploadData = async (file: File) => {
  const data = await axios.get(`${baseUrl}/api/v1/utils/presigned-url?fileType=${file.type}&fileName=${file.name}`);

  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.put(data?.data.data.url, formData);

  const readUrl = data.data.data.url.split('?')[0];

  return readUrl;
};
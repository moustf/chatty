import { apiClient } from "./services/apiClient";

export const uploadData = async (file: File) => {
  const data = await apiClient.get(`utils/presigned-url?fileType=${file.type}&fileName=${file.name}`);

  console.log(data);

  const formData = new FormData();
  formData.append('file', file);

  await apiClient.put(data?.data.data.url, formData);

  const readUrl = data.data.data.url.split('?')[0];

  return readUrl;
};
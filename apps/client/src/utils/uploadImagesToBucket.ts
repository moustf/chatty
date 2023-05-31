import { apiClient } from "./services/apiClient";

export const uploadData = async (files: FileList) => {
  const formData = new FormData();

  for (let m = 0; m < files.length; m++) {
    formData.append('file', files[m]);
  }

  const data = await apiClient.post('/services/upload', formData);

  return data.data.data;
};
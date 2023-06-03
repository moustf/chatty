const filesMimeTypes = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  jpg: 'image/jpg',
  mp3: 'audio/mpeg',
  mp4: 'video/mp4',
  webm: 'video/webm',
  pdf: 'application/pdf',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

const mimeTypes = Object.values(filesMimeTypes);
const extensions = Object.keys(filesMimeTypes);

export { filesMimeTypes, mimeTypes, extensions };

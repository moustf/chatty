type TextMessage = {
  type: 'text' | 'action';
  text: string;
};

type ImageMessage = {
  type: 'image';
  image: string;
};

export type Message = TextMessage | ImageMessage;

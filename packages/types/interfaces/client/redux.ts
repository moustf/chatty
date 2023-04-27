export type Payload = {
  userData: {
    id: string;
    email: string;
    iat: number;
  };
  isLoading: boolean;
  error: any;
};

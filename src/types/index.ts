export type Currency = 'NGN'|'GHS'|'$'

export interface User {
  image: File|undefined;
  alias: string;
  bio: string;
  email: string;
  craft: string;
  imageUrl: string;
  popularity: number;
  price: {
    currency: Currency;
    amount: string;
  };
  celebrity: {
    isCeleb: boolean;
    id: string;
  }
}

export interface ModalPayload {
  show: boolean;
  body: any;
  header: string;
}
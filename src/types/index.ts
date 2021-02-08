import firebase from 'firebase'

export type Currency = 'NGN'|'GHS'|'$'

export interface Celeb {
  id?: string;
  image: File|undefined;
  alias: string;
  bio: string;
  email: string;
  craft: string;
  imageUrl: string;
  popularity: number;
  price: {
    currency: Currency;
    amount?: number;
  };
  samples?: Sample[];
  token: string;
}

export type Sample = {
  uri: string;
  thumbnail: string;
}
export interface User {
  id?:string;
  displayName: string;
  email: string;
  imageUrl: string;
  celebrity: {
    isCeleb: boolean;
    id: string;
  };
  token?:string;
}

export type UserAuthInfo = Partial<firebase.UserInfo>

export interface ModalPayload {
  show: boolean;
  body: any;
  header: string;
}
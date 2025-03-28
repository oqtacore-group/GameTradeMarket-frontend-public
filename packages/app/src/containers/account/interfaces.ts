import { User } from '@game-trade/lib/src/codegen-types';

export enum FIELD_FORM {
  id = 'id',
  image_url = 'image_url',
  nick_name = 'nick_name',
  custom_url = 'custom_url',
  bio = 'bio',
  social = 'social',
  locale = 'locale',
}

export interface IGeneralFormProps {
  userData: User;
  getUserAccountInfo: () => void;
}

export interface IMessage {
  author: string;
  avatar: string;
  context: string;
  to?: string;
  create_time: Date;
  id?: number;
  state: {
    is_media: boolean;
    is_read: boolean;
  };
}

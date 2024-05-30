import { IUserModel } from "@api/models/user/user-model";

export interface IAuth {
  headers: Headers;
  original: Original;
  exception: null;
  refresh_token: string;
}

interface Original {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: IUserModel;
}

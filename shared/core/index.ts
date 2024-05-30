import { APP_SAVE_KEY } from "@shared/constants/setting";
import { LocalStorage } from "./local-storage";

const saveAccessToken = (accessToken: string) =>
  LocalStorage.setItem(APP_SAVE_KEY.TOKEN_KEY, accessToken);

const getAccessToken = () => LocalStorage.getItem(APP_SAVE_KEY.TOKEN_KEY);

const removeAccessToken = () => LocalStorage.removeItem(APP_SAVE_KEY.TOKEN_KEY);

export { saveAccessToken, getAccessToken, removeAccessToken };

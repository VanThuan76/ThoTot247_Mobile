import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_SAVE_KEY } from "@shared/constants/setting";
import { AuthPaths } from "@api/paths/auth/auth-path";
import { IError } from "@api/models/base";
import { router } from "expo-router";

class Axios {
  private api: AxiosInstance;
  private isRefreshing = false;
  private refreshTokenRequest: Promise<string> | null = null;

  constructor(baseURL: string, noAuth: boolean) {
    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!noAuth) {
      this.api.interceptors.request.use(
        async (config) => {
          const accessToken = await this.getAccessToken();
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }

    this.handleResponse(this.api);
  }

  handleResponse(axios: AxiosInstance) {
    axios.interceptors.response.use(
      async (response: AxiosResponse) => {
        const statusCode = response.data.statusCode;
        if (statusCode) {
          switch (statusCode) {
            case 403:
              await AsyncStorage.removeItem(APP_SAVE_KEY.TOKEN_KEY);
              router.push('/login')
              break;
            case 401:
              return Promise.reject(response);
            case 400:
              return Promise.reject(response);
            default:
              break;
          }
        }
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;
        const message = error.response?.data?.message;
        const errors = error.response?.data?.errors;

        if (error.response.status === 401 && !originalRequest._retry) {
          const refreshToken = await this.getRefreshToken();
          if (!refreshToken) {
            await AsyncStorage.removeItem(APP_SAVE_KEY.TOKEN_KEY);
            router.push('/login')
            return Promise.reject(error);
          }
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            originalRequest._retry = true;
            try {
              const newToken = await this.refreshToken(refreshToken);
              await this.setAccessToken(newToken);
              this.isRefreshing = false;
              this.refreshTokenRequest = null;
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
              return this.api(originalRequest);
            } catch (e) {
              this.isRefreshing = false;
              this.refreshTokenRequest = null;
              await AsyncStorage.removeItem(APP_SAVE_KEY.TOKEN_KEY);
              router.push('/login')
              return Promise.reject(error);
            }
          } else if (this.refreshTokenRequest) {
            try {
              const newToken = await this.refreshTokenRequest;
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
              return this.api(originalRequest);
            } catch (e) {
              await AsyncStorage.removeItem(APP_SAVE_KEY.TOKEN_KEY);
              router.push('/login')
              return Promise.reject(error);
            }
          }
        }

        if (error.response.status === 403) {
          await AsyncStorage.removeItem(APP_SAVE_KEY.TOKEN_KEY);
          router.push('/login')
        }

        const errorModel: IError = {
          code: status,
          message: message ?? "",
          errors,
        };

        return Promise.reject(errorModel);
      }
    );
  }

  async get<T>(url: string, configs?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.api.get<T>(url, configs);
      return response.data;
    } catch (error) {
      console.error("GET request failed:", error);
      throw error;
    }
  }

  async post<T>(
    url: string,
    data: any,
    configs?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.api.post<T>(url, data, configs);
      return response.data;
    } catch (error) {
      console.error("POST request failed:", error);
      throw error;
    }
  }

  async put<T>(
    url: string,
    data?: any,
    configs?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.api.put<T>(url, data, configs);
      return response.data;
    } catch (error) {
      console.error("PUT request failed:", error);
      throw error;
    }
  }

  async patch<T>(
    url: string,
    data?: any,
    configs?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.api.patch<T>(url, data, configs);
      return response.data;
    } catch (error) {
      console.error("PATCH request failed:", error);
      throw error;
    }
  }

  async delete<T>(url: string, configs?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.api.delete<T>(url, configs);
      return response.data;
    } catch (error) {
      console.error("DELETE request failed:", error);
      throw error;
    }
  }

  private async refreshToken(refreshToken: string): Promise<string> {
    try {
      const response = await this.api.post(AuthPaths.AUTH_REFRESH_TOKEN, {
        refresh_token: refreshToken,
      });
      return response.data.data.original.access_token;
    } catch (error) {
      console.error("Refresh token request failed:", error);
      throw error;
    }
  }

  private async getAccessToken(): Promise<string | null> {
    return AsyncStorage.getItem(APP_SAVE_KEY.TOKEN_KEY);
  }

  private async getRefreshToken(): Promise<string | null> {
    return AsyncStorage.getItem(APP_SAVE_KEY.REFRESH_TOKEN_KEY);
  }

  private async setAccessToken(token: string) {
    await AsyncStorage.setItem(APP_SAVE_KEY.TOKEN_KEY, token);
  }
}

export const AxiosInstanceAuth = new Axios(
  process.env.EXPO_PUBLIC_API_URL as string,
  false
);
export const AxiosInstanceNoAuth = new Axios(
  process.env.EXPO_PUBLIC_API_URL as string,
  true
);

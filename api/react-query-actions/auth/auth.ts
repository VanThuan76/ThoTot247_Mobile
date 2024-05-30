import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";

import { IBaseResponse } from "@api/models/base";
import { IAuth } from "@api/models/auth";
import { AuthPaths } from "@api/paths/auth/auth-path";
import { queryClient } from "@api/react-query-actions";
import { AxiosInstanceNoAuth } from "@shared/core/axios-http";
import { QUERY_KEYS } from "@shared/constants/query_keys";
import { login } from "@shared/providers/redux/app-slice";
import { useAppDispatch } from "@hooks/use-redux";

export const useLogin = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return useMutation({
      mutationFn: (auth: { email: string; password: string }) =>
        AxiosInstanceNoAuth.post<IBaseResponse<IAuth>>(AuthPaths.AUTH, auth),
      onSuccess: async data => {
        console.log(data)
        if (!data.data) return;
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AUTH_USER] });
        if (!data.data.original) return;
        dispatch(login(data.data.original.user));
        router.push('(tabs)')
      },
      onError: (error, variables, context) => {
        console.log(error);
      }
    });
  };
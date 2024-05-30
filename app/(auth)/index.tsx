import * as React from 'react';
import { z } from 'zod';
import { Image, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useLogin } from '@api/react-query-actions/auth/auth';

import { Text } from '~/components/ui/text';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '~/components/ui/card';
import TextInput from '~/components/custom/form/text-input';
import PasswordInput from '~/components/custom/form/password-input';
import CheckboxInput from '~/components/custom/form/checkbox-input';

interface FormValues {
    email: string;
    password: string;
    check: any;
}

export const authSchema = z.object({
    email: z.string({ required_error: 'Vui lòng điền email' }).email({ message: 'Địa chỉ email không hợp lệ' }),
    password: z.string({ required_error: 'Vui lòng điền mật khẩu' }).min(1, { message: 'Vui lòng điền mật khẩu' }),
    check: z.any().optional()
});


export default function LoginScreen() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(authSchema),
    });

    const doLogin = useLogin()

    function onSubmit(values: z.infer<typeof authSchema>) {
        doLogin.mutate(values);

        return new Promise((resolve: any) => {
            setTimeout(() => {
                resolve();
            }, 2000);
        });
    }

    return (
        <View className='w-full h-full'>
            <StatusBar style='light' />
            <View className='basis-1/4'>
                <Image source={require("~/assets/images/login-background.png")} className='w-full h-full' />
            </View>
            <View className='basis-1/2'>
                <Card className='rounded-3xl'>
                    <CardHeader className='flex justify-center items-center py-2'>
                        <Text className='font-bold tracking-wider text-3xl'>Đăng nhập</Text>
                    </CardHeader>
                    <CardDescription className='mt-2 px-5'>
                        <Text className='text-muted-foreground'>Chào mừng bạn đến với hệ thống CRM Thợ Tốt 247! Vui lòng liên hệ quản lý hoặc admin để được cung cấp tài khoản truy cập</Text>
                    </CardDescription>
                    <CardContent className='mt-5 flex justify-start items-center gap-5 w-full h-full'>
                        <TextInput<FormValues>
                            control={control}
                            name="email"
                            fieldName="Email"
                            placeholder='email@thotot247.com'
                            rules={{ required: 'Email bắt buộc' }}
                            errorMessage={errors.email?.message}
                        />
                        <PasswordInput<FormValues>
                            control={control}
                            name="password"
                            fieldName="Mật khẩu"
                            rules={{ required: 'Mật khẩu bắt buộc' }}
                            secureTextEntry={true}
                            errorMessage={errors.password?.message}
                        />
                        <View className='w-full flex flex-row justify-between'>
                            <CheckboxInput<FormValues>
                                control={control}
                                name="check"
                                fieldName="Ghi nhớ"
                                errorMessage={errors.password?.message}
                            />
                            <Text className='font-normal text-sm text-orange-500'>
                                Quên mật khẩu?
                            </Text>
                        </View>
                        <Button className='w-full mt-5' onPress={handleSubmit(onSubmit)}>
                            <Text>Đăng nhập</Text>
                        </Button>
                        <View className='self-end'>
                            <Text className='text-sm'>© Copyright 2024 Metaverse Vietnam</Text>
                        </View>
                    </CardContent>
                </Card>
            </View>
        </View>
    );
};

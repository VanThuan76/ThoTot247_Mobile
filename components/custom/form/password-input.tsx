import * as React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { View, ViewStyle, TextStyle, TouchableOpacity } from 'react-native';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

import { Eye } from '@shared/lib/icons/Eye';
import { EyeOff } from '@shared/lib/icons/EyeOff';

interface PasswordInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    fieldName: string;
    errorMessage?: string;
    rules?: object;
    style?: ViewStyle;
    textStyle?: TextStyle;
    inputStyle?: TextStyle;
    placeholder?: string;
    defaultValue?: any;
    secureTextEntry?: boolean;
}

const PasswordInput = <T extends FieldValues>({
    control,
    name,
    fieldName,
    errorMessage,
    rules,
    style,
    textStyle,
    inputStyle,
    placeholder,
    defaultValue,
    secureTextEntry = false,
}: PasswordInputProps<T>) => {
    const [isShowPassword, setIsShowPassword] = React.useState(false)

    return (
        <View className='w-full' style={style}>
            <Text style={textStyle}>{fieldName}</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <View className='relative w-full'>
                            <Input
                                className='w-full'
                                onBlur={onBlur}
                                onChangeText={value => onChange(value)}
                                value={value}
                                autoCapitalize="none"
                                placeholder={placeholder}
                                secureTextEntry={!isShowPassword ? secureTextEntry : false}
                                style={inputStyle}
                            />
                            <TouchableOpacity onPress={() => setIsShowPassword(!isShowPassword)} className='absolute right-4 bottom-3'>
                                {isShowPassword ? (
                                    <Eye className='w-[24px] h-[24px]' color="black" />
                                ) : (
                                    <EyeOff className='w-[24px] h-[24px]' color="black" />
                                )}
                            </TouchableOpacity>
                        </View>
                        {errorMessage && <Text className='text-red-500'>{errorMessage}</Text>}
                    </>

                )}
                name={name}
                rules={rules}
                defaultValue={defaultValue}
            />
        </View>
    );
};

export default PasswordInput;
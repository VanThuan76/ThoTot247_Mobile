import * as React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { View, ViewStyle, TextStyle } from 'react-native';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';

interface TextInputProps<T extends FieldValues> {
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

const TextInput = <T extends FieldValues>({
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
}: TextInputProps<T>) => {
    return (
        <View className='w-full' style={style}>
            <Text style={textStyle}>{fieldName}</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <>
                        <Input
                            className='w-full'
                            onBlur={onBlur}
                            onChangeText={value => onChange(value)}
                            value={value}
                            autoCapitalize="none"
                            placeholder={placeholder}
                            secureTextEntry={secureTextEntry}
                            style={inputStyle}
                        />
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

export default TextInput;
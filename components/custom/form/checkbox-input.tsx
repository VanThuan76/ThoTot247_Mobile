import * as React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { View, TextStyle } from 'react-native';
import { Checkbox } from '~/components/ui/checkbox';
import { Text } from '~/components/ui/text';
import { cn } from '~/shared/lib/utils';

interface CheckboxInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    fieldName: string
    errorMessage?: string;
    rules?: object;
    inputStyle?: TextStyle;
    defaultValue?: any;
    className?: string
}

const CheckboxInput = <T extends FieldValues>({
    control,
    name,
    fieldName,
    errorMessage,
    rules,
    className,
    inputStyle,
    defaultValue,
}: CheckboxInputProps<T>) => {
    return (
        <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
                <>
                    <View className={cn('flex flex-row items-center gap-2', className)}>
                        <Checkbox
                            checked={value}
                            onCheckedChange={value => onChange(value)}
                            style={inputStyle}
                        />
                        {fieldName && <Text className='font-normal text-sm'>{fieldName}</Text>}
                    </View>
                    {errorMessage && <Text className='text-red-500'>{errorMessage}</Text>}
                </>

            )}
            name={name}
            rules={rules}
            defaultValue={defaultValue}
        />
    );
};

export default CheckboxInput;
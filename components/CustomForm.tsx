'use client'

import React from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, ControllerRenderProps } from 'react-hook-form'
import { FormFieldType, FormValues } from './forms/PatientForm'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

interface CustomProps {
  control: Control<FormValues>,
  fieldType: FormFieldType,
  name: keyof FormValues,
  label?: string,
  placeholder?: string,
  iconSrc?: string,
  iconAlt?: string,
  disabled?: boolean,
  dataFormat?: string,
  showTimeSelect?: boolean,
  children?: React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode
}

interface RenderFieldProps extends CustomProps {
  field: ControllerRenderProps<FormValues, keyof FormValues>
}

const RenderField = ({ field, ...props }: RenderFieldProps) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          {iconSrc && (
            <Image src={iconSrc} height={24} width={24} alt={iconAlt || 'icon'} className='ml-2' />
          )}
          <FormControl>
            <Input placeholder={placeholder} {...field} className='shad-input border-0' />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry='US'
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as string}
            onChange={field.onChange}
            className='input-phone'
          />
        </FormControl>
      );
    default:
      return null;
  }
};

const CustomForm = (props: CustomProps) => {
  const { control, fieldType, name, label } = props
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} {...props} />
          <FormMessage className='shad-error' />
        </FormItem>
      )}
    />
  )
}

export default CustomForm
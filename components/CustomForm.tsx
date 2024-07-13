'use client'

import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
  import { Control } from 'react-hook-form'
import { FormFieldType } from './forms/PatientForm'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

interface CustomProps {
 control : Control<any>,
 fieldType : FormFieldType,
 name : string,
 label?: string,
 placeholder?: string,
 iconSrc?: string,
 iconAlt?: string,
 disabled?: boolean,
 dataFormat?: string,
 showTimeSelect?: boolean,
 children?:React.ReactNode,
 renderSkeleton?:(field:any) => React.ReactNode

}


const RenderField: React.FC<RenderFieldProps> = ({ field, props }) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || 'icon'}
              className='ml-2'
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className='shad-input border-0'
            />
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
            value={field.value as string | undefined} // Ensure this is correctly typed
            onChange={(value) => field.onChange(value)} // Correct usage of onChange
            className='input-phone'
          />
        </FormControl>
      );

    default:
      return null; // Handle other cases if needed
  }
};


const CustomForm = (props:CustomProps) => {
 const {control,fieldType,name,label} = props
  return (
    <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
                {fieldType !== FormFieldType.CHECKBOX && label && (
                    <FormLabel>{label}</FormLabel>
                )}

                <RenderField field={field} props={props}/>
                <FormMessage className='shad-error'/>
            </FormItem>
          )}
        />
  )
}

export default CustomForm
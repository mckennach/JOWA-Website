'use client'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useFormContext } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/src/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group'
import { Textarea } from '@/src/components/ui/textarea'
import { FileWithPath, useDropzone } from 'react-dropzone'

const formSchema = z.object({
  firstName: z.string().nonempty('First Name is required'),
  lastName: z.string().nonempty('Last Name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().nonempty('Phone Number is required'),
  projectAddress: z.string().nonempty('Project Address is required'),
  projectType: z.string(),
  description: z.string(),
  file: z.array(z.string()),
  preferredContactMethod: z.string(),
})

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>()
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf'],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex w-full gap-8">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only" htmlFor="firstName">
                  First Name*
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="First Name*"
                    required={true}
                    className="h-14 rounded-none border-foreground font-maisonNeueExt text-foreground placeholder:text-foreground"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only" htmlFor="lastName">
                  Last Name*
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Last Name*"
                    required={true}
                    className="h-14 rounded-none border-foreground font-maisonNeueExt text-foreground placeholder:text-foreground"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full gap-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only" htmlFor="email">
                  E-mail*
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="E-mail*"
                    type="email"
                    required={true}
                    className="h-14 rounded-none border-foreground font-maisonNeueExt text-foreground placeholder:text-foreground"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only" htmlFor="phoneNumber">
                  Phone Number*
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Phone Number*"
                    required={true}
                    className="h-14 rounded-none border-foreground font-maisonNeueExt text-foreground placeholder:text-foreground"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full gap-8">
          <FormField
            control={form.control}
            name="projectAddress"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only" htmlFor="projectAddress">
                  Project Address*
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Project Address*"
                    required={true}
                    className="h-14 rounded-none border-foreground font-maisonNeueExt text-foreground placeholder:text-foreground"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div>
          <div className="mb-6 mt-8 border-b border-secondary-foreground">
            <h2 className="text-[24px] text-secondary-foreground">
              Project Details
            </h2>
          </div>
          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-maisonNeue font-[16px] leading-[30px]">
                  What type of project are you looking to do?*
                </FormLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue="new-construction"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="new-construction"
                      id="new-construction"
                      className="border-foreground"
                    />
                    <FormLabel
                      htmlFor="new-construction"
                      className="font-maisonNeue font-[16px] leading-[30px]"
                    >
                      New Construction
                    </FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="full-renovation"
                      id="full-renovation"
                      className="border-foreground"
                    />
                    <FormLabel
                      htmlFor="full-renovation"
                      className="font-maisonNeue font-[16px] leading-[30px]"
                    >
                      Full Renovation
                    </FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="partial-renovation"
                      id="partial-renovation"
                      className="border-foreground"
                    />
                    <FormLabel
                      htmlFor="partial-renovation"
                      className="font-maisonNeue font-[16px] leading-[30px]"
                    >
                      Partial Renovation
                    </FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="other"
                      id="other"
                      className="border-foreground"
                    />
                    <FormLabel
                      htmlFor="other"
                      className="font-maisonNeue font-[16px] leading-[30px]"
                    >
                      Other
                    </FormLabel>
                  </div>
                </RadioGroup>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-maisonNeue font-[16px] leading-[30px]">
                Please Describe:
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={6}
                  required={true}
                  className="rounded-none border-foreground bg-foreground font-maisonNeueExt text-background placeholder:text-foreground"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field: { onChange } }) => (
            <FormItem className="w-full">
              <FormLabel className="font-maisonNeue font-[16px] leading-[30px]">
                Upload a file:
              </FormLabel>
              <FormControl>
                <div
                  {...getRootProps({ className: 'dropzone' })}
                  className="flex h-[161px] flex-col items-center justify-center border border-foreground bg-background/20"
                >
                  <input {...getInputProps({ onChange })} />

                  <p>
                    Drag files here or{' '}
                    <span className="underline">select files</span>
                  </p>
                  {acceptedFiles.map((file) => (
                    <p key={file.path}>
                      {file.path} - {file.size} bytes
                    </p>
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <hr />

        <FormField
          control={form.control}
          name="preferredContactMethod"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-maisonNeue font-[16px] leading-[30px]">
                Best way to get in touch:*
              </FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue="phone"
                className="flex gap-8"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="phone"
                    id="phone"
                    className="border-foreground"
                  />
                  <FormLabel
                    htmlFor="phone"
                    className="font-maisonNeue font-[16px] leading-[30px]"
                  >
                    Phone
                  </FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="text"
                    id="text"
                    className="border-foreground"
                  />
                  <FormLabel
                    htmlFor="text"
                    className="font-maisonNeue font-[16px] leading-[30px]"
                  >
                    Text
                  </FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="email"
                    id="email"
                    className="border-foreground"
                  />
                  <FormLabel
                    htmlFor="email"
                    className="font-maisonNeue font-[16px] leading-[30px]"
                  >
                    E-mail
                  </FormLabel>
                </div>
              </RadioGroup>
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="!mt-14 h-[72px] w-full max-w-[307px] border border-foreground text-[24px] leading-[56px] hover:bg-foreground/30"
        >
          Submit
        </button>
      </form>
    </Form>
  )
}

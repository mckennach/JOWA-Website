'use client'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import { Fragment, useEffect, useState } from 'react'
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
import { Text } from '../../ui/text'

const formSchema = z.object({
  EMAIL: z.string().email('Invalid email address'), // Email
  FNAME: z.string().nonempty('First Name is required'), // First Name
  LNAME: z.string().nonempty('Last Name is required'), // Last Name
  PROJADD: z.string().nonempty('Project Address is required'), // Project Address
  PHONE: z.string().nonempty('Phone Number is required'), // Phone Number
  DESC: z.string().optional(), // Project Description
  TYPE: z.string(), // Project Type
  IMAGE: z.array(z.string()).optional(), // File Upload
  METHOD: z.string(), // Best way to get in touch
})

export function CustomContactForm({
  status,
  message,
  onValidated,
}: {
  status: string | null
  message: string | Error | null
  onValidated: (formData: any) => void
}) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>()
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf'],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onValidated({
      FORMTYPE: 'Contact',
      ...values,
    })
  }

  useEffect(() => {
    if (status === 'success') {
      form.reset()
      setSuccessMessage('Thank you for subscribing!')
    }

    if (status === 'error') {
      setErrorMessage(message as string)
    }
  }, [status, message]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        autoComplete="on"
      >
        <div className="flex w-full gap-8">
          <FormField
            control={form.control}
            name="FNAME"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only" htmlFor="FNAME">
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
            name="LNAME"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only" htmlFor="LNAME">
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
            name="EMAIL"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only" htmlFor="EMAIL">
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
            name="PHONE"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only" htmlFor="PHONE">
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
            name="PROJADD"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="sr-only" htmlFor="PROJADD">
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
            <Text type="title3" tag="h2" className="text-secondary-foreground">
              Project Details
            </Text>
          </div>
          <FormField
            control={form.control}
            name="TYPE"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-maisonNeue font-[16px] leading-[30px]">
                  What type of project are you looking to do?*
                </FormLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue="New Construction"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="New Construction"
                      id="new-construction"
                      className="border-foreground"
                      {...form.register('TYPE')}
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
                      value="Full Renovation"
                      id="full-renovation"
                      className="border-foreground"
                      {...form.register('TYPE')}
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
                      value="Partial Renovation"
                      id="partial-renovation"
                      className="border-foreground"
                      {...form.register('TYPE')}
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
                      value="Other"
                      id="other"
                      className="border-foreground"
                      {...form.register('TYPE')}
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
          name="DESC"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-maisonNeue font-[16px] leading-[30px]">
                Please Describe:
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={6}
                  required={false}
                  className="rounded-none border-foreground bg-foreground font-maisonNeueExt text-background placeholder:text-foreground"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="IMAGE"
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
                  <input
                    {...getInputProps({ onChange })}
                    name="IMAGE"
                    id="IMAGE"
                  />

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
          name="METHOD"
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
                    {...form.register('METHOD')}
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
                    {...form.register('METHOD')}
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
                    {...form.register('METHOD')}
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

        {successMessage && (
          <FormMessage className="pt-4 text-foreground">
            <Text type="label">{successMessage}</Text>
          </FormMessage>
        )}

        {errorMessage && (
          <FormMessage className="pt-4">
            <Text type="label">{errorMessage}</Text>
          </FormMessage>
        )}
      </form>
    </Form>
  )
}

export default function ContactForm() {
  const url = `https://jowa.us20.list-manage.com/subscribe/post?u=24be9cc32ed66ec1c6739aa69&amp;id=434e73273f&amp;f_id=00e861e0f0`
  return (
    <Fragment>
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) => (
          <CustomContactForm
            status={status}
            message={message}
            onValidated={(formData: any) => subscribe(formData)}
          />
        )}
      />
    </Fragment>
  )
}

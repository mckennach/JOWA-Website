'use client'
import { useState, forwardRef } from 'react'
import Link from 'next/link'
import { Text } from '../../ui/text'
import { Node, Page, AcfMediaItemConnectionEdge } from '@/src/gql/graphql'
import { Slider } from '@/components/ui/slider'
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
import { useDropzone } from 'react-dropzone'

type PricingCalculatorFormProps = {
  page: Page
  setImage: (node: AcfMediaItemConnectionEdge['node']) => void
}

const formSchema = z.object({
  firstName: z.string().nonempty('First Name is required'),
  lastName: z.string().nonempty('Last Name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().nonempty('Phone Number is required'),
  projectAddress: z.string().nonempty('Project Address is required'),
  projectType: z.string(),
  description: z.string(),
  type: z.string(),
  package: z.string(),
  sqFt: z.number(),
  cost: z.number(),
  file: z.array(z.string()),
  preferredContactMethod: z.string(),
})

const PricingCalculatorForm = forwardRef<
  HTMLFormElement,
  PricingCalculatorFormProps
>(({ page, setImage }, ref) => {
  const content = page?.pricing
  const form = useForm<z.infer<typeof formSchema>>()
  const [sqFtValue, setSqFtValue] = useState(10000)

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

  const { types, spaces } = content ?? {}

  return (
    <Form {...form}>
      <form ref={ref}>
        <header className="mb-8 space-y-8 border-b pb-8">
          <Text tag="p" className="text-cream">
            * = required field
          </Text>
        </header>

        <div className="space-y-8">
          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="font-maisonNeue font-[16px] leading-[30px]">
                  1) What type of project are you looking to do?*
                </FormLabel>
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value)
                    const selectedType =
                      types && types[value as 'laneway' | 'reno' | 'newHome']
                    if (
                      selectedType &&
                      selectedType?.visualContent &&
                      selectedType?.visualContent?.image?.node
                    ) {
                      setImage(selectedType?.visualContent?.image?.node)
                    }
                  }}
                  defaultValue="laneway"
                >
                  {types &&
                    Object.keys(types).length > 0 &&
                    Object.keys(types).map((type, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={type}
                            id={type}
                            className="border-foreground"
                          />
                          <FormLabel
                            htmlFor={type}
                            className="font-maisonNeue font-[16px] leading-[30px]"
                          >
                            {type === 'laneway' && 'Laneway'}
                            {type === 'reno' && 'Reno'}
                            {type === 'newHome' && 'New Home'}
                          </FormLabel>
                        </div>
                      )
                    })}
                </RadioGroup>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="package"
            render={({ field }) => (
              <FormItem className="w-full border-t border-t-cream py-8">
                <FormLabel className="font-maisonNeue font-[16px] leading-[30px]">
                  2) Are you looking for full or partial design package?*
                </FormLabel>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue="ensuites"
                >
                  {spaces &&
                    Object.keys(spaces).length > 0 &&
                    Object.keys(spaces).map((type, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={type}
                            id={type}
                            className="border-foreground"
                          />
                          <FormLabel
                            htmlFor={type}
                            className="font-maisonNeue font-[16px] leading-[30px]"
                          >
                            {type}
                          </FormLabel>
                        </div>
                      )
                    })}
                </RadioGroup>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sqFt"
            render={({ field }) => (
              <FormItem className="w-full border-t border-t-cream py-8">
                <FormLabel className="font-maisonNeue font-[16px] leading-[30px]">
                  3) Total square footage you are looking to work on*
                </FormLabel>

                <div className="flex items-center gap-8">
                  <div className="basis-2/3">
                    <Slider
                      defaultValue={[sqFtValue]}
                      min={0}
                      max={25000}
                      step={10}
                      onValueChange={(value) => {
                        setSqFtValue(value[0])
                      }}
                    />
                  </div>
                  <div className="flex flex-grow basis-1/3 items-center gap-4">
                    <Input
                      {...field}
                      value={sqFtValue}
                      className="h-14 max-w-[135px] flex-shrink rounded-none border-foreground bg-cream font-maisonNeueExt text-foreground placeholder:text-foreground"
                    />
                    <Text type="caption" tag="p" className="flex-grow">
                      sq ft
                    </Text>
                  </div>
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="mb-6 mt-8 border-t py-8">
          <Text type="title3" tag="h2" className="">
            Get in touch for a more detailed quote
          </Text>
        </div>
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

        <div className="flex w-full flex-col gap-8 py-8">
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
                    className="rounded-none border-foreground bg-cream font-maisonNeueExt text-background placeholder:text-foreground"
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
                  Please attach existing pictures of the space and/or any
                  inspiration images you would like to share (please indicate in
                  file name).
                </FormLabel>
                <FormControl>
                  <div
                    {...getRootProps({ className: 'dropzone' })}
                    className="flex h-[161px] flex-col items-center justify-center border border-cream bg-background/20"
                  >
                    <input {...getInputProps({ onChange })} />

                    <p className="text-cream">
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

          <FormField
            control={form.control}
            name="preferredContactMethod"
            render={({ field }) => (
              <FormItem className="w-full border-t py-8">
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
            className="h-[72px] w-full max-w-[307px] border border-foreground text-[24px] leading-[56px] hover:bg-foreground/30"
          >
            Submit
          </button>
        </div>
      </form>
    </Form>
  )
})

PricingCalculatorForm.displayName = 'PricingCalculatorForm'

export default PricingCalculatorForm

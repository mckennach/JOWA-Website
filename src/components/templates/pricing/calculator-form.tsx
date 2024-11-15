'use client'
import { useEffect, useState, forwardRef } from 'react'
import { Text } from '../../ui/text'
import {
  Node,
  Page,
  AcfMediaItemConnectionEdge,
  PricingTypes_Fields,
  PricingTypesReno,
  PricingTypesNewBuild,
  PricingTypesLaneway,
} from '@/src/gql/graphql'
import { Slider } from '@/components/ui/slider'
import { set, useForm, useFormContext } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
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

declare global {
  interface ObjectConstructor {
    typedKeys<T>(obj: T): Array<keyof T>
  }
}
Object.typedKeys = Object.keys as any

const formSchema = z.object({
  firstName: z.string().nonempty('First Name is required'),
  lastName: z.string().nonempty('Last Name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().nonempty('Phone Number is required'),
  projectAddress: z.string().nonempty('Project Address is required'),
  projectType: z.string(),
  description: z.string(),
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
  const types = content?.types
  const spaces = content?.spaces
  const [cost, setCost] = useState(0)
  const [sqFtValue, setSqFtValue] = useState(10000)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      projectAddress: '',
      projectType: 'laneway',
      description: '',
      package: 'full',
      sqFt: 10000,
      cost: 10000 * 11,
      file: [],
      preferredContactMethod: '',
    },
  })

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf'],
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  useEffect(() => {
    const { unsubscribe } = form.watch((value) => {
      if (value.projectType && value.sqFt) {
        const selectedType =
          types && types[value.projectType as 'laneway' | 'reno' | 'newBuild']
        if (selectedType && value.package) {
          const pack =
            value.package === 'full' ? selectedType.full : selectedType.partial
          const cost = pack ? pack * value.sqFt : 10000 * value.sqFt
          setCost(cost)
        }
      }
    })
    return () => unsubscribe()
  }, [form]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Form {...form}>
      <form ref={ref} onSubmit={form.handleSubmit(onSubmit)}>
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
                      types && types[value as 'laneway' | 'reno' | 'newBuild']
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
                    Object.typedKeys(types).length > 0 &&
                    Object.typedKeys(types).map((key, index) => {
                      if (!key) return null
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={key}
                            id={key}
                            className="border-foreground"
                          />
                          <FormLabel
                            htmlFor={key}
                            className="font-maisonNeue font-[16px] leading-[30px]"
                          >
                            {
                              (
                                types[key] as
                                  | PricingTypesReno
                                  | PricingTypesNewBuild
                                  | PricingTypesLaneway
                              )?.label
                            }
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
                <RadioGroup onValueChange={field.onChange} defaultValue="full">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="full"
                      id="full"
                      className="border-foreground"
                    />
                    <FormLabel
                      htmlFor="full"
                      className="font-maisonNeue font-[16px] leading-[30px]"
                    >
                      Full
                    </FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="partial"
                      id="partial"
                      className="border-foreground"
                    />
                    <FormLabel
                      htmlFor="partial"
                      className="font-maisonNeue font-[16px] leading-[30px]"
                    >
                      Partial
                    </FormLabel>
                  </div>
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
                      defaultValue={[10000]}
                      min={0}
                      max={25000}
                      step={10}
                      onValueCommit={(value) => {
                        field.onChange(value[0])
                      }}
                    />
                  </div>
                  <div className="flex flex-grow basis-1/3 items-center gap-4">
                    <Input
                      {...field}
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

          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem className="w-full space-y-8 border-t border-t-cream py-8">
                <div className="flex items-center justify-between">
                  <FormLabel className="">
                    <Text type="title2">Total Estimated Cost:</Text>
                  </FormLabel>
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4">
                      <Text type="title2" tag="p" className="">
                        $
                      </Text>
                      <Input
                        {...field}
                        value={cost}
                        readOnly
                        className="h-14 max-w-[135px] flex-shrink rounded-none border-2 font-maisonNeueExt placeholder:text-foreground"
                      />
                      <div className="w-[40px]" />
                    </div>
                  </div>
                </div>
                {content?.disclaimer && (
                  <div>
                    <Text tag="p" className="text-cream">
                      DISCLAIMER: {content?.disclaimer}
                    </Text>
                  </div>
                )}
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

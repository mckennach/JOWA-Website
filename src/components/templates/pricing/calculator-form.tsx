'use client'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import { Fragment, useEffect, useState, forwardRef } from 'react'
import { Text } from '../../ui/text'
import {
  Page,
  AcfMediaItemConnectionEdge,
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

type CalculatorFormProps = {
  page: Page
  setImage: (node: AcfMediaItemConnectionEdge['node']) => void
  status: string | null
  message: string | Error | null
  onValidated: (formData: any) => void
}

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
  EMAIL: z.string().email('Invalid email address'), // Email
  FNAME: z.string().nonempty('First Name is required'), // First Name
  LNAME: z.string().nonempty('Last Name is required'), // Last Name
  PHONE: z.string().nonempty('Phone Number is required'), // Phone Number
  PROJADD: z.string().nonempty('Project Address is required'), // Project Address
  TYPE: z.string(), // Project Type
  DESC: z.string().optional(), // Project Description
  PACKAGE: z.string(),
  SQFT: z.number(),
  COST: z.number(),
  IMAGE: z.array(z.string()).optional(), // File Upload
  METHOD: z.string(), // Best way to get in touch
})

const CalculatorForm = forwardRef<HTMLFormElement, CalculatorFormProps>(
  ({ page, setImage, status, message, onValidated }, ref) => {
    const content = page?.pricing
    const types = content?.types
    const spaces = content?.spaces
    const [cost, setCost] = useState(10000 * 11)
    const [sqFtValue, setSqFtValue] = useState(10000)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        FNAME: '',
        LNAME: '',
        EMAIL: '',
        PHONE: '',
        PROJADD: '',
        TYPE: 'laneway',
        DESC: '',
        PACKAGE: 'Full',
        SQFT: 10000,
        COST: 10000 * 11,
        IMAGE: [],
        METHOD: '',
      },
    })

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png'],
        'application/pdf': ['.pdf'],
      },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
      onValidated({
        FORMTYPE: 'Pricing Calculator',
        ...values,
      })
    }

    useEffect(() => {
      const { unsubscribe } = form.watch((value) => {
        if (value.TYPE && value.SQFT) {
          const selectedType =
            types && types[value.TYPE as 'laneway' | 'reno' | 'newBuild']
          if (selectedType && value.PACKAGE) {
            const pack =
              value.PACKAGE === 'Full'
                ? selectedType.full
                : selectedType.partial
            const cost = pack ? pack * value.SQFT : 10000 * value.SQFT
            setCost(cost)
          }
        }
      })
      return () => unsubscribe()
    }, [form]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      console.log(status, message)

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
        <form ref={ref} onSubmit={form.handleSubmit(onSubmit)} action="">
          <header className="mb-8 space-y-8 border-b pb-8">
            <Text tag="p" className="text-cream">
              * = required field
            </Text>
          </header>

          <div className="space-y-8">
            <FormField
              control={form.control}
              name="TYPE"
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
              name="PACKAGE"
              render={({ field }) => (
                <FormItem className="w-full border-t border-t-cream py-8">
                  <FormLabel className="font-maisonNeue font-[16px] leading-[30px]">
                    2) Are you looking for full or partial design package?*
                  </FormLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue="Full"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Full"
                        id="full"
                        className="border-foreground"
                        {...form.register('PACKAGE')}
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
                        value="Partial"
                        id="partial"
                        className="border-foreground"
                        {...form.register('PACKAGE')}
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
              name="SQFT"
              render={({ field }) => (
                <FormItem className="w-full border-t border-t-cream py-8">
                  <FormLabel
                    className="font-maisonNeue font-[16px] leading-[30px]"
                    htmlFor="SQFT"
                  >
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
              name="COST"
              render={({ field }) => (
                <FormItem className="w-full space-y-8 border-t border-t-cream py-8">
                  <div className="flex items-center justify-between">
                    <FormLabel className="" htmlFor="COST">
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

          <div className="flex w-full flex-col gap-8 py-8">
            <FormField
              control={form.control}
              name="DESC"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel
                    className="font-maisonNeue font-[16px] leading-[30px]"
                    htmlFor="DESC"
                  >
                    Please Describe:
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={6}
                      required={true}
                      className="rounded-none border-foreground bg-cream font-maisonNeueExt text-walnut placeholder:text-foreground"
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
                    Please attach existing pictures of the space and/or any
                    inspiration images you would like to share (please indicate
                    in file name).
                  </FormLabel>
                  <FormControl>
                    <div
                      {...getRootProps({ className: 'dropzone' })}
                      className="flex h-[161px] flex-col items-center justify-center border border-cream bg-background/20"
                    >
                      <input {...getInputProps({ onChange })} id="IMAGE" />

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
              name="METHOD"
              render={({ field }) => (
                <FormItem className="w-full border-t py-8">
                  <FormLabel className="font-maisonNeue font-[16px] leading-[30px]">
                    Best way to get in touch:*
                  </FormLabel>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue="Phone"
                    className="flex gap-8"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="Phone"
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
                        value="Text"
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
                        value="Email"
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
              className="h-[72px] w-full max-w-[307px] border border-foreground text-[24px] leading-[56px] hover:bg-foreground/30"
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
          </div>
        </form>
      </Form>
    )
  }
)

CalculatorForm.displayName = 'CalculatorForm'

const PricingCalculatorForm = forwardRef<
  HTMLFormElement,
  PricingCalculatorFormProps
>(({ page, setImage }, ref) => {
  const url = `https://jowa.us20.list-manage.com/subscribe/post?u=24be9cc32ed66ec1c6739aa69&amp;id=434e73273f&amp;f_id=00ef61e0f0`
  return (
    <Fragment>
      <MailchimpSubscribe
        url={url}
        render={({ subscribe, status, message }) => (
          <CalculatorForm
            page={page}
            setImage={setImage}
            ref={ref}
            status={status}
            message={message}
            onValidated={(formData: any) => subscribe(formData)}
          />
        )}
      />
    </Fragment>
  )
})

PricingCalculatorForm.displayName = 'PricingCalculatorForm'

export default PricingCalculatorForm

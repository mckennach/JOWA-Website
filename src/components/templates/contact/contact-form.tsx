"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  firstName: z.string().nonempty("First Name is required"),
	lastName: z.string().nonempty("Last Name is required"),
	email: z.string().email("Invalid email address"),
	phoneNumber: z.string().nonempty("Phone Number is required"),
	projectAddress: z.string().nonempty("Project Address is required"),
	projectType: z.string(),
	description: z.string(),
	preferredContactMethod: z.string(),
})

export default function ContactForm() {
	const form = useForm()

  return (
		<Form {...form}>
			<form className="space-y-4">
				<div className="flex gap-8">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<Input
								{...field}
								placeholder="First Name*"
								required={true}
								className="rounded-none text-foreground border-foreground placeholder:text-foreground font-maisonNeueExt"
							/>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Last Name*"
								required={true}
								className="rounded-none text-foreground border-foreground placeholder:text-foreground font-maisonNeueExt"
							/>
						)}
					/>
				</div>
				<div className="flex gap-8">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<Input
								{...field}
								placeholder="E-mail*"
								required={true}
								className="rounded-none text-foreground border-foreground placeholder:text-foreground font-maisonNeueExt"
							/>
						)}
					/>
					<FormField
						control={form.control}
						name="phoneNumber"
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Phone Number*"
								required={true}
								className="rounded-none text-foreground border-foreground placeholder:text-foreground font-maisonNeueExt"
							/>
						)}
					/>
				</div>
				<div className="flex gap-8">
					<FormField
						control={form.control}
						name="projectAddress"
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Project Address*"
								required={true}
								className="rounded-none text-foreground border-foreground placeholder:text-foreground font-maisonNeueExt"
							/>
						)}
					/>
				</div>
				<div>
					<div className="border-b border-secondary-foreground mb-6 mt-8">
						<h2 className="text-secondary-foreground text-[24px]">Project Details</h2>
					</div>
					<FormField
						control={form.control}
						name="projectType"
						render={({ field }) => (
							<RadioGroup defaultValue="new-construction">
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="new-construction" id="new-construction" className="border-foreground" />
									<FormLabel htmlFor="new-construction">New Construction</FormLabel>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="full-renovation" id="full-renovation" className="border-foreground" />
									<FormLabel htmlFor="full-renovation">Full Renovation</FormLabel>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="partial-renovation" id="partial-renovation" className="border-foreground" />
									<FormLabel htmlFor="partial-renovation">Partial Renovation</FormLabel>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="other" id="other" className="border-foreground" />
									<FormLabel htmlFor="other">Other</FormLabel>
								</div>
							</RadioGroup>
						)}
					/>
				</div>
				<div>
				<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>What type of project are you looking to do?*</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										required={true}
										className="bg-foreground rounded-none text-background border-foreground placeholder:text-foreground font-maisonNeueExt"
									/>
								</FormControl>
							</FormItem>
							
						)}
					/>
				</div>
			</form>
		</Form>
		
	)
}

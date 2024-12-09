'use client'

import { createCookie } from "@/src/lib/api/actions"
import { useState } from "react"
import { Container, Section } from "../../craft"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { Text } from "../../ui/text"

export default function Login() {
	const [value, setValue] = useState('');
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(value === process.env.NEXT_PUBLIC_PASSWORD) {
			createCookie('user:auth', 'true');
		} else {
			alert('Invalid password');
		}
	}

	return (
		<Section>
			<Container className="py-32 flex flex-col items-center gap-10">
				<div className="flex flex-col items-center">
					<Text tag="h1" type="title1">Coming soon!</Text>
					<Text tag="h2" type="label">Login to preview</Text>
				</div>
				
				<form className="flex gap-2" onSubmit={handleSubmit}>
					<Input 
							onChange={(e) => setValue(e.target.value)} 
							type="password" placeholder="Password" autoComplete="false"
					  />
					<Button type="submit">Login</Button>
				</form>
			</Container>
		</Section>
	)
}
import { Container, Section } from '@/components/craft'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'

import { auth, signIn } from '@/src/lib/api/auth'
import { redirect } from 'next/navigation'

export default async function SignIn() {
  const session = await auth()
  const credentialAction = async (formData: FormData) => {
    'use server'
    try {
      await signIn('credentials', formData)
    } catch (error) {
      console.log(error)
    }
  }
  if (session) {
    redirect('/')
  }

  return (
    <Section>
      <Container className="py-32 flex flex-col items-center gap-10">
        <div className="flex flex-col items-center">
          <Text tag="h1" type="title1">
            Coming soon!
          </Text>
          <Text tag="h2" type="label">
            Login to preview
          </Text>
        </div>

        <form action={credentialAction}>
          <div className="flex gap-2">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="false"
            />
            <Button type="submit">Login</Button>
          </div>
        </form>
      </Container>
    </Section>
  )
}

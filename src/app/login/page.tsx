import { Container, Section } from '@/components/craft'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { Global, RootQueryToMenuItemConnection } from '@/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'
import {
  GLOBALS_QUERY,
  LOAD_SCREEN_QUERY,
  MENU_ITEMS_QUERY,
} from '@/src/lib/queries'
import { print } from 'graphql/language/printer'
import { auth, signIn } from '@/src/lib/api/auth'
import { redirect } from 'next/navigation'

async function getGlobalData() {
  const { global } = await fetchGraphQL<{
    global: Global
  }>(print(GLOBALS_QUERY), {
    id: '357',
  })

  if (global === null) {
    throw new Error('Failed to fetch data')
  }

  return global
}

export default async function SignIn() {
	const globalData = await getGlobalData()

  const session = await auth();
  const credentialAction = async (formData: FormData) => {
    'use server'
    try {
      await signIn('credentials', formData)
    } catch (error) {
      console.log(error)
    }
  }

	// if(globalData.globals?.passwordEnabled) {
	// 	const formData = new FormData();
	// 	formData.append('password', 'jowa2024!');
	// 	await credentialAction(formData);
	// }

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

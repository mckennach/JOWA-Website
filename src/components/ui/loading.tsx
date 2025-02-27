import { LoaderCircle } from 'lucide-react'
import React from 'react'
import { Container, Section } from '../craft'

const Loading: React.FC = () => {
  return (
    <Section className="aspect-[16/9] min-w-screen bg-background">
      <Container className="flex items-center justify-center h-full">
        <LoaderCircle className="animate-spin w-12 h-12 text-foreground" />
      </Container>
    </Section>
  )
}

export default Loading

import { Section, Container } from '@/components/craft'
import CustomIcons from '@/src/components/custom-icons'

export default function Footer() {
  return (
    <footer className="cream relative z-50 h-screen bg-background text-foreground">
      <Section className="h-full">
        <Container className="flex h-full flex-col justify-end">
          <div className="flex flex-col gap-[100px]">
            <div className="w-full">
              <CustomIcons name="logo" />
            </div>
            <div>
              <div className="grid grid-cols-2 border-b border-t py-4 text-2xl md:grid-cols-4">
                <div>
                  <p className="body-sm-fluid">
                    Where your vision unfolds.
                  </p>
                </div>
                <div>
                  <p className="body-sm-fluid">Vancouver, BC</p>
                </div>
                <div>
                  <p className="body-sm-fluid">T: 604.377.6177</p>
                </div>
                <div>
                  <p className="body-sm-fluid">IG: @jowainteriors</p>
                </div>
              </div>
              <div className="grid grid-cols-2 border-b py-4 text-2xl md:grid-cols-4">
                <div></div>
                <div></div>
                <div>
                  <p className="body-sm-fluid">E: info@jowa.ca</p>
                </div>
                <div>
                  <p className="body-sm-fluid">
                    © 2023 Jowa Interiors Ltd.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end pb-20 pt-4">
                <p className="text-[14px] text-muted-foreground/25">
                  Site by Super Sensitive Studios
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  )
}

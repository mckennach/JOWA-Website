'use client'

import { useRef, useState } from 'react'
import { Container, Section } from '../../craft'
import { Text } from '../../ui/text'

// const code = `<table cellspacing='0' cellpadding='0' border='0' style='border-collapse:separate;table-layout:fixed;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;' emb-background-style width='100%' ><tbody><tr><td style="color:#888A74;font-size:14px;height:15px;font-family:Arial, Helvetica, sans-serif;"><p style="margin:.1px;"><span style='font-size:18px;'>RUTH KWON </span><img src='https://image.signature.email/img/spacer.gif' height='2' width='165' style='height:2px;width:165px;' alt='' /> <a href="https://columbusuniversity.org/" style="border:0px;display:inline-block;vertical-align:middle;" target="_blank"><img src="https://image.signature.email/images/6750cadc4c79c.png" width="32.5" height="15" style="display:inline-block;border:0px;" border="0" nosend="1" alt="" /></a></p></td></tr><tr><td style="color:#888A74;font-size:14px;mso-line-height-rule:exactly;margin-bottom:15px;line-height:17px;font-family:Arial, Helvetica, sans-serif;"><p style="margin:.1px;"><span style='font-style:italic;font-size:12px;'>Designer</span></p></td></tr><br /><tr><td style="color:#888A74;font-size:14px;height:26px;font-family:Arial, Helvetica, sans-serif;"><p style="margin:.1px;"><a href="https://jowa.ca/logologo.png" style="border:0px;display:block;height:26px;" target="_blank"><img src="https://image.signature.email/images/6750ca10a59c5.png" width="316" height="26" style="display:block;border:0px;" border="0" nosend="1" alt="" /></a></p></td></tr><tr><td style="color:#888A74;font-size:12px;mso-line-height-rule:exactly;line-height:22px;font-family:Arial, Helvetica, sans-serif;"><p style="margin:.1px;"><a href="tel:604.377.6177" style="color:#888A74;text-decoration:none;" target="_blank">604.377.6177</a> <span> | </span> <a href="mailto:ruth@jowa.ca" style="color:#888A74;text-decoration:none;" target="_blank">ruth@jowa.ca</a> <span> | </span> <a href="https://jowa.ca/" style="color:#888A74;text-decoration:none;" target="_blank">jowa.ca</a> <span> | </span> <a href="https://www.instagram.com/jowa.interiors/" style="color:#888A74;text-decoration:none;" target="_blank">@jowainteriors </a></p></td></tr></tbody></table>`
const code = `<br><table cellspacing='0' cellpadding='0' border='0' style='border-collapse:separate;table-layout:fixed;overflow-wrap:break-word;word-wrap:break-word;word-break:break-word;' emb-background-style width='100%' ><tbody><tr><td style="color:#888A74;font-size:14px;height:15px;font-family:Arial, Helvetica, sans-serif;"><p style="margin:.1px;"><span style='color:#888A74;font-size:18px;'>RUTH KWON </span><img src='https://org62730.img.email/img/spacer.gif' height='2' width='165' style='height:2px;width:165px;' alt='' /> <a href="https://columbusuniversity.org/" style="border:0px;display:inline-block;vertical-align:middle;" target="_blank"><img src="https://org62730.img.email/images/6750cadc4c79c.png" width="32.5" height="15" style="display:inline-block;border:0px;" border="0" nosend="1" alt="" /></a></p></td></tr><tr><td style="color:#888A74;font-size:14px;mso-line-height-rule:exactly;line-height:17px;font-family:Arial, Helvetica, sans-serif;"><p style="margin:.1px;"><span style='font-style:italic;color:#888A74;font-size:12px;'>Designer</span></p></td></tr><tr><td style="color:#888A74;font-size:14px;mso-line-height-rule:exactly;line-height:21px;font-family:Arial, Helvetica, sans-serif;"><p style="margin:.1px;"><img src='https://org62730.img.email/img/spacer.gif' height='2' width='15' style='height:2px;width:15px;' alt='' /></p></td></tr><tr><td style="color:#888A74;font-size:14px;height:26px;font-family:Arial, Helvetica, sans-serif;"><p style="margin:.1px;"><a href="https://jowa.ca/logologo.png" style="border:0px;display:block;height:26px;" target="_blank"><img src="https://org62730.img.email/images/6750ca10a59c5.png" width="316" height="26" style="display:block;border:0px;" border="0" nosend="1" alt="" /></a></p></td></tr><tr><td style="color:#888A74;font-size:12px;mso-line-height-rule:exactly;line-height:22px;font-family:Arial, Helvetica, sans-serif;"><p style="margin:.1px;"><span style='color:#888A74;'><a href="tel:604.377.6177" style="color:#888A74;text-decoration:none;" target="_blank">604.377.6177</a> <span>|</span> </span><span style='color:#888A74;'><a href="mailto:ruth@jowa.ca" style="color:#888A74;text-decoration:none;" target="_blank">ruth@jowa.ca</a> <span>|</span> </span><span style='color:#888A74;'><a href="https://jowa.ca/" style="color:#888A74;text-decoration:none;" target="_blank">jowa.ca</a> <span>|</span> </span><span style='color:#888A74;'><a href="https://www.instagram.com/jowa.interiors/" style="color:#888A74;text-decoration:none;" target="_blank">@jowa.interiors </a></span></p></td></tr></tbody></table>`;


export default function EmailSignature() {
  const [isCopied, setIsCopied] = useState(false)
  const htmlRef = useRef<HTMLDivElement>(null)
  const handleCopy = (e: React.MouseEvent<HTMLDivElement>) => {
    navigator.clipboard.write([
      new ClipboardItem({
        'text/plain': new Blob([code ?? ''], { type: 'text/plain' }),
        'text/html': new Blob([code ?? ''], { type: 'text/html' }),
      }),
    ])
    setIsCopied(true)

    setTimeout(() => {
      setIsCopied(false)
    }, 5000)
  }

  return (
    <Section className="bg-secondary py-20">
      <Container>
        <Text type="title1" tag="h1">
          Email Signature
        </Text>
        <div
          className="max-w-[80%] rounded-lg bg-black/80 p-6"
          onClick={handleCopy}
          role="button"
        >
          <pre>
            <code className="text-wrap text-cream">
              {JSON.stringify(code, null, 2)}
            </code>
          </pre>
        </div>
        <div className="mt-2 flex max-w-[80%] justify-between">
          <p>Click to copy!</p>
          <p>{isCopied && `Copied!`}</p>
        </div>
      </Container>
    </Section>
  )
}

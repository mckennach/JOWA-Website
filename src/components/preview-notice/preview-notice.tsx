'use client'
import { usePathname } from 'next/navigation'
import styles from './PreviewNotice.module.css'

export const PreviewNotice = () => {
  const pathname = usePathname()

  return (
    <aside className={styles.preview}>
      Preview mode enabled
      <a
        className={styles.link}
        href={`/api/exit-preview?path=${encodeURIComponent(pathname)}`}
      >
        Exit
      </a>
    </aside>
  )
}

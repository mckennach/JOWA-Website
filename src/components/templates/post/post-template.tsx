import { print } from 'graphql/language/printer'

import { ContentNode, Post } from '@/gql/graphql'
import { fetchGraphQL } from '@/src/lib/api/fetchGraphQL'

import styles from './PostTemplate.module.css'
import { POST_QUERY } from '@/lib/queries'

interface TemplateProps {
  node: ContentNode
}

export default async function PostTemplate({ node }: TemplateProps) {
  const { post } = await fetchGraphQL<{ post: Post }>(print(POST_QUERY), {
    id: node.databaseId,
  })

  return (
    <div className={styles.post}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.author}>By {post.author?.node.name}</div>

      <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
    </div>
  )
}

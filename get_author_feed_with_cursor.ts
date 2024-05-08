import { BskyAgent } from "@atproto/api";
import type {Record} from "@atproto/api/dist/client/types/app/bsky/feed/post";

const main = async () => {
  const agent = new BskyAgent({
    service: 'https://bsky.social',
  })

  await agent.login({
    identifier: process.env.IDENTIFIER,
    password: process.env.APP_PASSWORD
  })

  const {data: {feed, cursor}} = await agent.getAuthorFeed({
    actor: process.env.IDENTIFIER,
    limit: 3,
    cursor: '2024-05-06T14:43:40.051Z'
  })

  console.log(cursor)

  const records = feed.map(f => f.post.record as Record)
  const feeds = records.map(({text, createdAt}) => {
    return {
      text, createdAt
    }
  })

  console.log(feeds)
}

main()
import { BskyAgent } from "@atproto/api";
import type {Record} from "@atproto/api/dist/client/types/app/bsky/feed/post";

const agent = new BskyAgent({
  service: 'https://bsky.social',
})


const main = async () => {
  await agent.login({
    identifier: process.env.IDENTIFIER,
    password: process.env.APP_PASSWORD
  })

  const {data: {feed}} = await agent.getAuthorFeed({
    actor: process.env.IDENTIFIER
  })

  const records = feed.map(f => f.post.record as Record)
  const items = records.map(({text, createdAt}) => {
    return {
      text, createdAt
    }
  })

  console.log(items)
}

main()
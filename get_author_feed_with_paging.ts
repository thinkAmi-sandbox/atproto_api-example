import { BskyAgent } from "@atproto/api";
import type {Record} from "@atproto/api/dist/client/types/app/bsky/feed/post";

const getFeed = async (agent: BskyAgent, cursor: string)  => {
  const params = {
    actor: process.env.IDENTIFIER,
    limit: 5,
  }
  if (cursor) {
    params['cursor'] = cursor
  }

  const {data: {feed, cursor: nextCursor}} = await agent.getAuthorFeed(params)
  const records = feed.map(f => f.post.record as Record)
  const feeds = records.map(({text, createdAt}) => {
    return {
      text, createdAt
    }
  })

  return {feeds, nextCursor}
}

const main = async () => {
  const agent = new BskyAgent({
    service: 'https://bsky.social',
  })

  await agent.login({
    identifier: process.env.IDENTIFIER,
    password: process.env.APP_PASSWORD
  })

  let cursor: string | undefined = ''
  while (cursor != undefined) {
    const {feeds, nextCursor} = await getFeed(agent, cursor)
    console.log(`============================\n${cursor}\n============================`)
    console.log(feeds)

    cursor = nextCursor
  }
}

main()
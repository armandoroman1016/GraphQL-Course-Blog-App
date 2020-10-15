import { makeSchema } from '@nexus/schema'
import { join } from 'path'

import * as typeDefs from './graphql'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'

export const schema = makeSchema({
    types: typeDefs,
    outputs:{
        typegen: join(__dirname, '..', 'nexus-typegen.ts'),
        schema: join(__dirname, "..", "schema.graphql")
    },
    typegenAutoConfig: {
        sources: [
          {
            source: require.resolve("./context"), // 1
            alias: "ContextModule",                         // 2
          },
        ],
        contextType: "ContextModule.Context",               // 3
      },
      plugins: [nexusSchemaPrisma()]
})

/*
1) Behind the scenes Nexus will parse the context.ts file to extract the available types.
2) These types become available under the umbrella of our ContextModule alias.
3) We can then use that alias to refer to any type defined in this file. Here, our context type is named Context, so we refer to it as ContextModule.Context.
*/
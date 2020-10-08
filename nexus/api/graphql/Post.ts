import { objectType, extendType, stringArg, intArg } from "@nexus/schema"

export const Post = objectType({
    name: "Post",
    definition(t){
        t.int("id")
        t.string("title")
        t.string("body")
        t.boolean("published")
    }
})

export const PostQuery = extendType({
    type: "Query",
    definition(t){
        t.list.field("drafts", {
            nullable: false,
            type:"Post",
            resolve(_root, _args, { db }){
                return db.post.findMany({ where: { published: false } })
            }
        }),
        t.list.field("posts", {
            nullable: false,
            type: "Post",
            resolve(_root, _args, { db }){
                return db.post.findMany({ where: { published: true }})
            }
        })
    }
})

export const PostMutation = extendType({
    type: "Mutation",
    definition(t){
        t.field("createDraft", {
            type: "Post",
            nullable: false,
            args: {
                title: stringArg({required: true}),
                body: stringArg({required:true})
            },
            resolve(_root, args, { db }){
                const draft = {
                    title: args.title,
                    body: args.body,
                    published: false
                }

                return db.post.create({ data: draft })

            }
        }),
        t.field("publish", {
            type: "Post",
            nullable: false,
            args: {
                draftId: intArg({required: true})
            },
            resolve(_root, args, ctx){

                return ctx.db.post.update({
                    where: { id: args.draftId },
                    data: {
                      published: true,
                    },
                  });
            }
        })
    }
})
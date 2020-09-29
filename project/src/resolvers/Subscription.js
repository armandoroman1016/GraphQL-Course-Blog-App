const Subscription = {
    comment: {
        subscribe(parent, args, {db, pubsub}, info){
            const {postID} = args

            const post = db.posts.find(p => p.id === postID && p.published)

            if(!post) throw new Error("Post not found")

            return pubsub.asyncIterator(`comment ${postID}`)
        }
    },
    post: {
        subscribe(parent, args, {db, pubsub}, info){
            return pubsub.asyncIterator("post")
        }
    }
}

export { Subscription as default }
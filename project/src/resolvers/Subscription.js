const Subscription = {
    count: {
        subscribe(parent, args, { pubsub }, info) {
            let count = 0

            setInterval(() => {
                count++
                pubsub.publish('count', {
                    count
                })
            }, 1000)

            return pubsub.asyncIterator('count')
        }
    },
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
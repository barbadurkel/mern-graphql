const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');


module.exports = {
    // Each mutation / query / subscription that involves Post type will call this
    Post:{
        likeCount: (parent) => parent.likes.length,     
        commentCount: (parent) => parent.comments.length       
    },
    Query:{
            ...postsResolvers.Query
    },
    Mutation:{
            ...usersResolvers.Mutation,
            ...postsResolvers.Mutation,
            ...commentsResolvers.Mutation
    },
    Subscription:{
            ...postsResolvers.Subscription
    }
}

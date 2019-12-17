const { ApolloServer, PubSub } = require('apollo-server')
const mongoose = require('mongoose');

const { MONGODB } = require('./config');
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const pubsub = new PubSub();

// takes the requset body and 'forwards' it to the context which will be used by the resolver
const server = new ApolloServer({
    typeDefs,
    resolvers, 
    context: ({ req }) => ({ req, pubsub })
})

mongoose.connect(MONGODB, {useNewUrlParser : true})
 .then( () => {
    console.log('Database connection established.')
    return server.listen({port: 5000});
 })
 .then( res => {
    console.log(`server running on : ${res.url}`)
})  
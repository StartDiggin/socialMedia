const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config');

const pubsub = new PubSub();

const PORT = process.env.PORT || 5000;

// server instances 
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});

// connect to mongoose 
mongoose.connect(MONGODB, { useNewUrlParser: true })
.then(() => {
    console.log("Mongodb connect");
    return server.listen({ port: PORT })
})
.then(res => {
    console.log(`Server running at ${res.url}`)
})
.catch(err => {
    console.log(err)
})

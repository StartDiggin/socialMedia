const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require('./config');



// server instances 
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// connect to mongoose 
mongoose.connect(MONGODB, { useNewUrlParser: true })
.then(() => {
    console.log("Mongodb connect");
    return server.listen({ port: 5000 })
})
.then(res => {
    console.log(`Server running at ${res.url}`)
})

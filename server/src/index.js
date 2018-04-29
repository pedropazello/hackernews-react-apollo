const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const Feed = require('./resolvers/Feed')
require('dotenv').config()

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Feed,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: process.env.GRAPHQL_SERVER_URL,
      secret: process.env.GRAPHQL_SERVER_PASSWORD,
      debug: true
    }),
  }),
})

server.start(() => console.log('Server is running on http://localhost:4000'))

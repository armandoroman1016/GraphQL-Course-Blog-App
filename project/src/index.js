import { GraphQLServer } from 'graphql-yoga'

//? Scalar Types = String, Boolean, Int, Float, ID

// ! type definition(schema)

const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
        sold: Boolean!
    }
`

// ! resolvers
const resolvers = {
    Query: {
        title(){
            return 'Nike Air Max'
        },
        price(){
            return 124.64
        },
        releaseYear(){
            return 1992
        },
        rating(){
            return 4.5
        },
        inStock(){
            return false
        },
        sold(){
            return true
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => console.log('Server is running'))
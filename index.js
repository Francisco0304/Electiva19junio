import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import {
    getAll,
    findById,
    saveBook
} from "./controllers/controll-books.mjs";

// Definición de tipos
const typeDefs = `
    type Author {
        name: String
        country: String
    }
    
    type Book {
        id: Int
        title: String
        author: Author
        pages: Int
        year: Int
    }

    type Query {
        getBooks: [Book]
        getBookById(id: Int!): Book
    }

    input typeAuthor{
        name: String!
        country: String!
    }

    type Mutation{
        addBook(id:Int!, title: String!,author:typeAuthor,pages:Int!,
        year:Int!):Book
    }
`;

// Definición de resolvers
const resolvers = {
    Query: {
        getBooks : getAll,
        getBookById : findById
        },

    Mutation:{
        addBook : saveBook
    }
}

// Creación del servidor Apollo
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Inicio del servidor
async function startServer() {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 3600 }
    });

    console.log(`🚀 Servidor listo en ${url}`);
}

startServer().catch(error => {
    console.error('Error al iniciar el servidor:', error);
});

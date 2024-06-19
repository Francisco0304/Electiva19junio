import { ApolloServer } from '@apollo/server';
import { startStandaloneServer 
    } from '@apollo/server/standalone';

    import books from "./resources/data.mjs"

    console.log(books)
// Definición de tipos
const typeDefs = `
    type Query {
        getNumber: Int
        getCousing(num: Int!): Boolean
    }
`;

// Función para verificar si un número es primo
let isCousing = (parent, args, contextValue, info) => {
    const number = args.num;

    let cont = 2
    let cousing = true
    while( cont <= number / 2 && cousing ){
        cousing = !( number % cont++ == 0)
    }

    return cousing;
};

// Definición de resolvers
const resolvers = {
    Query: {
        getNumber: () => Math.floor(Math.random() * 91 + 10),
        getCousing: isCousing
    }
};

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
    console.error('Error starting server:', error);
});

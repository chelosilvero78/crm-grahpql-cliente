import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch'
import { setContext } from 'apollo-link-context';

/*const httpLink = createHttpLink({
    uri: 'https://pacific-bayou-12464.herokuapp.com/',
    fetch   
});*/
/* const httpLink = createHttpLink({
    uri: 'https://crm-2020-cliente.vercel.app',
    fetch   
});
 */
const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
    fetch   
});

const authLink = setContext((_, { headers }) => {

    // Leer el storage almacenado
    const token = localStorage.getItem('token');
    // console.log(token);

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});


const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat( httpLink )
});

export default client;
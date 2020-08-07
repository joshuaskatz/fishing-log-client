import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import './styles/main.scss';

import AppRouter from './router/AppRouter';
import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
	uri: process.env.REACT_APP_URI
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	};
});

const cache = new InMemoryCache();

const client = new ApolloClient({
	cache,
	link: authLink.concat(httpLink)
});

cache.writeData({
	data: {
		isLoggedIn: !!localStorage.getItem('token')
	}
});

const jsx = (
	<ApolloProvider client={client}>
		<AppRouter />
	</ApolloProvider>
);

ReactDOM.render(jsx, document.getElementById('root'));

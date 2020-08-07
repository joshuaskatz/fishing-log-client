export const isAuth = (client) => {
	return client.cache.data.data.ROOT_QUERY.isLoggedIn;
};

import React from 'react';

import MainNavbar from './navigation/MainNavbar';

const NotFoundPage = () => {
	return (
		<div>
			<MainNavbar />
			<h3 className="page-header">404: Page Not Found</h3>
		</div>
	);
};

export default NotFoundPage;

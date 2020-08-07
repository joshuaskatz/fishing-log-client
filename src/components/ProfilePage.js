import React from 'react';
import { Col, Container } from 'react-bootstrap';

import MainNavbar from './navigation/MainNavbar';
import MyTackleList from './query-lists/MyTackleList';
import MyDatesList from './query-lists/MyDatesList';

export const ProfilePage = () => {
	return (
		<div>
			<MainNavbar />
			<Container>
				<Col
					xs={12}
					sm={{ span: 10, offset: 1 }}
					className="my-3 my-md-5"
				>
					<MyDatesList />
				</Col>
				<Col
					xs={13}
					sm={{ span: 10, offset: 1 }}
					className="my-3 my-md-5"
				>
					<MyTackleList />
				</Col>
			</Container>
		</div>
	);
};

export { ProfilePage as default };

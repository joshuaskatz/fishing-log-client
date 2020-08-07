import React from 'react';
import { Col } from 'react-bootstrap';

import MainNavbar from './navigation/MainNavbar';
import AddTackleForm from './forms/AddTackleForm';

const AddTacklePage = () => {
	return (
		<div>
			<MainNavbar />
			<Col
				className="my-4 my-sm-3"
				xs={{ span: 10, offset: 1 }}
				md={{ span: 10, offset: 1 }}
				lg={{ span: 8, offset: 2 }}
			>
				<AddTackleForm className="d-flex align-self-center" />
			</Col>
		</div>
	);
};

export { AddTacklePage as default };

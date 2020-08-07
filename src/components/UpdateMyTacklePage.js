import React from 'react';
import { Col } from 'react-bootstrap';

import MainNavbar from './navigation/MainNavbar';
import UpdateMyTackleForm from './forms/UpdateMyTackleForm';

const UpdateMyDatePage = (props) => {
	return (
		<div>
			<MainNavbar />
			<Col
				className="my-4 my-sm-3"
				xs={{ span: 10, offset: 1 }}
				md={{ span: 10, offset: 1 }}
				lg={{ span: 8, offset: 2 }}
			>
				<UpdateMyTackleForm />
			</Col>
		</div>
	);
};

export default UpdateMyDatePage;

import React, { useEffect } from 'react';
import { Form, Button, Container, Col, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { Redirect, withRouter } from 'react-router-dom';

import { isAuth } from '../utils/isAuth';
import { CREATE_USER } from '../graphql-gql/mutation';

const SignUpPage = (props) => {
	const { register, handleSubmit, errors } = useForm();

	const [ createUser, { error } ] = useMutation(CREATE_USER);

	const client = useApolloClient();

	useEffect(
		() => {
			window.addEventListener('unhandledrejection', (e) => {
				e.preventDefault();

				if (error) {
					console.log(error);
				}
			});
			return () =>
				window.removeEventListener(
					'unhandledrejection',
					(e) => e.preventDefault
				);
		},
		[ error ]
	);

	const onSubmit = (values) => {
		createUser({
			variables: {
				name: values.name,
				email: values.email,
				password: values.password
			}
		}).then((result) => {
			props.history.push('/home');
		});
	};

	if (isAuth(client)) return <Redirect to="/home" />;

	return (
		<div>
			<Container className="auth-position">
				<h2 className="text-center auth-page-header mb-5">
					Share Our Waters
				</h2>
				<Col
					xs={{ span: 10, offset: 1 }}
					sm={{ span: 8, offset: 2 }}
					md={{ span: 6, offset: 3 }}
					lg={{ span: 4, offset: 4 }}
				>
					<h3 className="text-center secondary-header mb-3">
						Sign up
					</h3>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group>
							<Form.Label htmlFor="name">Name</Form.Label>
							<Form.Control
								id="name"
								name="name"
								ref={register({ required: true })}
							/>
							{errors.name && (
								<Alert variant="danger">Name is required</Alert>
							)}
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="email">Email</Form.Label>
							<Form.Control
								id="email"
								name="email"
								type="email"
								ref={register({ required: true })}
							/>
							{errors.email && (
								<Alert variant="danger">
									Valid email is required
								</Alert>
							)}
							{error && (
								<Alert variant="danger">
									Email is already in use
								</Alert>
							)}
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="password">Password</Form.Label>
							<Form.Control
								id="password"
								name="password"
								type="password"
								ref={register({
									required: true,
									minLength: { value: 8 },
									maxLength: { value: 20 }
								})}
							/>
							{errors.password && (
								<Alert variant="danger">
									Password must be 8-20 characters long{' '}
								</Alert>
							)}
						</Form.Group>

						<Button
							variant="outline-dark-blue"
							type="submit"
							className="btn-block my-4"
						>
							Sign me up!
						</Button>
					</Form>
				</Col>
			</Container>
		</div>
	);
};

export default withRouter(SignUpPage);

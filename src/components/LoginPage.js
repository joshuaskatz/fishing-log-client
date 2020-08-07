import React, { useEffect } from 'react';
import { Form, Button, Container, Col, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { Link, withRouter, Redirect } from 'react-router-dom';

import { isAuth } from '../utils/isAuth';
import { LOGIN } from '../graphql-gql/mutation';

const LoginPage = (props) => {
	const { register, handleSubmit, errors } = useForm();

	const client = useApolloClient();

	const [ login, { error } ] = useMutation(LOGIN, {
		//When login completes store token to localStorage
		onCompleted({ login }) {
			localStorage.setItem('token', login.token);
			//Client recognizes user is logged in
			client.writeData({ data: { isLoggedIn: true } });
		}
	});

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
		login({
			variables: {
				email: values.email,
				password: values.password
			}
		}).then((result) => props.history.push('/home'));
	};

	if (isAuth(client)) return <Redirect to="/home" />;

	return (
		<div>
			<Container className="auth-position">
				<h2 className="text-center auth-page-header mb-5">
					Fishing Log
				</h2>

				<Col
					xs={{ span: 10, offset: 1 }}
					sm={{ span: 8, offset: 2 }}
					md={{ span: 6, offset: 3 }}
					lg={{ span: 4, offset: 4 }}
				>
					<h3 className="text-center secondary-header  mb-3">
						Login
					</h3>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group>
							<Form.Label htmlFor="email">Email</Form.Label>
							<Form.Control
								id="email"
								name="email"
								type="email"
								ref={register({ required: true })}
							/>
						</Form.Group>
						<Form.Group className="mb-1">
							<Form.Label htmlFor="password">Password</Form.Label>
							<Form.Control
								id="password"
								name="password"
								type="password"
								ref={register({
									required: true
								})}
							/>
						</Form.Group>
						{(error || errors.email || errors.password) && (
							<Alert variant="danger">
								Please enter valid username and password
							</Alert>
						)}
						<Link
							to="/signup"
							className="d-flex justify-content-center my-3 auth-link text-center"
						>
							Don't have an account? Click here to sign up!
						</Link>
						<Button
							variant="outline-dark-blue"
							type="submit"
							className="btn-block"
						>
							Login
						</Button>
					</Form>
				</Col>
			</Container>
		</div>
	);
};

export default withRouter(LoginPage);

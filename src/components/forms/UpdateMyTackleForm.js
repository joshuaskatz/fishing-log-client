import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Col, InputGroup, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';

import { toTitleCase } from '../../utils/toTitleCase';

import { GET_MY_TACKLE } from '../../graphql-gql/query';
import { UPDATE_TACKLE, DELETE_TACKLE } from '../../graphql-gql/mutation';

const options = [
	{ value: 'Yes', label: 'Overcharged' },
	{ value: 'No', label: 'Not Overcharged' }
];

const AddTackleForm = (props) => {
	const { data, loading } = useQuery(GET_MY_TACKLE);
	const [ updateTackle ] = useMutation(UPDATE_TACKLE);
	const [ deleteTackle ] = useMutation(DELETE_TACKLE);

	const [ tackle, setTackle ] = useState({});

	const { register, handleSubmit, errors, control } = useForm();

	useEffect(
		() => {
			!loading &&
				setTackle(
					data.myTackle.find((tackle) => {
						return tackle.id === props.match.params.id;
					})
				);
		},
		[ loading, data, props ]
	);

	const onSubmit = (values) => {
		updateTackle({
			variables: {
				id: props.match.params.id,
				rod: toTitleCase(values.rod),
				rodWeight: values.rodWeight,
				rodLengthFeet: values.rodLengthFeet,
				rodLengthInches: values.rodLengthInches,
				overcharged: values.overcharged && values.overcharged.value,
				leaderLengthFeet: values.leaderLengthFeet,
				leaderLengthInches: values.leaderLengthInches,
				tippetSize: values.tippetSize
			}
		});
		props.history.push('/profile');
	};

	return (
		<div>
			<h2 className="text-center page-header">Update Tackle</h2>
			<Container>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Row>
						<Col xs={12} sm={6}>
							<Form.Group>
								<Form.Label htmlFor="rod">Rod Name</Form.Label>
								<Form.Control
									id="rod"
									name="rod"
									defaultValue={tackle.rod}
									ref={register({
										pattern: {
											value: /^[A-Za-z\s]+$/,
											message:
												'Must enter valid name for rod.'
										}
									})}
								/>
								{errors.rod && (
									<Form.Text muted>
										{errors.rod.message}
									</Form.Text>
								)}
							</Form.Group>
							<Form.Group className="mb-1">
								<Form.Label htmlFor="rodLengthFeet">
									Rod Length
								</Form.Label>
								<Row>
									<Col>
										<InputGroup>
											<Form.Control
												id="rodLengthFeet"
												type="number"
												name="rodLengthFeet"
												className="form-control-input-group-prepend"
												defaultValue={
													tackle.rodLengthFeet
												}
												ref={register()}
											/>

											<InputGroup.Append>
												<InputGroup.Text className="input-group-text-prepend">
													Ft.
												</InputGroup.Text>
											</InputGroup.Append>
										</InputGroup>
									</Col>
									<Col>
										<InputGroup>
											<Form.Control
												id="rodLengthInches"
												type="number"
												name="rodLengthInches"
												className="form-control-input-group-prepend"
												defaultValue={
													tackle.rodLengthInches
												}
												ref={register()}
											/>

											<InputGroup.Append>
												<InputGroup.Text className="input-group-text-prepend">
													In.
												</InputGroup.Text>
											</InputGroup.Append>
										</InputGroup>
									</Col>
								</Row>
							</Form.Group>

							<Form.Group className="mb-1">
								<Form.Label htmlFor="rodWeight">
									Rod Weight
								</Form.Label>
								<InputGroup>
									<Form.Control
										type="number"
										id="rodWeight"
										name="rodWeight"
										className="form-control-input-group-prepend"
										defaultValue={tackle.rodWeight}
										ref={register()}
									/>

									<InputGroup.Append>
										<InputGroup.Text className="input-group-text-prepend">
											Wt.
										</InputGroup.Text>
									</InputGroup.Append>
								</InputGroup>
							</Form.Group>
						</Col>
						<Col xs={12} sm={6}>
							<Form.Group className="mb-1">
								<Form.Label htmlFor="overcharged">
									Overcharged
								</Form.Label>
								<Controller
									control={control}
									as={<Select />}
									options={options}
									id="overcharged"
									name="overcharged"
									isClearable
								/>
							</Form.Group>
							<Form.Group className="mb-1">
								<Form.Label htmlFor="leaderLengthFeet">
									Leader Length
								</Form.Label>
								<Row>
									<Col>
										<InputGroup>
											<Form.Control
												id="leaderLengthFeet"
												name="leaderLengthFeet"
												type="number"
												className="form-control-input-group-prepend"
												defaultValue={
													tackle.leaderLengthFeet
												}
												ref={register()}
											/>
											<InputGroup.Append>
												<InputGroup.Text className="input-group-text-prepend">
													Ft.
												</InputGroup.Text>
											</InputGroup.Append>
										</InputGroup>
									</Col>
									<Col>
										<InputGroup>
											<Form.Control
												id="leaderLengthInches"
												name="leaderLengthInches"
												type="number"
												className="form-control-input-group-prepend"
												defaultValue={
													tackle.leaderLengthInches
												}
												ref={register()}
											/>
											<InputGroup.Append>
												<InputGroup.Text className="input-group-text-prepend">
													In.
												</InputGroup.Text>
											</InputGroup.Append>
										</InputGroup>
									</Col>
								</Row>
							</Form.Group>
							<Form.Group className="mb-1">
								<Form.Label htmlFor="tippetSize">
									Tippet Size
								</Form.Label>
								<InputGroup>
									<Form.Control
										id="tippetSize"
										type="number"
										name="tippetSize"
										className="form-control-input-group-prepend"
										defaultValue={tackle.tippetSize}
										ref={register()}
									/>
									<InputGroup.Append>
										<InputGroup.Text className="input-group-text-prepend">
											X
										</InputGroup.Text>
									</InputGroup.Append>
								</InputGroup>
							</Form.Group>
						</Col>
					</Row>
					<Col />
					<Row className="mt-3">
						<Col xs={6} sm={{ span: 4, offset: 1 }}>
							<Button
								className="btn-block my-3"
								variant="outline-dark-blue"
								type="submit"
							>
								Update
							</Button>
						</Col>
						<Col xs={6} sm={{ span: 4, offset: 2 }}>
							<Button
								className="btn-block my-3"
								variant="outline-dark-blue"
								onClick={() => {
									deleteTackle({
										variables: {
											id: props.match.params.id
										}
									});
									props.history.push('/profile');
								}}
							>
								Remove
							</Button>
						</Col>
					</Row>
				</Form>
			</Container>
		</div>
	);
};

export default withRouter(AddTackleForm);

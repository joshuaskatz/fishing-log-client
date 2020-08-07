import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Col, InputGroup, Row } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';

import { UPDATE_DATE, DELETE_DATE } from '../../graphql-gql/mutation';

import {
	GET_FLIES,
	GET_FISH,
	GET_MY_TACKLE,
	GET_RIVER,
	GET_MY_DATES
} from '../../graphql-gql/query';

import {
	fishOptions,
	flyOptions,
	myTackleOptions,
	riverOptions
} from '../../utils/options';

const AddTackleForm = (props) => {
	const { data, loading } = useQuery(GET_MY_DATES);

	const [ updateDate ] = useMutation(UPDATE_DATE);
	const [ deleteDate ] = useMutation(DELETE_DATE);

	const [ date, setdate ] = useState('');

	useEffect(
		() => {
			!loading &&
				setdate(
					data.myDates.find(
						(myDate) => myDate.id === props.match.params.id
					)
				);
		},
		[ loading, data, props, setdate ]
	);

	const fliesQuery = useQuery(GET_FLIES);
	const fishQuery = useQuery(GET_FISH);
	const myTackleQuery = useQuery(GET_MY_TACKLE);
	const riverQuery = useQuery(GET_RIVER);

	const optionsFish = fishOptions(fishQuery);
	const optionsFly = flyOptions(fliesQuery);
	const optionsMyTackle = myTackleOptions(myTackleQuery);
	const optionsRiver = riverOptions(riverQuery);

	const { register, handleSubmit, errors, control } = useForm();

	const onSubmit = (values) => {
		const fishValues = values.fish && values.fish.map((f) => f.value);
		const fliesValues =
			values.flies && values.flies.map((fly) => fly.value);

		updateDate({
			variables: {
				id: props.match.params.id,
				date: date.date,
				amountCaught: values.amount,
				averageSize: values.average,
				largestSize: values.largest,
				fish: fishValues,
				flies: fliesValues,
				river: values.river && values.river.value,
				tackle: values.tackle && values.tackle.value
			}
		});
		props.history.push('/profile');
	};

	return (
		<div>
			<h2 className="text-center page-header">Update Date</h2>
			<Container>
				<Col
					xs={{ span: 10, offset: 1 }}
					sm={{ span: 8, offset: 2 }}
					md={{ span: 6, offset: 3 }}
					lg={{ span: 4, offset: 4 }}
				>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group>
							<Form.Group>
								<div className="">
									<h4 className="text-center secondary-header my-3">
										{date.date}
									</h4>
								</div>
							</Form.Group>
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="amount">
								Amount of Fish Caught
							</Form.Label>
							<Form.Control
								type="number"
								id="amount"
								name="amount"
								defaultValue={date.amountCaught}
								ref={register({
									pattern: {
										value: /^[+]?\d*\.?\d*$/,
										message:
											'Must enter valid value for amount of fish caught.'
									}
								})}
							/>
							{errors.amount && (
								<Form.Text muted>
									{errors.amount.message}
								</Form.Text>
							)}
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="average">
								Average Size of Fish
							</Form.Label>
							<InputGroup>
								<Form.Control
									type="number"
									id="average"
									name="average"
									className="form-control-input-group-prepend"
									defaultValue={date.averageSize}
									ref={register({
										pattern: {
											value: /^[+]?\d*\.?\d*$/,
											message:
												'Must enter valid value for average size of fish caught.'
										}
									})}
								/>
								<InputGroup.Append>
									<InputGroup.Text className="input-group-text-prepend">
										In.
									</InputGroup.Text>
								</InputGroup.Append>
							</InputGroup>
							{errors.average && (
								<Form.Text muted>
									{errors.average.message}
								</Form.Text>
							)}
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="largest">
								Largest Fish Caught
							</Form.Label>
							<InputGroup>
								<Form.Control
									type="number"
									id="largest"
									name="largest"
									className="form-control-input-group-prepend"
									defaultValue={date.largestSize}
									ref={register({
										pattern: {
											value: /^[+]?\d*\.?\d*$/,
											message:
												'Must enter valid value for largest size of fish caught.'
										}
									})}
								/>
								<InputGroup.Append>
									<InputGroup.Text className="input-group-text-prepend">
										In.
									</InputGroup.Text>
								</InputGroup.Append>
							</InputGroup>
							{errors.largest && (
								<Form.Text muted>
									{errors.largest.message}
								</Form.Text>
							)}
						</Form.Group>
						<Form.Group className="mb-1">
							<Form.Label htmlFor="fish">Fish</Form.Label>
							<Controller
								control={control}
								as={<Select />}
								isMulti
								options={optionsFish}
								id="fish"
								name="fish"
								isClearable
							/>
						</Form.Group>
						<Form.Group className="mb-1">
							<Form.Label htmlFor="flies">Flies</Form.Label>
							<Controller
								control={control}
								as={<Select />}
								isMulti
								options={optionsFly}
								id="flies"
								name="flies"
								isClearable
							/>
						</Form.Group>
						<Form.Group className="mb-1">
							<Form.Label htmlFor="tackle">Tackle</Form.Label>
							<Controller
								control={control}
								as={<Select />}
								options={optionsMyTackle}
								id="tackle"
								name="tackle"
								isClearable
							/>
						</Form.Group>
						<Form.Group className="mb-1">
							<Form.Label htmlFor="river">River</Form.Label>
							<Controller
								control={control}
								as={<Select />}
								options={optionsRiver}
								id="river"
								name="river"
								isClearable
							/>
						</Form.Group>
						<Row>
							<Col>
								<Button
									className="btn-block my-3"
									variant="outline-dark-blue"
									type="submit"
								>
									Update
								</Button>
							</Col>
							<Col>
								<Button
									className="btn-block my-3"
									variant="outline-dark-blue"
									onClick={() => {
										deleteDate({
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
				</Col>
			</Container>
		</div>
	);
};

export default withRouter(AddTackleForm);

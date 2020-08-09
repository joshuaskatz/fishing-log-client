import React, { useEffect, useRef, useState } from 'react';
import {
	Form,
	Button,
	Container,
	Col,
	InputGroup,
	Row,
	Alert
} from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { toTitleCase } from '../../utils/toTitleCase';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import { CREATE_RIVER } from '../../graphql-gql/mutation';

const optionsRegulation = [
	{ value: 'Delayed Harvest', label: 'Delayed Harvest' },
	{ value: 'Catch and Release', label: 'Catch and Release' },
	{ value: 'Hatchery Supported', label: 'Hatchery Supported' }
];

const optionsOvergrown = [
	{ value: 'Overgrown', label: 'Overgrown' },
	{ value: 'Some Overhang/Brush', label: 'Some Overhang/Brush' },
	{ value: 'Not Overgrown', label: 'Not Overgrown' }
];

const optionsSize = [
	{ value: 'Very Small Creek', label: 'Very Small Creek' },
	{ value: 'Small Stream', label: 'Small Stream' },
	{ value: 'Small Pond', label: 'Small Pond' },
	{ value: 'Midsize River', label: 'Midsize River' },
	{ value: 'Large River', label: 'Large River' },
	{ value: 'Large Lake', label: 'Large Lake' }
];

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const AddRiverForm = (props) => {
	const { register, handleSubmit, errors, control } = useForm();

	const [ lat, setLat ] = useState('');
	const [ lng, setLng ] = useState('');
	const [ windowInnerWidth, setWindowInnerWidth ] = useState(
		window.innerWidth
	);
	const [ large, setLarge ] = useState(
		window.innerWidth >= 992 ? true : false
	);

	const [ createRiver ] = useMutation(CREATE_RIVER);

	const mapContainerRef = useRef(null);

	const onSubmit = (values) => {
		createRiver({
			variables: {
				latitude: values.latitude,
				longitude: values.longitude,
				name: toTitleCase(values.name),
				overgrown: values.overgrown.value,
				size: values.size.value,
				regulation: values.regulation.value
			}
		});
		props.history.push('/findwaternearme');
	};

	const updateWidth = () => {
		setWindowInnerWidth(window.innerWidth);
	};

	useEffect(
		() => {
			const map = new mapboxgl.Map({
				container: 'mapForm',
				style: 'mapbox://styles/mapbox/streets-v11',
				center: [ -98.5795, 39.8283 ],
				zoom: 2
			});

			map.addControl(
				new MapboxGeocoder({
					accessToken: mapboxgl.accessToken,
					mapboxgl: mapboxgl
				})
			);

			map.addControl(
				new mapboxgl.GeolocateControl({
					positionOptions: {
						enableHighAccuracy: true
					},
					trackUserLocation: true
				})
			);

			map.addControl(new mapboxgl.NavigationControl());

			map.on('click', (e) => {
				setLat(e.lngLat.lat);
				setLng(e.lngLat.lng);
			});

			window.addEventListener('resize', updateWidth);

			windowInnerWidth >= 992 ? setLarge(true) : setLarge(false);

			return () => {
				window.removeEventListener('resize', updateWidth);
			};
		},
		[ windowInnerWidth, large ]
	);

	return (
		<div>
			<h2 className="text-center page-header">Add River</h2>
			<Container fluid>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Row>
						{/*Hidden below lg (992px) breakpoint*/}
						<Col lg={5} id="river-form-col-lg">
							{large && (
								<Form.Group>
									<Form.Label htmlFor="nameLg">
										River Name
									</Form.Label>
									<Form.Control
										id="nameLg"
										name="name"
										ref={register({
											required: 'Required Field',
											pattern: {
												value: /^[A-Za-z\s]+$/,
												message:
													'Must enter valid name for a river.'
											}
										})}
									/>
									{errors.name && (
										<Alert variant="danger">
											{errors.name.message}
										</Alert>
									)}
								</Form.Group>
							)}
							<Form.Group className="mb-1">
								<Form.Label htmlFor="latitude">
									Coordinates {' '}
									<Form.Text className="d-inline">
										(N<span>&#176;</span> & E<span>&#176;</span>{' '}
										are positive, while S<span>&#176;</span>{' '}
										& W<span>&#176;</span> are negative)
									</Form.Text>
									<Alert variant="warning">
										Can't find the coordinates? Find & click
										the location on the map!
									</Alert>
								</Form.Label>
								<Row>
									<Col>
										<InputGroup>
											<InputGroup.Prepend>
												<InputGroup.Text className="input-group-text-append">
													Lat.
												</InputGroup.Text>
											</InputGroup.Prepend>
											<Form.Control
												id="latitude"
												name="latitude"
												type="text"
												className="form-control-input-group-append"
												defaultValue={lat}
												ref={register({
													required: 'Required Field',
													pattern: {
														value: /^[+]?\d*\.?\d*$/,
														message:
															'Must enter valid latitude value.'
													}
												})}
											/>
										</InputGroup>

										{errors.latitude && (
											<Alert variant="danger">
												{errors.latitude.message}
											</Alert>
										)}
									</Col>

									<Col>
										<InputGroup>
											<InputGroup.Prepend>
												<InputGroup.Text className="input-group-text-append">
													Lng.
												</InputGroup.Text>
											</InputGroup.Prepend>
											<Form.Control
												id="longitude"
												name="longitude"
												defaultValue={lng}
												className="form-control-input-group-append"
												ref={register({
													required: 'Required Field',
													pattern: {
														value: /^[-+]?\d*\.?\d*$/,
														message:
															'Must enter valid longitude value.'
													}
												})}
											/>
										</InputGroup>
										{errors.longitude && (
											<Alert variant="danger">
												{errors.longitude.message}
											</Alert>
										)}
									</Col>
								</Row>
							</Form.Group>
							<Form.Group className="mb-1">
								<Form.Label htmlFor="regulation">
									Regulation
								</Form.Label>
								<Controller
									control={control}
									as={<Select />}
									options={optionsRegulation}
									id="regulation"
									name="regulation"
									isClearable
									rules={{
										required: 'Required Field'
									}}
								/>
								{errors.regulation && (
									<Alert variant="danger">
										{errors.regulation.message}
									</Alert>
								)}
							</Form.Group>
							<Form.Group className="mb-1">
								<Form.Label htmlFor="overgrown">
									Overgrowth
								</Form.Label>
								<Controller
									control={control}
									as={<Select />}
									options={optionsOvergrown}
									id="overgrown"
									name="overgrown"
									isClearable
									rules={{
										required: 'Required Field'
									}}
								/>
								{errors.overgrown && (
									<Alert variant="danger">
										{errors.overgrown.message}
									</Alert>
								)}
							</Form.Group>
							<Form.Group className="mb-1">
								<Form.Label htmlFor="size">
									Body of Water
								</Form.Label>
								<Controller
									control={control}
									as={<Select />}
									options={optionsSize}
									id="size"
									name="size"
									rules={{
										required: 'Required Field'
									}}
									isClearable
								/>
								{errors.size && (
									<Alert variant="danger">
										{errors.size.message}
									</Alert>
								)}
							</Form.Group>
							<div className="my-3 d-flex justify-content-center">
								<Button
									variant="outline-dark-blue"
									type="submit"
								>
									Add River!
								</Button>
							</div>
						</Col>
						{/*Hidden above lg (992px) breakpoint*/}
						<Col
							xs={{ span: 10, offset: 1 }}
							lg={{ span: 5, order: 'first' }}
							className="d-lg-none"
						>
							{!large && (
								<Form.Group>
									<Form.Label htmlFor="name-sm">
										River Name
									</Form.Label>
									<Form.Control
										id="name-sm"
										name="name"
										ref={register({
											required: 'Required Field',
											pattern: {
												value: /^[A-Za-z\s]+$/,
												message:
													'Must enter valid name for a river.'
											}
										})}
									/>
									{errors.name && (
										<Alert variant="danger">
											{errors.name.message}
										</Alert>
									)}
								</Form.Group>
							)}

							<Form.Group className="mb-1">
								<Form.Label htmlFor="latitude-sm">
									Coordinates {' '}
									<Form.Text className="d-inline">
										(N<span>&#176;</span> & E<span>&#176;</span>{' '}
										are positive, while S<span>&#176;</span>{' '}
										& W<span>&#176;</span> are negative)
									</Form.Text>
									<Alert variant="warning">
										Can't find your coordinates? Find and
										click your location on the map!
									</Alert>
								</Form.Label>
								<Row>
									<Col>
										<InputGroup>
											<InputGroup.Prepend>
												<InputGroup.Text className="input-group-text-append">
													Lat.
												</InputGroup.Text>
											</InputGroup.Prepend>
											<Form.Control
												id="latitude-sm"
												name="latitude"
												type="text"
												className="form-control-input-group-append"
												defaultValue={lat}
												ref={register({
													required: 'Required Field',
													pattern: {
														value: /^[-+]?\d*\.?\d*$/,
														message:
															'Must enter valid latitude value.'
													}
												})}
											/>
										</InputGroup>

										{errors.latitude && (
											<Alert variant="danger">
												{errors.latitude.message}
											</Alert>
										)}
									</Col>

									<Col>
										<InputGroup>
											<InputGroup.Prepend>
												<InputGroup.Text className="input-group-text-append">
													Lng.
												</InputGroup.Text>
											</InputGroup.Prepend>
											<Form.Control
												id="longitude"
												name="longitude"
												defaultValue={lng}
												className="form-control-input-group-append"
												ref={register({
													required: 'Required Field',
													pattern: {
														value: /^[-+]?\d*\.?\d*$/,
														message:
															'Must enter valid longitude value.'
													}
												})}
											/>
										</InputGroup>
										{errors.longitude && (
											<Alert variant="danger">
												{errors.longitude.message}
											</Alert>
										)}
									</Col>
								</Row>
							</Form.Group>
						</Col>
						{/*Visible at all breakpoints*/}
						<Col
							xs={{ span: 10, offset: 1 }}
							lg={{ span: 7 }}
							className="align-self-start  mapbox-lg ml-lg-0"
						>
							<Form.Group>
								<div
									id="mapForm"
									className="mt-3 mt-lg-5"
									ref={mapContainerRef}
								/>
							</Form.Group>
						</Col>
						<Col
							xs={{ span: 10, offset: 1 }}
							lg={{ span: 4, order: 'last' }}
							className="d-lg-none"
						>
							<Form.Group className="mb-1">
								<Form.Label htmlFor="regulation-sm">
									Regulation
								</Form.Label>
								<Controller
									control={control}
									as={<Select />}
									options={optionsRegulation}
									id="regulation-sm"
									name="regulation"
									isClearable
									rules={{
										required: 'Required Field'
									}}
								/>
								{errors.regulation && (
									<Alert variant="danger">
										{errors.regulation.message}
									</Alert>
								)}
							</Form.Group>
							<Form.Group className="mb-1">
								<Form.Label htmlFor="overgrown-sm">
									Overgrowth
								</Form.Label>
								<Controller
									control={control}
									as={<Select />}
									options={optionsOvergrown}
									id="overgrown-sm"
									name="overgrown"
									isClearable
									rules={{
										required: 'Required Field'
									}}
								/>
								{errors.overgrown && (
									<Alert variant="danger">
										{errors.overgrown.message}
									</Alert>
								)}
							</Form.Group>
							<Form.Group className="mb-1">
								<Form.Label htmlFor="size-sm">
									Body of Water
								</Form.Label>
								<Controller
									control={control}
									as={<Select />}
									options={optionsSize}
									id="size-sm"
									name="size"
									rules={{
										required: 'Required Field'
									}}
									isClearable
								/>
								{errors.size && (
									<Alert variant="danger">
										{errors.size.message}
									</Alert>
								)}
							</Form.Group>
							<div className=" my-3 d-flex justify-content-center">
								<Button
									className=" my-3"
									variant="outline-dark-blue"
									type="submit"
								>
									Add River!
								</Button>
							</div>
						</Col>
					</Row>
				</Form>
			</Container>
		</div>
	);
};

export default withRouter(AddRiverForm);

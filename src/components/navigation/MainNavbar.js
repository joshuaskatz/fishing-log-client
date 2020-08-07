import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import { GET_ME } from '../../graphql-gql/query';

const MainNavbar = () => {
	const { loading, data } = useQuery(GET_ME);

	const usersName = !loading && data.me.name;
	return (
		<div>
			<Navbar
				collapseOnSelect
				expand="md"
				variant="dark"
				className="main-navbar"
			>
				<Navbar.Brand
					as={Link}
					className="d-md-none d-lg-inline-block"
					id="navbar-brand"
					to="/home"
				>
					Fishing Log
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse>
					<Nav className="mr-auto ">
						<Nav.Link
							as={NavLink}
							to="/adddates"
							activeClassName="active"
							className="navbar-link mr-md-3"
						>
							Add Date
						</Nav.Link>
						<Nav.Link
							as={NavLink}
							to="/addtackle"
							activeClassName="active"
							className="navbar-link mr-md-3"
						>
							Add Tackle
						</Nav.Link>
						<Nav.Link
							as={NavLink}
							to="/findwaternearme"
							activeClassName="active"
							className="navbar-link mr-md-3"
						>
							Find Water Near Me
						</Nav.Link>
						<NavDropdown
							title="Help Our Database Grow"
							id="add-database-dropdown"
						>
							<NavDropdown.Item as={Link} to="/createfish">
								Add Fish
							</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/createflies">
								Add Flies
							</NavDropdown.Item>
							<NavDropdown.Item as={Link} to="/createrivers">
								Add Rivers
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
					<Navbar.Text className="justify-self-end" id="navbar-text">
						Signed in as:{' '}
						<NavLink
							to="/profile"
							activeClassName="active"
							className="navbar-link ml-md-2"
							id="navbar-text-link"
						>
							{usersName}
						</NavLink>
					</Navbar.Text>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export { MainNavbar as default };

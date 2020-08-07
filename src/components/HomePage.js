import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import MainNavbar from './navigation/MainNavbar';

const HomePage = () => {
	return (
		<div>
			<MainNavbar />
			<Container className="home-page-container ">
				<h1 className="home-page-header">No more gatekeeping</h1>
				<p className="home-page-paragraph">
					Discovering new bodies of water keeps the sport of fly
					fishing fresh. However, there is a large sect of the
					community practicing gatekeeping; not naming rivers for fear
					of putting too much pressure on their favorite waters.
				</p>
				<h2 className="home-page-secondary-header">
					The land doesn't belong to you
				</h2>
				<p className="home-page-paragraph">
					This mindset can have serious repurcussions. When you see
					bodies of water with pressure from large amounts of anglers,
					it is most likely due to the fact that they don't have the
					knowledge or resources to discover new bodies of water. When
					we spread information of bodies of water, more people may
					fish them, but it takes away a lot of pressure from other
					bodies of water, taking strain off of the surrounding
					wildlife.
				</p>
				<h2 className="home-page-secondary-header">Conservation</h2>
				<p className="home-page-paragraph">
					The more people who know about, and spend time on new bodies
					of water, the more advocacy and conservation efforts can
					occur. At the end of the day it is our job as anglers to
					conserve and advocate for a greener future, keeping our
					waters clean and healthy for future generations.
				</p>
				<div className="d-flex justify-content-center">
					<Button
						as={Link}
						to="/findwaternearme"
						variant="outline-dark-blue"
					>
						Find Water Near Me!
					</Button>
				</div>
			</Container>
		</div>
	);
};

export { HomePage as default };

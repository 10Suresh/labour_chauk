// import node module libraries
import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const NotFound = (props) => {
	return (
		<main>
			<section className="bg-white">
				<Container className="d-flex flex-column">
					<main>
						{props.children}
						<Outlet />
					</main>
				</Container>
			</section>
		</main>
	);
};

export default NotFound;

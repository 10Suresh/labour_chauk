// import node module libraries
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Container, ListGroup } from 'react-bootstrap';

// import MDI icons
import Icon from '@mdi/react';
import { mdiFacebook, mdiTwitter, mdiInstagram } from '@mdi/js';

const FooterWithLinks = () => {
	return (
		<Fragment>
			<footer className="pt-lg-10 pt-5 footer bg-white ">
				<Row className="mx-4">
					<Col lg={3} md={6} sm={12}>
						{/* about company  */}
						<div className="mb-4">
							<Image
								src={`https://static.tv9hindi.com/images/TV9-Hindi-Logo.svg`}
								alt=""
								className="logo-inverse"
							/>
							<div className="mt-4">
								<p>
									DC Vs SRH Live Score, IPL 2024: Rishabh Pant’s Delhi Capitals
									Take On Pat Cummins-Led Sunrisers Hyderabad
								</p>
								{/* social media */}
								<div className="fs-4 mt-4">
									<Link to="#" className="mdi mdi-facebook text-muted me-2">
										<Icon path={mdiFacebook} size={0.7} />
									</Link>
									<Link to="#" className="mdi mdi-twitter text-muted me-2">
										<Icon path={mdiTwitter} size={0.7} />
									</Link>
									<Link to="#" className="mdi mdi-instagram text-muted ">
										<Icon path={mdiInstagram} size={0.7} />
									</Link>
								</div>
							</div>
						</div>
					</Col>
					<Col lg={2} md={3} sm={6}>
						<div className="mb-4">
							{/* list */}
							<h3 className="fw-bold mb-3">Today's Rate</h3>
							<ListGroup
								as="ul"
								bsPrefix="list-unstyled"
								className="nav nav-footer flex-column nav-x-0"
							>
								<ListGroup.Item as="li" bsPrefix=" ">
									<Link to="#" className="nav-link">
										Gold Rate today
									</Link>
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix=" ">
									<Link to="#" className="nav-link">
										Silver rate Today
									</Link>
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix=" ">
									<Link to="#" className="nav-link">
										Petrol Rate Today
									</Link>
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix=" ">
									<Link to="#" className="nav-link">
										Desel rate Today
									</Link>
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix=" ">
									<Link to="#" className="nav-link">
										Trading News
									</Link>
								</ListGroup.Item>
							</ListGroup>
						</div>
					</Col>
					<Col lg={2} md={3} sm={6}>
						<div className="mb-4">
							{/* list */}
							<h3 className="fw-bold mb-3">Today's Rate</h3>
							<ListGroup
								as="ul"
								bsPrefix="list-unstyled"
								className="nav nav-footer flex-column nav-x-0"
							>
								<ListGroup.Item as="li" bsPrefix=" ">
									<Link to="#" className="nav-link">
										Entertainment News
									</Link>
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix=" ">
									<Link to="#" className="nav-link">
										Lok Sabha Election Schedule
									</Link>
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix=" ">
									<Link to="#" className="nav-link">
										Bollywood News
									</Link>
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix=" ">
									<Link to="#" className="nav-link">
										Health News
									</Link>
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix=" ">
									<Link to="#" className="nav-link">
										Lifestyle News
									</Link>
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix=" ">
									<Link to="#" className="nav-link">
										‘Planned Attack’: TMC Workers Stop Adhir Ranjan’s Convoy In
										Murshidabad, Chant ‘Go Back’ Slogans
									</Link>
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix=" ">
									<Link to="#" className="nav-link">
										Sports News
									</Link>
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix=" ">
									<Link to="#" className="nav-link">
										Fitness
									</Link>
								</ListGroup.Item>
							</ListGroup>
						</div>
					</Col>
					<Col lg={3} md={3} sm={6}>
						<div className="mb-4">
							{/* list  */}
							<h3 className="fw-bold mb-3">TRENDING NEWS</h3>
							<ListGroup
								as="ul"
								bsPrefix="list-unstyled"
								className="nav nav-footer flex-column nav-x-0"
							>
								<ListGroup.Item as="li" bsPrefix=" ">
									<Link to="#" className="nav-link">
										Latest News
									</Link>
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix=" ">
									<Link to="#" className="nav-link">
										Health and Wellness
									</Link>
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix=" ">
									<Link to="#" className="nav-link">
										Educational News
									</Link>
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix=" ">
									<Link to="#" className="nav-link">
										Mukesh Khanna Says Zeenat Aman ‘Has Lived According To
										Western Civilisation’ As He Criticises Her Stance On Live-In
										Relationships: ‘Think Before Speaking’
									</Link>
								</ListGroup.Item>
								<ListGroup.Item as="li" bsPrefix=" ">
									<Link to="#" className="nav-link">
										Business News
									</Link>
								</ListGroup.Item>
							</ListGroup>
						</div>
					</Col>
					<Col lg={2} md={12} sm={12}>
						{/* contact info */}
						<div className="mb-4">
							<h3 className="fw-bold mb-3">Quick Links</h3>
							<p>T&C</p>
							<p className="mb-1">
								<Link to="#">Privacy and Policy</Link>
							</p>
							<p>Advertise with Us</p>
							<p>
								<Link href="#">Subscribe</Link>
							</p>
							<div className="d-flex">
								<Link to="#">Brand Solutions</Link>
								<Link to="#" className="ms-2">
									Contact Us
								</Link>
							</div>
						</div>
					</Col>
				</Row>
				<Row className="align-items-center g-0 border-top py-2 mt-6">
					{/* Desc  */}
					<Col lg={4} md={5} sm={12}>
						<span>Developed BY sksoftwaresolution All Rights Reserved.</span>
					</Col>
					{/*  Links  */}
					<Col lg={8} md={7} sm={12} className="d-md-flex justify-content-end">
						<nav className="nav nav-footer">
							<Link className="nav-link ps-0" to="#">
								Privacy Policy
							</Link>
							<Link className="nav-link px-2 px-md-3" to="#">
								Cookie Notice{' '}
							</Link>
							<Link className="nav-link" to="#">
								Terms of Use
							</Link>
						</nav>
					</Col>
				</Row>
			</footer>
		</Fragment>
	);
};

export default FooterWithLinks;

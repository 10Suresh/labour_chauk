// import node module libraries
import { Fragment } from 'react';
import { Col, Row, Nav, Tab, Container, Card, Image } from 'react-bootstrap';
// import custom components
import PageHeadingBriefinfo from 'components/marketing/common/page-headings/PageHeadingBriefinfo';
import { CalendarCheck } from 'react-bootstrap-icons';
import UpcomingWebinarsData from 'data/marketing/landing-education/UpcomingWebinarsData';
import { Link } from 'react-router-dom';
const ElectionBlog = () => {
	return (
		<Fragment>
			{/* Page header */}
			<PageHeadingBriefinfo pagetitle="ALL ELECTIONS NEWS" briefinfo="" />
			<section className="py-6 mx-4">
				<Row className="mb-6">
					<Col md={12}>
						<Tab.Container defaultActiveKey="mostpopular">
							<Nav className="nav-lb-tab">
								<Nav.Item className="ms-0">
									<Nav.Link eventKey="mostpopular" className="mb-sm-3 mb-md-0">
										Most Popular
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link eventKey="trending" className="mb-sm-3 mb-md-0">
										Trending
									</Nav.Link>
								</Nav.Item>
							</Nav>

							<Tab.Content>
								<Tab.Pane eventKey="mostpopular" className="pb-4 p-4 ps-0 pe-0">
									{/* most popular started */}
									<Row>
										{UpcomingWebinarsData.map((item, index) => {
											return (
												<Col key={index} lg={4} md={4} sm={6}>
													<div className="mb-xl-0 card-hover  my-4 rounded-0 ">
														<Card.Body classNmae="d-flex">
															<div>
																<Link to="#!">
																	<div
																		style={{
																			width: '100%',
																			height: '250px',
																			overflow: 'hidden'
																		}}
																	>
																		<Image
																			src={item.image}
																			alt="webinar-1"
																			className="w-100 h-100 img-fluid"
																			style={{ objectFit: 'cover' }}
																		/>
																	</div>
																</Link>
															</div>
															<div>
																<div className="my-1 lh-1">
																	<span className="me-1">
																		<CalendarCheck size={14} />
																	</span>
																	<span>{item.date}</span>
																</div>
																<h3 className="mb-2 text-truncate">
																	<Link to="#!" className="text-inherit">
																		{item.title}
																	</Link>
																</h3>
															</div>
														</Card.Body>
													</div>
												</Col>
											);
										})}
									</Row>
								</Tab.Pane>
								<Tab.Pane eventKey="trending" className="pb-4 p-4 ps-0 pe-0">
									<Row>
										{UpcomingWebinarsData.map((item, index) => {
											return (
												<Col key={index} lg={3} md={4} sm={6}>
													<Card className="mb-xl-0 card-hover  my-4 rounded-0 ">
														<Link to="#!">
															<div
																style={{
																	width: '100%',
																	height: '250px',
																	overflow: 'hidden'
																}}
															>
																<Image
																	src={item.image}
																	alt="webinar-1"
																	className="w-100 h-100 img-fluid"
																	style={{ objectFit: 'cover' }}
																/>
															</div>
														</Link>
														<Card.Body>
															<div className="my-1 lh-1">
																<span className="me-1">
																	<CalendarCheck size={14} />
																</span>
																<span>{item.date}</span>
															</div>
															<h3 className="mb-2 text-truncate">
																<Link to="#!" className="text-inherit">
																	{item.title}
																</Link>
															</h3>
														</Card.Body>
													</Card>
												</Col>
											);
										})}
									</Row>
								</Tab.Pane>
							</Tab.Content>
						</Tab.Container>
					</Col>
				</Row>
			</section>
		</Fragment>
	);
};

export default ElectionBlog;

// import node module libraries
import { Col, Row, Card, Image } from 'react-bootstrap';
import { CalendarCheck, Clock } from 'react-bootstrap-icons';
import UpcomingWebinarsData from 'data/marketing/landing-education/UpcomingWebinarsData';
import { Link } from 'react-router-dom';
const BuildingSkills = () => {
	return (
		<section className="pb-lg-14 pb-6 mx-4 ">
			<Row>
				<Col xl={12} md={12} xs={12}>
					<div className=" mb-lg-4 mb-2 mt-3 ">
						<h2 className="display-3 fw-bold">
							TOP{' '}
							<u className="text-success">
								<span className="text-danger">STORIES</span>
							</u>
						</h2>
					</div>
				</Col>
			</Row>
			<Row className="align-items-center ">
				<Col xl={5} lg={6} md={12} xs={12}>
					<div className="mb-6 mb-lg-0 mt-4">
						<div className="mb-2">
							<Image
								src="https://ddnews.gov.in/wp-content/uploads/2024/04/im-549927-e1711992759562-1200x969.jpg"
								alt="certificate"
								className="img-fluid w-100"
							/>
						</div>
						<div>
							<h2>
								Advent to buy Ryan Reynolds-backed fintech Nuvei in $6.2\ bln
								deal
							</h2>
							<p className="ms-2 fs-3">
								Private equity firm Advent International has agreed to buy
								Canada's Nuvei NVEI.TO in a deal that values the payments
								technology firm, which has received financial backing from actor
								Ryan Reynolds, at
							</p>
						</div>
					</div>
				</Col>
				<Col xl={7} lg={6} md={12} xs={12}>
					<Row className="row-cols-lg-2 row-cols-md-2 row-cols-1 ">
						{UpcomingWebinarsData.map((item, index) => {
							return (
								<Col key={index}>
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
				</Col>
			</Row>
		</section>
	);
};

export default BuildingSkills;

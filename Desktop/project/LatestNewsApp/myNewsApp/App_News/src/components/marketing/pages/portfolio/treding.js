// import node module libraries
import { Col, Row, Card, Image } from 'react-bootstrap';
// import data files
import SkillCoursesData from 'data/marketing/landing-education/SkillCoursesData';
import { Link } from 'react-router-dom';

const Treding = () => {
	return (
		<section className="">
			<div className="mx-4 my-4">
				<Row>
					<Col xl={12} md={12} xs={12}>
						<div className="mb-2 mb-lg-6 border-2  border-top border-warning justify-content-between d-flex">
							<h2 className="h1 fw-bold text-uppercase ">Trendings</h2>
							<Link href="#">
								<span className="fs-3">
									{' '}
									View All
									<span className="">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											fill="currentColor"
											className="bi bi-arrow-right-short"
											viewBox="0 0 16 16"
										>
											<path
												fillRule="evenodd"
												d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
											/>
										</svg>
									</span>
								</span>
							</Link>
						</div>
					</Col>
				</Row>
				<Row>
					{SkillCoursesData.slice(0, 6).map((item, index) => {
						return (
							<Col xl={2} md={4} xs={12} key={index}>
								<Card className="mb-4 card-hover border">
									<Link to="#!">
										<Image
											src={item.image}
											alt="writing"
											className="img-fluid w-100 rounded-top-3"
										/>
									</Link>
									<Card.Body>
										<h4 className="mb-3">
											<Link to="#!" className="text-inherit">
												{item.title}
											</Link>
										</h4>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
				<Row>
					{SkillCoursesData.slice(3, 7).map((item, index) => {
						return (
							<Col xl={3} md={6} xs={12} key={index}>
								<Card className="mb-4 card-hover border">
									<Link to="#!">
										<Image
											src={item.image}
											alt="writing"
											className="img-fluid w-100 rounded-top-3"
										/>
									</Link>
									<Card.Body>
										<h4 className="mb-3">
											<Link to="#!" className="text-inherit">
												{item.title}
											</Link>
										</h4>
									</Card.Body>
								</Card>
							</Col>
						);
					})}
				</Row>
			</div>
		</section>
	);
};

export default Treding;

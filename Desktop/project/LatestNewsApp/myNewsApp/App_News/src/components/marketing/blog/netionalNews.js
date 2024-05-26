// import node module libraries
import { Col, Row, Card, Image } from 'react-bootstrap';
import { CalendarCheck, Clock } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
const NationalNews = () => {
	const UpcomingWebinarsData = [
		{
			id: 1,
			image: 'https://ddnews.gov.in/wp-content/uploads/2024/04/Jaisha.jpg',
			title: `EAM Jaishankar expresses confidence in India's bid for a permanent seat at UNSC`,
			date: 'Thu, November 10, 2023',
			time: '6:00 PM – 8:00 PM GMT'
		},
		{
			id: 2,
			image: 'https://ddnews.gov.in/wp-content/uploads/2024/04/Vietna.jpg',
			title: `Indian Coast Guard ship reaches Vietnam on overseas deployment`,
			date: 'June 26, 2023',
			time: '8:00 AM PDT'
		},
		{
			id: 3,
			image:
				'https://ddnews.gov.in/wp-content/uploads/2024/04/ANI-20240401162557.jpg',
			title: `India’s image in UAE has transformed in last 10 years, says EAM Jaishankar`,
			date: 'November 10, 2023',
			time: '10:00 PM IST'
		},
		{
			id: 4,
			image:
				'https://ddnews.gov.in/wp-content/uploads/2024/04/ANI-20240401142222.jpg',
			title: `Kollam residents protest as high tidal waves damage homes`,
			date: 'November 10, 2023',
			time: '10:00 PM IST'
		},
		{
			id: 5,
			image:
				'https://ddnews.gov.in/wp-content/uploads/2024/04/ANI-20240401162747.jpg',
			title: `Ministry of Civil Aviation seeks detailed report from Vistara over flight cancellations..`,
			date: 'November 10, 2023',
			time: '10:00 PM IST'
		},
		{
			id: 6,
			image:
				'https://ddnews.gov.in/wp-content/uploads/2024/04/flight1705824020872-768x432-1.jpg',
			title: `Manjrekar openly asks Wankhede crowd to 'behave' as fans boo Hardik Pandya`,
			date: 'November 10, 2023',
			time: '10:00 PM IST'
		}
	];

	return (
		<section className="pb-lg-4 pb-2 mx-4 ">
			<Row>
				<Col xl={12} md={12} xs={12}>
					<div className=" mb-lg-4 mb-2 mt-3 justify-content-between d-flex ">
						<div>
							<h2 className="display-3 fw-bold">
								NATIONAL ||{' '}
								<u className="text-success">
									<span className="text-danger">INTERNATIONAL</span>
								</u>
							</h2>
						</div>

						<div>
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
					</div>
				</Col>
			</Row>
			<Row className="align-items-center ">
				<Col xl={3} lg={3} md={12} xs={12}>
					<div className="mb-6 mb-lg-0 flex flex-wrap ">
						<div className="mb-2">
							<Image
								src="https://ddnews.gov.in/wp-content/themes/ddnews/assets/theme-assets/images/add-1.jpg"
								alt="certificate"
								className="img-fluid w-100"
							/>
						</div>
						<div>
							<Image
								src="https://ddnews.gov.in/wp-content/themes/ddnews/assets/theme-assets/images/add-2.jpg"
								alt="certificate"
								className="img-fluid w-100"
							/>
						</div>
					</div>
				</Col>
				<Col xl={9} lg={9} md={12} xs={12}>
					<Row className="row-cols-lg-3 row-cols-md-2 row-cols-1 mt-4">
						{UpcomingWebinarsData.map((item, index) => {
							return (
								<Col key={index}>
									<Card className="mb-xl-0 card-hover my-4 rounded-0 ">
										<Link to="#!">
											<div
												style={{
													width: '100%',
													height: '240px',
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
											<h3 className="mb-2">
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

export default NationalNews;

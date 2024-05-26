// import node module libraries
import { Col, Row, Card, Image } from 'react-bootstrap';
import { CalendarCheck, Clock } from 'react-bootstrap-icons';
// import bootstrap icons
import {
	PatchCheckFill,
	Trophy,
	Star,
	Nut,
	ShieldLock
} from 'react-bootstrap-icons';
import UpcomingWebinarsData from 'data/marketing/landing-education/UpcomingWebinarsData';
import { Link } from 'react-router-dom';
const LifeStyle = () => {
	const programFeatures = [
		{
			id: 1,
			image:
				'https://akm-img-a-in.tosshub.com/aajtak/images/story/202404/660a1d7432d84-how-to-enhance-your-ethnic-look-with-earrings-01352970-16x9.jpg?size=316:179',
			title:
				'इंडियन आउटफिट में चार चांद लगा देंगे ये तरीके, ईयरिंग्स सिलेक्ट करने में करेंगे मदद',
			description:
				'Lorem ipsum dolor sit amet, conse ctetur adipisc amus ac iaculis arcu.'
		},
		{
			id: 2,
			image:
				'https://akm-img-a-in.tosshub.com/aajtak/images/story/202403/6606748b6efbb-20240329-29580239-16x9.jpg?size=316:179',
			title:
				'दूध, दही और पनीर का ज्यादा सेवन इनके लिए हो सकता है खतरनाक, ध्यान रखें ये एक बात',
			description:
				'Pellentesque sagittis placerat mollii purus onvallis venenatis asapien.'
		},
		{
			id: 3,
			image:
				'https://akm-img-a-in.tosshub.com/aajtak/images/story/202403/6606298a82246-mature-woman-waking-up-through-alarm-ring-on-smart-phone-in-bedroom-184916243-16x9.jpg?size=316:179',
			title: '5 तरीके जो बेहतर नींद में करेंगे मदद, तरोताजा होकर उठेंगे सुबह',
			description:
				'Integer ultricies lorem nec erat fau euismod ipsum nislnec leo iaculis.'
		},
		{
			id: 4,
			image:
				'https://akm-img-a-in.tosshub.com/aajtak/images/story/202312/odokdcof-sixteen_nine.jpg?size=316:179',
			title:
				'तलाक के पीछे होता है ये मुख्य कारण, मोटिवेशनल स्पीकर सिस्टर शिवानी ने बताया',
			description:
				'Duis sed sollicitudin narcu mi, faucibus in sapien non, auctor placerat arcu.'
		}
	];
	return (
		<section className="pb-lg-14 pb-6 mx-4">
			<Row>
				<Col xl={12} md={12} xs={12}>
					<div className=" mb-lg-4 mb-2 mt-3 ">
						<h2 className="display-3 fw-bold">Life Style</h2>
					</div>
				</Col>
			</Row>
			<Row className="align-items-center ">
				<Col xl={4} lg={4} md={12} xs={12}>
					<div className="mb-6 mb-lg-0 mt-4">
						<div className="mb-2">
							<Image
								src="https://akm-img-a-in.tosshub.com/aajtak/images/story/202404/660b7bdf2c2a6-korean-beauty-tips-023038269-16x9.jpg?size=465:262"
								alt="image"
								className="img-fluid w-100 h-100 "
							/>
						</div>
						<div>
							<h1>
								कोरियन लोगों की त्वचा क्यों करती है इतनी ग्लो? स्किन केयर रूटीन
								में अपनाते हैं ये चीजें
							</h1>
						</div>
					</div>
				</Col>
				<Col xl={5} lg={5} md={12} xs={12}>
					<Row className="row-cols-1 ">
						{programFeatures.map((item, index) => {
							return (
								<Col key={index}>
									<div className="mb-xl-0 card-hover rounded-0 card ">
										<div className="d-lg-flex d-md-flex  gap-4">
											<Link to="#!">
												<div
													style={{
														width: '200px',
														height: '100px',
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
											<h3>
												<Link to="#!" className="text-inherit">
													{item.title}
												</Link>
											</h3>
										</div>
									</div>
									<hr />
								</Col>
							);
						})}
					</Row>
				</Col>
				<Col>
					<div className="mb-6 mb-lg-0 ">
						<div className="mb-2">
							<Image
								src="https://ddnews.gov.in/wp-content/uploads/2024/03/NPIC-20231021165153.jpg"
								alt="image"
								className="img-fluid w-100 h-100 "
							/>
						</div>
						<div>
							<span className="text-danger">15/01/24 | 3:04 pm</span>
							<h2>
								India's urban transportation undergoes a transformative shift
							</h2>
							<p className="fs-3">
								Urban transportation refers to the diverse modes of movement
								within cities, each playing a pivotal role in our daily lives.
								Public transportation, including buses, metros, trams, and
								trains, serves as...
							</p>
						</div>
					</div>
				</Col>
			</Row>
		</section>
	);
};

export default LifeStyle;

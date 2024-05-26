// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';

// import custom components
import SkillCourseCard from 'components/marketing/common/cards/SkillCourseCard';

// import data files
import SkillCoursesData from 'data/marketing/landing-education/SkillCoursesData';
import { Link } from 'react-router-dom';

const Education = () => {
	return (
		<section className="">
			<div className="mx-4">
				<Row>
					<Col xl={12} md={12} xs={12}>
						<div className="mb-2 mb-lg-6 border-2  border-top border-warning justify-content-between d-flex">
							<h2 className="h1 fw-bold text-uppercase ">Education</h2>
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
					{SkillCoursesData.map((item, index) => {
						return (
							<Col xl={3} md={6} xs={12} key={index}>
								<SkillCourseCard item={item} />
							</Col>
						);
					})}
				</Row>
			</div>
		</section>
	);
};

export default Education;

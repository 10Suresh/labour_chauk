// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';

const PageHeadingBriefinfo = ({ pagetitle, briefinfo }) => {
	return (
		<section className="mx-4">
			<Row className="align-items-center">
				<Col xl={12} lg={12} md={12} sm={12}>
					<div className="py-4 py-lg-3">
						<h1 className="mb-1 display-4">
							<u> {pagetitle} </u>{' '}
						</h1>
					</div>
				</Col>
			</Row>
		</section>
	);
};

export default PageHeadingBriefinfo;

// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';

// import custom components
import PortfolioItem from 'components/marketing/common/portfolio/PortfolioItem';

// import data files
import PortfolioData from 'data/marketing/portfolio/PortfolioData';
import Education from '../election/education';
import Business from '../election/Business';
import Treding from './treding';

const PortfolioList = () => {
	return (
		<main>
			<section className="py-lg-4 py-2">
				<div className="mx-4">
					<Row>
						<div>
							<h1 className="display-4 fw-semibold border-2 border-top border-warning ">
								Makup & Beauty Tips
							</h1>
						</div>
					</Row>
					<Row className="mt-lg-2 g-6">
						<Col md={4}>
							{PortfolioData.slice(0, 3).map((item, index) => {
								return <PortfolioItem item={item} key={index} />;
							})}
						</Col>
						<Col md={4}>
							{PortfolioData.slice(3, 6).map((item, index) => {
								return <PortfolioItem item={item} key={index} />;
							})}
						</Col>
						<Col md={4}>
							{PortfolioData.slice(6, 9).map((item, index) => {
								return <PortfolioItem item={item} key={index} />;
							})}
						</Col>
					</Row>
				</div>
				<Education />
				<Business />
				<Treding />
			</section>
		</main>
	);
};

export default PortfolioList;

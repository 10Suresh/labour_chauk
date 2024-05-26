// import node module libraries
import React, { Fragment } from 'react';
import { Col, Row, Container, Form, Button } from 'react-bootstrap';

// import sub components
import BlogCard from './BlogCard';

// import data files
import BlogArticlesList from 'data/blog/blogArticlesData';

const BlogCategory = () => {
	return (
		<Fragment>
			{/* Page Content */}
			<section className="pb-12 mx-4">
				<Row>
					{BlogArticlesList.filter(function (dataSource) {
						return dataSource.category === 'Tutorial';
					}).map((item, index) => (
						<Col xl={3} lg={3} md={4} sm={12} key={index} className="d-flex">
							<BlogCard item={item} />
						</Col>
					))}
				</Row>
			</section>
		</Fragment>
	);
};

export default BlogCategory;

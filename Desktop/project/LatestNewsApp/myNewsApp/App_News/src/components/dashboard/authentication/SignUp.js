import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row, Card, Form, Button, Image } from 'react-bootstrap';
import Logo from 'assets/images/brand/logo/logo-icon.svg';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const SignUp = () => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: ''
	});
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				'http://localhost:4001/api/register',
				formData
			);
			if (response.status === 200) {
				toast.success('User registered successfully');
				navigate('/authentication/sign-in');
			} else {
				toast.success('Registration not successful!');
			}
		} catch (error) {
			console.error('Error registering user:', error);
			toast.error('Error registering user');
		}
	};
	return (
		<Fragment>
			<Toaster />
			<Row className="align-items-center justify-content-center g-0 min-vh-100">
				<Col lg={5} md={5} className="py-8 py-xl-0">
					<Card>
						<Card.Body className="p-6">
							{/* Form */}
							<Form onSubmit={handleSubmit}>
								<div className="mb-4">
									<Link to="/">
										<Image src={Logo} className="mb-4" alt="" />
									</Link>
									<h1 className="mb-1 fw-bold">Sign up</h1>
									<span>
										Already have an account?{' '}
										<Link to="/authentication/sign-in" className="ms-1">
											Sign in
										</Link>
									</span>
								</div>
								<Row>
									{/* User Name */}
									<Col lg={12} md={12} className="mb-3">
										<Form.Label>User Name</Form.Label>
										<Form.Control
											type="text"
											id="username"
											placeholder="User Name"
											required
											onChange={handleChange}
										/>
									</Col>
									{/* email */}
									<Col lg={12} md={12} className="mb-3">
										<Form.Label>Email</Form.Label>
										<Form.Control
											type="email"
											id="email"
											placeholder="Email address here"
											required
											onChange={handleChange}
										/>
									</Col>
									{/* Password */}
									<Col lg={12} md={12} className="mb-3">
										<Form.Label>Password</Form.Label>
										<Form.Control
											type="password"
											id="password"
											placeholder="**************"
											required
											onChange={handleChange}
										/>
									</Col>
									{/* Checkbox */}
									<Col lg={12} md={12} className="mb-3">
										<Form.Check type="checkbox" id="check-api-checkbox">
											<Form.Check.Input type="checkbox" />
											<Form.Check.Label>
												I agree to the{' '}
												<Link to="/pages/terms-and-conditions">
													Terms of Service{' '}
												</Link>{' '}
												and{' '}
												<Link to="/pages/terms-and-conditions">
													Privacy Policy.
												</Link>
											</Form.Check.Label>
										</Form.Check>
									</Col>
									<Col lg={12} md={12} className="mb-0 d-grid gap-2">
										{/* Button */}
										<Button variant="primary" type="submit">
											Sign in
										</Button>
									</Col>
								</Row>
							</Form>
							{/* Social Buttons */}
							<hr className="my-4" />
							<div className="mt-4 text-center">
								<Link
									to="#"
									className="btn-social btn-social-outline btn-facebook"
								>
									<i className="fab fa-facebook" />
								</Link>{' '}
								<Link
									to="#"
									className="btn-social btn-social-outline btn-twitter"
								>
									<i className="fab fa-twitter" />
								</Link>{' '}
								<Link
									to="#"
									className="btn-social btn-social-outline btn-linkedin"
								>
									<i className="fab fa-linkedin" />
								</Link>{' '}
								<Link
									to="#"
									className="btn-social btn-social-outline btn-github"
								>
									<i className="fab fa-github" />
								</Link>
							</div>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default SignUp;

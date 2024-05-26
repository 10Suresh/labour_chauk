// import node module libraries
import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash, XCircle, Copy } from 'react-feather';
import axios from 'axios';
import {
	Col,
	Row,
	Breadcrumb,
	Card,
	Button,
	Form,
	InputGroup,
	FormControl,
	ListGroup,
	Image,
	Badge
} from 'react-bootstrap';

// import custom components
import { FormSelect } from 'components/elements/form-select/FormSelect';
import toast, { Toaster } from 'react-hot-toast';
import DotBadge from 'components/elements/bootstrap/DotBadge';
import ReactQuillEditor from 'components/elements/editor/ReactQuillEditor';
// import media files
import Avatar1 from 'assets/images/avatar/avatar-1.jpg';

const AddNewPost = () => {
	const [categories, setCategories] = useState([]);
	const categoryOptions = categories?.map((category) => ({
		value: category._id,
		label: category.catName
	}));
	const getCategory = async () => {
		try {
			const response = await axios.get(
				'http://localhost:4001/api/getAllcategory'
			);
			const category = response?.data?.CategoryData;
			setCategories(category);
		} catch (error) {
			console.error('Error fetching categories:', error);
			throw new Error('An error occurred while fetching categories');
		}
	};

	useEffect(() => {
		getCategory();
	}, []);
	const [image, setImage] = useState();
	const [formData, setFormData] = useState({
		date: '',
		postTitle: '',
		description: '',
		category: '',
		thumbnail: null,
		editorContent: ''
	});
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = (event) => {
			setImage(event.target.result);
		};
		setFormData({ ...formData, thumbnail: file });

		reader.readAsDataURL(file);
	};
	const handleContentChange = (content) => {
		setFormData({ ...formData, editorContent: content });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const productData = new FormData();
			productData.append('date', formData.date);
			productData.append('postTitle', formData.postTitle);
			productData.append('description', formData.description);
			productData.append('category', formData.category);
			productData.append('thumbnail', formData.thumbnail);
			productData.append('editorContent', formData.editorContent);

			const response = await axios.post(
				'http://localhost:4001/api/addblog',
				productData
			);
			if (response.status === 200) {
				toast.success('Blog created successfully');
				// navigate('/dashboard/overview');
			} else {
				toast.success('Blog not created successful!');
			}
		} catch (error) {
			console.error('Error blog creating:', error);
			toast.error('Error  blog creating');
		}
	};
	return (
		<Fragment>
			<Toaster />
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
						<div className="mb-3 mb-md-0">
							<h1 className="mb-1 h2 fw-bold">Add New Post</h1>
							<Breadcrumb>
								<Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
								<Breadcrumb.Item href="#">CMS</Breadcrumb.Item>
								<Breadcrumb.Item active>Add New Post</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<div>
							<Link to="/cms/all-posts" className="btn btn-outline-secondary ">
								Back to All Post
							</Link>
						</div>
					</div>
				</Col>
			</Row>

			<Row>
				<Col xl={9} lg={8} md={12} sm={12}>
					<Card>
						<Card.Header>
							<h4 className="mb-0">Create Post</h4>
						</Card.Header>
						<Card.Body>
							{/* Your form content */}
							<Form className="mt-4" onSubmit={handleSubmit}>
								<Row>
									<Col md={9} sm={12}>
										{/* Title */}
										<Form.Group className="mb-3">
											<Form.Label htmlFor="postTitle">Title</Form.Label>
											<Form.Control
												type="text"
												placeholder="Post Title"
												id="postTitle"
												value={formData.postTitle}
												onChange={handleChange}
											/>
											<Form.Text className="text-muted">
												Keep your post titles under 60 characters. Write heading
												that describe the topic content. Contextualize for Your
												Audience.
											</Form.Text>
										</Form.Group>
										{/* Date */}
										<Form.Control
											id="date"
											value={formData.date}
											onChange={handleChange}
											type="date"
										/>

										<Form.Group className="mb-3">
											<Form.Label htmlFor="thumbnail">Thumbnail</Form.Label>
											<Form.Control
												type="file"
												id="thumbnail"
												accept="image/*"
												onChange={handleImageChange}
											/>
										</Form.Group>
										{image && (
											<img
												src={image}
												alt="Thumbnail Preview"
												style={{ maxWidth: '100%', marginTop: '10px' }}
											/>
										)}
										{/* description */}
										<Form.Group className="mb-3">
											<Form.Label htmlFor="description">Description</Form.Label>
											<Form.Control
												as="textarea"
												placeholder="Description"
												id="description"
												style={{ height: '100px' }}
												value={formData.description}
												onChange={handleChange}
											/>
										</Form.Group>

										{/* Category */}
										<Form.Group className="mb-3">
											<Form.Label htmlFor="category">Category</Form.Label>
											<FormSelect
												id="category"
												options={categoryOptions}
												value={formData.category}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>

									{/* Editor */}
									<Col lg={12} md={12} sm={12}>
										<Form.Group className="mb-3">
											<Form.Label htmlFor="category">Content</Form.Label>
											<ReactQuillEditor onChange={handleContentChange} />
										</Form.Group>

										{/* Button */}
										<Form.Group className="mb-3">
											<Button variant="primary" className="m-1" type="submit">
												Publish
											</Button>
											<Button variant="outline-secondary">Save to Draft</Button>
										</Form.Group>
									</Col>
								</Row>
							</Form>
						</Card.Body>
					</Card>
				</Col>
				<Col xl={3} lg={4} md={12} sm={12}>
					{/*  List group  */}
					<Card className="mt-4 mt-lg-0 mb-4">
						<Card.Header className="d-lg-flex">
							<h4 className="mb-0">Post Info</h4>
						</Card.Header>
						<Card.Body className="p-0">
							{/*  List group  */}
							<ListGroup variant="flush">
								<ListGroup.Item>
									<span className="text-body">Post ID</span>
									<h5>8693637308</h5>
								</ListGroup.Item>
								<ListGroup.Item>
									<span className="text-body">Status</span>
									<h5>
										<DotBadge bg="success">
											Published (unsaved changes)
										</DotBadge>
									</h5>
								</ListGroup.Item>
								<ListGroup.Item>
									<span className="text-body">Created by</span>
									<div className="d-flex mt-2">
										<Image
											src={Avatar1}
											alt=""
											className="avatar-sm rounded-circle"
										/>
										<div className="ms-2">
											<h5 className="mb-n1">Geeks Courses</h5>
											<small>Admin</small>
										</div>
									</div>
								</ListGroup.Item>
								<ListGroup.Item>
									<span className="text-body">Created at</span>
									<h5>Jul 30, 2:21 PM</h5>
								</ListGroup.Item>
								<ListGroup.Item>
									<span className="text-body">First published at</span>
									<h5>Jul 30, 2:21 PM</h5>
								</ListGroup.Item>
								<ListGroup.Item>
									<span className="text-body">Last update</span>
									<h5>Aug 31, 12:21 PM</h5>
								</ListGroup.Item>
								<ListGroup.Item className="bg-transparent">
									<span className="text-body">Last Published</span>
									<h5>Aug 31, 12:21 PM</h5>
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>

					<Card className="mt-4 mt-lg-0 mb-4">
						<Card.Header className="d-lg-flex">
							<h4 className="mb-0">Actions</h4>
						</Card.Header>
						<Card.Body className="p-0">
							{/*  List group  */}
							<ListGroup variant="flush">
								<ListGroup.Item className="d-flex justify-content-between align-items-center">
									<span className="text-body">Unpublish</span>
									<Link to="#" className="text-inherit">
										<XCircle size="18px" />{' '}
									</Link>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-between align-items-center">
									<span className="text-body">Duplicate</span>
									<Link to="#" className="text-inherit">
										<Copy size="18px" />
									</Link>
								</ListGroup.Item>

								<ListGroup.Item className="d-flex justify-content-between align-items-center bg-transparent">
									<span className="text-body">Delete</span>
									<Link to="#">
										<Trash size="18px" className="text-danger" />
									</Link>
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>

					<Card className="mt-4 mt-lg-0 mb-4">
						<Card.Header className="d-lg-flex">
							<h4 className="mb-0">Revision History</h4>
						</Card.Header>
						<Card.Body className="p-0">
							{/*  List group  */}
							<ListGroup variant="flush">
								<ListGroup.Item className="d-flex justify-content-between align-items-center bg-transparent">
									<div>
										<h5 className="mb-0">Aug 31, 12:21 PM</h5>
										<span className="text-body">Geeks Coures</span>
									</div>
									<div>
										<Badge bg="success">Published</Badge>
									</div>
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default AddNewPost;

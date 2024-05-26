// import node module libraries
import React, { Fragment, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Col,
	Row,
	Dropdown,
	Breadcrumb,
	Card,
	Badge,
	Button,
	Modal,
	Form
} from 'react-bootstrap';
import { Trash, Send, Inbox, MoreVertical } from 'react-feather';
import toast, { Toaster } from 'react-hot-toast';
// import custom components
import Checkbox from 'components/elements/advance-table/Checkbox';
import TanstackTable from 'components/elements/advance-table/TanstackTable';
import axios from 'axios';
// import data files
import { courses } from 'data/courses/CoursesCategoryData';

const Category = () => {
	const [scrollShow, setScrollShow] = useState(false);
	const handleClose = () => setScrollShow(false);
	const handleShow = () => setScrollShow(true);
	const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
		<Link
			to=""
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
			className="btn-icon btn btn-ghost btn-sm rounded-circle"
		>
			{children}
		</Link>
	));
	const [formData, setFormData] = useState({
		catName: ''
	});
	console.log(formData);
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				'http://localhost:4001/api/addcategory',
				formData
			);
			if (response.status === 200) {
				toast.success('Category created successfully');
				setScrollShow(false);
			} else {
				toast.error('Category created not successfully!');
			}
		} catch (error) {
			console.error('Error creating category:', error);
			toast.error('An error occurred while creating the category.');
		}
	};
	const ActionMenu = () => {
		return (
			<Dropdown>
				<Dropdown.Toggle as={CustomToggle}>
					<MoreVertical size="15px" className="text-secondary" />
				</Dropdown.Toggle>
				<Dropdown.Menu align={'end'}>
					<Dropdown.Header>ACTION</Dropdown.Header>
					<Dropdown.Item eventKey="1">
						<Send size="15px" className="dropdown-item-icon" /> Publish
					</Dropdown.Item>
					<Dropdown.Item eventKey="2">
						<Inbox size="15px" className="dropdown-item-icon" /> Moved Draft
					</Dropdown.Item>
					<Dropdown.Item eventKey="3">
						<Trash size="15px" className="dropdown-item-icon" /> Delete
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		);
	};
	const columns = useMemo(
		() => [
			{
				id: 'select',
				header: ({ table }) => (
					<Checkbox
						{...{
							checked: table.getIsAllRowsSelected(),
							indeterminate: table.getIsSomeRowsSelected(),
							onChange: table.getToggleAllRowsSelectedHandler()
						}}
					/>
				),
				cell: ({ row }) => (
					<div className="px-1">
						<Checkbox
							{...{
								checked: row.getIsSelected(),
								disabled: !row.getCanSelect(),
								indeterminate: row.getIsSomeSelected(),
								onChange: row.getToggleSelectedHandler()
							}}
						/>
					</div>
				)
			},
			{
				accessorKey: 'category',
				header: 'Category',
				cell: ({ getValue }) => {
					return (
						<Link href="#" className="text-inherit position-relative">
							<h5 className="mb-0 text-primary-hover">{getValue()}</h5>
						</Link>
					);
				}
			},
			{ accessorKey: 'slug', header: 'Slug' },
			{ accessorKey: 'posts', header: 'Posts' },
			{ accessorKey: 'date_created', header: 'Date Created' },
			{ accessorKey: 'date_updated', header: 'Date Updated' },
			{
				accessorKey: 'status',
				header: 'Status',
				cell: ({ getValue }) => {
					return (
						<Badge
							bg={
								getValue() === 1 ? 'success' : getValue() === 0 ? 'warning' : ''
							}
						>
							{getValue() === 1 ? 'Live' : getValue() === 0 ? 'Draft' : ''}
						</Badge>
					);
				}
			},
			{
				accessorKey: 'action',
				header: '',
				cell: () => {
					return <ActionMenu />;
				}
			}
		],
		[]
	);
	const data = useMemo(() => courses, []);
	return (
		<Fragment>
			<Toaster />
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
						<div className="mb-3 mb-md-0">
							<h1 className="mb-1 h2 fw-bold">Category</h1>
							<Breadcrumb>
								<Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
								<Breadcrumb.Item href="#">CMS</Breadcrumb.Item>
								<Breadcrumb.Item active>Category</Breadcrumb.Item>
							</Breadcrumb>
						</div>
						<div>
							<Button variant="primary" onClick={handleShow}>
								Add New Post Category
							</Button>
						</div>
					</div>
				</Col>
			</Row>
			<Row>
				<Col lg={12} md={12} sm={12}>
					<Card>
						<Card.Body className="p-0">
							<TanstackTable
								data={data}
								columns={columns}
								filter={true}
								filterPlaceholder="Search Category"
								pagination={true}
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Modal show={scrollShow} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add New Category</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit}>
					<Modal.Body>
						<Form.Label>User Name</Form.Label>
						<Form.Control
							type="text"
							id="catName"
							placeholder="Enter category"
							required
							onChange={handleChange}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
						<Button variant="primary" type="submit">
							Save Changes
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</Fragment>
	);
};

export default Category;

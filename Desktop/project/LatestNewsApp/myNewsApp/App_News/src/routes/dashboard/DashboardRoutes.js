/* eslint-disable */
import { v4 as uuid } from 'uuid';
export const DashboardMenu = [
	{
		id: uuid(),
		title: 'Dashboard',
		icon: 'home',
		children: [
			{ id: uuid(), link: '/dashboard/overview', name: 'Overview' }
			// { id: uuid(), link: '/dashboard/analytics', name: 'Analytics' }
		]
	},
	{
		id: uuid(),
		title: 'User',
		icon: 'user',
		children: [{ id: uuid(), link: '/user/instructor', name: 'User' }]
	},

	{
		id: uuid(),
		title: 'BLOG POST',
		icon: 'book-open',
		children: [
			{ id: uuid(), link: '/cms/cms-dashboard', name: 'Overview' },
			{ id: uuid(), link: '/cms/all-posts', name: 'All Posts' },
			{ id: uuid(), link: '/cms/add-new-post', name: 'New Post' },
			{ id: uuid(), link: '/cms/category', name: 'Category' }
		]
	},
	{
		id: uuid(),
		title: 'Slide Blog',
		icon: 'book-open',
		children: [
			{ id: uuid(), link: '/cms/slide-blog/all-slide-post', name: 'All Posts' },
			{ id: uuid(), link: '/cms/add-new-post', name: 'New Post' }
		]
	},
	{
		id: uuid(),
		title: 'Authentication',
		icon: 'lock',
		children: [
			{ id: uuid(), link: '/authentication/sign-in', name: 'Sign In' },
			{ id: uuid(), link: '/authentication/sign-up', name: 'Sign Up' },
			{
				id: uuid(),
				link: '/authentication/forget-password',
				name: 'Forget Password'
			},
			{
				id: uuid(),
				link: '/authentication/notifications',
				name: 'Notifications'
			}
		]
	}
	// {
	// 	id: uuid(),
	// 	title: 'Components',
	// 	grouptitle: true
	// },
	// {
	// 	id: uuid(),
	// 	title: 'Components',
	// 	icon: 'monitor',
	// 	children: [
	// 		{ id: uuid(), link: '/elements/accordions', name: 'Accordions' },
	// 		{ id: uuid(), link: '/elements/alerts', name: 'Alerts' },
	// 		{ id: uuid(), link: '/elements/avatar', name: 'Avatar' },
	// 		{ id: uuid(), link: '/elements/badges', name: 'Badges' },
	// 		{ id: uuid(), link: '/elements/breadcrumbs', name: 'Breadcrumbs' },
	// 		{ id: uuid(), link: '/elements/buttons', name: 'Buttons' },
	// 		{ id: uuid(), link: '/elements/button-group', name: 'ButtonGroup' },
	// 		{ id: uuid(), link: '/elements/cards', name: 'Cards' },
	// 		{ id: uuid(), link: '/elements/carousels', name: 'Carousel' },
	// 		{ id: uuid(), link: '/elements/close-button', name: 'Close Button' },
	// 		{ id: uuid(), link: '/elements/collapse', name: 'Collapse' },
	// 		{ id: uuid(), link: '/elements/dropdowns', name: 'Dropdowns' },
	// 		{ id: uuid(), link: '/elements/list-group', name: 'Listgroup' },
	// 		{ id: uuid(), link: '/elements/modal', name: 'Modal' },
	// 		{ id: uuid(), link: '/elements/navs', name: 'Navs' },
	// 		{ id: uuid(), link: '/elements/navbar', name: 'Navbar' },
	// 		{ id: uuid(), link: '/elements/offcanvas', name: 'Offcanvas' },
	// 		{ id: uuid(), link: '/elements/overlays', name: 'Overlays' },
	// 		{ id: uuid(), link: '/elements/pagination', name: 'Pagination' },
	// 		{ id: uuid(), link: '/elements/popovers', name: 'Popovers' },
	// 		{ id: uuid(), link: '/elements/progress', name: 'Progress' },
	// 		{ id: uuid(), link: '/elements/spinners', name: 'Spinners' },
	// 		{ id: uuid(), link: '/elements/tables', name: 'Tables' },
	// 		{ id: uuid(), link: '/elements/toasts', name: 'Toasts' },
	// 		{ id: uuid(), link: '/elements/tooltips', name: 'Tooltips' }
	// 	]
	// },
];

export default DashboardMenu;

import { v4 as uuid } from 'uuid';

const NavbarDefault = [
	{
		id: uuid(),
		menuitem: 'Home',
		link: '/'
	},
	{
		id: uuid(),
		menuitem: 'Latest',
		link: '/marketing/blog/latest'
	},
	{
		id: uuid(),
		menuitem: 'Election',
		link: '/marketing/electionNews/election'
	},
	{
		id: uuid(),
		menuitem: 'National',
		link: '/marketing/blog/allNational'
	},
	{
		id: uuid(),
		menuitem: 'TOP STORIES',
		link: '#',
		children: [
			{
				id: uuid(),
				menuitem: 'Specialty',
				link: '#',
				children: [
					{
						id: uuid(),
						menuitem: 'Coming Soon',
						link: '/marketing/specialty/coming-soon/'
					}
				]
			}
		]
	},
	{
		id: uuid(),
		menuitem: 'ACCOUNTS',
		link: '#',
		children: [
			{
				id: uuid(),
				header: true,
				header_text: 'Accounts'
			},

			{
				id: uuid(),
				menuitem: 'Admin',
				link: '#',
				children: [
					// {
					// 	id: uuid(),
					// 	header: true,
					// 	header_text: 'Master Admin',
					// 	description:
					// 		'Master admin dashboard to manage All, Blog, site setting, and work with amazing apps.'
					// },
					// {
					// 	id: uuid(),
					// 	divider: true
					// },
					{
						id: uuid(),
						menuitem: 'Go to Dashboard',
						link: '/dashboard/overview/',
						type: 'button'
					}
				]
			},
			{
				id: uuid(),
				divider: true
			},
			{
				id: uuid(),
				menuitem: 'Sign In',
				link: '/authentication/sign-in/'
			},
			{
				id: uuid(),
				menuitem: 'Sign Up',
				link: '/authentication/sign-up/'
			},
			{
				id: uuid(),
				menuitem: 'Forgot Password',
				link: '/authentication/forget-password/'
			}
		]
	}
];

export default NavbarDefault;

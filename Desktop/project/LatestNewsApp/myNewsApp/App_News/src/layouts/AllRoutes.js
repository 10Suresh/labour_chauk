// ** Import from react dom
import { Route, Routes, Navigate } from 'react-router-dom';

// ** Import core SCSS styles
import 'assets/scss/theme.scss';

// ** Import Layouts
import DashboardIndex from 'layouts/dashboard/DashboardIndex';
import AuthLayout from 'layouts/dashboard/AuthLayout';

// ** Import Dahbaord Menu Pages
import Overview from 'components/dashboard/overview/Overview';
import Analytics from 'components/dashboard/analytics/Analytics';
// ** Import Users Pages
import Instructor from 'components/dashboard/user/Instructor';
import Students from 'components/dashboard/user/Students';

// ** Import CMS Pages
import CMSDashboard from 'components/dashboard/cms/CMSDashboard';
import AllPosts from 'components/dashboard/cms/all-posts/AllPosts';
import AddNewPost from 'components/dashboard/cms/AddNewPost';
import Category from 'components/dashboard/cms/Category';

// ** Import Authentication components
import SignIn from 'components/dashboard/authentication/SignIn';
import SignUp from 'components/dashboard/authentication/SignUp';
import ForgetPassword from 'components/dashboard/authentication/ForgetPassword';
import Notifications from 'components/dashboard/authentication/Notifications';

// ** Import Settings components
import General from 'components/dashboard/settings/General';
import Google from 'components/dashboard/settings/Google';
import Social from 'components/dashboard/settings/Social';
import SocialLogin from 'components/dashboard/settings/SocialLogin';
import Payment from 'components/dashboard/settings/Payment';
import SMTPServer from 'components/dashboard/settings/SMTPServer';
/* ----------------------------------- */
/* IMPORTS FOR MARKETING PAGES - START */
import DefaultLayout from 'layouts/marketing/DefaultLayout';
import BlankLayout from 'layouts/marketing/BlankLayout';
import NotFound from 'layouts/marketing/NotFound';

/* IMPORTS FOR FRONT BLOG SUBMENU  ROUTERS */
import BlogListing from 'components/marketing/blog/BlogListing';
import BlogArticleSingle from 'components/marketing/blog/BlogArticleSingle';
import BlogCategory from 'components/marketing/blog/BlogCategory';
import BlogSidebar from 'components/marketing/blog/BlogSidebar';

import NationalBlog from 'components/marketing/blog/NationalBlog';
import LatestBlog from 'components/marketing/blog/LatestBlog';

/* IMPORTS FOR FRONT SPECIALTY SUBMENU  ROUTERS */
import ComingSoon from 'components/marketing/pages/specialty/ComingSoon';
import Error404 from 'components/marketing/pages/specialty/Error404';
import MaintenanceMode from 'components/marketing/pages/specialty/MaintenanceMode';
import TermsAndConditions from 'components/marketing/pages/specialty/TermsAndConditions';

import PortfolioSingle from 'components/marketing/pages/portfolio/PortfolioSingle';
import ElectionBlog from 'components/marketing/electionNews/Election';
//all slide  ROUTES//
// import AllPostsSlide from 'components/dashboard/cms/slide-blogs/AllPosts';
const AllRoutes = () => {
	return (
		<Routes>
			{/* Routes with DefaultLayout */}
			<Route element={<DefaultLayout />}>
				<Route
					path="/marketing/blog/article-single/:id"
					element={<BlogArticleSingle />}
				/>
				<Route path="/marketing/blog/category/" element={<BlogCategory />} />
				<Route path="/" element={<BlogListing />} />
			</Route>
			<Route element={<DefaultLayout />}>
				<Route path="/marketing/blog/allNational" element={<NationalBlog />} />
			</Route>
			<Route element={<DefaultLayout />}>
				<Route path="/marketing/blog/latest" element={<LatestBlog />} />
			</Route>
			<Route element={<DefaultLayout />}>
				<Route
					path="/marketing/electionNews/election"
					element={<ElectionBlog />}
				/>
			</Route>
			{/* Routes with BlankLayout */}
			<Route element={<BlankLayout />}>
				<Route path="/marketing/blog/sidebar/" element={<BlogSidebar />} />
				{/* <Route
					path="/marketing/specialty/terms-and-conditions/"
					element={<TermsAndConditions />}
				/> */}
			</Route>

			{/* Routes with NotFound */}
			<Route element={<NotFound />}>
				<Route
					path="/marketing/specialty/coming-soon/"
					element={<ComingSoon />}
				/>
				<Route path="/marketing/specialty/404-error/" element={<Error404 />} />
				<Route
					path="/marketing/specialty/maintenance-mode/"
					element={<MaintenanceMode />}
				/>
			</Route>

			{/* Routes with AuthLayout */}
			<Route element={<AuthLayout />}>
				<Route path="/authentication/sign-in" element={<SignIn />} />
				<Route path="/authentication/sign-up" element={<SignUp />} />
				<Route
					path="/authentication/forget-password"
					element={<ForgetPassword />}
				/>
			</Route>
			<Route element={<DefaultLayout />}>
				<Route
					path="/marketing/portfolio/single/"
					element={<PortfolioSingle />}
				/>
			</Route>
			{/* Routes (DASHBOARD ROUTERS) with DashboardIndex */}
			<Route element={<DashboardIndex />}>
				<Route path="/dashboard/overview" element={<Overview />} />
				<Route path="/dashboard/analytics" element={<Analytics />} />
				<Route path="/user/instructor" element={<Instructor />} />
				<Route path="/user/students" element={<Students />} />
				<Route path="/cms/cms-dashboard" element={<CMSDashboard />} />
				<Route path="/cms/all-posts" element={<AllPosts />} />
				<Route path="/cms/add-new-post" element={<AddNewPost />} />
				<Route path="/cms/category" element={<Category />} />
				<Route
					path="/authentication/notifications"
					element={<Notifications />}
				/>
				<Route
					path="/dashboard/layouts/layout-vertical"
					element={<Overview />}
				/>
				{/* Slide data routes */}
				{/* <Route path='/cms/slide-blog/all-slide-post' element={<AllPostsSlide />} /> */}
				{/* SETTINGS ROUTERS */}
				<Route path="/settings/general" element={<General />} />
				<Route path="/settings/google" element={<Google />} />
				<Route path="/settings/social" element={<Social />} />
				<Route path="/settings/social-login" element={<SocialLogin />} />
				<Route path="/settings/payment" element={<Payment />} />
				<Route path="/settings/smtp-server" element={<SMTPServer />} />
			</Route>

			{/*Redirect*/}
			<Route
				path="*"
				element={<Navigate to="/marketing/specialty/404-error/" replace />}
			/>
		</Routes>
	);
};

export default AllRoutes;

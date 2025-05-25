import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { AppLayout } from "./components/app-layout";
import ScrollToTop from "./components/scroll-to-top";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Employee from "./pages/Employee";
import Client from "./pages/Client";
import Leads from "./pages/Leads";
import LeadInfo from "./pages/LeadInfo";

function App() {
	return (
		<Router>
			<ScrollToTop />
			<Routes>
				<Route path="/login" element={<Login />} />
				{/* <Route path="/signup" element={<Signup />} /> */}
				<Route element={<AppLayout />}>
					<Route path="/" element={<Dashboard />} />
					<Route path="/admin" element={<Admin />} />
					<Route path="/employees" element={<Employee />} />
					<Route path="/clients" element={<Client />} />
					<Route path="leads" element={<Leads />} />
				</Route>
				<Route path="leads/:id" element={<LeadInfo />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;

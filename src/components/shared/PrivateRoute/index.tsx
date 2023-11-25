import { Navigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import ROLE from "../../../utils/types/Role";
import AccessDeniedPage from "../../pages/AccessDeniedPage";

interface PrivateRouteProps {
    component: React.ComponentType
    path?: string
    roles: Array<ROLE>
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: RouteComponent, roles }) => {
    const { loggedUser } = useAuth();
    const userHasRequiredRole = roles.includes(loggedUser?.role as ROLE);

    if (userHasRequiredRole) {
        return <RouteComponent />
    }

    if (!userHasRequiredRole) {
        return <AccessDeniedPage />;
    }

    return <Navigate to="/" />
}

export default PrivateRoute;
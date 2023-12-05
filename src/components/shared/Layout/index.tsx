import { Outlet, useLocation } from "react-router-dom"
import HeaderMenu from "../HeaderMenu"
import { setTitle } from "../../../utils/getLocation";

const Layout = () => {
    const location = useLocation();
    const title = setTitle(location.pathname);

    return (
        <>
            <HeaderMenu title={title} />
            <Outlet />
        </>
    )
}

export default Layout;
import {Outlet, NavLink, Route, Routes} from "react-router-dom";
import LoginForm from "./LoginForm.tsx";
import RegisterForm from "./RegisterForm.tsx";

const HomeRoutes = {
    Login: {
        name: 'Login',
        path: '/login',
        component: LoginForm
    },
    Register: {
        name: 'Register',
        path: '/register',
        component: RegisterForm
    }
} as const;

export default function HomePage() {
    return (
        <>
            <div className="m-3">
                Paying too much cash for a photo upload site? Here's a free alternative.
                <br/>
                Just navigate to the upload page and upload your photos. Navigate to the view page to see your photos.
                Login or register to start uploading!
            </div>

            <ul className="nav nav-tabs m-3">
                {Object.values(HomeRoutes).map(({name, path}) => (
                    <li className="nav-item" key={path}>
                        <NavLink to={path} key={path} className='nav-link'>
                            {name}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <Outlet/>

            <Routes>
                {Object.values(HomeRoutes).map(({path, component: Component}) => (
                    <Route key={path} path={path} element={<Component/>}/>
                ))}
            </Routes>
        </>
    )
}
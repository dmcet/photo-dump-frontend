import HomePage from "./pages/HomePage.tsx";
import {BrowserRouter, NavLink, Routes, Route} from "react-router-dom";
import UploadImagePage from "./pages/UploadImagePage.tsx";
import ViewImagesPage from "./pages/ViewImagesPage.tsx";

const Page = {
    Home: 'Home',
    UploadImage: 'Upload Image',
    ViewImages: 'View Images'
} as const;

const AppRoutes = {
    Home: {
        path: '/',
        component: HomePage
    },
    UploadImage: {
        path: '/upload',
        component: UploadImagePage
    },
    ViewImages: {
        path: '/view',
        component: ViewImagesPage
    }
} as const;


export default function App() {

    return (
        <BrowserRouter>
            <h1 className="m-3">Welcome to PhotoDump</h1>
            <h2 className="m-3">The only photo upload site you'll need</h2>

            <nav className="nav nav-pills nav-fill m-3">
                {Object.entries(AppRoutes).map(([name, {path}]) => (
                    <NavLink
                        key={path}
                        to={path}
                        className={({isActive}) =>
                            `nav-link m-2 ${isActive ? 'active' : ''}`
                        }
                    >
                        {Page[name as keyof typeof Page]}
                    </NavLink>
                ))}
            </nav>

            <Routes>
                {Object.values(AppRoutes).map(({path, component: Component}) => (
                    <Route key={path} path={path} element={<Component/>}/>
                ))}
            </Routes>


        </BrowserRouter>
    )
}
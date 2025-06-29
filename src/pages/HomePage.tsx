import {Outlet, NavLink, Route, Routes} from "react-router-dom";
import LoginForm from "./LoginForm.tsx";
import RegisterForm from "./RegisterForm.tsx";
import {jwtDecode, type JwtPayload} from "jwt-decode";
import {useEffect, useState} from "react";

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

interface AuthenticationState {
    user: string | undefined;
    tokenValid: boolean;
}

function LoginRegistrationFormOrGreeting() {
    const [authenticationState, setAuthenticationState] = useState<AuthenticationState>(
        {
            user: undefined,
            tokenValid: false
        }
    )

    useEffect(() => {
        const maybeToken = localStorage.getItem('access_token');
        if (!maybeToken) {
            console.log('No token found, clearing state');
            setAuthenticationState(
                {
                    user: undefined,
                    tokenValid: false
                }
            )
            return;
        }

        const decodedToken = decodeToken(maybeToken);
        if (!decodedToken) {
            console.log('Error decoding token, clearing state');
            setAuthenticationState(
                {
                    user: undefined,
                    tokenValid: false
                }
            )
            return;
        }

        console.log('Decoded token:', decodedToken)
        setAuthenticationState(
            {
                user: decodedToken?.sub,
                tokenValid: tokenValid(decodedToken)
            }
        )
    }, [])


    useEffect(() => {
        console.log('Authentication state:', authenticationState);
    }, [authenticationState]);

    if (authenticationState.user && authenticationState.tokenValid) {
        return <h1 className="m-3">Hello {authenticationState.user}! Welcome back :-)</h1>
    }

    return (
        <>
            {!authenticationState.tokenValid && (
                <p className="m-3">Token expired, please login again</p>
            )}
            <LoginAndRegisterTabBar/>
        </>
    );
}


function decodeToken(token: string): JwtPayload | null {
    try {
        const decodedToken = jwtDecode(token)
        console.log('Decoded token:', decodedToken)
        return decodedToken;

    } catch (error) {
        console.error('Error decoding token:', error)
        return null;
    }
}

function tokenValid(token: JwtPayload) {
    if (!token.exp) {
        console.error('Token does not contain expiration time')
        return false
    }

    const currentTime = Date.now() / 1000;
    return token.exp > currentTime;
}

function LoginAndRegisterTabBar() {
    return <>
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
}

export default function HomePage() {
    return (
        <>
            <div className="m-3">
                Paying too much cash for a photo upload site? Here's a free alternative.
                <br/>
                Just navigate to the upload page and upload your photos. Navigate to the view page to see your photos.
                Login or register to start uploading!
            </div>
            <LoginRegistrationFormOrGreeting/>
        </>
    )
}
import {type ChangeEvent, type FormEvent, useState} from "react";
import axios from "axios";

interface LoginData {
    username: string;
    password: string;
}

export default function LoginForm() {
    const [loginData, setLoginData] = useState<LoginData>(
        {
            username: '',
            password: ''
        }
    )

    const [status, setStatus] = useState<string | null>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setLoginData(
            {
                ...loginData,
                [name]: value
            }
        );
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Form submitted:', loginData);
        axios({
            method: 'POST',
            url: 'http://localhost:8080/api/v1/user/login',
            data: loginData
        }).then(
            response => {
                console.log('Response:', response);
                setStatus('Login successful!');
                localStorage.setItem('access_token', response.data.access_token);
                console.log('Token:', localStorage.getItem('access_token'));
                // Refresh the page to update authentication state
                window.location.reload();
            },
            error => {
                console.log('Error:', error);
                const errorMessage = error.response?.data?.message || 'Login failed!';
                setStatus(errorMessage);
            }
        )
    }

    const determineButtonClass = () => {
        if (!loginData.username || !loginData.password ) {
            return "btn btn-primary disabled";
        }

        return "btn btn-primary";
    }

    const statusOrNothing = () => {
        if (status) {
            return <div className="alert">{status}</div>
        }
        return null;
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="m-3">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={loginData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className={determineButtonClass()}>Login</button>
            </form>
            {statusOrNothing()}
        </>
    )
}
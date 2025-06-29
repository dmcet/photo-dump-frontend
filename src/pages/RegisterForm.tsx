import {useState} from "react";
import * as React from "react";

interface RegisterData {
    username: string;
    password: string;
    passwordRepeated: string;
}

export default function RegisterForm() {
    const [registerData, setRegisterData] = useState<RegisterData>(
        {
            username: '',
            password: '',
            passwordRepeated: ''
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setRegisterData(
            {
                ...registerData,
                [name]: value
            }
        );
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', registerData);
    };

    return (
        <form onSubmit={handleSubmit} className="m-3">
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={registerData.username}
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
                    value={registerData.password}
                    onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="passwordRepeated" className="form-label">Password (repeated)</label>
                <input
                    type="password"
                    className="form-control"
                    id="passwordRepeated"
                    name="passwordRepeated"
                    value={registerData.passwordRepeated}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    )
}
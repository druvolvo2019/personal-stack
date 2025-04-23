import { useId, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { callApi } from "./fetcher";
import { useNavigate } from 'react-router'

export default function Login({ onUserLogin }) {
    const emailId = useId();
    const passwordId = useId();
    const emailRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    const mutation = useMutation({
        mutationFn: (data) => {
            return callApi("post", "rpc/login", {
                u_email: data.email,
                u_password: data.password,
            });
        },
        onSuccess: (data) => {
            console.log(data);
            if (data && data[0]) {
                onUserLogin(data[0]);
                navigate("/profile");
            }
        },
        onError: (error) => {
            console.log(error);
        },
    });

    function handleLogin(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get("email");
        const password = data.get("password");
        mutation.mutate({
            email,
            password,
        });
    }

    return (<div className="profile-wrapper">
        <h1>Login</h1>
        <title>Login | SuperM</title>
        <p className="text-dimmed">Login using test@example.com and any password.</p>

        <form onSubmit={handleLogin}>
            <label className="label" htmlFor={emailId}>
                Email<span className="required">*</span>:
            </label>
            <input id={emailId} name="email" type="email" className="input" placeholder="Email" autoComplete="email" ref={emailRef} />

            <label className="label" htmlFor={passwordId}>
                Password<span className="required">*</span>:
            </label>
            <input id={passwordId} name="password" type="password" className="input" placeholder="Password" autoComplete="current-password" />

            <div className="form-buttons">
                <input type="submit" value="Login" className="btn" />
            </div>
        </form>
    </div>);
}
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";

import { authenticate } from "../api-requests";
import { changeAlertMessage } from "../store/actions/change-alert-message";

export default function AuthenticationCard() {

    let dispatch = useDispatch();
    let navigate = useNavigate();
    let loginField = useRef(null);
    let passwordField = useRef(null);

    let signUpCallback = () => {
        navigate('/registration');
    }

    let signInCallback = () => {
        let request = {
            login: loginField.current.value,
            password: passwordField.current.value
        }
        authenticate(request).then((response) => {
            if (response.status === 200) {
                response.text().then((token) => {
                    localStorage.setItem('token', token);
                    navigate('/translator');
                    dispatch(changeAlertMessage(`Hello, ${request.login}!`));
                });
            } else if (response.status === 404) {
                dispatch(changeAlertMessage(`User with login ${request.login} doesn't exist`, true));
            } else if (response.status === 401) {
                dispatch(changeAlertMessage(`Password is incorrect`, true));
            }
        })
    }

    return (
        <div className="AuthenticationCard">
            <p className="AuthenticationTextField" >Sign in</p>
            <input ref={loginField} className="AuthenticationInputField" type="text" placeholder="Login"/>
            <input ref={passwordField} className="AuthenticationInputField" type="password" placeholder="Password"/>
            <button className="AuthenticationButton" onClick={signInCallback}>Sign in</button>
            <button className="AuthenticationButton" onClick={signUpCallback}>Sign up</button>
        </div>
    );

}
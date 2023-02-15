import { useNavigate } from "react-router-dom";

import { useRef } from "react";
import { useDispatch } from "react-redux";

import { register } from "../api-requests";
import { changeAlertMessage } from "../store/actions/change-alert-message";

export default function RegistrationCard() {

    let dispatch = useDispatch();
    let navigate = useNavigate();
    let loginField = useRef(null);
    let passwordField = useRef(null);
    let passwordRepeatField = useRef(null);

    let signInCallback = () => {
        navigate('/');
    }

    let signUpCallback = () => {
        
        let request = {
            login: loginField.current.value,
            password: passwordField.current.value
        }

        if (!request.login.match(/^[\w_]{3,}$/)) {
            dispatch(changeAlertMessage('Login is incorrect (letters, numbers, \'_\', at least 3 symbols)', true));
            return;
        }
        
        if (!request.password.match(/^[\w_.?,-]{5,}$/)) {
            dispatch(changeAlertMessage('Password is incorrect (letters, numbers, \'_.?,-\', at least 5 symbols)', true));
            return;
        }

        if (request.password !== passwordRepeatField.current.value) {
            dispatch(changeAlertMessage('Passwords don\'t match', true));
            return;
        }

        register(request).then((response) => {
            if (response.status === 200) {
                navigate('/');
                dispatch(changeAlertMessage('Signed up!'));
            } else if (response.status === 400) {
                dispatch(changeAlertMessage(`User with login ${request.login} already exists`, true));
            }
        });
    }

    return (
        <div className="RegistrationCard">
            <p className="AuthenticationTextField">Sign up</p>
            <input ref={loginField} className="AuthenticationInputField" type="text" placeholder="Login"/>
            <input ref={passwordField} className="AuthenticationInputField" type="password" placeholder="Password"/>
            <input ref={passwordRepeatField} className="AuthenticationInputField" type="password" placeholder="Repeat password"/>
            <button className="AuthenticationButton" onClick={signUpCallback}>Sign up</button>
            <button className="AuthenticationButton" onClick={signInCallback}>Sign in</button>
        </div>
    );
    
}
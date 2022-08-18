import * as React from 'react';
import { useEffect, useState } from 'react';
import ChangePassword from './components/changePasswordComponent';
import ConfirmTokenComponent from './components/confirmTokenComponent';
import ForgotPassword from './components/forgotPasswordComponent';
import Signin from './components/signinComponent';
import Signup from './components/signupComponent';

//const key = 'login';

export interface ILoginProps {
    location: any;
}

export default function Login(props: ILoginProps) {

    const [scren, setscren] = useState<HTMLElement>();

    useEffect(() => {
        console.log('props.location', props.location)
    }, [])


    const _renderScenesLogin = () => {
        console.log('props.location', props.location)
        switch (props.location.pathname) {
            case '/change-password':
                return <ChangePassword location={props.location} />;
            case '/forgot-password':
                return <ForgotPassword location={props.location} />;
            case '/signup':
                return <Signup location={props.location} />;
            case '/login':
                return <Signin location={props.location} />;
            case '/token':
                return <ConfirmTokenComponent location={props.location} />;
            case '/logout':
                return <ConfirmTokenComponent location={props.location} />;
            default:
                return <Signin location={props.location} />;
        }
    }

    return (
        <>
            {(() => _renderScenesLogin())()}
        </>
    )
};
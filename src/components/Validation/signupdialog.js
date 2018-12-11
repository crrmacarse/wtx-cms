import React from 'react';

import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';


import * as ROUTES from '../../constants/routes';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ...INITIAL_STATE,
            popupopen: true
        }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({...INITIAL_STATE});
            })
            .catch(error => {
                this.setState({ error });
                setTimeout(() => {
                    this.setState({popupopen: false});
                }, 3000)
            });

        event.preventDefault();

    }

    // TODO: Sign up functions
    render() {
    
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
            popupopen
        } = this.state;

        const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === '';

        return (
            <section className="container-fluid h-100 bg-white text-dark">
                <div className="row py-5 bg-white">
                    <div className="col-md-5 col-12 ml-md-5">
                        <form onSubmit={this.onSubmit}>
                            <p className="h2 font-weight-bold">
                                Sign Up
                        </p>
                            <div className="m-2">
                                <TextField
                                    name="username"
                                    label="Username"
                                    id="idUsername"
                                    autoComplete="username"
                                    fullWidth
                                    onChange={this.onChange}
                                    value={username}
                                />
                            </div>
                            <div className="m-2">
                                <TextField
                                    name="email"
                                    label="Email"
                                    id="idEmail"
                                    fullWidth
                                    helperText="Lorem Ipsum Dolor"
                                    onChange={this.onChange}
                                    value={email}
                                />
                            </div>
                            <div className="m-2">
                                <TextField
                                    name="passwordOne"
                                    label="Password"
                                    type="password"
                                    id="idPassword1"
                                    autoComplete="new-password"
                                    fullWidth
                                    onChange={this.onChange}
                                    value={passwordOne}
                                />
                            </div>
                            <div className="m-2">
                                <TextField
                                    name="passwordTwo"
                                    label="Confirm Password"
                                    type="password"
                                    id="idPassword2"
                                    autoComplete="new-password"
                                    fullWidth
                                    helperText="Confirm Password"
                                    onChange={this.onChange}
                                    value={passwordTwo}
                                />
                            </div>

                            {error && 
                                <div
                                    className = { popupopen ? 'alert alert-danger mt-4' : 'd-none'}
                                    role = "alert"
                                >{error.message}
                                </div>
                            }

                            <div className="mt-5">
                                <Button
                                    disabled={isInvalid}
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >Sign up</Button>
                            </div>
                        </form>
                    </div>
                    <div className="col">

                    </div>
                    <div className="col-md-5 col-12 mt-md-0 mt-5 ml-md-5">
                        <p className="h5 font-weight-bold">Disclaimer:</p>
                        <p className="font-weight-light">
                            Integer ornare quam odio, eu ornare nibh mattis cursus. Donec a efficitur mi, sit amet
                            cursus lorem. Cras quis gravida tortor. Proin in turpis vitae lectus lacinia elementum eu
                            in libero. Duis sagittis auctor augue, eget egestas erat efficitur ac. Nam quis justo
                            consectetur justo malesuada volutpat. Fusce ac elementum mi, sed convallis turpis.
                            Mauris eleifend lorem ante, in accumsan magna porta ut. Nam ac congue sapien, at mattis
                            ipsum. Aliquam a porta orci, facilisis facilisis orci. Cras ut scelerisque nulla.
                            Mauris aliquam placerat neque condimentum aliquam. Nulla facilisi. Aenean maximus
                            ut justo et consectetur. Ut hendrerit ex et risus tincidunt interdum.
                        </p>
                        <p className="h5 mt-5 font-weight-bold">Terms and Conditions:</p>
                        <p className="font-weight-light">
                            Mauris et dolor convallis dui scelerisque ultrices. Aenean et ullamcorper urna, a suscipit
                            purus. Proin velit massa, ullamcorper eget tincidunt vel, consectetur vitae dolor. Maecenas
                            nec elit in tellus egestas ultricies vel non turpis. Quisque elementum augue in dapibus laoreet.
                            Donec quam enim, dictum iaculis aliquet sit amet, viverra ac libero.
                        </p>
                    </div>
                </div>
            </section>
        )
    }

}


const SignUpLink = ({ handleClose }) => {
    return (
        <React.Fragment>
            Don't have an account yet? <Link to={ROUTES.SIGNUP} onClick={handleClose} > Sign Up here</Link>
        </React.Fragment>
    )
}

const SignUp = compose(
    withFirebase,
    withRouter,
)(SignUpPage);

export default SignUp;

export { SignUpLink };

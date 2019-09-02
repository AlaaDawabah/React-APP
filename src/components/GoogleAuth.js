import React, { Component } from 'react';
import {connect} from 'react-redux';
import {signIn,signOut} from '../actions/index';

export class GoogleAuth extends Component {


    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '990611393025-u1u2o9dtlmttmmsc5cnu7le5jv7urhq1.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())       
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = ( isSignedIn ) => {
        if ( isSignedIn ) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
     }

    onSignOutClick = () => {
        console.log('signed out')
        this.auth.signOut();
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    renderAuthButton () {
        if ( this.props.isSignedIn === null) {
            
            return null;

        } else if (this.props.isSignedIn) {
            
            return (
                <button onClick = {this.onSignOutClick} className = "ui red google button">
                    <i className = "google icon"></i>
                    signOut
                </button>
                )

        } else {
            return (
                <button onClick = {this.onSignInClick} className = "ui blue google button">
                    <i className = "google icon"></i>
                    Sign In with Google
                    
                </button>
                )
        }
    }


    render() {
        return (
            <div>
                { this.renderAuthButton() }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStateToProps, {signIn, signOut}) (GoogleAuth);

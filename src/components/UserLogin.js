import React, { Component } from 'react';

export class UserLogin extends Component {
    render() {
        if (this.props.auth && this.props.auth.isAuthenticated) {
            return (
                <li className="nav-item M-1">
                    <div className="dropdown">
                        <a className="btn btn-light btn-outline-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            {this.props.auth.user.name}
                        </a>

                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            {/* <UserLogin {...this.props} /> */}
                            <li>
                                <a className="dropdown-item" onClick={this.props.onSignOut} href='#'>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
            );
        }
        else {
            return (
                <li className="nav-item M-1">
                    <a className="btn btn-light btn-outline-primary" onClick={this.props.onSignIn}>
                        Login
                    </a>
                </li>
            );
        }
    }
}
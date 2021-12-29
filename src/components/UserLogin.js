import React, { Component } from 'react';

export class UserLogin extends Component {
    render() {
        if (this.props.auth && this.props.auth.isAuthenticated) {
            return (
                <li className="nav-item M-1">
                    <div className="dropdown">
                        <button className="btn btn-light btn-outline-primary dropdown-toggle" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            {this.props.auth.user.name}
                        </button>

                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            {/* <UserLogin {...this.props} /> */}
                            <li>
                                <button className="dropdown-item" onClick={this.props.onSignOut}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </li>
            );
        }
        else {
            return (
                <li className="nav-item M-1">
                    <button className="btn btn-light btn-outline-primary" onClick={this.props.onSignIn}>
                        Login
                    </button>
                </li>
            );
        }
    }
}
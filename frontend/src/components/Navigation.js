import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                <Link className="navbar-brand" to={"/"}>
                    Notes App
                </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">

                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className={"nav-link"} to={"/"}> Notes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/create"}>Create Note</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/user"} >
                                Create User
                            </Link>

                        </li>

                    </ul>
                    {/*<form className="form-inline my-2 my-lg-0">*/}
                    {/*    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">*/}
                    {/*        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>*/}
                    {/*</form>*/}
                </div>
            </nav>
        );
    }
}

export default Navigation;
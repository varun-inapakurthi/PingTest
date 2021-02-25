import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/userAction";

const Header = () => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout())
    }

    const { userInfo } = useSelector(state => state.user)
    return (<>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <h2>PingTest</h2>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">

                        {userInfo && <><li className="nav-item active">
                            <Link className="nav-link" to="/">Home
                         <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={logoutHandler}>Logout</Link>
                            </li></>}
                        {!userInfo && <> <li className="nav-item">
                            <Link className="nav-link" to="/signup">Sign Up</Link>
                        </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li></>}
                    </ul>
                </div>
            </div>
        </nav>
    </>);
}

export default Header;
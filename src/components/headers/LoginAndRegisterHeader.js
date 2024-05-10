import { Link } from "react-router-dom";

const LoginAndRegisterHeader = () => {
    return (
        <div className="header">

            <Link to="/" style={{ textDecoration: 'none' }}>
                <button className="header_button">К форме</button>
            </Link>

        </div>
    );
};

export default LoginAndRegisterHeader;
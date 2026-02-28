import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar__logo">
                <img src="/logo.png" alt="SQLStudio Logo" className="navbar__logo-img" />
                SQL<span>Studio</span>
            </Link>
            <span className="navbar__tagline">Learn SQL by doing</span>
        </nav>
    );
}

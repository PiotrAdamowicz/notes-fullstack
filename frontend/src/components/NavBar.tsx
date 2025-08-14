import { Link } from "@tanstack/react-router";
import { Route } from "../routes/_authenticated";

export function NavBar() {
    const { user } = Route.useRouteContext();
    const loggedIn = user != null;
    return (
        <nav className="p-2 flex gap-2 my-2">
            <Link to="/" className="[&.active]:font-bold">
                Home
            </Link>
            <Link to="/profile" className="[&.active]:font-bold">
                Profile
            </Link>
            {loggedIn && (
                <a href="/api/logout" className="[&.active]:font-bold">
                    Logout
                </a>
            )}
        </nav>
    );
}

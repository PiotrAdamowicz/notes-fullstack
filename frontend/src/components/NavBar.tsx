import { Link } from "@tanstack/react-router";

export function NavBar() {
  return (
    <nav className="p-2 flex gap-2 my-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/about" className="[&.active]:font-bold">
        About
      </Link>
      <Link to="/profile" className="[&.active]:font-bold">
        Profile
      </Link>
    </nav>
  );
}

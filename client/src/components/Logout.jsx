import { Link } from "react-router-dom";
export default function Logout({onClick})
{
    return(
        <Link className="logout-logo" onClick={onClick}>Logout</Link>
    );
}
import { Link } from 'react-router-dom';
import { GrAddCircle } from "react-icons/gr";
import { MdCollections } from "react-icons/md";

function Footer() {
  return (
    <div className="footer-nav position-fixed bottom-0 w-100 d-flex justify-content-around align-items-center px-4 py-2 bg-white shadow" style={{ zIndex: 9999 }}>
        <Link to="/create-posts" className="footer-icon" title="Create Post">
            <span><GrAddCircle /></span>
        </Link>
        <Link to="/" className="footer-icon" title="See Posts">
            <span><MdCollections /></span>
        </Link>
    </div>

  )
}

export default Footer
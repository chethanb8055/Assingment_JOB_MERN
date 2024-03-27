import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../ContexApi/CreateApi";
import axios from "axios";
import toast from "react-hot-toast";

function Navbar() {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigateTo = useNavigate();
  // console.log(user);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/user/logout`,
        {
          withCredentials: true,
        }
      );
      setIsAuthorized(false);
      setUser("");
      navigateTo("/login");
      toast.success(response.data.message);
    } catch (error) {
      navigateTo("/login");
      toast.error(error.response.data.message), setIsAuthorized(true);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to={"/applications/me"}>
                {user && user.role === "Employer"
                  ? "APPLICANT'S APPLICATIONS"
                  : "MY APPLICATIONS"}
              </Link>
            </li>
            <li>
              <Link
                className="nav-link active"
                aria-current="page"
                to={"/job/getall"}
              >
                JobDetails
              </Link>
            </li>

            {user && user.role === "Employer" ? (
              <>
                <li>
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/job/post"}
                    onClick={() => setShow(false)}
                  >
                    POST NEW JOB
                  </Link>
                </li>
                <li>
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to={"/job/me"}
                    onClick={() => setShow(false)}
                  >
                    VIEW YOUR JOBS
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"applications/me"}
                >
                  My Application
                </Link>
              </li>
            )}
            {user === "" ? (
              <li>
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <button className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

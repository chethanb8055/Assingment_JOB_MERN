import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { Context } from "../../ContexApi/CreateApi";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get(`http://localhost:4000/api/v1/application/employer/getall`, {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get(`http://localhost:4000/api/v1/application/jobseeker/getall`, {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="container-fluid">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1>My Applications</h1>
          {applications.length <= 0 ? (
            <>
              {" "}
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container ">
          <h1>Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="">
      <div className="border-1 p-3 border  border flex-md-row flex-column  d-flex justify-content-between align-items-center">
        <div className=" ">
          <p>
            <span className="fw-bold fs-5 p-1">Name:</span>{" "}
            <span className="fs-5">{element.name}</span>
          </p>
          <p>
            <span className="fw-bold fs-5 p-1">Email:</span>{" "}
            <span className="fs-5">{element.email}</span>
          </p>
          <p>
            <span className="fw-bold fs-5 p-1">Phone:</span>{" "}
            <span className="fs-5"> {element.phone}</span>
          </p>
          <p>
            <span className="fw-sm-bold fs-5 p-1">Address:</span>{" "}
            <span className="fs-5">{element.address}</span>
          </p>
          <p>
            <span className="fw-bold fs-5 p-1">CoverLetter:</span>{" "}
            <span className="fs-5">{element.coverLetter}</span>
          </p>
          <div className="w-25 text-center">
            <p className="card-text">
              {element.status === "Pending" && (
                <div className="alert alert-warning" role="alert">
                  <span className="fw-bold">Status:</span>&nbsp;
                  <span>{element.status}</span>
                  <i className="bi bi-clock-fill text-warning ms-2"></i>{" "}
                  {/* Pending icon */}
                </div>
              )}
              {element.status === "Rejected" && (
                <div className="alert alert-danger" role="alert">
                  <span className="fw-bold">Status:</span>&nbsp;
                  <span>{element.status}</span>
                  <i className="bi bi-x-circle-fill text-danger ms-2"></i>{" "}
                  {/* Reject icon */}
                </div>
              )}
              {element.status === "Accepted" && (
                <div className="alert alert-success" role="alert">
                  <span className="fw-bold">Status:</span>&nbsp;
                  <span>{element.status}</span>
                  <i className="bi bi-check2-circle text-success ms-2"></i>{" "}
                  {/* Accepted icon */}
                </div>
              )}
            </p>
          </div>
        </div>
        <div className="d-none d-md-block">
          <img
            src={element.resume.url}
            className="img-fluid w-25"
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>

        <div className="btn_area">
          <button
            onClick={() => deleteApplication(element._id)}
            className="btn btn-primary w-100"
          >
            Delete Application
          </button>
        </div>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  console.log(element);
  const [status, setStatus] = useState(element.status);

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/application/update/${element._id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setStatus(newStatus);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-body">
                {/* Render other details */}
                <p className="card-text">
                  <span className="fw-bold">Name:</span> {element.name}
                </p>
                <p className="card-text">
                  <span className="fw-bold">Email:</span> {element.email}
                </p>
                <p className="card-text">
                  <span className="fw-bold">Phone:</span> {element.phone}
                </p>
                <p className="card-text">
                  <span className="fw-bold">Address:</span> {element.address}
                </p>
                <p className="card-text">
                  <span className="fw-bold">CoverLetter:</span>{" "}
                  {element.coverLetter}
                </p>
                <p className="card-text">
                  <span className="fw-bold">Status:</span> {status}
                </p>
                <div className="card-body">
                  {/* Add UI element for status update */}
                  <button
                    className="btn btn-primary"
                    onClick={() => handleStatusUpdate("Accepted")}
                    disabled={status === "Accepted"} // Disable if already accepted
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleStatusUpdate("Rejected")}
                    disabled={status === "Rejected"} // Disable if already rejected
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-none d-md-block border-2 border h-100 ">
              <img
                src={element.resume.url}
                className="img-fluid w-25 w-50 h-50 m-5"
                alt="resume"
                onClick={() => openModal(element.resume.url)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const ContactCard = ({ id, name, email, address, phone }) => {
  const { actions } = useContext(Context);
  const navigate = useNavigate(); // Reemplazo de useHistory por useNavigate

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
    if (confirmDelete) {
      await actions.deleteContact(id);
      navigate("/"); // Navega a la página principal después de eliminar el contacto
    }
  };

  return (
    <div className="container my-3 d-flex justify-content-center">
      <div className="card shadow-sm" style={{ maxWidth: "400px", borderRadius: "15px" }}>
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title m-0">{name}</h5>
            <i className="fas fa-user-circle fa-2x text-primary"></i>
          </div>
          <div className="mb-3">
            <h6 className="card-subtitle mb-1 text-muted">
              <i className="fas fa-envelope me-2"></i>
              {email}
            </h6>
            <h6 className="card-subtitle mb-1 text-muted">
              <i className="fas fa-map-marker-alt me-2"></i>
              {address}
            </h6>
            <h6 className="card-subtitle mb-0 text-muted">
              <i className="fas fa-phone me-2"></i>
              {phone}
            </h6>
          </div>
          <div className="d-flex justify-content-end">
            <Link to={`/edit/${id}`} className="btn btn-outline-primary btn-sm me-2">
              <i className="fas fa-edit"></i> Edit
            </Link>
            <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
              <i className="fas fa-trash-alt"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
};

export default ContactCard;

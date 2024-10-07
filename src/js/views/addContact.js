import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate(); // Para redirigir después de agregar

  // Inicializamos el estado del nuevo contacto
  const [contact, setContact] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  // Enviar formulario para agregar el nuevo contacto
  const handleSubmit = (e) => {
    e.preventDefault();
    actions.addContact(contact); // Agregar el nuevo contacto en el contexto
    navigate("/"); // Redirigir a la página principal después de agregar
  };

  return (
    <div className="container my-5">
      <h1 className="text-center display-4 text-primary">Add New Contact</h1>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={contact.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={contact.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={contact.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={contact.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Save Contact
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-3"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

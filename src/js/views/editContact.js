import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams(); // Obtenemos el id del contacto a editar desde la URL
  const navigate = useNavigate(); // Para redirigir después de editar

  // Inicializamos el estado del contacto que se va a editar
  const [contact, setContact] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  // Cargar datos del contacto cuando se monta el componente o cambia el store
  useEffect(() => {
    // Buscar el contacto que se va a editar en store.contacts
    const contactToEdit = store.contacts.find((c) => c.id === id);
    if (contactToEdit) {
      // Si se encuentra el contacto, se establece en el estado local
      setContact((prevContact) => ({
        ...prevContact,
        ...contactToEdit,
      }));
    }
  }, [id, store.contacts]);

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  // Enviar formulario para actualizar el contacto
  const handleSubmit = (e) => {
    e.preventDefault();
    actions.updateContact(id, contact); // Actualizar el contacto en el contexto
    navigate("/"); // Redirigir a la página principal después de actualizar
  };

  return (
    <div className="container my-5">
      <h1 className="text-center display-4 text-primary">Edit Contact</h1>
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
                Save Changes
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
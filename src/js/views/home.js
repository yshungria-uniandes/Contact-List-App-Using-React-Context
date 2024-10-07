import React, { useContext } from "react";
import "../../styles/home.css";
import ContactCard from "../component/contactCard";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store } = useContext(Context);

	return (
		<div className="container my-5">
			<div className="text-center mb-5">
				<h1 className="display-4 text-primary">Welcome to Your Contact Manager</h1>
				<p className="lead text-secondary">
					Manage all your contacts in one place, easily and efficiently.
				</p>
				<Link to="/add" className="btn btn-primary btn-lg mt-3">
					<i className="fas fa-plus-circle"></i> Add New Contact
				</Link>
				<hr className="my-4" />
			</div>
			<div className="row justify-content-center">
				{store.contacts && store.contacts.length > 0 ? (
					store.contacts.map((contact) => (
						<div key={contact.id} className="col-md-6 col-lg-4 mb-4">
							<ContactCard
								id={contact.id}
								name={contact.name}
								email={contact.email}
								address={contact.address}
								phone={contact.phone}
							/>
						</div>
					))
				) : (
					<div className="text-center text-muted">
						<p>No contacts available. Please add a new contact.</p>
					</div>
				)}
			</div>
		</div>
	);
};

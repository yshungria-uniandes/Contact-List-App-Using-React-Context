const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
			demo: [
				{ title: "First title", background: "orange", initial: "white" },
				{ title: "Second title", background: "blue", initial: "white" },
				{ title: "Third title", background: "red", initial: "white" }
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			createAgenda: async () => { 
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/agendaYojan",
						{
							method: "POST",
						}
					);

					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
					const data = await response.json();
					console.log("createAgenda", data);
				} catch (error) {
					console.error("Error creating agenda:", error);
				}
			},



			loadContacts: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/agendaYojan",
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json"
							}
						}
					);
					if (response.status === 404) {
						getActions().createAgenda();
					}
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
					const data = await response.json();
					setStore({ contacts: data.contacts });

				} catch (error) {
					console.error("Error loading contacts:", error);
				}
			},

			addContact: async (contact) => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/agendaYojan/contacts",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify(contact)
						}
					);
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
					const data = await response.json();
					setStore({ contacts: [...getStore().contacts, data] });


				} catch (error) {
					console.error("Error adding contact:", error);
				}
			},

			deleteContact: async (id) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/agendaYojan/contacts/${id}`,
						{
							method: "DELETE",
							headers: {
								"Content-Type": "application/json"
							}
						}
					);
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
				
					const updatedContacts = getStore().contacts.filter((contact) => contact.id !== id);

					setStore({ contacts: updatedContacts });
					
				}
				catch (error) {
					console.error("Error deleting contact:", error);
				}
			},

			updateContact: async (id, contact) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/agendaYojan/contacts/${id}`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify(contact)
						}
					);
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
					const data = await response.json();
					setStore({ contacts: getStore().contacts.map((c) => c.id === Number(id) ? data : c) });
				} catch (error) {
					console.error("Error updating contact:", error);
				}
			},

			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;

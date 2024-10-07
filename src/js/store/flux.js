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
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
					const data = await response.json();
					setStore({ contacts: data.contacts });
					console.log("contacts", data.contacts);
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
					console.log("addContact", data);
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
					const data = await response.json();
					console.log("deleteContact", data);
				} catch (error) {
					console.error("Error deleting contact:", error);
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

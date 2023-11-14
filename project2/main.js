let rawData = {}; // Variable to store raw JSON data
const apiUrl = "https://reqres.in/api/users/";
let isJsonView = false; // Flag to toggle view

function fetchUsers() {
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            rawData = data; // Store raw data
            renderUsers(); // Render users
        })
        .catch((error) => console.error("Fetch error:", error));
}

function renderUsers() {
    const usersDiv = document.getElementById("posts");
    usersDiv.innerHTML = ""; // Clear existing content
    rawData.data.forEach((user) => {
        usersDiv.innerHTML += createUserHTML(user); // Add each user
    });

    // Update localStorage with the current state of rawData
    localStorage.setItem("rawData", JSON.stringify(rawData));
}

function toggleView() {
    isJsonView = !isJsonView;
    document.getElementById("posts").style.display = isJsonView ? "none" : "block";
    document.getElementById("jsonView").style.display = isJsonView ? "block" : "none";
    if (isJsonView) {
        document.getElementById("jsonView").textContent = JSON.stringify(rawData, null, 2);
    }
}

function createUserHTML(user) {
    return `
                <div id="user-${user.id}">
                    <h4>${user.first_name} ${user.last_name}</h4>
                    <p>${user.email}</p>
                    <button aria-label="Update user" onclick="updateUser(${user.id})">Update</button>
                    <button aria-label="Delete user" onclick="deleteUser(${user.id})">Delete</button>
                </div>
            `;
}

function createUser() {
    const name = document.getElementById("userName").value;
    const lastName = document.getElementById("userLastName").value;
    const email = document.getElementById("userEmail").value;

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            first_name: name,
            last_name: lastName,
            email: email,
        }),
    })
        .then((response) => response.json())
        .then((user) => {
            console.log("Created user:", user);
            // Add the new user to rawData.data
            rawData.data.push({
                // ...user expands the user object
                ...user,
                id: rawData.data.length + 1,
                first_name: name,
                last_name: lastName,
                email: email,
            });

            // Update the views without re-fetching all users
            renderUsers();
            if (isJsonView) {
                document.getElementById("jsonView").textContent =
                    JSON.stringify(rawData, null, 2);
            }
        })
        .catch((error) => console.error("Error creating user:", error));
}

function updateUser(id) {
    const newName = document.getElementById("userName").value;
    const newLastName = document.getElementById("userLastName").value;
    const newEmail = document.getElementById("userEmail").value;

    fetch(`${apiUrl}/${id}`, {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            first_name: newName,
            last_name: newLastName,
            email: newEmail,
        }),
    })
        .then((response) => response.json())
        .then((user) => {
            console.log("Updated user:", user);
            const userDiv = document.getElementById(`user-${id}`);
            userDiv.innerHTML = createUserHTML({
                ...user,
                first_name: newName,
                last_name: newLastName,
                email: newEmail,
            });
        });
        renderUsers();
}

function deleteUser(userId) {
    fetch(`${apiUrl}/${userId}`, { method: "DELETE" })
        .then((response) => {
            if (response.ok) {
                console.log("User deleted successfully");

                const numericId = + userId; // Convert to number to compare with id in rawData
                rawData.data = rawData.data.filter(
                    (user) => user.id !== numericId
                ); // this code filters out the user with the given id from the rawData array of users and returns a new array without that user 

                const userDiv = document.getElementById(`user-${userId}`);
                if (userDiv) {
                    userDiv.remove();
                }

                if (isJsonView) {
                    document.getElementById("jsonView").textContent =
                        JSON.stringify(rawData, null, 2);
                } // Update the view of the JSON data
                renderUsers(); // render users an update the view of the users
            } else {
                console.error("Deletion failed");
            }
        })
        .catch((error) => console.error("Error:", error));
}

fetchUsers();

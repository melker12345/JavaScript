
const apiUrl = "https://reqres.in/api/users";
let rawData = {}; // Variable to store raw JSON data
let isJsonView = false; // Flag to toggle view

function fetchUsers() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            rawData = data; // Store raw data
            renderUsers(); // Render users
        })
        .catch(error => console.error('Fetch error:', error));
}

function renderUsers() {
    const usersDiv = document.getElementById('posts');
    usersDiv.innerHTML = ''; // Clear existing content
    rawData.data.forEach(user => {
        usersDiv.innerHTML += createUserHTML(user); // Add each user
    });
}

function toggleView() {
    isJsonView = !isJsonView;
    document.getElementById('posts').style.display = isJsonView ? 'none' : 'block';
    document.getElementById('jsonView').style.display = isJsonView ? 'block' : 'none';
    if (isJsonView) {
        document.getElementById('jsonView').textContent = JSON.stringify(rawData, null, 2);
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
        body: JSON.stringify({ first_name: name, last_name: lastName, email: email })
    })
        .then(response => response.json())
        .then(user => {
            console.log("Created user:", user);
            // Add the new user to rawData.data
            rawData.data.push({ ...user, id: rawData.data.length + 1, first_name: name, last_name: lastName, email: email });

            // Update the views without re-fetching all users
            renderUsers();
            if (isJsonView) {
                document.getElementById('jsonView').textContent = JSON.stringify(rawData, null, 2);
            }
        })
        .catch(error => console.error('Error creating user:', error));
}

function updateUser(id) {
    const newName = document.getElementById("userName").value;
    const newLastName = document.getElementById("userLastName").value;
    const newEmail = document.getElementById("userEmail").value;

    fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ first_name: newName, last_name: newLastName, email: newEmail }),
    })
        .then(response => response.json())
        .then(user => {
            console.log("Updated user:", user);
            const userDiv = document.getElementById(`user-${id}`);
            userDiv.innerHTML = createUserHTML({ ...user, first_name: newName, last_name: newLastName, email: newEmail });
        });
}

function deleteUser(userId) {
    fetch(apiUrl + '/' + userId, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                console.log('User deleted successfully');

                const numericId = parseInt(userId, 10);
                rawData.data = rawData.data.filter(user => user.id !== numericId);

                const userDiv = document.getElementById(`user-${userId}`);
                if (userDiv) {
                    userDiv.parentNode.removeChild(userDiv);
                }

                if (isJsonView) {
                    document.getElementById('jsonView').textContent = JSON.stringify(rawData, null, 2);
                }
            } else {
                console.error('Deletion failed');
            }
        })
        .catch(error => console.error('Error:', error));
}

fetchUsers();   
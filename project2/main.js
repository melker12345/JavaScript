const apiUrl = "https://reqres.in/api/users";

function fetchUsers() {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const usersDiv = document.getElementById("posts");
            usersDiv.innerHTML = "";
            data.data.forEach((user) => {
                usersDiv.innerHTML += createUserHTML(user);
            });
        });
}

function createUserHTML(user) {
    return `
                <div id="user-${user.id}">
                    <h3>${user.first_name} ${user.last_name}</h3>
                    <p>Email: ${user.email}</p>
                    <button onclick="updateUser(${user.id})">Update</button>
                    <button onclick="deleteUser(${user.id})">Delete</button>
                </div>
            `;
}

function createUser() {
    const name = document.getElementById("postTitle").value;
    const job = document.getElementById("postBody").value;

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, job }),
    })
        .then((response) => response.json())
        .then((user) => {
            console.log("Created user:", user);
            const usersDiv = document.getElementById("posts");
            usersDiv.innerHTML += createUserHTML({
                ...user,
                first_name: name,
                last_name: "",
                email: "N/A",
            });
        });
}

function updateUser(id) {
    const newName = "Updated Name";
    const newJob = "Updated Job";

    fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName, job: newJob }),
    })
        .then((response) => response.json())
        .then((user) => {
            console.log("Updated user:", user);
            const userDiv = document.getElementById(`user-${id}`);
            userDiv.innerHTML = createUserHTML({
                ...user,
                first_name: newName,
                last_name: "",
                email: "Updated",
            });
        });
}

function deleteUser(id) {
    fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
    }).then(() => {
        console.log("Deleted user:", id);
        const userDiv = document.getElementById(`user-${id}`);
        if (userDiv) {
            userDiv.remove();
        }
    });
}

fetchUsers();

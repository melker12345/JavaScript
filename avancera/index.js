// POST

// const cityName = prompt("Skriv in stadens namn:");
// const population = prompt("Skriv in stadens befolkning:");
// const populationNumber = parseInt(population);

// if (cityName == undefined || population == NaN) {
//     alert("Ogiltig inmatning.");
// } else {
//     const cityData = {
//         name: cityName,
//         population: populationNumber,
//     };
//     fetch("https://avancera.app/cities/", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(cityData),
//     })
//         .then((res) => {
//             if (!res.ok) {
//                 console.log("Error");
//             }
//             return res.json();
//         })
//         .then((data) => {
//             console.log("Success");
//         })
//         .catch((error) => {
//             console.log("Error");
//         });
// }

// PUT specify what what resourse to update

// const cityID = prompt("Skriv in stadens ID:");
// const cityName = prompt("Skriv in stadens namn:");
// const population = prompt("Skriv in stadens befolkning:");

// const populationNumber = parseInt(population);

// if (cityName == undefined || population == NaN && cityID != undefined) {
//     alert("Ogiltig inmatning!");
// } else {
//     const cityData = {
//         id: cityID,
//         name: cityName,
//         population: populationNumber,
//     };

//     fetch(`https://avancera.app/cities/${cityID}`, {
//         method: "PUT",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify(cityData),
//     })
//         .then((res) => {
//             if (!res.ok) {
//                 console.log("Error");
//             }
//             return res.json();
//         })
//         .then((data) => {console.log("Success")})
//         .catch((error) => {console.log("Error")});
// }

// DELETE same as PUT resource needs to be specified
// No body in fetch function needed

// PATCH
// const cityID = prompt("Skriv in stadens ID:");
// const cityName = prompt("Skriv in stadens namn:");

// if (cityName === undefined || cityID === undefined) {
//     alert("Ogiltig inmatning!");
// } else {
//         fetch(`https://avancera.app/cities/${cityID}`, {
//         method: "PATCH",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({
//             name: cityName,
//         })
//     })
//         .then((res) => {
//             if (!res.ok) {
//                 console.log("Error");
//             }
//             return res.json();
//         })
//         .then((data) => {console.log("Success")})
//         .catch((error) => {console.log("Error")});
// }


const cityID = prompt("Skriv in stadens ID:");
const cityName = prompt("Skriv in stadens namn:");
const cityPopulation = prompt("Skriv in stadens befolkning:");

if (cityID === null) {
    alert("Inmatningen avbröts.");
} else {
    const cityData = {};

    if (cityName !== null) {
        cityData.name = cityName;
    } 

    if (cityPopulation !== null) {
        cityData.population = cityPopulation;
    }

    fetch(`https://avancera.app/cities/${cityID}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cityData),
    })
        .then((res) => {
            if (!res.ok) {
                console.log("Error");
            }
            return res.json();
        })
        .then((data) => {
            console.log("Success");
        })
        .catch((error) => {
            console.log("Error");
        });
}

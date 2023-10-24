// const item = document.querySelector("#players");
// console.log(item);

// const items = document.querySelectorAll("#players li");
// console.log(items);

const item = document.getElementById("players");
const items = Array.from(document.getElementsByTagName("li"));

for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}
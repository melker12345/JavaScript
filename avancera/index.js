//localStorage.setItem('a', session);
//const session = sessionStorage.setItem('b', 'b');

// const usersArray = [{ name: 'Alice' }];
// const usersJson = JSON.stringify(usersArray);
// sessionStorage.setItem('users', usersJson);


const url = 'https://avancera.app/cities/';

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Error' + response.statusText);
    }
    return response.json();  
  })
  .then(data => {
    localStorage.setItem('cities', JSON.stringify(data));
  })
  .catch(error => {
    console.error('Error ', error);
  });
let input;

while (true) {
  input = parseInt(prompt(""));

  if (!isNaN(input) && input != 0) {
    break;
  } 
  else if(input === 0) {
    break;
  }  
}

for (let i = 0; i < input; i++) {
  alert(i);
}


let submitButton = document.getElementById("submit-btn");

submitButton.addEventListener("click", (event) => {
  window.event.preventDefault();
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  username = username.trim();
  email = email.trim();
  password = password.trim();
  if (email == "" || password == "") {
    document.getElementById('errmsg').style.color='rgb(215, 47, 0)';
    document.getElementById('errmsg').innerText="Please enter proper values";
    document.getElementById('errmsg').style.backgroundColor='white';
    setTimeout(function () {
      document.getElementById('errmsg').innerText='';
      document.getElementById('errmsg').style.backgroundColor='transparent';
    },3000);
    return;
  }
  let obj = { username: username, email:email, password: password };
  let form = document.querySelector("form");
  const request = new XMLHttpRequest();
  request.open(form.getAttribute("method"), form.getAttribute("action"));
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify(obj));
  request.addEventListener("load", () => {
    switch (request.status) {
      case 200:
        window.location.href='/user';
        break;
      case 300: 
        window.location.href = '/admin';
        break;
      case 303:
        window.location.href='/user';
        break;
      case 305:
        document.getElementById('errmsg').style.color='blue';
        document.getElementById('errmsg').innerText="No account found!";
        document.getElementById('errmsg').style.backgroundColor='white';
        setTimeout(function () {
          document.getElementById('errmsg').innerText='';
          document.getElementById('errmsg').style.backgroundColor='transparent';
        },3000);
        break;
      case 401:
        document.getElementById('errmsg').style.color='rgb(72, 167, 0)';
        document.getElementById('errmsg').innerText="Please verify your email before login!";
        document.getElementById('errmsg').style.backgroundColor='white';
        setTimeout(function () {
          document.getElementById('errmsg').innerText='';
          document.getElementById('errmsg').style.backgroundColor='transparent';
        },3000);
        break;
      case 404:
        document.getElementById('errmsg').style.color='red';
        document.getElementById('errmsg').innerText="Username / Password incorrect!";
        document.getElementById('errmsg').style.backgroundColor='white';
        setTimeout(function () {
          document.getElementById('errmsg').innerText='';
          document.getElementById('errmsg').style.backgroundColor='transparent';
        },3000);
        break;
    }
  });
});

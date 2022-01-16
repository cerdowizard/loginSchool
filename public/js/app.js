const creatForm = document.querySelector(".formData");
let name = document.getElementById("name");
let email = document.getElementById("email");
let matric = document.getElementById("matric");
let course = document.getElementById("course").value;
let date = document.getElementById("date");

creatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = {
    name: name.value,
    email: email.value,
    matric: matric.value,
    course: course.value,
    date: date.value,
  };
  var select = document.getElementById("course");
  var option = select.options[select.selectedIndex].value;
  //displaying the formData
  console.log(formData);
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/send");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = () => {
    console.log(xhr.responseText);
    if (xhr.responseText == "success") {
      alert("Email sent");
      name.value = "";
      email.value = "";
      matric.value = "";
      option.value = "";
      date.value = "";
      window.location.href = "/success.html";
    } else {
      alert("Something Went Wrong!!!!");
    }
  };
  xhr.send(JSON.stringify(formData));
});

function checkform() {
  if (
    name.value != "" ||
    email.value != "" ||
    matric.value != "" ||
    date.value != "" ||
    option.value != ""
  ) {
    alert("Message sent");
    window.location = "success.html";
  } else {
    alert("Input Error");
  }
}

function update() {
  var select = document.getElementById("course");
  var option = select.options[select.selectedIndex].value;
  console.log(option);
}

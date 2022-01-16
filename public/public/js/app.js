const creatForm = document.querySelector(".formData");
let name = document.getElementById("name");
let email = document.getElementById("email");
let matric = document.getElementById("matric");
let course = document.getElementById("course");
// let course = document.getElementById("course").value;
let date = document.getElementById("date");

creatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!checkform()) {
    return false;
  }
  let formData = {
    name: name.value,
    email: email.value,
    matric: matric.value,
    course: course.value,
    date: date.value,
  };
  //displaying the formData
  console.log(formData);
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/send");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = () => {
    console.log(xhr.responseText);
    if (xhr.responseText == "success") {
      alert("Email sent: " + xhr.responseText);
      // name.value = "";
      email.value = "";
      matric.value = "";
      course.value = "";
      date.value = "";
      window.location.href = "success.html";
    } else if (xhr.responseText == "error") {
      alert("Server Error");
    } else {
      var errorMessage = JSON.parse(xhr.responseText);
      alert(errorMessage.msg);
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
    course.value != ""
  ) {
    window.location = "success.html"; 
    // don't redirect until form is submitted
    return true;
  } else {
    alert("Input Error: A field is empty.");
  }
}

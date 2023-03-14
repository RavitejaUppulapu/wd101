const form = document.querySelector("#form");

// Retrieve entries from localStorage or return empty array
const retriveEntries = () => {
  const entries = localStorage.getItem("userEntry");
  return entries ? JSON.parse(entries) : [];
};

// Get Entries from localStorage
let Entries = retriveEntries();

// Display entries in table
const displayEntries = () => {
  const entries = retriveEntries();
  const rows = entries
    .map((entry) => {
      const { name, email, password, dob, accseptConditions } = entry;
      const row = (
        <tr>
          {" "}
          <td class="td">${name}</td> <td class="td">${email}</td>{" "}
          <td class="td">${password}</td> <td class="td">${dob}</td>{" "}
          <td class="td">${accseptConditions}</td>{" "}
        </tr>
      );
      return row;
    })
    .join("\n");

  const table = (
    <table class="table" border="2">
      {" "}
      <thead>
        {" "}
        <tr>
          {" "}
          <th class="th">Name</th> <th class="th">Email</th>{" "}
          <th class="th">Password</th> <th class="th">Dob</th>{" "}
          <th class="th">Accepted terms?</th>{" "}
        </tr>{" "}
      </thead>{" "}
      <tbody> ${rows} </tbody>{" "}
    </table>
  );

  document.querySelector("#tableDiv").innerHTML = table;
};

// Save user form data to localStorage and display it in table
const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const dob = document.querySelector("#dateofbirth").value;
  const accseptConditions = document.querySelector("#agree").checked;
  const entry_obj = { name, email, password, dob, accseptConditions };
  Entries.push(entry_obj);
  localStorage.setItem("userEntry", JSON.stringify(Entries));
  displayEntries();
};

// Add form submit event listener
form.addEventListener("submit", saveUserForm);

// Display entries on page load
displayEntries();

// Validate date of birth to be between 18 and 55 years old
const dateOfBirth = document.querySelector("#dateofbirth");
dateOfBirth.addEventListener("change", () => {
  const [year, month, date] = dateOfBirth.value.split("-");
  const dob = new Date(year, month - 1, date);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  if (today < new Date(dob.setFullYear(dob.getFullYear() + age))) {
    age--;
  }
  if (age < 18 || age > 55) {
    dateOfBirth.setCustomValidity("Your age must be between 18 and 55");
    dateOfBirth.style.border = "2px solid red";
  } else {
    dateOfBirth.setCustomValidity("");
    dateOfBirth.style.border = "2px solid rgba(0, 0, 0, 0.4)";
  }
});

// Validate email format
const emailInput = document.querySelector("#email");
emailInput.addEventListener("input", () => {
  if (emailInput.validity.typeMismatch) {
    emailInput.setCustomValidity("The Email is not in the right format!!!");
    emailInput.reportValidity();
  } else {
    emailInput.setCustomValidity("");
  }
});

// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";

// Firebase կոնֆիգ (դու արդեն ունես քո Web app կոնֆիգը)
const firebaseConfig = {
  apiKey: "AIzaSyC69Sm8nK54QYt673K_i0c7T4GZbEc6qcw",
  authDomain: "wedding-rsvp-3882c.firebaseapp.com",
  databaseURL: "https://wedding-rsvp-3882c-default-rtdb.firebaseio.com",
  projectId: "wedding-rsvp-3882c",
  storageBucket: "wedding-rsvp-3882c.firebasestorage.app",
  messagingSenderId: "191753943043",
  appId: "1:191753943043:web:e487a6aa96e2f7a6ff7636",
  measurementId: "G-3R79J6BQNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Ֆունկցիա հյուր ավելացնելու համար
function addGuest() {
  const container = document.getElementById("guests-container");
  const wrapper = document.createElement("div");

  const input = document.createElement("input");
  input.type = "text";
  input.name = "guests[]";
  input.placeholder = "Հյուրի անունը";
  input.className = "input-style";

  const btn = document.createElement("button");
  btn.type = "button";
  btn.classList.add("remove-btn");

  const icon = document.createElement("i");
  icon.className = "fas fa-trash";

  btn.appendChild(icon);
  btn.onclick = function () {
    container.removeChild(wrapper);
  };

  wrapper.appendChild(input);
  wrapper.appendChild(btn);
  container.appendChild(wrapper);
}

// Ֆունկցիա տվյալները Firebase ուղարկելու համար
async function submitRSVPForm() {
  const name = document.querySelector('input[name="name"]').value;
  const guests = Array.from(document.querySelectorAll('input[name="guests[]"]')).map(input => input.value);
  const invitedBy = Array.from(document.querySelectorAll('input[name="invited_by"]:checked')).map(input => input.value);
  const attending = document.querySelector('input[name="check"]:checked').value;
  const gender = document.querySelector('select[name="gender"]').value;

  const data = { 
      name, 
      attending, 
      guests, 
      invitedBy,
      gender,
      timestamp: Date.now()
  };

  try {
    const newRef = push(ref(database, 'rsvp')); // նոր էնտրի 'rsvp'-ում
    await set(newRef, data);
    alert("Տվյալները հաջողությամբ պահպանվել են Firebase-ում!");
  } catch (err) {
    alert("Չհաջողվեց պահպանել տվյալները Firebase-ում: " + err);
  }
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add guest button event listener
  const addGuestBtn = document.querySelector('button[onclick="addGuest()"]');
  if (addGuestBtn) {
    addGuestBtn.removeAttribute('onclick');
    addGuestBtn.addEventListener('click', addGuest);
  }

  // Form submission event listener
  const form = document.querySelector('form');
  if (form) {
    form.removeAttribute('onsubmit');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      submitRSVPForm();
    });
  }
});

// Make functions available globally for backward compatibility
window.addGuest = addGuest;
window.submitRSVPForm = submitRSVPForm;


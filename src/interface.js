"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let user = new NewUser();
  let peepList = new PeepList();
  let userLogIn = new UserLogIn();
  //let onePeep = new OnePeep();
  // onePeep.getPeep(1);

  userLogIn.logIn("testing999", "999");
  showPage();

  window.addEventListener("hashchange", getCurrentPage);

  document.addEventListener("submit", function (event) {
    event.preventDefault();
    processFormData();
  });

  function getCurrentPage() {
    showPage(getPageFromUrl(window.location)[0]);
  }

  function getPageFromUrl(location) {
    return location.hash.split("#"[1]);
  }

  function showPage(page = "#all") {
    removeHash();
    hideDisplayElements();
    if (page === "#create") {
      document.getElementById("createUserForm").style.display = "block";
    } else if (page === "#created") {
      document.getElementById("createUser").style.display = "block";
    } else if (page === "#all") {
      document.getElementById("peepsList").style.display = "block";
      peepList.getPeeps();
    }
  }

  // following is from: https://stackoverflow.com/questions/1397329/how-to-remove-the-hash-from-window-location-url-with-javascript-without-page-r
  function removeHash() {
    history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search
    );
  }

  function hideDisplayElements() {
    const elements = ["createUserForm", "createUser", "onePeep", "peepsList"];
    elements.forEach(function (element) {
      document.getElementById(element).style.display = "none";
    });
  }

  function processFormData() {
    const form = document.getElementById("userForm");
    const data = new FormData(form);
    form.reset();
    const handle = data.get("handle");
    const password = data.get("password");
    user.createUser(handle, password);
    showPage("#created");
  }
});

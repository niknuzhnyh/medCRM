function gAH(params) {
  console.log(params);
  console.log(parseJwt(params.credential));
  let parsedToken = parseJwt(params.credential);
  document.getElementById(
    "greeting"
  ).innerText = `Вітаю ${parsedToken.name}!!!`;
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

const mainScreenBtns = document.getElementsByClassName("mainScreenBtn");
for (const i of mainScreenBtns) {
  i.addEventListener("click", (e) => {
    const sectionName = i.dataset.section;
    const section = document.getElementById(sectionName);
    const sectionsList = document.getElementsByTagName("section");
    for (const iterator of sectionsList) {
      if (!iterator.classList.contains("hidden")) {
        iterator.classList.add("hidden");
      }
    }
    section.classList.remove("hidden");
  });
}

console.log("ok");

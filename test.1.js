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

function dateTimeFormta(date) {
  let d = new Intl.DateTimeFormat("uk-UA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: false,
  });
  date = Date.parse(date);
  date = d.format(date);
  return date;
}

function pacientListItemRender(obj) {
  // let date = new Date(obj.startDate);
  // date = dateTimeFormta(date);
  let icdCode = ''
  if(obj.icdCode) icdCode = obj.icdCode
  let str = `                    
  <div class="pacientList_item">
    <div class="pacientList_item_name">
        ${obj.pacientName}
        <p>${obj.rang}</p>
        <p>${obj.distCode}</p>
    </div>
    <div class="pacientList_item_plase">
        ${obj.place}
    </div>
    <div class="pacientList_item_diagnosis">
        ${obj.diagnosis}
    </div>
    <div class="pacientList_item_footer df jcsb">
        <div class="pacientList_item_date">
          ${obj.startDate}
        </div>
        <div class="pacientList_item_lossCode">
            ${obj.lossCode} ( <span class="pacientList_item_icdCode">${icdCode}</span> )
        </div>
    </div>
  </div>`;

  return str;
}

let pacientList = "pacientList";

function addListItem(obj, listId) {
  let div = document.createElement("div");
  div.innerHTML = pacientListItemRender(obj);
  document.getElementById(listId).appendChild(div);
}

fetch("example2.json")
  .then((response) => {
    if (response.status != 200) {
      let error = new Error(
        `Помилка '${response.statusText}' код відповіді '${response.status}' . Зверніться до адміністратора`
      );
      throw error;
    }
    return response.json();
  })
  .then((data) => {
    data.forEach(element => {
      addListItem(element, pacientList)
    });
  })
  .catch((e) => {
    // reorderHidden(["startPage"], ["schedule", "preloaderSec"]);
    console.log("Error !!!!");
    alert(e);
  });

console.log("ok");

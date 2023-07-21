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

let obj =   {
  "pacientName": "Закутинський Віктор Федорович",
  "place": "КНП ОБЛАСНА КЛІНІЧНА ЛІКАРНЯ ІМ.О.Ф.ГЕРБАЧЕВСЬКОГО ЖИТОМИРСЬКОЇ ОБЛАСНОЇ РАДИ",
  "citi": "Житомир",
  "diagnosis": "ВОСП правого колінного суглобу з переломом надколінника з внутрішньосуглобовим переломом латерального мищелка стегнової кістки, гемартроз обширний забій м'яких тканин. ВОСП правої кісті з неповною травматичною ампутацією 3-4 пальців дистальних фаланг. ВОСП шиї з наявністю стороннього металевого тіла на рівні С4. Множинні ВОС обличча.",
  "distCode": "3.3.3.1",
  "icdCode": "Y56.0",
  "lossCode": "1.2.1",
  "startDate": " 5/6/2005 09:34:42 PM"
}

function dateTimeFormta(date) {
  let d = new Intl.DateTimeFormat("uk-UA", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  date = Date.parse(date);
  date = d.format(date);
  return date;
}


function pacientListItemRender(obj) {
  let date = new Date(obj.startDate)
  date = dateTimeFormta(date)
  let str = `                    
  <div class="pacientList_item">
    <div class="pacientList_item_name">
        ${obj.pacientName}
    </div>
    <div class="pacientList_item_plase">
        ${obj.place}
    </div>
    <div class="pacientList_item_diagnosis">
        ${obj.diagnosis}
    </div>
    <div class="pacientList_item_footer df jcsb">
        <div class="pacientList_item_date">
          ${date}
        </div>
        <div class="pacientList_item_lossCode">
            ${obj.lossCode} ( <span class="pacientList_item_icdCode">${obj.icdCode}</span> )
        </div>
    </div>
  </div>`

  return str

}

let div = document.createElement('div');
div.innerHTML = pacientListItemRender(obj)

document.getElementById('pacientList').appendChild(div)

console.log("ok");

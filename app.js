'use strict';

const handleButtonClick = (btn) => {
  const el = document.querySelector(".navigationFilters button.-selected");
  if (!el) return;
  el.classList.remove("-selected");
  btn.classList.add("-selected")
}

const displaySearchResult = (json) => {
  const thead = document.querySelector("thead");
  const tbody = document.querySelector("tbody");
  if (tbody) {
    tbody.remove();
  }
  const tableBody = document.createElement("tbody");

  const objArr = json.map((item, idx) => ({
    id: idx,
    name: item.name,
    country: item.country,
    website: item.web_pages[0],
  }));

  objArr.forEach(item => {
    const tr = document.createElement("tr");

    Object.values(item).forEach(value => {
      const td = document.createElement("td");
      td.appendChild(document.createTextNode(value));
      tr.appendChild(td);
    });

    tableBody.appendChild(tr)

    thead.after(tableBody);
  });
}


const debounce = (func, timeout = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout)
  };
}

const getResponseFromApi = async (searchQuery) => {
  const res = await fetch(`http://universities.hipolabs.com/search?country=${searchQuery}`);
  const json = await res.json();

  return json;
}

const handleInputChange = debounce(async (inputEl) => {
  const searchQuery = inputEl.value;
  if (!searchQuery) return;

  const res = await getResponseFromApi(searchQuery);

  if (!res.length) return;
  displaySearchResult(res);
});

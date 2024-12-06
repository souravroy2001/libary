const placeHolderText = [
  { text: "Search by Title.." },
  { text: "Search by Author.." },
  { text: "Search by Genre.." },
  { text: "Search by Published Year.." },
  { text: "Search by Name.." },
];

var searPlaceHolder = document.getElementById("search");
var index = 0;

(function placeHolderAnimation() {
  if (index < placeHolderText.length) {
    searPlaceHolder.setAttribute(
      "placeholder",
      `${placeHolderText[index].text}`
    );
    index++;
    setTimeout(() => {
      placeHolderAnimation();
    }, 1000);
  } else {
    index = 0;
    setTimeout(() => {
      placeHolderAnimation();
    }, 1000);
  }
})();

let searchIcon = document.querySelector("#searchIcon");

searchIcon.addEventListener("click", () => {
  document.querySelector("#searchSpan").style.top = "60px";
  document.querySelector("#searchSpan").style.right = "50px";
  document.querySelector("#search").style.width = "195px";
  document.querySelector("#search").style.backgroundColor = "";
  document.querySelector("#search").style.borderBottom = "2px solid red";
});

//For change store name

let selector = document.querySelector("#selectOption");

var memberFetchData;
var bookFetchData;
var selectorValue;

selector.addEventListener("change", async () => {
  selectorValue = selector.value;
  const selectorName = document.getElementById("selectorName");

  selectorName.classList.remove("animationText");

  selectorName.innerText = selectorValue + " Store";

  if (selectorValue === "Member") {
    try {
      const response = await fetch(
        "https://library-management-syste-5ab29-default-rtdb.firebaseio.com/members.json"
      );
      const data = await response.json();
      memberFetchData = data;
      displayData(memberFetchData);
    } catch (error) {
      console.log(error);
    }
  } else if (selectorValue === "Book") {
    try {
      const response = await fetch(
        "https://library-management-syste-5ab29-default-rtdb.firebaseio.com/books.json"
      );
      const data = await response.json();
      bookFetchData = data;
      displayBookData(bookFetchData);
    } catch (error) {
      console.log(error);
    }
  }
});

function displayData(data) {
  document.getElementById("body").innerHTML = "";
  for (let key in data) {
    const element = data[key];
    document.getElementById("body").innerHTML += `
            <div id="memberDataDisplay">
                <div>
                    <img src="./image/userProfile.jpg" alt="">
                </div>
                <div>
                    <p><span>Name : </span>${element.name}</p>
                    <p><span>Membership Date : </span>${
                      element.membershipDate
                    }</p>
                    <p><span>Active Status : </span>${
                      element.active ? "Yes" : "No"
                    }</p>
                </div>
                <button id="updateData" onclick = "updateDetails(${element.id})">Update</button>
            </div>
        `;
  }
}

function displayBookData(data) {
  document.getElementById("body").innerHTML = "";
  for (let key in data) {
    const element = data[key];
    document.getElementById("body").innerHTML += `
            <div id="BookDataDisplay">
                <div>
                    <p><span>Book Name : </span>${element.title}</p>
                    <p><span>Author : </span>${element.author}</p>
                    <p><span>Genre : </span>${element.genre}</p>
                    <p><span>Published Year : </span>${
                      element.publishedYear
                    }</p>
                    <p><span>Available : </span>${
                      element.available ? "Yes" : "No"
                    }</p>
                </div>
            </div>
        `;
  }
}

let searchElement = document.querySelector("#search");

searchElement.addEventListener("input", searchingData);

let dbTimer;

function searchingData() {
  clearTimeout(dbTimer);

  dbTimer = setTimeout(() => {
    let searchValue = searchElement.value.toLowerCase();

    if (selectorValue === "Member") {
      fetchSearchMemberData(searchValue);
    } else if (selectorValue === "Book") {
      fetchSearchBookData(searchValue);
    } else {
      alert("First select a option");
    }
  }, 1000);
}

function fetchSearchBookData(text) {
  let filterBooks = [];
  for (let key in bookFetchData) {
    const element = bookFetchData[key];

    if (
      element.title.toLowerCase().includes(text) ||
      element.author.toLowerCase().includes(text) ||
      element.genre.toLowerCase().includes(text) ||
      element.publishedYear.toString().includes(text)
    ) {
      filterBooks.push(element);
    }
  }
  displayBookData(filterBooks);
}

function fetchSearchMemberData(text) {
  let filterMembers = [];
  for (let key in memberFetchData) {
    const element = memberFetchData[key];
    if (element.name.toLowerCase().includes(text)) {
      filterMembers.push(element);
    }
  }
  displayData(filterMembers);
}

function updateDetails(ID) {
  console.log(ID);
}

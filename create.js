var bookIdCount = 3;
var memberIdCount = 3;

window.onload = async function () {
  try {
    const res = await fetch(
      "https://library-management-syste-5ab29-default-rtdb.firebaseio.com/counters.json"
    );
    const data = await res.json();
    bookIdCount = data.bookId;
    memberIdCount = data.memberId;
  } catch (error) {
    console.log(error);
  }
  const memberIdOption = document.querySelector("#memberId")?.options[0];
  const bookIdOption = document.querySelector("#bookId")?.options[0];

  if (memberIdOption) memberIdOption.innerHTML = memberIdCount;
  if (bookIdOption) bookIdOption.innerHTML = bookIdCount;
};

async function updateIdCounter() {
  try {
    const res = await fetch(
      "https://library-management-syste-5ab29-default-rtdb.firebaseio.com/counters.json",
      {
        method: "PUT",
        body: JSON.stringify({
          bookId: bookIdCount,
          memberId: memberIdCount,
        }),
      }
    );
    const data = await res.json();
  } catch (error) {
    console.log(error);
  }
}

//For today's date

function toDateInputValue(dateObject) {
  const local = new Date(dateObject);
  local.setMinutes(dateObject.getMinutes() - dateObject.getTimezoneOffset());
  return local.toJSON().slice(0, 10);
}

const todayDateInput = document.querySelector("#todayDAte");
if (todayDateInput) {
  todayDateInput.value = toDateInputValue(new Date());
}

//for update input visibility

let selectorVale;

function onChangeCreate() {
  document.querySelector("#message").innerText = "";
  const selectorElement = document.querySelector("#selector");

  if (selectorElement) {
    selectorVale = selectorElement.value;
    document.querySelector("#submit").value = `Create ${selectorVale}`;

    if (selectorVale === "Member") {
      document.querySelector("#member").style.display = "block";
      document.querySelector("#book").style.display = "none";

      document.querySelector("#memberName").required = true;
      document.querySelector("#todayDAte").required = true;
       document.querySelector("#active").required = true;


    } else if (selectorVale === "Book") {
      document.querySelector("#book").style.display = "block";
      document.querySelector("#member").style.display = "none";


      document.querySelector("#bookTitle").required = true;
      document.querySelector("#authorName").required = true;
      document.querySelector("#genreName").required = true;
      document.querySelector("#publishedYear").required = true;
      document.querySelector("#availability").required = true;


    }
    document.querySelector("#submit").style.display = "block";
  }
}

let formDe = document.querySelector("#fromData");

formDe.addEventListener("submit", getFormData);

async function getFormData(event) {
  event.preventDefault();

  document.querySelector("#message").innerText = "";

  if (selectorVale === "Member") {
    const memberName = document.querySelector("#memberName").value;
    const memberShip = document.querySelector("#todayDAte").value;
    const memberActive = document.querySelector("#active").value;
    var memberActiveB;

    if (memberActive === "yes") {
      memberActiveB = true;
    } else if (memberActive === "no") {
      memberActiveB = false;
    }

    let memberData = JSON.stringify({
      id: memberIdCount,
      name: memberName,
      membershipDate: memberShip,
      active: memberActiveB,
    });

    memberIdCount++;
    updateIdCounter();

    localStorage.setItem("memberID", memberIdCount);

    document.querySelector("#memberId").options[0].innerHTML = memberIdCount;

    document.getElementById("fromData").reset();

    try {
      const response = await fetch(
        "https://library-management-syste-5ab29-default-rtdb.firebaseio.com/members.json",
        {
          method: "POST",
          body: memberData,
        }
      );

      const data = await response.json();

      document.querySelector("#message").innerText =
        "Member added successfully!";
    } catch (error) {
      document.querySelector("#message").innerText = "Failed to add member.";
    }
  } else if (selectorVale === "Book") {
    const bookTitle = document.querySelector("#bookTitle").value;
    const bookAuthor = document.querySelector("#authorName").value;
    const bookGenre = document.querySelector("#genreName").value;
    const bookPublishedYear = document.querySelector("#publishedYear").value;
    const bookAvailability = document.querySelector("#availability").value;
    var bookAvailabilityB;
    if (bookAvailability === "yes") {
      bookAvailabilityB = true;
    } else if (bookAvailability === "no") {
      bookAvailabilityB = false;
    }

    //for book data to add database

    var bookData = JSON.stringify({
      id: bookIdCount,
      title: bookTitle,
      author: bookAuthor,
      genre: bookGenre,
      publishedYear: bookPublishedYear,
      available: bookAvailabilityB,
    });

    bookIdCount++;
    updateIdCounter();

    localStorage.setItem("bookID", bookIdCount);

    document.querySelector("#bookId").options[0].innerHTML = bookIdCount;

    document.getElementById("fromData").reset();

    try {
      const response = await fetch(
        "https://library-management-syste-5ab29-default-rtdb.firebaseio.com/books.json",
        {
          method: "POST",
          body: bookData,
        }
      );
      const data = await response.json();

      document.querySelector("#message").innerText = "Book added successfully!";
    } catch (error) {
      document.querySelector("#message").innerText = "Failed to add member.";
    }
  }
}

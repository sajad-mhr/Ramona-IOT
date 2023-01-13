let listData = [
  {
    id: 24352,
    date: "2017-09-29 01:22",
    orderName: "iPhone X 64Gb grey",
    price: 999,
    quantity: 1,
    total: 999,
  },
  {
    id: 32457,
    date: "2017-09-29 01:22",
    orderName: "Samsung S8 Black",
    price: 999,
    quantity: 1,
    total: 999,
  },
  {
    id: 54751,
    date: "2017-09-29 01:22",
    orderName: "Game Console Controller",
    price: 999,
    quantity: 1,
    total: 999,
  },
];

const $ = document;
const tabBarItem = $.querySelectorAll(".tab-bar-item");
const tabBarMobileItem = $.querySelectorAll(".tab-bar-mobile-item");
const tabPanel = $.querySelectorAll(".tab-panel");
const tabBarMobileItems = $.querySelectorAll(".tab-bar-mobile-items");
const overleyTabBarMobile = $.querySelector(".overley-tab-bar-mobile");
const errorNotFound = $.querySelector(".error-search-not-found");

// click tabbar buttons for render panel
const clickTab = (e) => {
  for (let i = 0; i < tabBarItem.length; i++) {
    tabBarItem[i].classList.remove("active");
  }
  for (let i = 0; i < tabBarMobileItem.length; i++) {
    tabBarMobileItem[i].classList.remove("active");
  }

  let classString = e.target.getAttribute("data-target");
  for (let i = 0; i < tabPanel.length; i++) {
    if (tabPanel[i].id === classString) {
      tabPanel[i].classList.add("active");
      tabPanel[i].style.animation = "showPanel 0.4s forwards linear"
      tabBarMobileItem[i].classList.add("active");
      tabBarItem[i].classList.add("active");
    } else {
      tabPanel[i].classList.remove("active");
    }
  }
};

for (let i = 0; i < tabBarItem.length; i++) {
  tabBarItem[i].addEventListener("click", clickTab, false);
}
for (let i = 0; i < tabBarMobileItem.length; i++) {
  tabBarMobileItem[i].addEventListener("click", clickTab, false);
}

const menuMobileBtn = $.querySelector(".menu-mobile-btn");

let isOpenMenu = false;
menuMobileBtn.addEventListener("click", () => {
  menuMobileBtn.classList.toggle("rotation");
  if (isOpenMenu) {
    overleyTabBarMobile.style.height = "0";
    overleyTabBarMobile.style.boxShadow = "0 0 0 0 rgba(0,0,0,0.4)";
    isOpenMenu = false;
  } else {
    overleyTabBarMobile.style.height = "160px";
    overleyTabBarMobile.style.boxShadow = "0 5px 7px 1px rgba(0,0,0,0.1)";
    isOpenMenu = true;
  }
});

tabBarMobileItems.forEach((tab) => {
  tab.addEventListener("click", () => {
    menuMobileBtn.classList.toggle("rotation");
    overleyTabBarMobile.style.height = "0";
    overleyTabBarMobile.style.boxShadow = "0 0 0 0 rgba(0,0,0,0.4)";
    isOpenMenu = false;
  });
});

$.body.addEventListener("click", (e) => {
  console.log(e.target);
});

const listDataWrapper = $.getElementById("list-data-wrapper");
const plusBtn = $.getElementById("plus-btn");
const refreshBtn = $.getElementById("refresh-btn");
const addNewOrderBtn = $.querySelector(".add-new-order-btn");

// render data from listData Array
const renderListData = (data, wrapper) => {
  listDataWrapper.innerHTML = "";
  data.forEach((item) => {
    let tr_elem = `
          <tr>
          <td>${item.date}</td>
          <td>${item.id}</td>
          <td>${item.orderName}</td>
          <td>${item.price}</td>
          <td>${item.quantity}</td>
          <td>${item.total}</td>
        </tr>
          `;
    wrapper.insertAdjacentHTML("beforeend", tr_elem);
  });
};

renderListData(listData, listDataWrapper);

refreshBtn.addEventListener("click", () => {
  window.location.reload();
});

// open field add new order
const openField = () => {
  let new_tr = `
    <tr id="tr-field">
    <td><input id="date-input" type="text" placeholder="type here . . ."/></td>
    <td><input id="orderID-input" style="width:70px" type="text" placeholder="type here . . ."/></td>
    <td><input id="orderName-input" type="text" placeholder="type here . . ."/></td>
    <td><input id="price-input" style="width:50px" type="text" placeholder="type here . . ."/></td>
    <td><input id="quantity-input" style="width:40px" min="1" value="1" type="number" placeholder="type here . . ."/></td>
    <td><input id="total-input" style="width:60px" type="text" placeholder="type here . . ."/></td>
  </tr>
    `;
  listDataWrapper.insertAdjacentHTML("beforeend", new_tr);
  addNewOrderBtn.style.display = "block";
  plusBtn.setAttribute("disabled", true);
};

// create order items function for update DOM after add order
const createNewOrder = (list) => {
  listDataWrapper.innerHTML = "";
  list.forEach((item) => {
    let tr_elem = `
          <tr>
          <td>${item.date}</td>
          <td>${item.id}</td>
          <td>${item.orderName}</td>
          <td>${item.price}</td>
          <td>${item.quantity}</td>
          <td>${item.total}</td>
        </tr>
          `;
    listDataWrapper.insertAdjacentHTML("beforeend", tr_elem);
  });
};

// add new order function ... validation input and add to DOM and localStorage
const addNewOrder = () => {
  const dateInput = $.getElementById("date-input");
  const orderIDInput = $.getElementById("orderID-input");
  const orderNameInput = $.getElementById("orderName-input");
  const priceInput = $.getElementById("price-input");
  const quantityInput = $.getElementById("quantity-input");
  const totalInput = $.getElementById("total-input");
  const errorAddOrder = $.querySelector(".error-add-order");
  const myToast = $.querySelector(".my-toast");

  const dateInputValue = dateInput.value;
  const orderIDInputValue = Number(orderIDInput.value);
  const orderNameInputValue = orderNameInput.value;
  const priceInputValue = Number(priceInput.value);
  const quantityInputValue = Number(quantityInput.value);
  const totalInputValue = Number(totalInput.value);

  if (
    !dateInputValue &&
    !orderIDInputValue &&
    !orderNameInputValue &&
    !priceInputValue &&
    !quantityInputValue &&
    !totalInputValue
  ) {
    errorAddOrder.style.display = "block";
    errorAddOrder.innerHTML = "تمام فیلد ها الزامی است";
  } else if (
    isNaN(orderIDInputValue) ||
    isNaN(priceInputValue) ||
    isNaN(quantityInputValue) ||
    isNaN(totalInputValue)
  ) {
    errorAddOrder.style.display = "block";
    errorAddOrder.innerHTML = "فقط اعداد مجاز است";
  } else {
    let orderObject = {
      id: orderIDInputValue,
      date: dateInputValue,
      orderName: orderNameInputValue,
      price: priceInputValue,
      quantity: quantityInputValue,
      total: totalInputValue,
    };
    listData.push(orderObject);
    myToast.classList.add("show");
    setTimeout(() => {
      myToast.classList.remove("show");
    }, 2000);
    setToLocalStorage(listData);
    createNewOrder(listData);
    addNewOrderBtn.style.display = "none";
    plusBtn.removeAttribute("disabled");
    errorAddOrder.style.display = "none";
  }
};

// save new order in localStorage
const setToLocalStorage = (list) => {
  localStorage.setItem("list", JSON.stringify(list));
};

// get order from localStorage
const getFromLocalStorage = () => {
  let getData = JSON.parse(localStorage.getItem("list"));
  if (getData) {
    listData = getData;
    createNewOrder(getData);
  }
};
const searchInput = $.getElementById("search-input");
const searchBtn = $.getElementById("search-btn");

// search order function ... filter data
const searchList = () => {
  listDataWrapper.innerHTML = "";
  let searchValue = searchInput.value.trim();
  if (searchValue) {
    let search = listData.filter((word) => {
      return word.id === Number(searchValue);
    });
    if (search.length === 0) {
      renderListData(listData, listDataWrapper);
      console.log("Not Found");
      errorNotFound.style.display = "block";
    } else {
      renderListData(search, listDataWrapper);
      errorNotFound.style.display = "none";
    }
  } else {
    renderListData(listData, listDataWrapper);
  }
};

searchBtn.addEventListener("click", searchList);
searchInput.addEventListener("keyup", (e) => {
  if (!e.target.value) {
    renderListData(listData, listDataWrapper);
    errorNotFound.style.display = "none";
  }
});

plusBtn.addEventListener("click", openField);
addNewOrderBtn.addEventListener("click", addNewOrder);
window.addEventListener("load", getFromLocalStorage);

// panel card list
const cardData = [
  {
    id: 1,
    cardName: "image name 1",
    cardImage: "https://picsum.photos/id/10/2500/1667",
    cardDesc:
      "Lorem ipsum dolor sit amet, in omnium contentiones mel, tation utinam timeam ne",
  },
  {
    id: 2,
    cardName: "image name 2",
    cardImage: "https://picsum.photos/id/12/2500/1667",
    cardDesc:
      "Lorem ipsum dolor sit amet, in omnium contentiones mel, tation utinam timeam ne",
  },
  {
    id: 3,
    cardName: "image name 3",
    cardImage: "https://picsum.photos/id/14/2500/1667",
    cardDesc:
      "Lorem ipsum dolor sit amet, in omnium contentiones mel, tation utinam timeam ne",
  },
  {
    id: 4,
    cardName: "image name 4",
    cardImage: "https://picsum.photos/id/15/2500/1667",
    cardDesc:
      "Lorem ipsum dolor sit amet, in omnium contentiones mel, tation utinam timeam ne",
  },
  {
    id: 5,
    cardName: "image name 5",
    cardImage: "https://picsum.photos/id/15/2500/1667",
    cardDesc:
      "Lorem ipsum dolor sit amet, in omnium contentiones mel, tation utinam timeam ne",
  },
  {
    id: 6,
    cardName: "image name 6",
    cardImage: "https://picsum.photos/id/14/2500/1667",
    cardDesc:
      "Lorem ipsum dolor sit amet, in omnium contentiones mel, tation utinam timeam ne",
  },
];

// card-panel-script

const cardList = $.getElementById("card-list");
const selectedSecondCheckboxCon = $.querySelector(".selected-second-checbox");
const radioBtn = $.querySelectorAll(".radio-btn");
const radioSelectCard = $.getElementsByName("select-sort-card");

//render card function
const renderCard = (data, wrapper) => {
  radioBtn.forEach((radio) => {
    if (radio.id === "sort-by-screen-size") {
      radio.setAttribute("checked", true);
    }
  });

  data.forEach((item) => {
    let cardElem = `
    <div class="col">
                <div class="card h-100 text-center shadow">
                  <img
                    src="${item.cardImage}"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-body">
                    <h5 class="card-title">${item.cardName}</h5>
                    <p class="card-text">
                    ${item.cardDesc}
                    </p>
                    <button class="btn btn-dark w-100">see more</button>
                  </div>
                </div>
              </div>
    `;
    wrapper.insertAdjacentHTML("beforeend", cardElem);
  });
};

// Choose the layout of the cards based on the number in each row

radioBtn.forEach((radio) => {
  radio.addEventListener("click", () => {
    if (radio.id === "custome-sort") {
      selectedSecondCheckboxCon.style.display = "flex";

      radioSelectCard.forEach((select) => {
        if (select.id === "four-card") {
          select.setAttribute("checked", true);
          cardList.className = "row row-cols-1 row-cols-lg-4 g-3";
        }
        select.addEventListener("click", () => {
          switch (select.id) {
            case "two-card":
              cardList.className = "row row-cols-1 row-cols-lg-2 g-3";
              select.setAttribute("checked", true);
              break;
            case "three-card":
              cardList.className = "row row-cols-1 row-cols-lg-3 g-3";
              select.setAttribute("checked", true);
              break;
            case "four-card":
              cardList.className = "row row-cols-1 row-cols-lg-4 g-3";
              select.setAttribute("checked", true);
              break;

            default:
              cardList.className = "row row-cols-1 row-cols-lg-2 g-3";
              break;
          }
        });
      });
    } else {
      selectedSecondCheckboxCon.style.display = "none";
      cardList.className =
        "row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-3";
      radioSelectCard.forEach((s) => {
        s.removeAttribute("checked");
      });
    }
  });
});

renderCard(cardData, cardList);

//contact-us-script

const myForm = $.getElementById("my-form");
const error = $.querySelectorAll(".error");
const firstName = $.getElementById("first-name");
const mobilNumber = $.getElementById("mobil-number");
const message = $.getElementById("message");

// Validation Form of Send Message
const validateForm = (e) => {
  e.preventDefault();
  console.log(error);
  error.forEach((err) => {
    switch (err.id) {
      case "error-first-name":
        if (!firstName.value) {
          err.style.display = "block";
          err.innerHTML = "The first name field is required";
          firstName.style.border = "2px solid red";
        } else {
          err.style.display = "none";
          firstName.style.border = "2px solid #000";
        }
        break;
      case "error-mobil-number":
        if (!mobilNumber.value) {
          err.style.display = "block";
          err.innerHTML = "The mobile number field is required";
          mobilNumber.style.border = "2px solid red";
        } else {
          err.style.display = "none";
          mobilNumber.style.border = "2px solid #000";
        }
        if (isNaN(mobilNumber.value)) {
          err.style.display = "block";
          err.innerHTML = "please enter number";
          mobilNumber.style.border = "2px solid red";
        }
        break;
      case "error-message":
        if (!message.value) {
          err.style.display = "block";
          err.innerHTML = "The message field is required";
          message.style.border = "2px solid red";
        } else {
          err.style.display = "none";
          message.style.border = "2px solid #000";
        }
        break;

      default:
        break;
    }
  });
};

myForm.addEventListener("submit", validateForm);

// loading script
let loaded = $.querySelector(".loaded");
window.addEventListener("load", function () {
  setTimeout(function () {
    loaded.classList.add("hidden");
  }, 500);
});

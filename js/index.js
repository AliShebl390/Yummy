// Nav features
function openNav() {
    $("nav").animate(
        {
            left: 0,
        },
        500
    );
    $(".links li").animate(
        {
            top: 0,
        },
        500
    );
}

function closeNav() {
    let Width = $("nav .nav-content").outerWidth();
    $("nav").animate(
        {
            left: -Width,
        },
        500
    );

    $(".links li").animate(
        {
            top: 300,
        },
        500
    );

    $(".menu-button").removeClass("opened");
}

closeNav();
$(".menu-button").click(() => {
    if ($("nav").css("left") == "0px") {
        closeNav();
    } else {
        openNav();
    }
});

// fetch Data
async function getData(meals = "") {
    try {
        $(".inner-loading-screen").fadeIn(300);
        let response = await (
            await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${meals}`
            )
        ).json();
        displayData(response.meals.slice(0, 24));
        // Display data form the logo
        let logo = document.querySelector(".logo");
        logo.addEventListener("click", () => {
            getData();
            closeNav();
            searchContainer.classList.remove("d-block");
            searchContainer.classList.add("d-none");
            document.body.style.overflow = "auto";
            contactContainer.classList.remove("d-block");
            contactContainer.classList.add("d-none");
        });
    } catch (error) {}

    $(".inner-loading-screen").fadeOut(300);
}

// Display data
function displayData(meals) {
    let result = ``;
    let displayData = document.querySelector("#displayData");
    meals.forEach((meal) => {
        result += `<div onclick="getMealDetails(${meal.idMeal})" class="col-md-4 col-lg-3">
        <div class="meal position-relative rounded-2">
            <img class="w-100" src="${meal.strMealThumb}"
                alt="" srcset="">
            <div class="meal-layer text-center position-absolute">
                <h3>${meal.strMeal}</h3>
            </div>
        </div>
    </div>`;
    });
    displayData.innerHTML = result;
}
getData();

// meal deatils
let mealLayer = document.querySelector(".meal-details");
let closeDetails = document.querySelector(".closeDetails");

closeDetails.addEventListener("click", () => {
    mealLayer.classList.add("d-none");
    document.body.style.overflow = "auto";
});

async function getMealDetails(id) {
    let response = await (
        await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        )
    ).json();
    displayMealData(response.meals[0]);
    document.body.style.overflow = "hidden";
}

// Display data
function displayMealData(meal) {
    let displayMealDeatails = document.getElementById("rowData");
    mealLayer.classList.remove("d-none");
    mealLayer.classList.add("d-block");
    let ingredients = ``;
    let tags = "";
    let tagsResult = "";

    // for tags
    if (meal.strTags != null) {
        tags = meal.strTags.split(",");
    } else {
        tags = [];
    }
    for (let i = 0; i < tags.length; i++) {
        tagsResult += `<li class="alert alert-danger me-2 p-2">${tags[i]}</li>`;
    }

    // for ingredients
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info me-2 px-2 py-1 text-capitalize">${
                meal[`strMeasure${i}`]
            } ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    // Display
    displayMealDeatails.innerHTML = `<div class="col-md-4">
    <img class="w-100 rounded-3 mb-3"
        src="${meal.strMealThumb}" alt="">
    <h2>${meal.strMeal}</h2>
</div>
<div class="col-md-8">
    <h2>Instructions</h2>
    <p>${meal.strInstructions}</p>
    <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
    <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
    <h3>Recipes :</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${ingredients}
    </ul>

    <h3>Tags :</h3>
    <ul class="list-unstyled d-flex m-0 g-3 flex-wrap">
    ${
        tagsResult
            ? tagsResult
            : `<li class="alert alert-danger me-2 p-2">No Tags</li>`
    }
    </ul>

    <a target="_blank" href="${meal.strSource}"
        class="btn btn-success">Source</a>
    <a target="_blank" href="${meal.strYoutube}"
        class="btn btn-danger">Youtube</a>
</div>`;
}

// Serach
let searchContainer = document.querySelector(".search-container");
function search() {
    displayData([]);
    closeNav();
    searchContainer.classList.add("d-block");
    searchContainer.classList.remove("d-none");
    document.body.style.overflow = "auto";
    contactContainer.classList.remove("d-block");
    contactContainer.classList.add("d-none");
}

function searchName() {
    let NameInput = document.querySelector(".searchName");
    let mealName = "";
    NameInput.addEventListener("input", () => {
        mealName = NameInput.value;
        getData(mealName);
    });
}
searchName();

async function getDataByFL(letter) {
    try {
        $(".inner-loading-screen").fadeIn("500");
        let response = await (
            await fetch(
                `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
            )
        ).json();
        displayData(response.meals);
    } catch (error) {}
    $(".inner-loading-screen").fadeOut("500");
}

function searchLetter() {
    let searchFLetter = document.querySelector(".searchFLetter");
    let mealName = "";
    searchFLetter.addEventListener("input", () => {
        mealName = searchFLetter.value;
        getDataByFL(mealName);
    });
}
searchLetter();

// category
function catigory() {
    getGategory();
    displayData([]);
    closeNav();
    searchContainer.classList.remove("d-block");
    searchContainer.classList.add("d-none");
    document.body.style.overflow = "auto";
    contactContainer.classList.remove("d-block");
    contactContainer.classList.add("d-none");
}
async function getGategory() {
    try {
        let response = await (
            await fetch(
                "https://www.themealdb.com/api/json/v1/1/categories.php"
            )
        ).json();
        displayGatData(response.categories);
    } catch (error) {}
}

function displayGatData(categories) {
    let result = ``;
    let displayData = document.querySelector("#displayData");
    categories.forEach((category) => {
        result += `<div onclick="getMealByCat('${
            category.strCategory
        }')" class="col-md-4 col-lg-3">
        <div class="meal position-relative rounded-2">
            <img class="w-100" src="${category.strCategoryThumb}"
                alt="" srcset="">
            <div class="meal-layer text-center position-absolute">
                <h3>${category.strCategory}</h3>
                <p class="px-3">${category.strCategoryDescription
                    .split(" ")
                    .slice(0, 15)
                    .join(" ")}</p>
            </div>
        </div>
    </div>`;
    });
    displayData.innerHTML = result;
}

async function getMealByCat(cat) {
    try {
        let response = await (
            await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
            )
        ).json();
        displayData(response.meals.slice(0, 20));
    } catch (error) {}
}

// Area

function area() {
    displayData([]);
    getArea();
    closeNav();
    searchContainer.classList.remove("d-block");
    searchContainer.classList.add("d-none");
    document.body.style.overflow = "auto";
    contactContainer.classList.remove("d-block");
    contactContainer.classList.add("d-none");
}
async function getArea() {
    try {
        let response = await (
            await fetch(
                "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
            )
        ).json();
        displayArea(response.meals);
    } catch (error) {}
}

function displayArea(areas) {
    let result = ``;
    let displayData = document.querySelector("#displayData");
    areas.forEach((area) => {
        result += `<div onclick="getMealByArea('${area.strArea}')" class="col-md-4 col-lg-3">
        <div class="meal d-flex align-items-center flex-column rounded-2">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${area.strArea}</h3>
        </div>
    </div>`;
    });
    displayData.innerHTML = result;
}

async function getMealByArea(area) {
    try {
        let response = await (
            await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
            )
        ).json();
        displayData(response.meals.slice(0, 20));
    } catch (error) {}
}

// Ingredients

function ingredients() {
    displayData([]);
    getIngredients();
    closeNav();
    searchContainer.classList.remove("d-block");
    searchContainer.classList.add("d-none");

    contactContainer.classList.remove("d-block");
    contactContainer.classList.add("d-none");
}
async function getIngredients() {
    try {
        let response = await (
            await fetch(
                "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
            )
        ).json();
        displayIngredients(response.meals.slice(0, 20));
    } catch (error) {}
}

function displayIngredients(ingredients) {
    let result = ``;
    let displayData = document.querySelector("#displayData");
    ingredients.forEach((ing) => {
        result += `<div onclick="getMealByIng('${ing.strIngredient}')" class="col-md-4 col-lg-3">
        <div class="meal d-flex align-items-center flex-column rounded-2">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3 class="text-center">${ing.strIngredient}</h3>
        </div>
    </div>`;
    });
    displayData.innerHTML = result;
}

async function getMealByIng(ing) {
    try {
        let response = await (
            await fetch(
                `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
            )
        ).json();
        displayData(response.meals.slice(0, 20));
    } catch (error) {
        console.log(error);
    }
}

// contact
let contactContainer = document.querySelector(".contact-container");
function contact() {
    displayData([]);
    closeNav();
    document.body.style.overflow = "hidden";
    contactContainer.classList.add("d-block");
    contactContainer.classList.remove("d-none");
    searchContainer.classList.remove("d-block");
    searchContainer.classList.add("d-none");
}

// validation<script>
let userName = document.getElementById("nameIN");
let phone = document.getElementById("phoneIN");
let userEmail = document.getElementById("emailIN");
let age = document.getElementById("ageIN");
let userPassword = document.getElementById("passIN");
let userRePassword = document.getElementById("rePassIN");
let btnSub = document.getElementById("btnSub");

let userNameAlet = document.getElementById("nameAlert");
let phoneAlet = document.getElementById("phoneAlert");
let userEmailAlet = document.getElementById("emailAlert");
let ageAlet = document.getElementById("ageAlert");
let userPasswordAlet = document.getElementById("passAlert");
let userRePasswordAlet = document.getElementById("rePassAlert");

function validateregName() {
    let regNameRegax = /^[a-zA-Z0-9_ ]{3,16}$/;
    if (regNameRegax.test(userName.value)) {
        userName.classList.add("is-valid");
        userName.classList.remove("is-invalid");
        userNameAlet.classList.add("d-none");
        return true;
    } else {
        userName.classList.remove("is-valid");
        userName.classList.add("is-invalid");
        userNameAlet.classList.remove("d-none");
        return false;
    }
}

function validateregEmail() {
    let regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regEmail.test(userEmail.value)) {
        userEmail.classList.add("is-valid");
        userEmail.classList.remove("is-invalid");
        userEmailAlet.classList.add("d-none");
        return true;
    } else {
        userEmail.classList.remove("is-valid");
        userEmail.classList.add("is-invalid");
        userEmailAlet.classList.remove("d-none");
        return false;
    }
}

function validateregPass() {
    let regPassRegax = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    // must contain at least one capital letter and more than 8 chars, can contain symbols
    if (regPassRegax.test(userPassword.value)) {
        userPassword.classList.add("is-valid");
        userPassword.classList.remove("is-invalid");
        userPasswordAlet.classList.add("d-none");
        return true;
    } else {
        userPassword.classList.remove("is-valid");
        userPassword.classList.add("is-invalid");
        userPasswordAlet.classList.remove("d-none");
        return false;
    }
}

function validateregRePass() {
    if (userPassword.value == userRePassword.value) {
        userRePassword.classList.add("is-valid");
        userRePassword.classList.remove("is-invalid");
        userRePasswordAlet.classList.add("d-none");
        return true;
    } else {
        userRePassword.classList.remove("is-valid");
        userRePassword.classList.add("is-invalid");
        userRePasswordAlet.classList.remove("d-none");
        return false;
    }
}

function validateAgeReg() {
    let agePattern = /^[0-9]+$/;
    // must contain at least one capital letter and more than 8 chars, can contain symbols
    if (agePattern.test(age.value) && age.value >= 10) {
        age.classList.add("is-valid");
        age.classList.remove("is-invalid");
        ageAlet.classList.add("d-none");
        return true;
    } else {
        age.classList.remove("is-valid");
        age.classList.add("is-invalid");
        ageAlet.classList.remove("d-none");
        return false;
    }
}

function validatePhoneReg() {
    let phonePattern = /^\d{11}$/;
    if (phonePattern.test(phone.value)) {
        phone.classList.add("is-valid");
        phone.classList.remove("is-invalid");
        phoneAlet.classList.add("d-none");
        return true;
    } else {
        phone.classList.remove("is-valid");
        phone.classList.add("is-invalid");
        phoneAlet.classList.remove("d-none");
        return false;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document
        .getElementById("btnSub")
        .addEventListener("click", function (event) {
            if (!validateForm()) {
                event.preventDefault();
                btnSub.disabled = true;
            }
        });

    // Adding an event listener to the form to dynamically enable/disable the submit button
    document.querySelector("form").addEventListener("blur", function () {
        if (
            validatePhoneReg() &&
            validateAgeReg() &&
            validateregRePass() &&
            validateregPass() &&
            validateregEmail() &&
            validateregName()
        ) {
            document.getElementById("btnSub").disabled = false;
        } else {
            document.getElementById("btnSub").disabled = true;
        }
    });
});

// Function to validate the entire form
function validateForm() {
    return (
        validatePhoneReg() &&
        validateAgeReg() &&
        validateregRePass() &&
        validateregPass() &&
        validateregEmail() &&
        validateregName()
    );
}

$(document).ready(() => {
    $(".loading-screen").fadeOut();
});

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
async function getData() {
    let response = await (
        await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    ).json();
    displayData(response.meals.slice(0, 24));
    // Display data form the logo
    let logo = document.querySelector(".logo");
    logo.addEventListener("click", () => {
        displayData(response.meals.slice(0, 24));
    });
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
});

async function getMealDetails(id) {
    let response = await (
        await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        )
    ).json();
    displayMealData(response.meals[0]);
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
function search() {
    let serchName = document.querySelector(".searchName");
    console.log(serchName);
    displayData([]);
}

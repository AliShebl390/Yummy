$(document).ready(() => {
    $(".loading-screen").fadeOut(500);
});

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

async function getData() {
    let response = await (await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)).json();
    displayData(response.meals)
}


function displayData(meals) {
    let result = ``
    console.log();
    let displayData = document.querySelector("#displayData")
    meals.slice(0,24).forEach(meal => {
        result += `<div class="col-md-4 col-lg-3">
        <div class="meal position-relative rounded-2">
            <img class="w-100" src="${meal.strMealThumb}"
                alt="" srcset="">
            <div class="meal-layer text-center position-absolute">
                <h3>${meal.strMeal}</h3>
            </div>
        </div>
    </div>`
    });
    displayData.innerHTML = result
}
getData()
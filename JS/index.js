
// ============= nan Bar close and open ====================
let WidthNavTab =  $(".nav-tab").innerWidth();
let loading = document.querySelector(".loading")
$(".side-nav").css("left", -WidthNavTab )
// Toggle icone
$("#btn-menue").click(function(){
    $(this).toggleClass("fa-bars fa-xmark");
    $(".links").toggleClass("animate__bounceInUp");
})
// open
$("#btn-menue").click(function(){
    if ($(".side-nav").css("left") ==  -WidthNavTab + "px") {

        $(".side-nav").animate({left: 0},1000)

    }else{

        $(".side-nav").animate({left: -WidthNavTab},1000)
    }
})
// close
$("#btn-menue").click(function(){
    $(".sidebar").animate({left: -WidthNavTab},1000);
})

function showSearchInputs(){
    let cartona = ``;
        cartona += `
        <div class="col">
        <input onkeyup="getMealWithSearch(this.value)" id="searchByName" type="text" class="form-control bg-transparent" placeholder="Search By Name" aria-label="First name">
      </div>
      <div class="col">
        <input onkeyup="getMealSearchApi(this.value)" id="searchByletter" type="text" class="form-control bg-transparent text-white" placeholder="Search By first letter" aria-label="Last name">
      </div>
        `
    document.querySelector(".showSearchInput").innerHTML = cartona;
}

function showContactUs(){
    let cartona = ``;
        cartona += `
        <div class="contact-us text-center">
        <div class="container">
            <div class="row g-4">
                <div class="col-md-6">
                    <input onkeyup="validationName()" id="searchByName" type="text" class="form-control" placeholder="Enter your Name" aria-label="First name">
                    <ul class="alert alert-danger p-0 invalid-feedback">
                        <li>Email Is Required</li>
                        <li>InValid Email Formate</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <input id="searchByletter" type="text" class="form-control" placeholder="Enter you Email" aria-label="Last name">
                </div>
                <div class="col-md-6">
                    <input id="searchByName" type="text" class="form-control" placeholder="Enter you Phone" aria-label="First name">
                </div>
                <div class="col-md-6">
                    <input id="searchByletter" type="text" class="form-control" placeholder="Enter you Age" aria-label="Last name">
                </div>
                <div class="col-md-6">
                    <input id="searchByName" type="text" class="form-control" placeholder="Enter you Password" aria-label="First name">
                </div>
                <div class="col-md-6">
                    <input id="searchByletter" type="text" class="form-control" placeholder="RePassword" aria-label="Last name">
                </div>
            </div>
            <button disabled class="btn btn-danger mt-3">Submit</button>
        </div>
    </div>
        `
    document.querySelector(".show-meals").innerHTML = cartona;
}

// ============= get Meal With Search name  ====================

async function getMealWithSearch(searchName){
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`);
    let finalApi = await api.json();
    displayMealSearch(finalApi);
}

function displayMealSearch(finalApi){
    let cartona = ``;
    for (let i = 0; i < finalApi.meals.length; i++) {
        const element = finalApi.meals[i];
        cartona += `
        <div class="col-md-3">
            <div onclick="(getMealDetailsApi(${element.idMeal}))" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${element.strMealThumb}" alt="meal">
                <div class="meal-layer bg-white bg-opacity-75 w-100 h-100 position-absolute d-flex align-items-center">
                    <h3 class="text-dark">${element.strMeal}</h3>
                </div>
            </div>
        </div> 
        `
    }
    document.querySelector(".show-meals").innerHTML = cartona;
}

// ============= get Meal With Search letter  ====================
async function getMealSearchApi(searchLtter){
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchLtter}`);
    let finalApi = await api.json();
    displayMealSearchByLetter(finalApi);
}

function displayMealSearchByLetter(finalApi){
    let cartona = ``;
    for (let i = 0; i < finalApi.meals.length; i++) {
        const element = finalApi.meals[i];
        cartona += `
        <div class="col-md-3">
            <div onclick="(getMealDetailsApi(${element.idMeal}))" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${element.strMealThumb}" alt="meal">
                <div class="meal-layer bg-white bg-opacity-75 w-100 h-100 position-absolute d-flex align-items-center">
                    <h3 class="text-dark">${element.strMeal}</h3>
                </div>
            </div>
        </div> 
        `
    }
    document.querySelector(".show-meals").innerHTML = cartona;
}

// ============= get Meal Details  ====================

async function getMealDetailsApi(searchLtter){
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${searchLtter}`);
    let finalApi = await api.json();
    // console.log(finalApi.meals[0])
    displayMealDetails(finalApi);
}

function displayMealDetails(finalApi){
    let cartona = ``;
        const element = finalApi.meals[0];
        // console.log(element);
        cartona += `
        <div class="details">
        <div class="container">
            <div class="row gx-5">
              <div class="col-md-4">
                <div class="img-game">
                  <img class="w-100" src="${element.strMealThumb}" alt="img-game">
                </div>
                <h2 class="text-white mb-4">${element.strMeal}</h2>
              </div>
              <div class="col-md-8">
                <div class="Details-game text-white">
                  <h3 class="mb-4">Instructions</h3>
                  <p>${element.strInstructions}</p>
                  <h3>Area : <span>${element.strArea}</span></h3>
                  <h3>Category : <span>${element.strCategory}</span></h3>
                  <h3>Recipes : </h3>
                  <ul class="d-flex list-unstyled flex-wrap">
                    <li class="p-1 bg-info rounded-2 text-black m-2">${element.strMeasure1}</li>
                    <li class="p-1 bg-info rounded-2 text-black m-2">${element.strMeasure2}</li>
                    <li class="p-1 bg-info rounded-2 text-black m-2">${element.strMeasure3}</li>
                    <li class="p-1 bg-info rounded-2 text-black m-2">${element.strMeasure4}</li>
                    <li class="p-1 bg-info rounded-2 text-black m-2">${element.strMeasure5}</li>
                    <li class="p-1 bg-info rounded-2 text-black m-2">${element.strMeasure6}</li>
                    <li class="p-1 bg-info rounded-2 text-black m-2">${element.strMeasure7}</li>
                    <li class="p-1 bg-info rounded-2 text-black m-2">${element.strMeasure8}</li>
                    <li class="p-1 bg-info rounded-2 text-black m-2">${element.strMeasure9}</li>                    
                    </ul>
                  <h3>Tags : </h3>
                  <ul class="d-flex list-unstyled flex-wrap">
                    <li class="p-1 bg-danger rounded-2 text-black m-2">${element.strTags}</li>
                  </ul>
                  <a class="btn btn-success" target="_blank" href="${element.strSource}">Source</a>
                  <a class="btn btn-danger" target="_blank" href="${element.strYoutube}">Youtube</a>
                </div>
              </div>
            </div>
          </div>
    </div>
        `
    document.querySelector(".show-meals").innerHTML = cartona;
}

// ============= get Meal with Category  ====================
async function getMealCategoryApi(){
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let finalApi = await api.json();
    displayMealByCategories(finalApi);
}

function displayMealByCategories(finalApi){
    // console.log(finalApi.categories[0].strCategory)
    let cartona = ``;
    for (let i = 0; i < finalApi.categories.length; i++) {
        // console.log(finalApi.categories[i].strCategory)
        const element = finalApi.categories[i];
        cartona += `
        <div class="col-md-3">
        <div onclick="getMealFilterCategoryApi('${finalApi.categories[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
        <img class="w-100" src="${element.strCategoryThumb}" alt="meal">
            <div class="meal-layer bg-white bg-opacity-75 w-100 h-100 position-absolute d-flex align-items-center">
                <h3 class="text-dark">${element.strCategory}</h3>
            </div>
        </div>
        </div> 
        `
    }
    document.querySelector(".show-meals").innerHTML = cartona;
}

async function getMealFilterCategoryApi(categoryFilte){
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryFilte}`);
    let finalApi = await api.json();
    displayMealByFilterCategory(finalApi.meals);
}

function displayMealByFilterCategory(finalApi){
    let cartona = ``;
    for (let i = 0; i < finalApi.length; i++) {
        console.log(finalApi[i].idMeal)
        const element = finalApi[i];
        cartona += `
        <div class="col-md-3">
        <div onclick="getMealDetailsCategoryApi(${finalApi[i].idMeal})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${element.strMealThumb}" alt="meal">
            <div class="meal-layer bg-white bg-opacity-75 w-100 h-100 position-absolute d-flex align-items-center">
                <h3 class="text-dark">${element.strMeal}</h3>
            </div>
        </div>
        </div> 
        `
    }
    document.querySelector(".show-meals").innerHTML = cartona;
}

async function getMealDetailsCategoryApi(idCategory){
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idCategory}`);
    let finalApi = await api.json();
    // console.log(finalApi.meals)
    displayMealDetailsCategory(finalApi)

    displayMealByxxxCategory(finalApi);
}

function displayMealByxxxCategory(finalApi){
    let cartona = ``;
    for (let i = 0; i < finalApi.length; i++) {
        // console.log(finalApi[i].idMeal)
        const element = finalApi[i];
        cartona += `
        <div class="col-md-3">
        <div onclick="displayMealDetailsCategory(${finalApi[i].idMeal})" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
            <img class="w-100" src="${element.strMealThumb}" alt="meal">
            <div class="meal-layer bg-white bg-opacity-75 w-100 h-100 position-absolute d-flex align-items-center">
                <h3 class="text-dark">${element.strMeal}</h3>
            </div>
        </div>
        </div> 
        `
    }
    document.querySelector(".show-meals").innerHTML = cartona;
}

function displayMealDetailsCategory(finalApi){
    let cartona = ``;
        const element = finalApi;
        console.log();
    //     cartona += `
    //     <div class="details">
    //     <div class="container">
    //         <div class="row gx-5">
    //           <div class="col-md-4">
    //             <div class="img-game">
    //               <img class="w-100" src="${element.strMealThumb}" alt="img-game">
    //             </div>
    //             <h2 class="text-white mb-4">${element.strMeal}</h2>
    //           </div>
    //           <div class="col-md-8">
    //             <div class="Details-game text-white">
    //               <h3 class="mb-4">Instructions</h3>
    //               <p>${element.strInstructions}</p>
    //               <h3>Area : <span>${element.strArea}</span></h3>
    //               <h3>Category : <span>${element.strCategory}</span></h3>
    //               <h3>Recipes : </h3>
    //               <ul class="d-flex list-unstyled flex-wrap">
    //                 <li class="p-1 bg-info rounded-2 text-black m-2">${element.strMeasure1}</li>
    //                 <li class="p-1 bg-info rounded-2 text-black m-2">${element.strMeasure2}</li>
    //                 <li class="p-1 bg-info rounded-2 text-black m-2">${element.strMeasure3}</li>
    //                 <li class="p-1 bg-info rounded-2 text-black m-2">${element.strMeasure4}</li>
    //                 <li class="p-1 bg-info rounded-2 text-black m-2">${element.strMeasure5}</li>
    //                 <li class="p-1 bg-info rounded-2 text-black m-2">${element.strMeasure6}</li>
    //                 <li class="p-1 bg-info rounded-2 text-black m-2">${element.strMeasure7}</li>
    //                 <li class="p-1 bg-info rounded-2 text-black m-2">${element.strMeasure8}</li>
    //                 <li class="p-1 bg-info rounded-2 text-black m-2">${element.strMeasure9}</li>                    </ul>
    //               <h3>Tags : </h3>
    //               <ul class="d-flex list-unstyled flex-wrap">
    //                 <li class="p-1 bg-danger rounded-2 text-black m-2">${element.strTags}</li>
    //               </ul>
    //               <a class="btn btn-success" target="_blank" href="${element.strSource}">Source</a>
    //               <a class="btn btn-danger" target="_blank" href="${element.strYoutube}">Youtube</a>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    // </div>
    //     `
    // document.querySelector(".show-meals").innerHTML = cartona;
}

function validationName(input){
    let rexName = /^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/
    if(rexName.test(input)){
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
        return true;
    }
    else{
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        return false;
    }
}

function validationEmail(val) {
    const regexStyle =/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    console.log(val)

    // if (regexStyle.test(val)) {
    //     console.log("yes")
    //    return true;
    // } else {
    //    return false;
    // }
 }
 
//  function validationPassword() {
//     const regexStyle = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
 
//     if (regexStyle.test(inputs[1].value)) {
//        inputs[1].classList.add("is-valid");
//        inputs[1].classList.remove("is-invalid");
//        return true;
//     } else {
//        inputs[1].classList.add("is-invalid");
//        inputs[1].classList.remove("is-valid");
//        return false;
//     }
//  }

// let rexemail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

// let regexpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

// let regexage = /^([1-7][0-9]|80)$/
// let regexPhoneNumber = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/

async function getApiArea(){
    let apiArea = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let finalApiArea = await apiArea.json();
    showArea(finalApiArea);
}
// Area
function showArea(finalApiArea){
    loading.classList.remove("d-none");
    let cartona = "";
    for (let i = 0; i < finalApiArea.meals.length; i++) {
        const element = finalApiArea.meals[i];
        console.log(element.strArea)
        cartona +=`
                <div class="col-md-3 area">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${element.strArea}</h3>
                </div>
        `
    }
    document.querySelector(".show-meals").innerHTML = cartona;
    loading.classList.add("d-none");
}
// Ingredients
async function getApiIngredients(){
    let apiIngredients = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let finalApiIngredients = await apiIngredients.json();
    showIngredients(finalApiIngredients);
}

function showIngredients(finalApiIngredients){
    console.log(finalApiIngredients.meals)
    let cartona = "";
    for (let i = 0; i < 20; i++) {
        const element = finalApiIngredients.meals[i];
        console.log(element)
        cartona +=`
        <div class="col-md-3">
        <div class="text-center Ingredients">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${element.strIngredient}</h3>
            <p>${element.strDescription}</p>
        </div>
    </div>
        `
    }
    document.querySelector(".show-meals").innerHTML = cartona;
}


const loadMeals = (search) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayMeal(data.meals))
}
const displayMeal = meals => {
    const mealContainer = document.getElementById('meal-container')
    mealContainer.innerText = '';
    meals.forEach(meal => {
        // console.log(meal)
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col')
        mealDiv.innerHTML = `
        <div class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body" onclick = "loadMealDetails(${meal.idMeal})">
                  <h5 class="card-title text-warning fs-3">${meal.strMeal}</h5>
                  <p class="card-text text-secondary">${meal.strInstructions.slice(0,200)}</p>
                </div>
              </div>
        `;
        mealContainer.appendChild(mealDiv);
    });

}
const searchFood = () => {
    const searchField = document.getElementById('search-field')
   const searchText = searchField.value
  loadMeals(searchText);
  searchField.value = '';
}
const loadMealDetails = mealId =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displatMealDetails(data.meals[0]))

}
const displatMealDetails = meal => {
    const mealDetailsContainer = document.getElementById('detail-container');
    mealDetailsContainer.innerText ='';
    const detailDiv = document.createElement('div')
    detailDiv.classList.add('card');
    detailDiv.innerHTML = `
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0,300)}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    `
    mealDetailsContainer.appendChild(detailDiv)
}
loadMeals('');

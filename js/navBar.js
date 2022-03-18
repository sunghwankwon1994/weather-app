const navBar = document.querySelector(".bottom_menu");

navBar.innerHTML = `    <div class="btn weatherBtn">
<i class="fa-solid fa-sun"></i></div>
<div class="btn toDoBtn">
<i class="fa-solid fa-list-check"></i>
</div>
<div class="btn gameBtn">
<i class="fa-solid fa-gamepad"></i>
</div>
`;
//button functions
const arrBtn = [...document.querySelectorAll(".btn")];
// console.log(arrBtn);
arrBtn.map((btn) => {
  btn.addEventListener("click", function () {
    const weatherContainer = document.querySelector(".weather_container");
    const todoContainer = document.querySelector(".todo_container");
    const gameContainer = document.querySelector(".game_container");
    switch (btn.classList[1]) {
      case "weatherBtn":
        weatherContainer.classList.remove("hide");
        todoContainer.classList.add("hide");
        gameContainer.classList.add("hide");

        break;
      case "toDoBtn":
        weatherContainer.classList.add("hide");
        todoContainer.classList.remove("hide");
        gameContainer.classList.add("hide");
        // dictionaryContainer.classList.add("hide");
        break;
      case "gameBtn":
        weatherContainer.classList.add("hide");
        todoContainer.classList.add("hide");
        gameContainer.classList.remove("hide");
        // dictionaryContainer.classList.add("hide");
        break;
    }
    // if (btn.classList[1] === "weatherBtn") {
    //   // console.log(`${btn.classList[1]} clicked`);
    //   weatherContainer.classList.remove("hide");
    //   todoContainer.classList.add("hide");
    // }
    // if (btn.classList[1] === "toDoBtn") {
    //   // console.log(`${btn.classList[1]} clicked`);
    //   weatherContainer.classList.add("hide");
    //   todoContainer.classList.remove("hide");
    // }
  });
});

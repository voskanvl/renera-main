import "./style.sass"
import "@splidejs/splide/dist/css/splide.min.css"
import splides from "./ts/splides"
import allSolutions from "./articles/all-solutions/all-solutions"

splides()
allSolutions()

const topButton = document.querySelector<HTMLElement>("#new-form-button"),
    bottomButton = document.querySelector<HTMLElement>("#submit_your_application")

bottomButton &&
    bottomButton.addEventListener("click", (event: Event) => {
        event.preventDefault()
        topButton?.click()
    })

import "./style.sass"
import "@splidejs/splide/dist/css/splide.min.css"
import splides from "./ts/splides"
import allSolutions from "./articles/all-solutions/all-solutions"
import popular from "./articles/popular1410/popular"
import noBarba from "./noBarba"
import videoSlider from "./ts/videoSlider"

noBarba()
const slider = splides()
allSolutions()
popular()
videoSlider(slider)

const topButton = document.querySelector<HTMLElement>("#new-form-button"),
    bottomButton = document.querySelector<HTMLElement>("#submit_your_application"),
    popularBlocks = document.querySelectorAll<HTMLElement>(".popular1410__block")

bottomButton &&
    bottomButton.addEventListener("click", (event: Event) => {
        event.preventDefault()
        topButton?.click()
    })

const activatePopularBlocks = () => {
    if (!popularBlocks) return
    popularBlocks.forEach(e => e.setAttribute("active", "active"))
}
const deactivatePopulaBlocks = () => {
    if (!popularBlocks) return
    popularBlocks.forEach(e => e.removeAttribute("active"))
}
const checkSize = () => {
    const { matches } = matchMedia("(max-width: 768px)")
    if (matches) {
        activatePopularBlocks()
    } else {
        deactivatePopulaBlocks()
    }
}
checkSize()
window.addEventListener("size", checkSize)

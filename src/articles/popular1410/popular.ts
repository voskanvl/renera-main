export default function popular() {
    const blockLeft = document.querySelector<HTMLElement>(".popular1410__block--left"),
        blockRight = document.querySelector<HTMLElement>(".popular1410__block--right")

    blockLeft &&
        blockLeft.addEventListener("mouseover", () => {
            blockRight && blockRight.removeAttribute("active")
            blockLeft.setAttribute("active", "active")
        })
    blockRight &&
        blockRight.addEventListener("mouseover", () => {
            blockLeft && blockLeft.removeAttribute("active")
            blockRight.setAttribute("active", "active")
        })
}

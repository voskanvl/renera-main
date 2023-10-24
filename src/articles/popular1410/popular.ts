export default function popular() {
    const blockLeft = document.querySelector<HTMLElement>(".popular1410__block--left"),
        blockRight = document.querySelector<HTMLElement>(".popular1410__block--right")

    blockLeft &&
        blockLeft.addEventListener("mouseover", () => {
            if (matchMedia("(max-width: 768px").matches) return
            blockRight && blockRight.removeAttribute("active")
            blockLeft.setAttribute("active", "active")
        })
    blockRight &&
        blockRight.addEventListener("mouseover", () => {
            if (matchMedia("(max-width: 768px").matches) return
            blockLeft && blockLeft.removeAttribute("active")
            blockRight.setAttribute("active", "active")
        })
}

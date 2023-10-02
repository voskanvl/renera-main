import Splide from "@splidejs/splide"
export default function splides() {
    const tizerSplider = new Splide("#tizer1653", {
        type: "loop",
        pagination: false,
    })
    tizerSplider.mount()
    return tizerSplider
}

import Splide from "@splidejs/splide"
export default function splides() {
    const tizerSplider = new Splide("#tizer1653", {
        type: "loop",
        pagination: false,
        breakpoints: {
            768: {
                arrows: false,
                pagination: true,
                autoplay: true,
            },
        },
    })
    tizerSplider.mount()
    return tizerSplider
}

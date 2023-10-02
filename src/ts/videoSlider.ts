import Splide from "@splidejs/splide"

export default function videoSlider(slider: Splide) {
    slider.on("active", slide => {
        const video = slide.slide.querySelector<HTMLVideoElement>("video")
        video?.play()
    })
    slider.on("inactive", slide => {
        const video = slide.slide.querySelector<HTMLVideoElement>("video")
        video?.pause()
    })
}

export default function allSolutions() {
    const allSolutionsBody = document.querySelector<HTMLElement>(".all-solutions__body")
    let activeItem = document.querySelector<HTMLElement>(".all-solutions__select[active='true']")

    allSolutionsBody &&
        allSolutionsBody.addEventListener("mouseover", (event: Event) => {
            const target = event.target as HTMLElement,
                select = target.closest<HTMLElement>(".all-solutions__select")

            if (!select || activeItem === select) return
            activeItem?.setAttribute("active", "false")
            select.setAttribute("active", "true")
            activeItem = select
        })
}

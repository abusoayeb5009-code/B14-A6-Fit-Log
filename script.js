// Browse Workout button

const browseBtn = document.querySelector(".primary-btn");

browseBtn.addEventListener("click", () => {

    document.querySelector(".library").scrollIntoView({
        behavior: "smooth"
    });

});
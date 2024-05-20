const carousel = document.querySelector(".carousel"),
  dotsContainer = document.querySelector(".dots"),
  firstImg = carousel.querySelectorAll("img")[0],
  arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  isDragging = false,
  prevPageX,
  prevScrollLeft,
  positionDiff,
  autoScrollInterval;

const showHideIcons = () => {
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth; 
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14; 

    carousel.scrollLeft +=
      icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60);
    updateActiveDot();
  });
});

const autoSlide = () => {
  let firstImgWidth = firstImg.clientWidth + 14;
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  if (carousel.scrollLeft + carousel.clientWidth >= scrollWidth) {
    carousel.scrollLeft = 0;
  } else {
    carousel.scrollLeft += firstImgWidth;
  }
  updateActiveDot();
};

const startAutoScroll = () => {
  autoScrollInterval = setInterval(autoSlide, 3000);
};

const stopAutoScroll = () => {
  clearInterval(autoScrollInterval);
};

carousel.addEventListener("mouseenter", stopAutoScroll);
carousel.addEventListener("mouseleave", startAutoScroll);

startAutoScroll(); 

// Function to update active dot
const updateActiveDot = () => {
  const imgWidth = firstImg.clientWidth + 14;
  const currentIndex = Math.round(carousel.scrollLeft / imgWidth);
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    if (index === currentIndex) {
      dot.classList.add("active-dot");
    } else {
      dot.classList.remove("active-dot");
    }
  });
};

const createDots = () => {
    const imgCount = document.querySelectorAll(".carousel img").length;
    for (let i = 0; i < imgCount; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dotsContainer.appendChild(dot);
    }
  };
  
  createDots(); 
  
  carousel.addEventListener("scroll", updateActiveDot);
  

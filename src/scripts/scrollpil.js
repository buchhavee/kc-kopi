if (typeof window !== "undefined") {
  const flex = document.getElementById("product-flex");
  const progress = document.getElementById("scroll-progress");
  const leftArrow = document.querySelector(".scroll-arrow.left");
  const rightArrow = document.querySelector(".scroll-arrow.right");
  const scrollAmount = 350; // px pr. klik
  const scrollStep = 7; // mindre værdi = langsommere
  const scrollIntervalMs = 20; // større værdi = langsommere

  let scrollInterval = null;

  if (flex && progress) {
    const updateProgress = () => {
      const maxScroll = flex.scrollWidth - flex.clientWidth;
      const percent = maxScroll > 0 ? (flex.scrollLeft / maxScroll) * 100 : 0;
      progress.style.width = percent + "%";
    };
    flex.addEventListener("scroll", updateProgress);
    window.addEventListener("resize", updateProgress);
    updateProgress();

    function startAutoScroll(direction) {
      stopAutoScroll();
      scrollInterval = setInterval(() => {
        flex.scrollBy({ left: direction * scrollStep, behavior: "auto" });
      }, scrollIntervalMs);
    }
    function stopAutoScroll() {
      if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
      }
    }

    if (leftArrow && rightArrow) {
      leftArrow.addEventListener("click", () => {
        stopAutoScroll(); // <- tilføj denne linje
        flex.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      });
      rightArrow.addEventListener("click", () => {
        stopAutoScroll(); // <- tilføj denne linje
        flex.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });

      leftArrow.addEventListener("mouseenter", () => startAutoScroll(-1));
      leftArrow.addEventListener("mouseleave", stopAutoScroll);
      rightArrow.addEventListener("mouseenter", () => startAutoScroll(1));
      rightArrow.addEventListener("mouseleave", stopAutoScroll);
    }
  }
}

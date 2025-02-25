// Custom scroll function with configurable duration
export function smoothScrollToTop(duration: number): void {
    const start = window.scrollY;
    const startTime = performance.now();

    function scrollStep(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1); // progress between 0 and 1
        // Using ease-in-out cubic easing for a smooth effect
        const easeInOutCubic =
            progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, start * (1 - easeInOutCubic));

        if (elapsed < duration) {
            requestAnimationFrame(scrollStep);
        }
    }

    requestAnimationFrame(scrollStep);
}

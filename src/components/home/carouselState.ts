export function getNextCarouselIndex(
  currentIndex: number,
  totalSlides: number,
  direction: 1 | -1 = 1
): number {
  if (totalSlides <= 0) {
    return 0;
  }

  const nextIndex = currentIndex + direction;

  if (nextIndex >= totalSlides) {
    return 0;
  }

  if (nextIndex < 0) {
    return totalSlides - 1;
  }

  return nextIndex;
}

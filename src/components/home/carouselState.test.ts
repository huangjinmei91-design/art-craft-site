import assert from "node:assert/strict";
import test from "node:test";
import { getNextCarouselIndex } from "./carouselState";

test("getNextCarouselIndex advances forward and wraps to the first slide", () => {
  assert.equal(getNextCarouselIndex(0, 3), 1);
  assert.equal(getNextCarouselIndex(2, 3), 0);
});

test("getNextCarouselIndex moves backward and wraps to the last slide", () => {
  assert.equal(getNextCarouselIndex(1, 3, -1), 0);
  assert.equal(getNextCarouselIndex(0, 3, -1), 2);
});

test("getNextCarouselIndex stays at zero when there are no slides", () => {
  assert.equal(getNextCarouselIndex(0, 0), 0);
});

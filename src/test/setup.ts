import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost"
});

Object.defineProperty(globalThis, "window", {
  value: dom.window,
  configurable: true
});

Object.defineProperty(globalThis, "document", {
  value: dom.window.document,
  configurable: true
});

Object.defineProperty(globalThis, "navigator", {
  value: dom.window.navigator,
  configurable: true
});

Object.defineProperty(globalThis, "HTMLElement", {
  value: dom.window.HTMLElement,
  configurable: true
});

Object.defineProperty(globalThis, "Node", {
  value: dom.window.Node,
  configurable: true
});

Object.defineProperty(globalThis, "getComputedStyle", {
  value: dom.window.getComputedStyle,
  configurable: true
});

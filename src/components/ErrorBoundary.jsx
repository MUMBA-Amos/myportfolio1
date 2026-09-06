import React from "react";

/**
 * Keeps one broken component from taking the page with it.
 *
 * This site is client-rendered: the HTML the server sends is an empty
 * shell and every word on the page is drawn by JavaScript. React's default
 * on an uncaught render error is to unmount the whole tree, so without a
 * boundary anywhere a single failure — a missing WebGL context, a driver
 * the GPU blocklist does not like, an animation plugin that cannot start —
 * leaves the visitor looking at a blank white page rather than a site with
 * one piece missing.
 *
 * Wrapped around each section, a failure costs that section and nothing
 * else. `fallback` defaults to null because the decorative pieces are
 * better absent than announced.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    // Logged rather than swallowed: the visitor still gets the rest of the
    // page, but this is the only trace that something went wrong on their
    // machine and not on ours.
    // eslint-disable-next-line no-console
    console.error(
      `[${this.props.name || "section"}] failed to render:`,
      error,
      info?.componentStack
    );
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}

export default ErrorBoundary;

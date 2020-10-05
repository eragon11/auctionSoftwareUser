import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}
export default class ErrorBoundary extends React.Component<
  any,
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    // log the error to our server with loglevel
    console.log({ error, info });
    console.error({ error, info });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1 style={{ textAlign: "center" }}>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

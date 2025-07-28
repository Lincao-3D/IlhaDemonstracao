import React from "react";      // normal runtime import
import type { ReactNode } from "react";  // type-only import
import type { ErrorInfo } from "react";  // type-only import

interface R3FErrorBoundaryProps {
  children: ReactNode;
}

interface R3FErrorBoundaryState {
  hasError: boolean;
}

export default class R3FErrorBoundary extends React.Component<
  R3FErrorBoundaryProps,
  R3FErrorBoundaryState
> {
  constructor(props: R3FErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error): R3FErrorBoundaryState {
    // `_error` is unused, prefix with underscore to appease ESLint
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can rename error params if you want to avoid unused vars warnings
    console.error("R3FErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "red" }}>
          Something went wrong loading the 3D model.
        </div>
      );
    }

    return this.props.children;
  }
}

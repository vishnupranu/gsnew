import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/** Keeps a view-level failure from taking down the whole workspace shell. */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('View crashed', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="empty-state" role="alert">
          <div className="empty-icon">
            <span aria-hidden="true">!</span>
          </div>
          <h3>This view hit a problem</h3>
          <p>The rest of the workspace is still available. Try reloading the view.</p>
          <div className="empty-action">
            <button
              type="button"
              className="btn btn-outline btn-md"
              onClick={() => this.setState({ error: null })}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

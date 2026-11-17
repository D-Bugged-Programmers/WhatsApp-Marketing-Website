import { Component } from 'react'

// Renders `fallback` if a child (e.g. the WebGL scene) throws.
export default class ErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch(error) { this.props.onError?.(error) }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

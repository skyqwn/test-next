"use client";

import { FallbackProps } from './ErrorBoundary'

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const handleReset = () => {
    // Streaming 패턴: 에러가 클라이언트에서 발생하므로 resetErrorBoundary만으로 충분
    resetErrorBoundary();
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>오류가 발생했습니다</h2>
      <p style={{ color: 'red' }}>{error?.message}</p>
      <button onClick={handleReset}>다시 시도</button>
    </div>
  )
}

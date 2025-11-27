"use client";

import { FallbackProps } from './ErrorBoundary'
import { useRouter } from "next/navigation";

export default function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
   const router = useRouter();
  const handleReset = () => {
    router.refresh();  // 서버 컴포넌트 재실행을 위해 필요
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

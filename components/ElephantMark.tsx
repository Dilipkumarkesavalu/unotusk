'use client'

interface ElephantMarkProps {
  className?: string
  size?: number
}

export function ElephantMark({ className = '', size = 28 }: ElephantMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Stylised elephant silhouette — minimal, geometric */}
      <path
        d="M8 20 C8 20 6 19 5 17 C4 15 4 13 5 11 C6 9 8 8 10 8 L14 8 C17 8 20 9 21 12 C22 14 21 17 20 18 L20 22 L17 22 L17 19 C16 20 15 20 14 20 L12 22 L9 22 L9 20 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M5 11 C4 10 3 10 3 12 C3 14 4 15 5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="18" cy="11" r="1" fill="#090D17" />
    </svg>
  )
}

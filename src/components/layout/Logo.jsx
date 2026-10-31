export default function Logo({ className = "h-8 w-8" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 16c-4-3-10-4-16-3v24c6-1 12 0 16 3 4-3 10-4 16-3V13c-6-1-12 0-16 3Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M24 16v24" stroke="currentColor" strokeWidth="2.5" />
      <path d="M38 3a6 6 0 1 0 6 8 5 5 0 0 1-6-8Z" fill="currentColor" />
    </svg>
  );
}
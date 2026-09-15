export default function MandalaShape() {
  return (
    <g stroke="currentColor" fill="none" strokeWidth="0.6">
      <circle cx="100" cy="100" r="96" />
      <circle cx="100" cy="100" r="80" />
      <circle cx="100" cy="100" r="64" />
      <path d="M100 4 L100 196" />
      <path d="M4 100 L196 100" />
      <path d="M29 29 L171 171" />
      <path d="M171 29 L29 171" />
      <g fill="currentColor" stroke="none">
        <circle cx="100" cy="20" r="3" />
        <circle cx="100" cy="180" r="3" />
        <circle cx="20" cy="100" r="3" />
        <circle cx="180" cy="100" r="3" />
        <circle cx="41" cy="41" r="3" />
        <circle cx="159" cy="159" r="3" />
        <circle cx="159" cy="41" r="3" />
        <circle cx="41" cy="159" r="3" />
      </g>
    </g>
  );
}

export default function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="#294c3a" />
      <path
        d="M8 18 20 8l12 10v12a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3Z"
        fill="none"
        stroke="#c4ddbf"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <g fill="#f9f2df">
        <ellipse cx="14.5" cy="22" rx="1.6" ry="2" transform="rotate(-25 14.5 22)" />
        <ellipse cx="18" cy="19.1" rx="1.6" ry="2" />
        <ellipse cx="22" cy="19.1" rx="1.6" ry="2" />
        <ellipse cx="25.5" cy="22" rx="1.6" ry="2" transform="rotate(25 25.5 22)" />
        <path d="M20 23c-1.5 0-2.1 1.3-3.4 2.4-2 1.8-.5 4.1 1.4 3.5.8-.3 1.3-.5 2-.5s1.2.2 2 .5c1.9.6 3.4-1.7 1.4-3.5C22.1 24.3 21.5 23 20 23Z" />
      </g>
    </svg>
  );
}

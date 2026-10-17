type FaceIconProps = {
  level: 1 | 2 | 3 | 4 | 5;
  className?: string;
};

const colors = {
  1: "#c94634",
  2: "#d87031",
  3: "#d8a431",
  4: "#3a8a74",
  5: "#2f7661",
} as const;

export function FaceIcon({ level, className = "" }: FaceIconProps) {
  const stroke = colors[level];

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <circle cx="60" cy="60" r="51" stroke={stroke} strokeWidth="5" />

      {level === 1 && (
        <>
          <path d="M34 43 48 49M86 43 72 49" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
          <circle cx="43" cy="57" r="4" fill={stroke} />
          <circle cx="77" cy="57" r="4" fill={stroke} />
          <path d="M39 82c7-9 14-13 21-13s14 4 21 13" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
        </>
      )}

      {level === 2 && (
        <>
          <circle cx="42" cy="52" r="4" fill={stroke} />
          <circle cx="78" cy="52" r="4" fill={stroke} />
          <path d="M42 80c6-7 12-10 18-10s12 3 18 10" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
        </>
      )}

      {level === 3 && (
        <>
          <circle cx="42" cy="52" r="4" fill={stroke} />
          <circle cx="78" cy="52" r="4" fill={stroke} />
          <path d="M42 76h36" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
        </>
      )}

      {level === 4 && (
        <>
          <circle cx="42" cy="52" r="4" fill={stroke} />
          <circle cx="78" cy="52" r="4" fill={stroke} />
          <path d="M41 70c7 10 13 14 19 14s12-4 19-14" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
        </>
      )}

      {level === 5 && (
        <>
          <path d="M35 51c4-4 9-4 14 0M71 51c4-4 9-4 14 0" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
          <path d="M37 68c6 13 13 19 23 19s17-6 23-19" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

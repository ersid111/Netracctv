interface Props {
  size?: "sm" | "md";
}

export function NetraLogo({ size = "md" }: Props) {
  const dim = size === "sm" ? "w-9 h-9" : "w-10 h-10";
  const textSize = size === "sm" ? "text-lg" : "text-xl";

  return (
    <div className="flex items-center gap-2.5">
      <div className={`relative ${dim} rounded-xl bg-brand-blue flex items-center justify-center shadow-glow-sm`}>
        {/* Eye SVG logo */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
        >
          {/* Outer eye shape */}
          <path
            d="M1 12C1 12 5 5 12 5C19 5 23 12 23 12C23 12 19 19 12 19C5 19 1 12 1 12Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Iris */}
          <circle cx="12" cy="12" r="3.5" stroke="white" strokeWidth="1.5" />
          {/* Pupil */}
          <circle cx="12" cy="12" r="1.5" fill="white" />
          {/* CCTV lens glint */}
          <circle cx="13.5" cy="10.5" r="0.6" fill="white" opacity="0.7" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`text-white font-bold ${textSize} leading-none tracking-tight`}>
          NETRA
        </span>
        <span className="text-brand-blue text-xs font-semibold tracking-widest">
          CCTV
        </span>
      </div>
    </div>
  );
}

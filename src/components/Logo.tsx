interface LogoProps {
  variant?: "color" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { h: 36 },
  md: { h: 44 },
  lg: { h: 56 },
};

export default function Logo({ variant = "color", size = "md", className = "" }: LogoProps) {
  const h = sizes[size].h;

  return (
    <img
      src={variant === "white" ? "/logo-white.webp" : "/logo-color.webp"}
      alt="The Laundry Project"
      height={h}
      style={{ height: h, width: "auto", display: "block" }}
      className={className}
    />
  );
}

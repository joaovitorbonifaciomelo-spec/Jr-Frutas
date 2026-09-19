import type { SVGProps } from "react";
import type { IconName } from "@/data/site";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, props: IconProps) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export function ArrowRight({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ChevronLeft({ size = 20, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="m15 6-6 6 6 6" />
    </svg>
  );
}

export function ChevronRight({ size = 20, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function Plus({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function Menu({ size = 26, ...props }: IconProps) {
  return (
    <svg {...base(size, props)} strokeWidth={1.8}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h10" />
    </svg>
  );
}

export function Close({ size = 26, ...props }: IconProps) {
  return (
    <svg {...base(size, props)} strokeWidth={1.8}>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </svg>
  );
}

export function Check({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)} strokeWidth={2}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function CheckCircle({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.3 2.4 2.4 4.8-5" />
    </svg>
  );
}

export function Phone({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M5.5 3h3l1.6 4-2 1.4a11 11 0 0 0 5.5 5.5l1.4-2 4 1.6v3a2 2 0 0 1-2.1 2A16 16 0 0 1 3.5 5.1 2 2 0 0 1 5.5 3Z" />
    </svg>
  );
}

export function WhatsApp({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.5 20.5l4.2-1.1A8.5 8.5 0 1 0 12 3.5Z" />
      <path d="M9.2 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .4-.1.6l-.5.6c-.1.1-.1.3 0 .4a6 6 0 0 0 2.9 2.7c.2.1.3.1.4 0l.7-.7c.2-.2.4-.2.6-.1l1.5.7c.2.1.3.3.3.5 0 .9-.6 1.6-1.4 1.8-1.2.3-3.5-.6-5-2.1s-2.4-3.5-2.2-4.8c0-.4.2-.8.4-1Z" />
    </svg>
  );
}

export function Mail({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7 7.5 5.5L19.5 7" />
    </svg>
  );
}

export function Instagram({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Facebook({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M14.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.5-1.5h1.5V5.1c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H9v3h2.6v7" />
    </svg>
  );
}

export function MapPin({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function Award({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m8.8 13.6-1.3 6.9 4.5-2.4 4.5 2.4-1.3-6.9" />
      <path d="m10.3 9.1 1.2 1.2 2.4-2.6" />
    </svg>
  );
}

export function Users({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M15.5 5.6a3.2 3.2 0 0 1 0 5.8" />
      <path d="M17 13.8a5.5 5.5 0 0 1 3.5 5.2" />
    </svg>
  );
}

export function Truck({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M3 6.5h10.5v9H3z" />
      <path d="M13.5 9.5h3.7l3.3 3.4v2.6h-7" />
      <circle cx="7" cy="17" r="1.8" />
      <circle cx="17" cy="17" r="1.8" />
    </svg>
  );
}

export function Box({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="m12 3 8 4.3v9.4L12 21l-8-4.3V7.3L12 3Z" />
      <path d="m4.3 7.6 7.7 4.2 7.7-4.2" />
      <path d="M12 11.8V21" />
    </svg>
  );
}

export function Field({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M3 19c4-3.2 6-7 6-13" />
      <path d="M9 6c1.3 3 1 6 0 8" />
      <path d="M14 19c-3-3-3-8-1-12" />
      <path d="M13 7c2.3.6 3.6 2.5 3.8 5" />
      <path d="M3 19h18" />
    </svg>
  );
}

export function Select({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 3.5V7" />
      <path d="M12 17v3.5" />
      <path d="M3.5 12H7" />
      <path d="M17 12h3.5" />
    </svg>
  );
}

export function Globe({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.6 2.6 2.6 14.4 0 17" />
      <path d="M12 3.5c-2.6 2.6-2.6 14.4 0 17" />
    </svg>
  );
}

export function ExternalArrow({ size = 16, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </svg>
  );
}

export function Share({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <path d="M12 3.5v11" />
      <path d="m8.5 7 3.5-3.5L15.5 7" />
      <path d="M5.5 11.5v6a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-6" />
    </svg>
  );
}

export function UserPlus({ size = 18, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}>
      <circle cx="10" cy="8.5" r="3.4" />
      <path d="M4 19.5a6 6 0 0 1 12 0" />
      <path d="M18 8v6" />
      <path d="M15 11h6" />
    </svg>
  );
}

export function Icon({ name, ...props }: IconProps & { name: IconName }) {
  switch (name) {
    case "award":
      return <Award {...props} />;
    case "users":
      return <Users {...props} />;
    case "truck":
      return <Truck {...props} />;
    case "pin":
      return <MapPin {...props} />;
    case "check":
      return <CheckCircle {...props} />;
    case "box":
      return <Box {...props} />;
    case "field":
      return <Field {...props} />;
    case "select":
      return <Select {...props} />;
  }
}

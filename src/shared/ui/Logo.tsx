import { cn } from '@/shared/lib/formatDate';

/** Vector mark traced from brand artwork (mountain / path). */
const MARK_LEFT =
  'M45.5 0 L42.5 5.2 L40 10.4 L37.5 15.6 L35 20.8 L33 26 L30.5 31.3 L28 36.5 L25.5 41.7 L23 46.9 L20.5 52.1 L18 57.3 L16 62.5 L13.5 67.7 L11 72.9 L8.5 78.1 L6 83.3 L4 88.5 L1.5 93.8 L2.2 99.5 Q2.5 101 5.5 101 L9.5 101 Q12.2 100.2 13.8 96.2 L23.5 91.7 L32.5 88 L35.5 84.4 L37 80.7 L39 77.1 L40.5 73.4 L42.5 69.8 L44 66.2 L45.5 62.5 L47 58.9 L49 55.2 L51.5 51.6 L54.5 47.4 L57.5 43.8 L61.5 40.1 L65 36.5 L63.5 32.8 L62 29.2 L60 25.5 L58.5 21.9 L56.5 18.2 L55 14.6 L53 10.9 L51.5 7.3 L49.5 3.7 L47.5 0 Z';

const MARK_RIGHT =
  'M66 39.1 L63 42.7 L60 46.9 L57.5 51 L55.5 54.7 L54 58.9 L52.5 63 L52 67.2 L52.5 70.8 L54.5 75 L56.5 79.2 L58.5 83.3 L60.5 87 L70 91.2 L80.5 95.3 L91 99.5 Q91.8 101 94.2 100.2 L95.2 97.5 L93.5 95.3 L91.5 91.2 L89.5 87 L88 83.3 L85.5 79.2 L83.5 75 L81.5 70.8 L80 67.2 L78 63 L76 58.9 L74 54.7 L72.5 51 L70.5 46.9 L68.5 42.7 L66.5 39.1 Z';

type LogoProps = {
  className?: string;
  /** @deprecated kept for call sites — maps to overall height */
  markClassName?: string;
  /** `dark` = white mark (dark bg), `light` = black mark (light bg), `inherit` = currentColor */
  tone?: 'dark' | 'light' | 'inherit';
};

export function Logo({ className, markClassName, tone = 'inherit' }: LogoProps) {
  const fill =
    tone === 'dark' ? '#FFFFFF' : tone === 'light' ? '#050505' : 'currentColor';

  return (
    <svg
      viewBox="0 0 300 70"
      className={cn('h-10 w-auto', markClassName, className)}
      role="img"
      aria-label="TIAN SHAN Travel"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={fill} transform="translate(0 1.5) scale(0.64)">
        <path d={MARK_LEFT} />
        <path d={MARK_RIGHT} />
      </g>
      <line
        x1="78"
        y1="12"
        x2="78"
        y2="58"
        stroke={fill}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <text
        x="92"
        y="33"
        fill={fill}
        fontFamily="'Plus Jakarta Sans', Inter, Arial, sans-serif"
        fontSize="22"
        fontWeight="700"
        letterSpacing="0.06em"
      >
        TIAN SHAN
      </text>
      <text
        x="92"
        y="54"
        fill={fill}
        fontFamily="'Plus Jakarta Sans', Inter, Arial, sans-serif"
        fontSize="11"
        fontWeight="500"
        letterSpacing="0.48em"
        textLength="148"
        lengthAdjust="spacing"
      >
        TRAVEL
      </text>
    </svg>
  );
}

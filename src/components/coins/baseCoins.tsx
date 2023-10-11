export default function BaseCoin({
  color = '#FFD700',
  strokeColor = '#ca8a04',
  size = 128,
}: {
  color?: string
  strokeColor?: string
  size?: number
}) {
  return (
    <div className="relative flex transform justify-center">
      <svg width={size} height={size} viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="30" fill={color} />
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke={strokeColor}
          strokeWidth="4"
        />
      </svg>
      <p
        className="absolute select-none self-center"
        style={{ color: strokeColor, fontSize: size * 0.7 }}
      >
        $
      </p>
    </div>
  )
}

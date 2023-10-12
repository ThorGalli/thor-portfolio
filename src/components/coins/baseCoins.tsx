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
      <div
        className={`h-20 w-20 rounded-full`}
        style={{
          backgroundColor: color,
          background: `linear-gradient(45deg, ${color} 0%, ${color} 50%, white 100%)`,
          width: size,
          height: size,
          borderWidth: size / 15,
          borderColor: strokeColor,
        }}
      />
      <p
        className="absolute select-none self-center"
        style={{
          color: strokeColor,
          fontSize: size * 0.7,
          lineHeight: 0,
        }}
      >
        $
      </p>
    </div>
  )
}

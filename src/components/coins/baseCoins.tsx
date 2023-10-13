export default function BaseCoin({
  color = '#EAB308',
  strokeColor = '#CA8A04',
  size = 128,
}: {
  color?: string
  strokeColor?: string
  size?: number
}) {
  return (
    <div className="relative flex transform justify-center rounded-full bg-yellow-700">
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
          textShadow: `0 1px 8px white`,
        }}
      >
        $
      </p>
    </div>
  )
}

export default function useMathUtils() {
  function short(num: number, decimals = 1) {
    if (num < 1000) return num
    const units = ['', 'K', 'M', 'B', 'T', 'Q', 'QQ', 'S', 'SS', 'O', 'N']
    const unit = Math.floor((num.toFixed(0).length - 1) / 3)
    const numShort = (num / Math.pow(1000, unit)).toFixed(decimals)
    return `${numShort}${units[unit]}`
  }
  return { short }
}

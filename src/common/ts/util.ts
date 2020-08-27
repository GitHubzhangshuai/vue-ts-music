function getRandomInt (min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle (arr: any[]) {
  const _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    const j = getRandomInt(0, i)
    const t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce (func: Function, delay: number) {
  let timer: any
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

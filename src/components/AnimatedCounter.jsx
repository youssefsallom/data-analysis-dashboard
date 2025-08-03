import { useState, useEffect } from 'react'

const AnimatedCounter = ({ value, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime = null
    const startValue = 0
    const endValue = parseInt(value.toString().replace(/,/g, ''))

    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * (endValue - startValue) + startValue)
      
      setCount(currentCount)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [value, duration])

  const formatNumber = (num) => {
    return num.toLocaleString()
  }

  return (
    <span className="font-bold text-2xl">
      {prefix}{formatNumber(count)}{suffix}
    </span>
  )
}

export default AnimatedCounter


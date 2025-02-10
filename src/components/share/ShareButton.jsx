import { useState } from 'react'

export default function ShareButton({ title, url }) {
  const [sharingSupported, setSharingSupported] = useState(false)

  // Check if the `navigator.share()` method is available
  if (typeof navigator !== 'undefined' && navigator.share) {
    setSharingSupported(true)
  }

  const handleClick = async () => {
    try {
      await navigator.share({
        title,
        url,
      })
    } catch (err) {
      console.error(`Error sharing: ${err}`)
    }
  }

  return (
    <button onClick={handleClick} disabled={!sharingSupported}>
      Share
    </button>
  )
}

export const formatTimeAgo = (inputTime: string): string => {
  const currentTime = new Date()
  const inputDate = new Date(inputTime)

  const timeDifference = currentTime.getTime() - inputDate.getTime()
  const secondsAgo = Math.floor(timeDifference / 1000)
  const minutesAgo = Math.floor(secondsAgo / 60)
  const hoursAgo = Math.floor(minutesAgo / 60)
  const daysAgo = Math.floor(hoursAgo / 24)

  if (daysAgo >= 7) {
    const month = String(inputDate.getMonth() + 1).padStart(2, '0')
    const day = String(inputDate.getDate()).padStart(2, '0')
    const year = String(inputDate.getFullYear())
    return `${month}/${day}/${year}`
  } else if (daysAgo > 0) {
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`
  } else if (hoursAgo > 0) {
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`
  } else if (minutesAgo > 0) {
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`
  } else {
    return `${secondsAgo} second${secondsAgo > 1 ? 's' : ''} ago`
  }
}

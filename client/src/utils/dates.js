const formatDate = (d) => {
    if (!d) return ''
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })
}

const formatTime = (t) => {
    if (!t) return ''
    const [hour, minute] = t.split(':')
    const h = parseInt(hour)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const h12 = h % 12 || 12
    return `${h12}:${minute} ${ampm}`
}

const formatRemainingTime = (eventDate) => {
    if (!eventDate) return ''
    const now = new Date()
    const event = new Date(eventDate)
    const diff = event - now
    const isPast = diff < 0
    const totalDays = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24))
    const months = Math.floor(totalDays / 30)
    const days = totalDays % 30
    const sign = isPast ? '-' : ''
    if (months > 0) return `${sign}${months} month${months !== 1 ? 's' : ''}, ${sign}${days} day${days !== 1 ? 's' : ''}`
    return `${sign}${days} day${days !== 1 ? 's' : ''}`
}

const formatNegativeTimeRemaining = (remaining, id) => {
    if (remaining === 'Event has passed') {
        const el = document.getElementById(`remaining-${id}`)
        if (el) el.style.color = 'red'
    }
}

export default { formatDate, formatTime, formatRemainingTime, formatNegativeTimeRemaining }

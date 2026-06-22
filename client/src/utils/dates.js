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
    if (diff <= 0) return 'Event has passed'
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days > 0) return `${days} day${days !== 1 ? 's' : ''} away`
    const hours = Math.floor(diff / (1000 * 60 * 60))
    return `${hours} hour${hours !== 1 ? 's' : ''} away`
}

const formatNegativeTimeRemaining = (remaining, id) => {
    if (remaining === 'Event has passed') {
        const el = document.getElementById(`remaining-${id}`)
        if (el) el.style.color = 'red'
    }
}

export default { formatTime, formatRemainingTime, formatNegativeTimeRemaining }

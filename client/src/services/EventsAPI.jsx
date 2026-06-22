const getAllEvents = async () => {
    const response = await fetch('/api/events')
    const data = await response.json()
    return data
}

const getEventsById = async (id) => {
    const response = await fetch(`/api/events/${id}`)
    const data = await response.json()
    return data
}

const getEventsByLocationId = async (locationId) => {
    const response = await fetch(`/api/events/location/${locationId}`)
    const data = await response.json()
    return data
}

export default { getAllEvents, getEventsById, getEventsByLocationId }

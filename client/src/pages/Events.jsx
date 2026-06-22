import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import EventsAPI from '../services/EventsAPI'

const Events = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const eventsData = await EventsAPI.getAllEvents()
                setEvents(eventsData)
            } catch (error) {
                throw error
            }
        })()
    }, [])

    return (
        <div className='events'>
            <h2>All Events</h2>
            <div className='events-list'>
                {
                    events && events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h3>No events scheduled yet!</h3>
                }
            </div>
        </div>
    )
}

export default Events

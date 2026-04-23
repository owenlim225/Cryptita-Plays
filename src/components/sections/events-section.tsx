import { events } from "../site-data";

export function EventsSection() {
  return (
    <section id="events" className="bg-slate-900 px-6 py-20 text-white">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="events-heading text-3xl font-bold">Upcoming Events</h2>
        <div className="mt-8 space-y-4">
          {events.map((event) => (
            <article
              key={event.title}
              className="event-card flex flex-col justify-between gap-2 rounded-xl border border-slate-700 bg-slate-800/80 p-5 sm:flex-row sm:items-center"
            >
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-slate-300">
                {event.date} - {event.location}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

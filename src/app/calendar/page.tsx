'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import './calendar.css';

const CalendarPage = () => {
  const events = [
    {
      title: '아침 먹기',
      start: '2024-03-17',
      end: '2024-03-17',
      color: '#fb8494',
    },
    {
      title: '점심 먹기',
      start: '2024-03-19',
      end: '2024-03-20',
      color: '#fb8494',
    },
    {
      title: '저녁 먹기',
      start: '2024-03-23',
      end: '2024-03-30',
      color: '#fb8494',
    },
    {
      title: '디저트 먹기',
      start: '2024-03-25',
      end: '2024-03-27',
      color: '#fb8494',
    },
  ];

  return (
    <>
      <section className="">
        <FullCalendar
          initialView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={events}
          // eventClick={() => alert('hi')}
          // eventContent={renderEventContent}
        />
      </section>
      {/* <section>
        <FullCalendar
          plugins={[listPlugin]}
          initialView="listWeek"
          events={events}
        />
      </section> */}
    </>
  );
};

export default CalendarPage;

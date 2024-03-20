"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import "./calendar.css";
import { supabase } from "@/supabase/supabase";
import { useQuery } from "@tanstack/react-query";

const CalendarPage = () => {
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        const response = await supabase.from("TodoList").select("*");
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  console.log(todos);

  // const events = [
  //   {
  //     title: '아침 먹기',
  //     start: '2024-03-17',
  //     end: '2024-03-17',
  //   },
  //   {
  //     title: '점심 먹기',
  //     start: '2024-03-19',
  //     end: '2024-03-20',
  //   },
  //   {
  //     title: '저녁 먹기',
  //     start: '2024-03-23',
  //     end: '2024-03-30',
  //   },
  //   {
  //     title: '디저트 먹기',
  //     start: '2024-03-25',
  //     end: '2024-03-27',
  //   },
  // ];

  return (
    <>
      <section className="">
        <FullCalendar
          initialView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={todos}
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

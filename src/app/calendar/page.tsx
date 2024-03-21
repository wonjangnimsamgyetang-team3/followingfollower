"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import "./calendar.css";
import { supabase } from "@/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import { TodosInCalendar } from "../types/todoInCalendar";

const CalendarPage = () => {
  const todos: TodosInCalendar = [];

  const { data, isLoading, isError } = useQuery({
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

  data?.map((item) =>
    todos.push({
      title: item.title,
      start: item.start,
      end: item.end,
    })
  );

  return (
    <>
      <section className="">
        <FullCalendar
          initialView="dayGridMonth"
          plugins={[dayGridPlugin]}
          events={todos}
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

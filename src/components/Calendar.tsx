"use client";

import { supabase } from "@/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import "../style/calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import useStoreState from "@/shared/store";

import type { TodosInCalendar } from "../types/todoInCalendar";

const Calendar = () => {
  const todos: TodosInCalendar = [];
  const { userInfo } = useStoreState();
  const myEmail = userInfo?.email;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        const response = await supabase
          .from("TodoList")
          .select("*")
          .eq("email", myEmail);
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
      {/* <section>
        <div> */}
      <section className="flex items-center justify-center lg:w-[70%] lg:h-[418px]">
        <div className="flex-col items-center w-full lg:w-[80%] h-full rounded-[56px]">
          <FullCalendar
            initialView="dayGridMonth"
            plugins={[dayGridPlugin]}
            events={todos}
          />
        </div>
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

export default Calendar;

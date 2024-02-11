'use client';

import { SubActivity } from "@/types"
import { fechaFormateada, horaFormateada } from "@/utils/dates";
import { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";

export const SubActivyItem = ({ activityId, createdAt, id, isCompleted, title }: SubActivity) => {
  const [completed, setCompleted] = useState(isCompleted);

  return (
    <div className="flex items-center gap-1 p-2 border-b border-gray-500 last-of-type:border-b-0">
      <div>
        <label className="inline-flex items-center mt-3">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-gray-600"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          <span className="ml-2 text-gray-700"></span>
        </label>
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-gray-500 text-sm flex items-center gap-1"><IoCalendarOutline /> <span>{fechaFormateada(createdAt.toISOString())}, {horaFormateada(createdAt.toISOString())}</span></p>
      </div>
    </div>
  )
}
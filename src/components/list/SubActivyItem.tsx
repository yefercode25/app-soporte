'use client';

import { toggleSubActivity } from "@/actions";
import { SubActivity } from "@/types"
import { toastAlert } from "@/utils/toastAlert";
import { fechaFormateada, horaFormateada } from "@/utils/dates";
import { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";

export const SubActivyItem = ({ activityId, createdAt, id, isCompleted, title }: SubActivity) => {
  const [completed, setCompleted] = useState(isCompleted);

  const toggleCompleted = async () => {
    try {
      const updatedSubActivity = await toggleSubActivity(id);
      if (updatedSubActivity.statusCode === 200) {
        setCompleted(!completed);
        toastAlert({ title: 'Estado actualizado', description: `La tarea ha sido marcada como ${!completed ? 'completada' : 'pendiente'}.`, tipo: 'success'});
      } else {
        toastAlert({ title: 'Error estado', description: updatedSubActivity.message, tipo: 'error'});
      }
    } catch (error) {
      toastAlert({ title: 'Error estado', description: 'Se ha producido un error al cambiar el estado de la sub actividad, intente nuevamente.', tipo: 'error'});
    }
  };

  return (
    <div className="flex items-center gap-1 p-2 border-b border-gray-500 last-of-type:border-b-0">
      <div>
        <label className="inline-flex items-center mt-3">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-gray-600"
            checked={completed}
            onChange={() => toggleCompleted()}
          />
          <span className="ml-2 text-gray-700"></span>
        </label>
      </div>
      <div>
        <h3 className={`font-semibold ${completed ? 'text-green-800 line-through' : ''}`}>{title}</h3>
        <p className="text-gray-500 text-sm flex items-center gap-1"><IoCalendarOutline /> <span className={completed ? 'line-through' : ''}>{fechaFormateada(createdAt.toISOString())}, {horaFormateada(createdAt.toISOString())}</span></p>
      </div>
    </div>
  )
}
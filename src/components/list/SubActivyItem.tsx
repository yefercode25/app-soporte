'use client';

import { fechaFormateada, horaFormateada } from "@/utils/dates";
import { IoCalendarOutline } from "react-icons/io5";
import { SubActivity } from "@/types"
import { toaster } from "@/utils/toast";
import { toggleSubActivity } from "@/actions";
import { useState } from "react";

export const SubActivyItem = ({ activityId, createdAt, id, isCompleted, title }: SubActivity) => {
  const [completed, setCompleted] = useState(isCompleted);

  const toggleCompleted = async () => {
    try {
      const updatedSubActivity = await toggleSubActivity(id);
      if (updatedSubActivity.statusCode === 200) {
        setCompleted(!completed);
        toaster({
          title: 'Estado actualizado',
          description: `La tarea ha sido marcada como ${!completed ? 'completada' : 'pendiente'}.`,
          tipo: 'success'
        });
      } else {
        toaster({
          title: 'Error estado',
          description: updatedSubActivity.message,
          tipo: 'error'
        });
      }
    } catch (error) {
      toaster({
        title: 'Error estado',
        description: 'Se ha producido un error al cambiar el estado de la sub actividad, intente nuevamente.',
        tipo: 'error'
      });
    }
  };

  return (
    <div className="flex items-center gap-1 p-2 border-b border-gray-300 last-of-type:border-b-0">
      <div>
        <label className="inline-flex items-center mt-3">
          <input
            type="checkbox"
            className="form-checkbox h-6 w-6"
            checked={completed}
            onChange={() => toggleCompleted()}
          />
          <span className="ml-2 text-gray-700"></span>
        </label>
      </div>
      <div>
        <h3 className={`font-semibold ${completed ? 'text-green-500 line-through' : ''}`}>{title}</h3>
        <p className="text-gray-500 text-sm flex items-center gap-1"><IoCalendarOutline /> <span className={completed ? 'line-through' : ''}>{fechaFormateada(createdAt.toISOString())}, {horaFormateada(createdAt.toISOString())}</span></p>
      </div>
    </div>
  )
}
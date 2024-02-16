'use client';

import { PageError } from "@/components";
import { ErrorPageProps } from "@/types";

export default function EditarActividadErrorPage(props: ErrorPageProps) {
  return (
    <div>
      <PageError {...props} />
    </div>
  );
}
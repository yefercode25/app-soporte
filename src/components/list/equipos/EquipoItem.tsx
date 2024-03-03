import { Equipo } from "@/types";
import Image from "next/image";

interface Props {
  equipo: Equipo;

}

export const EquipoItem = ({ equipo }: Props) => {
  const { brand, id, imageId, imageRel, model, os, peripherals, processor, ram, serial, status, storage, type } = equipo;
  
  return (
    <div>
      <Image 
        src={imageRel?.secureUrl || '/img/placeholder.png'}
        alt={`Imagen de ${brand} ${model}`}
        width={300}
        height={210}
        loading="lazy"
      />
      <div>
        <h2>{brand} {model}</h2>
        <p>{type}</p>
        <p>{status}</p>
      </div>
    </div>
  )
}

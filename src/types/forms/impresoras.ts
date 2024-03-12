export interface CrearImpresora {
  brand: string;
  model: string;
  serial: string;
  inkDetails: string;
  type: 'laser' | 'inyección' | 'matriz';
  status: 'activo' | 'inactivo' | 'en reparación';
  imageId?: string;
}

export interface EditarImpresora extends CrearImpresora {
  id: string;
}
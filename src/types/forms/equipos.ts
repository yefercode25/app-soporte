export interface CrearComputador {
  brand: string;
  model: string;
  serial: string;
  processor: string;
  ram: number;
  storage: number;
  os: string;
  peripherals: string;
  type: 'laptop' | 'desktop' | 'server';
  status: 'activo' | 'inactivo' | 'en reparación';
  imageId?: string;
}
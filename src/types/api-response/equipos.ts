export interface Equipo {
  id:          string;
  brand:       string;
  model:       string;
  serial:      string;
  processor:   string;
  ram:         number;
  storage:     number;
  os:          string;
  peripherals: string[];
  type:        string;
  status:      string;
  imageId:     null | string;
  imageRel:    Image | null;
}

export interface Image {
  id:           string;
  cloudinaryId: string;
  secureUrl:    string;
}
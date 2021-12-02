export interface IBoat {
  id: number;
  name: string;
  type: string;
}

export interface ISauveteur {
  id: number;
  name: string;
  first_name: string;
  role: string;
}

export interface ISauvetage {
  id: number;
  boat: IBoat;
  sauveteur: ISauveteur;
  date: string;
  location: string;
  nb_dead: number;
  nb_saved: number;
  saved: boolean;
}

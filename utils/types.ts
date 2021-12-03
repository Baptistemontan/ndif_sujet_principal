import { DocumentReference } from "firebase/firestore";

export interface IBoat {
  id: string;
  name: string;
  type: string;
}

export interface IBoatFirestore {
  nom: string;
  type: string;
}

export interface ISavior {
  id: string;
  name: string;
  first_name: string;
  role: string;
  naissance: string;
  mort: Date;
  lieu_naissance: string;
  lieu_mort: string;
  lieu_marriage: string;
  conjoint: string;
}

export interface ISaviorFirestore {
  nom: string;
  prenom: string;
  role: string;
  naissance: string;
  mort: Date;
  lieu_naissance: string;
  lieu_mort: string;
  lieu_marriage: string;
  conjoint: string;
}

export interface ISauvetageBase {
  id: string;
  date: string;
  location: string;
  nb_dead: number;
  saved: boolean;
}

export interface ISurvivor {
  id: string;
  name: string;
}

export interface ISurvivorFirestore {
  nom: string;
}

export interface ISauvetage extends ISauvetageBase {
  boat: IBoat;
  savior: ISavior[];
  survivor: ISurvivor[];
}

export interface ISauvetageRef extends ISauvetageBase {
  boat: DocumentReference<IBoatFirestore>;
  savior: DocumentReference<ISaviorFirestore>[];
  survivor: DocumentReference<ISurvivorFirestore>[];
}
export interface ISauvetageFirestore {
  bateau: DocumentReference<IBoatFirestore>;
  sauveteur: DocumentReference<ISaviorFirestore>[];
  survivor: DocumentReference<ISurvivorFirestore>[];
  date: string;
  lieu: string;
  dead: number;
  nb_sauves: number;
  sauve: boolean;
}

// TgfeRlnvbkO9n72kD94O bato
// zL1pzx7aYfz5AJdQcLHY sauvetor

import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export interface IBoat {
  id: string;
  name: string;
  type: string;
}

export interface IBoatFirestore {
  id: string;
  nom: string;
  type: string;
}

export const boatConverter = {
  toFirestore: (boat: IBoat) => {
    return {
      name: boat.name,
      type: boat.type,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<IBoatFirestore>,
    options?: SnapshotOptions,
  ): IBoat => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.nom,
      type: data.type,
    };
  },
};

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
  id: string;
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
export const saviorConverter = {
  toFirestore: (savior: ISavior) => {
    return {
      name: savior.name,
      first_name: savior.first_name,
      role: savior.role,
      naissance: savior.naissance,
      mort: savior.mort,
      lieu_naissance: savior.lieu_naissance,
      lieu_mort: savior.lieu_mort,
      lieu_marriage: savior.lieu_marriage,
      conjoint: savior.conjoint
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<ISaviorFirestore>,
    options?: SnapshotOptions,
  ): ISavior => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.nom,
      first_name: data.prenom,
      role: data.role,
      naissance: data.naissance,
      mort: data.mort,
      lieu_naissance: data.lieu_naissance,
      lieu_mort: data.lieu_mort,
      lieu_marriage: data.lieu_marriage,
      conjoint: data.conjoint
    };
  },
};


export interface ISauvetage {
  id: string;
  boat: IBoat;
  savior: ISavior;
  date: string;
  location: string;
  nb_dead: number;
  nb_saved: number;
  saved: boolean;
}
export interface ISauvetageFirestore {
  id: string;
  bateau: IBoatFirestore;
  sauveteur: ISaviorFirestore;
  date: string;
  lieu: string;
  nb_morts: number;
  nb_sauves: number;
  sauve: boolean;
}
export const sauvetageConverter = {
  toFirestore: (sauvetage: ISauvetage) => {
    return {
      bateau: sauvetage.boat,
      date: sauvetage.date,
      lieu: sauvetage.location,
      nb_morts: sauvetage.nb_dead,
      nb_sauves: sauvetage.nb_saved,
      sauve: sauvetage.saved,
      sauveteur: sauvetage.savior,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<ISauvetageFirestore>,
    options?: SnapshotOptions,
  ): ISauvetage => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      boat: data.bateau,
      date: data.date,
      location: data.lieu,
      nb_dead: data.nb_morts,
      nb_saved: data.nb_sauves,
      saved: data.sauve,
      savior: data.sauveteur,
    };
  },
};

// TgfeRlnvbkO9n72kD94O bato
// zL1pzx7aYfz5AJdQcLHY sauvetor

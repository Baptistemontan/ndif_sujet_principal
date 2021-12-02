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
}

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

// TgfeRlnvbkO9n72kD94O bato
// zL1pzx7aYfz5AJdQcLHY sauvetor

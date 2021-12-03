import {
  FirestoreDataConverter,
  getDoc,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import {
  IBoat,
  IBoatFirestore,
  ISauvetage,
  ISauvetageFirestore,
  ISauvetageRef,
  ISavior,
  ISaviorFirestore,
  ISurvivor,
  ISurvivorFirestore,
} from "./types";

export const boatConverter: FirestoreDataConverter<IBoat> = {
  toFirestore: (boat) => {
    return {
      name: boat.name,
      type: boat.type,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<IBoatFirestore>,
    options?: SnapshotOptions,
  ) => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.nom,
      type: data.type,
    };
  },
};

export const saviorConverter: FirestoreDataConverter<ISavior> = {
  toFirestore: (savior) => {
    return {
      name: savior.name,
      first_name: savior.first_name,
      role: savior.role,
      naissance: savior.naissance,
      mort: savior.mort,
      lieu_naissance: savior.lieu_naissance,
      lieu_mort: savior.lieu_mort,
      lieu_marriage: savior.lieu_marriage,
      conjoint: savior.conjoint,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<ISaviorFirestore>,
    options?: SnapshotOptions,
  ) => {
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
      conjoint: data.conjoint,
    };
  },
};
export const survivorConverter: FirestoreDataConverter<ISurvivor> = {
  toFirestore: (boat) => {
    return {
      name: boat.name,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<ISurvivorFirestore>,
    options?: SnapshotOptions,
  ) => {
    console.log(snapshot.data(options));
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      name: data.name,
    };
  },
};

export const sauvetageConverter: FirestoreDataConverter<ISauvetageRef> = {
  toFirestore: (sauvetage) => {
    return {
      bateau: sauvetage.boat,
      date: sauvetage.date,
      lieu: sauvetage.location,
      nb_morts: sauvetage.nb_dead,
      survivor: sauvetage.survivor,
      sauve: sauvetage.saved,
      sauveteur: sauvetage.savior,
    };
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<ISauvetageFirestore>,
    options?: SnapshotOptions,
  ) => {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      boat: data.bateau,
      date: data.date,
      location: data.lieu,
      nb_dead: data.dead,
      survivor: data.survivor,
      saved: data.sauve,
      savior: data.sauveteur,
    };
  },
};

export async function sauvetageRefConverter(
  sauvetage: ISauvetageRef,
): Promise<ISauvetage | null> {
  const bateauSnap = await getDoc<IBoatFirestore>(sauvetage.boat);
  if (!bateauSnap.exists()) return null;
  const sauveteursSnaps = await Promise.all(
    sauvetage.savior.map((s) => getDoc<ISaviorFirestore>(s)),
  );
  const sauveteurs = sauveteursSnaps.map((s) => {
    if (!s.exists()) return null;
    return saviorConverter.fromFirestore(s);
  });

  if (sauveteurs.some((s) => s === null)) return null;

  const survivorsSnaps = await Promise.all(
    sauvetage.survivor.map((s) => getDoc<ISurvivorFirestore>(s)),
  );

  const survivors = survivorsSnaps.map((s) => {
    if (!s.exists()) return null;
    return survivorConverter.fromFirestore(s);
  });

  if (survivors.some((s) => s === null)) return null;

  return {
    ...sauvetage,
    boat: boatConverter.fromFirestore(bateauSnap),
    savior: sauveteurs as ISavior[],
    survivor: survivors as ISurvivor[],
  };
}

import { ISurvivor } from "@utils/types";
import Link from "next/link";

interface Props {
  survivor: ISurvivor;
}

export default function Survivor({ survivor }: Props) {
  return (
    <div>
      <Link href={`/survivant/${survivor.id}`}>{survivor.name}</Link>
    </div>
  );
}

import { IBoat } from "@utils/types";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

interface Props {
  boat: IBoat;
}

export default function Boat({ boat }: Props) {
  const { t } = useTranslation();
  return (
    <div>
      <Link href={`/bateau/${boat.id}`}>{boat.name}</Link>
      <p>{t("boat:type", { type: boat.type })}</p>
    </div>
  );
}

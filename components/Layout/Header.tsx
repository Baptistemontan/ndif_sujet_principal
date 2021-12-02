import Style from "@styles/components/Layout/Header.module.scss";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

type nav_link = {
  link: string;
  local_key: string;
};

const navs: nav_link[] = [
  {
    link: "/about",
    local_key: "common:about",
  },
];

export default function Header() {
  const { t } = useTranslation();

  return (
    <div className={Style.wrapper}>
      <div className={Style.container}>
        <div className={Style.sitename}>
          <h1>
            <Link href="/">Mon Site</Link>
          </h1>
        </div>
        <nav className={Style.nav}>
          {navs.map(({ link, local_key }) => (
            <Link key={local_key} href={link}>
              {t(local_key)}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

import useTranslation from "next-translate/useTranslation";
import Style from "@styles/components/Layout/Footer.module.scss";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { handleEnterKeyDown, openNewTab } from "@utils";

import i18nConfig from "@i18n";
import { useRouter } from "next/dist/client/router";

const { locales } = i18nConfig;

export default function Footer() {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <footer className={Style.wrapper}>
      <div className={Style.content}>
        <div className={Style.locales}>
          <ul>
            {locales.map((locale) => (
              <li key={locale}>
                <Link href={router.asPath} locale={locale}>
                  {locale}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

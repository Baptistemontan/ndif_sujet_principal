import useTranslation from "next-translate/useTranslation";
import Style from "@styles/components/Layout/Footer.module.scss";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { handleEnterKeyDown, openNewTab } from "@utils";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={Style.wrapper}>
      <div className={Style.content}>footer</div>
    </footer>
  );
}

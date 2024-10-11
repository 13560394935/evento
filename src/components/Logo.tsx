import Image from "next/image";
import logo from "./assets/logo.png";

export default function Logo() {
  return <Image src={logo} alt="evento logo" width={53} height={12} />;
}

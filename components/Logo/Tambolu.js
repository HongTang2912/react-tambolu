import React from "react";
import Styles from "./Logo.module.css";
import Image from "next/image";
import TamboluLogo from "/public/images/tambolu_logo.jpg";

export default function Tambolu({ width, height }) {
  return (
    <Image width={width} height={height} src={TamboluLogo} />
  );
}

import Image from "next/image";
import styles from "./page.module.css";
import dynamic from "next/dynamic";
import ImageRecreator from "@/components/ImageRecreator/ImageRecreator";
const ImageInput = dynamic(() => import("@/components/ImageInput/ImageInput"));

export default function Home() {
  return (
    <main className={styles.main}>
      <ImageRecreator />
    </main>
  );
}

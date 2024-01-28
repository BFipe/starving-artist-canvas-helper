import Image from "next/image";
import styles from "./page.module.scss";
import dynamic from "next/dynamic";
import ImageRecreator from "@/components/ImageRecreator/ImageRecreator";
const ImageInput = dynamic(() => import("@/widgets/ImageInput/ImageInput"));

export default function Home() {
  return (
    <main className={styles.main}>
      <ImageRecreator />
    </main>
  );
}

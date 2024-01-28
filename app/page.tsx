import Image from "next/image";
import styles from "./page.module.scss";
import dynamic from "next/dynamic";
const ImageRecreator = dynamic(
  () => import("@/components/ImageRecreator/ImageRecreator")
);

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Canvas Helper v1.0.1 by BFipe</h1>
      <ImageRecreator />
    </main>
  );
}

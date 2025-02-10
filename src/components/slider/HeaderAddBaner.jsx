import styles from "../../../styles/AddBaner.module.css";
import Image from "next/image";
import Link from "next/link";
export default function HeaderAddBaner({ imageSrc }) {
  return (
    <div className={styles.add_baner2}>
      <Link href="" className={styles.add_baner2}>
        <div className={styles.add_baner_image2}></div>
      </Link>
    </div>
  );
}

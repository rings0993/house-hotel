import styles from "./Modal.module.css";

export default function Modal(props) {
  console.log(props.show);

  return <div className={styles.modal}>Hello</div>;
}

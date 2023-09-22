import styles from "./Spinner.module.css";

type SpinnerProps = {
  dimensions: string;
};

function Spinner({ dimensions }: SpinnerProps) {
  return (
    <div className={styles.spinnerContainer}>
      <div
        className={`${dimensions} flex items-center justify-center ${styles.spinner}`}
      ></div>
    </div>
  );
}

export default Spinner;

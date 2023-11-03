type SpinnerProps = {
  dimensions: string;
};

function Spinner({ dimensions }: SpinnerProps) {
  return (
    <div>
      <div
        className={`${dimensions} spinner flex items-center justify-center`}
      ></div>
    </div>
  );
}

export default Spinner;

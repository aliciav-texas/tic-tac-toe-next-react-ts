type Player = "X" | "O" | "BOTH" | null;

const Square = ({
  value,
  onClick,
  winner,
}: {
  value: string | null;
  onClick: () => void;
  winner: string | null;
}) => {
  if (!value)
    return (
      <button className="square" onClick={onClick} disabled={Boolean(winner)} />
    );
  return (
    <button className={`square_${value.toLowerCase()}`} disabled>
      {value}
    </button>
  );
};
export default Square;

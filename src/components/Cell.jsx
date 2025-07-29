export default function Cell({ value, revealed, onClick, onRightClick }) {
  return (
    <button
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick();
      }}
      className={`w-full aspect-square flex items-center justify-center border border-gray-400 text-xl text-gray-950 font-bold select-none
      ${revealed ? 'bg-white' : 'bg-gray-200 hover:bg-gray-300'}
      `}
    >
    {value}
    </button>
  );
}
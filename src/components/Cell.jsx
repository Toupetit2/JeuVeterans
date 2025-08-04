export default function Cell({ value, revealed, onClick, onRightClick, visible, flag}) {
  const isEmpty = revealed && value === '';

  return (
    <button
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick();
      }}
      className={`
        w-full aspect-square flex items-center justify-center border border-gray-400 dark:border-gray-600
        text-xl font-bold select-none
        text-gray-900 dark:text-gray-100
        ${visible ? '' : 'invisible'}
        ${isEmpty 
          ? 'bg-white dark:bg-gray-900/80' 
          : revealed 
            ? 'bg-white dark:bg-gray-900/95' 
            : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}
        
      `}
    >
      {flag ? (<img src="logoVeterans.png" alt="flag" className="w-10" />) : (value)}
    </button>
  );
}

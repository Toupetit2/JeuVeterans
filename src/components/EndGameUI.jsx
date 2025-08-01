import { useState } from 'react';

export default function EndGameUI({ status }) {
  const [visible, setVisible] = useState(true);

  if (status === 'playing' || !visible) return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-xs flex items-center justify-center z-50 text-gray-900 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        <button
          onClick={() => setVisible(false)}
          className="relative bottom-2 left-40 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 text-2xl font-bold leading-none"
          aria-label="Fermer"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {status === 'won' ? '🎉 Tu as gagné !' : '💥 Tu as perdu.'}
        </h2>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Rejouer
        </button>
      </div>
    </div>
  );
}

export default function EndGameUI({ status }) {
  if (status === 'playing') return null;

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-xs flex items-center justify-center z-50 text-gray-950">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">
          {status === 'won' ? '🎉 Tu as gagné !' : '💥 Tu as perdu.'}
        </h2>
        <button
          //onClick={window.location.reload(false)}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Rejouer
        </button>
      </div>
    </div>
  );
}

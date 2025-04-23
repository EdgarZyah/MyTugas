export default function ConfirmModal({ show, title, message, onConfirm, onCancel }) {
    if (!show) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-[#0a192f] p-6 rounded-xl shadow-lg text-gray-200 max-w-sm w-full">
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <p className="text-sm text-gray-400 mb-4">{message}</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg text-gray-400 bg-[#112240] hover:bg-[#0f1d35]"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-[#64ffda] text-[#0a192f] font-bold hover:bg-[#52e6c1]"
            >
              Lanjutkan
            </button>
            
          </div>
        </div>
      </div>
    );
  }
  
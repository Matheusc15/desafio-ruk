import { useState } from 'react';
import { FaRegCopy } from "react-icons/fa";

interface CopyButtonProps {
  token: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ token }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(token)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); 
      })
      .catch(() => alert('Falha ao copiar o token.'));
  };

  return (
    <div className="relative flex items-center space-x-2">
      <input
        type="text"
        value={token}
        readOnly
        className="w-full p-2 rounded-md bg-gray-200"
      />
      <button
        onClick={handleCopy}
        className="p-2 bg-sky-400 text-white rounded-md
        hover:bg-sky-500 hover:scale-105 transition-transform duration-300"
      >
        <FaRegCopy />
      </button>

      {copied && (
        <div className="absolute bottom-[-30px] left-0 w-full text-center bg-gray-700 text-white p-1 rounded-md text-sm">
          Copiado para a área de transferência
        </div>
      )}
    </div>
  );
};

export default CopyButton;
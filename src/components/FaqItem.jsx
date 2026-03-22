import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQItem = ({ 
  question, 
  answer, 
  isOpen: controlledIsOpen, 
  onToggle,
  className = "",
  questionClassName = "",
  answerClassName = "",
  showIcon = true,
  iconSize = 20
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  
  // Jeśli komponent jest kontrolowany (controlled), używamy wartości z props
  // w przeciwnym razie używamy stanu wewnętrznego
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else if (controlledIsOpen === undefined) {
      // Tylko jeśli nie jest kontrolowany
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <div className={`border-b border-gray-200 dark:border-gray-700 ${className}`}>
      <button
        onClick={handleToggle}
        className="flex items-center justify-between w-full py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg px-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className={`font-medium text-gray-900 dark:text-gray-100 text-lg ${questionClassName}`}>
          {question}
        </span>
        {showIcon && (
          <span className="ml-4 flex-shrink-0">
            {isOpen ? (
              <FiChevronUp 
                className="text-gray-500 dark:text-gray-400 transition-transform duration-300" 
                size={iconSize}
              />
            ) : (
              <FiChevronDown 
                className="text-gray-500 dark:text-gray-400 transition-transform duration-300" 
                size={iconSize}
              />
            )}
          </span>
        )}
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={`pb-4 px-2 text-gray-600 dark:text-gray-300 ${answerClassName}`}>
          {typeof answer === "string" ? (
            <p className="leading-relaxed">{answer}</p>
          ) : (
            answer
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
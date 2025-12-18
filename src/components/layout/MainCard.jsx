import { useNavigate } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

export default function MainCard({ 
    children, 
    navigateTo, 
    scrollable = false,
    title, 
    containerPadding = "p-4",
    headerTextSize = "text-sm"
}) {
    const navigate = useNavigate();
    
    const contentClasses = scrollable 
        ? "space-y-1 h-[200px] overflow-y-auto p-4" 
        : "p-4";
    
    const titleClasses = scrollable 
        ? `${headerTextSize} text-gray-500 font-bold` 
        : `text-xs text-gray-500 font-bold mb-2 pr-8`;
    
    return (
        <div className={`container mx-auto ${containerPadding}`}>
            <div className="bg-white static-border static-border-blue rounded-xl relative shadow-md">
                <div className="p-4 static-border-b static-border-blue rounded-t-xl">
                    {navigateTo && (
                        <button
                            onClick={() => navigate(navigateTo)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
                        >
                            <FiChevronRight size={20} />
                        </button>
                    )}
                    <h2 className='ttext-sm ext-gray-500 font-bold'>{title}</h2>
                </div>
                <div className={contentClasses}>
                    {children}
                </div>
            </div>
        </div>
    )
}
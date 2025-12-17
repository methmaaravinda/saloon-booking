import { useRef, useEffect } from 'react'
import { IoChevronBack } from 'react-icons/io5'

export default function SearchableFooter({ onFocus, query, onQueryChange, isSearchActive, onClose }) {
    const footerRef = useRef(null)
    const inputRef = useRef(null)

    const scrollFooterIntoView = () => {
        if (footerRef.current) {
          footerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          })
        }
    }

    // useEffect(() => {
    //     if (!window.visualViewport) return
    
    //     const handleViewportChange = () => {
    //       scrollFooterIntoView()
    //     }
    
    //     // Keyboard open / resize / rotate
    //     window.visualViewport.addEventListener("resize", handleViewportChange)
    //     window.visualViewport.addEventListener("scroll", handleViewportChange)
    
    //     return () => {
    //       window.visualViewport.removeEventListener("resize", handleViewportChange)
    //       window.visualViewport.removeEventListener("scroll", handleViewportChange)
    //     }
    // }, [])

    // Keep focus on input when search is active
    useEffect(() => {
        if (isSearchActive && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isSearchActive])

    // Different styles for top vs bottom positioning
    const footerClasses = isSearchActive
        ? "sticky fixed left-50% top-50% shrink-0 border-b border-gray-800 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 h-16 flex items-center shadow-md"
        : "sticky bottom-0 left-0 right-0 shrink-0 border-t border-gray-800 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 h-16 flex items-center shadow-md"

    return (
        <footer
            ref={footerRef}
            className={footerClasses}
        >
            <div className="flex w-full px-2">
                {/* if search active need to show a back button and it inactive the serch and if search inactive need to show a search button and it active the search */}
                {isSearchActive && (
                    <button 
                        onClick={onClose}
                        className="flex items-center gap-3 pr-2 pl-0 py-2.5"
                    >
                        <IoChevronBack className="w-5 h-5 text-black" />
                    </button>
                )}
                <div className="flex items-center gap-3 bg-white border-2 border-gray-900 rounded-lg px-5 py-2.5 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
                    <svg
                        className="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search services..."
                        value={query}
                        onChange={(e) => onQueryChange(e.target.value)}
                        onFocus={onFocus}
                        className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500 text-gray-900"
                    />
                </div>
            </div>
        </footer>
    )
}
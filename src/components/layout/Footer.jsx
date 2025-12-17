import { useRef, useEffect, useState } from 'react'

export default function SearchableFooter() {
    const footerRef = useRef(null)
    const [query, setQuery] = useState("")

    // Example options – replace with real data / API later if needed
    const options = [
        "Haircut",
        "Hair coloring",
        "Manicure",
        "Pedicure",
        "Facial",
        "Massage",
    ]

    const filteredOptions =
        query.trim().length === 0
            ? []
            : options.filter((opt) =>
                  opt.toLowerCase().includes(query.toLowerCase())
              )

    const scrollFooterIntoView = () => {
        if (footerRef.current) {
          footerRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          })
        }
    }
    useEffect(() => {
        if (!window.visualViewport) return
    
        const handleViewportChange = () => {
          scrollFooterIntoView()
        }
    
        // Keyboard open / resize / rotate
        window.visualViewport.addEventListener("resize", handleViewportChange)
        window.visualViewport.addEventListener("scroll", handleViewportChange)
    
        return () => {
          window.visualViewport.removeEventListener("resize", handleViewportChange)
          window.visualViewport.removeEventListener("scroll", handleViewportChange)
        }
    }, [])

    return (
        <>
            {/* Dropdown appears ABOVE the footer since this is a footer search */}
            {filteredOptions.length > 0 && (
                <div className="fixed inset-0 z-30 flex items-end justify-center pointer-events-none">
                    {/* Blurred/dimmed background only ABOVE the footer, so footer stays sharp */}
                    <div className="absolute inset-x-0 top-0 bottom-16 bg-slate-900/30 backdrop-blur-sm" />

                    {/* Results container sitting just above the footer */}
                    <div className="relative w-full max-w-3xl px-4 pb-0 mb-20 pointer-events-auto">
                        <div className="bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-800/95 border border-slate-700 rounded-md shadow-[0_18px_45px_rgba(15,23,42,0.75)] overflow-hidden">
                            {filteredOptions.map((opt) => (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setQuery(opt)}
                                    className="w-full text-left px-4 py-2.5 text-sm bg-slate-800/90 text-slate-50 hover:bg-slate-700 border-b last:border-b-0 border-slate-700/70"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <footer
                ref={footerRef}
                className="shrink-0 border-t border-gray-800 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 h-16 flex items-center shadow-md"
            >
                <div className="max-w-3xl mx-auto w-full px-2">
                    <div className="flex items-center gap-3 bg-white border-2 border-gray-900 rounded-lg px-5 py-2.5 shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                            type="text"
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-500 text-gray-900"
                        />
                    </div>
                </div>
            </footer>
        </>
    )
}
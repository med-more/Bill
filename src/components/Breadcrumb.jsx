import { Link } from "react-router-dom"

export default function Breadcrumb({ items }) {
  if (!items || items.length === 0) return null
  
  return (
    <nav className="flex items-center gap-2 text-sm mb-4" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-amber-500 font-semibold">/</span>}
          {item.path ? (
            <Link
              to={item.path}
              className="text-amber-400 hover:text-amber-300 transition-colors font-semibold hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white font-semibold">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

import { createContext, useContext, useState, useEffect } from "react"

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Charger les favoris depuis localStorage au démarrage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("legendsFavorites")
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites)
        // S'assurer que tous les IDs sont des nombres
        const normalized = parsed.map(id => Number(id))
        console.log("📥 Loading favorites from localStorage:", normalized)
        setFavorites(normalized)
      } catch (error) {
        console.error("Error loading favorites from localStorage", error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Sauvegarder les favoris dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("legendsFavorites", JSON.stringify(favorites))
  }, [favorites])

  // Obtenir le nombre de favoris
  const getFavoritesCount = () => {
    return favorites.length
  }

  // Ajouter un produit aux favoris
  const addToFavorites = (productId) => {
    const id = Number(productId)
    setFavorites(prev => {
      if (!prev.includes(id)) {
        return [...prev, id]
      }
      return prev
    })
  }

  // Retirer un produit des favoris
  const removeFromFavorites = (productId) => {
    const id = Number(productId)
    setFavorites(prev => prev.filter(favId => favId !== id))
  }

  // Toggle favori
  const toggleFavorite = (productId) => {
    const id = Number(productId)
    console.log("🔄 FavoritesContext - toggleFavorite called")
    console.log("🔄 Input productId:", productId, "Type:", typeof productId)
    console.log("🔄 Converted id:", id, "Type:", typeof id)
    console.log("🔄 Current favorites before toggle:", favorites)
    setFavorites(prev => {
      const isCurrentlyFavorite = prev.includes(id)
      console.log("🔄 Is currently favorite?", isCurrentlyFavorite)
      const newFavorites = isCurrentlyFavorite
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
      console.log("💾 New favorites array:", newFavorites)
      console.log("💾 New favorites array length:", newFavorites.length)
      return newFavorites
    })
  }

  // Vérifier si un produit est en favori
  const isFavorite = (productId) => {
    return favorites.includes(Number(productId))
  }

  // Vider les favoris
  const clearFavorites = () => {
    setFavorites([])
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        getFavoritesCount,
        isLoaded,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}

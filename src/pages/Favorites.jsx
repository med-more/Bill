import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingCart, Star, Heart, X, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ScrollToTop from "../components/ScrollToTop"
import Breadcrumb from "../components/Breadcrumb"
import { useCart } from "../context/CartContext"
import { useFavorites } from "../context/FavoritesContext"
import { productsData, categories } from "../data/productsData"

export default function Favorites() {
  const { favorites = [], toggleFavorite, isFavorite, clearFavorites, isLoaded } = useFavorites()
  const { addToCart: addToCartContext, setShowCartSidebar } = useCart()
  const [favoriteProducts, setFavoriteProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showNotifications, setShowNotifications] = useState([])

  // Filtrer les produits favoris
  useEffect(() => {
    // Attendre que les favoris soient chargés depuis localStorage
    if (!isLoaded) {
      console.log("⏳ Waiting for favorites to load...")
      return
    }

    console.log("🔍 Favorites useEffect triggered")
    console.log("Favorites:", favorites, "Type:", typeof favorites, "Is Array:", Array.isArray(favorites))
    console.log("ProductsData:", productsData, "Length:", productsData?.length)
    
    if (!favorites || favorites.length === 0) {
      console.log("❌ No favorites, clearing products")
      setFavoriteProducts([])
      return
    }

    if (!productsData || productsData.length === 0) {
      console.log("❌ No productsData, clearing products")
      setFavoriteProducts([])
      return
    }

    // Convertir les IDs des favoris en nombres
    const favoriteIds = favorites.map(id => Number(id))
    console.log("Favorite IDs (from context):", favoriteIds)
    console.log("All product IDs:", productsData.map(p => ({ id: p.id, type: typeof p.id, name: p.name })))
    
    // Filtrer les produits - comparer les IDs comme nombres
    let filtered = productsData.filter(product => {
      const productId = Number(product.id)
      const isMatch = favoriteIds.includes(productId)
      if (!isMatch) {
        console.log(`❌ Product ${product.name}: ID=${productId} NOT in favorites [${favoriteIds.join(', ')}]`)
      } else {
        console.log(`✅ Found match: ${product.name} (ID: ${productId})`)
      }
      return isMatch
    })

    console.log(`📦 Filtered ${filtered.length} products from ${productsData.length} total products`)
    console.log("Filtered products:", filtered.map(p => ({ id: p.id, name: p.name })))

    // Filtrer par recherche si nécessaire
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    console.log(`✅ Setting ${filtered.length} favorite products`)
    setFavoriteProducts(filtered)
  }, [favorites, searchQuery, isLoaded])

  // Show notification
  const showNotification = (message, type = "success") => {
    const id = Date.now()
    setShowNotifications(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setShowNotifications(prev => prev.filter(n => n.id !== id))
    }, 3000)
  }

  const addToCart = (product) => {
    if (!product.inStock) {
      showNotification("Ce produit n'est pas disponible", "error")
      return
    }
    
    addToCartContext(product)
    showNotification(`${product.name} ajouté au panier`)
    setShowCartSidebar(true)
  }

  const handleToggleFavorite = (productId) => {
    const product = productsData.find(p => p.id === productId)
    toggleFavorite(productId)
    showNotification(`${product?.name} retiré des favoris`)
  }

  const handleClearAll = () => {
    clearFavorites()
    showNotification("Tous les favoris ont été supprimés")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div className="text-white min-h-screen relative overflow-x-hidden bg-black">
      <Header />
      
      {/* Notifications Toast */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        <AnimatePresence>
          {showNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`px-6 py-3 rounded-lg shadow-lg backdrop-blur-sm ${
                notification.type === "error"
                  ? "bg-red-500/90 text-white"
                  : "bg-amber-500/90 text-slate-950"
              } font-medium`}
            >
              {notification.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-black to-black" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Breadcrumb 
              items={[
                { label: "Home", path: "/" },
                { label: "Favorites" }
              ]} 
            />
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center gap-3">
                  <Heart className="w-8 h-8 md:w-10 md:h-10 text-red-500 fill-red-500" />
                  Mes Favoris
                </h1>
                <p className="text-gray-400 text-sm">
                  {favoriteProducts.length} produit{favoriteProducts.length > 1 ? 's' : ''} favori{favoriteProducts.length > 1 ? 's' : ''}
                  {favorites.length > 0 && favoriteProducts.length === 0 && (
                    <span className="text-red-400 ml-2">({favorites.length} favori{favorites.length > 1 ? 's' : ''} enregistré{favorites.length > 1 ? 's' : ''} - IDs: {favorites.join(', ')})</span>
                  )}
                </p>
              </div>
              {favoriteProducts.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-semibold flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Tout supprimer</span>
                  <span className="sm:hidden">Supprimer</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          {favoriteProducts.length > 0 && (
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher dans vos favoris..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-amber-600/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>
          )}

          {/* Products Grid */}
          {console.log("🔍 Render check - isLoaded:", isLoaded, "favoriteProducts.length:", favoriteProducts.length, "favorites.length:", favorites.length)}
          {!isLoaded ? (
            <div className="text-center py-20">
              <p className="text-gray-400">Chargement des favoris...</p>
            </div>
          ) : favoriteProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className={`flex justify-center ${searchQuery || favorites.length > 0 ? "mb-6" : "mb-12"}`}>
                {searchQuery || favorites.length > 0 ? (
                  <div className="relative">
                    <Heart className="w-24 h-24 text-gray-700 mx-auto" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Heart className="w-12 h-12 text-red-500/30" />
                    </div>
                  </div>
                ) : (
                  <img 
                    src="/empty.svg" 
                    alt="Aucun favori" 
                    className="w-64 h-64 mx-auto opacity-80"
                  />
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-300 mb-2">
                {searchQuery ? "Aucun résultat trouvé" : favorites.length > 0 ? "Produits non trouvés" : "Aucun favori pour le moment"}
              </h2>
              <p className="text-gray-500 mb-6">
                {searchQuery 
                  ? "Essayez une autre recherche" 
                  : favorites.length > 0
                  ? `Vous avez ${favorites.length} favori(s) mais les produits ne sont pas trouvés dans la base de données.`
                  : "Commencez à ajouter des produits à vos favoris pour les retrouver facilement"}
              </p>
              {!searchQuery && (
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Découvrir la boutique
                </Link>
              )}
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {console.log("🎨 Rendering products grid with", favoriteProducts.length, "products")}
              {favoriteProducts.map((product) => {
                console.log("🎨 Rendering product:", product.id, product.name)
                return (
                <div
                  key={product.id}
                  className="group relative bg-slate-900/50 border border-amber-600/20 rounded-lg overflow-hidden hover:border-amber-500/50 transition-all"
                >
                  {/* Discount Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-amber-500 text-slate-950 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-bold">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                    </div>
                  )}

                  {/* Favorite Badge */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
                    <button
                      onClick={() => handleToggleFavorite(product.id)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-500/90 backdrop-blur-sm flex items-center justify-center hover:bg-red-500 transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white" />
                    </button>
                  </div>

                  {/* Product Image */}
                  <div 
                    className="relative aspect-square overflow-hidden bg-slate-800 cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-2 sm:p-3 lg:p-4 space-y-1 sm:space-y-2">
                    {/* Category */}
                    <div className="text-[9px] sm:text-xs text-amber-400 font-medium uppercase line-clamp-1">
                      {categories.find(c => c.id === product.category)?.name || product.category}
                    </div>

                    {/* Product Name */}
                    <h3 className="text-xs sm:text-base font-semibold text-white line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] leading-tight">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <Star className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-[9px] sm:text-xs text-gray-400">
                        {product.rating}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                      <span className="text-sm sm:text-lg font-bold text-amber-500">
                        {product.price} DH
                      </span>
                      {product.originalPrice && (
                        <span className="text-[10px] sm:text-sm text-gray-500 line-through">
                          {product.originalPrice} DH
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        className="flex-1 py-1.5 sm:py-2 bg-amber-500 text-slate-950 font-semibold rounded hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[10px] sm:text-sm"
                      >
                        Ajouter
                      </button>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="px-2 sm:px-3 py-1.5 sm:py-2 bg-slate-800/50 border border-amber-600/20 text-amber-400 rounded hover:bg-slate-700 transition-colors"
                      >
                        <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )})}
            </div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-amber-600/30"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/90 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Product Image */}
                <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-800">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedProduct.featured && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 px-3 py-1 rounded text-xs font-bold">
                      Vedette
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm text-gray-400">
                      {selectedProduct.rating} ({selectedProduct.reviews} avis)
                    </span>
                  </div>

                  {/* Product Name */}
                  <h2 className="text-2xl font-bold text-white">
                    {selectedProduct.name}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-300 text-sm">
                    {selectedProduct.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-amber-500">
                      {selectedProduct.price} DH
                    </span>
                    {selectedProduct.originalPrice && (
                      <>
                        <span className="text-xl text-gray-500 line-through">
                          {selectedProduct.originalPrice} DH
                        </span>
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-bold">
                          -{Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}%
                        </span>
                      </>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div>
                    <span
                      className={`inline-block text-sm px-3 py-1.5 rounded ${
                        selectedProduct.inStock
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {selectedProduct.inStock ? "✓ En stock" : "✗ Rupture"}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-2">
                    <button
                      onClick={() => {
                        addToCart(selectedProduct)
                        setSelectedProduct(null)
                      }}
                      disabled={!selectedProduct.inStock}
                      className="w-full py-3 bg-amber-500 text-slate-950 font-semibold rounded hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Ajouter au panier
                    </button>

                    <button
                      onClick={() => {
                        handleToggleFavorite(selectedProduct.id)
                        setSelectedProduct(null)
                      }}
                      className="w-full py-2.5 border border-red-500 text-red-500 rounded font-semibold transition-colors text-sm hover:bg-red-500/10 flex items-center justify-center gap-2"
                    >
                      <Heart className="w-4 h-4 fill-red-500" />
                      Retirer des favoris
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

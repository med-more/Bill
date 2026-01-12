import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingCart, Star, Filter, X, Heart, Minus, Plus, Trash2, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight, SortAsc, SortDesc } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ScrollToTop from "../components/ScrollToTop"
import Breadcrumb from "../components/Breadcrumb"
import { useCart } from "../context/CartContext"
import { useFavorites } from "../context/FavoritesContext"
import { productsData as sharedProductsData, categories as sharedCategories } from "../data/productsData"

export default function Shop() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const { cart, addToCart: addToCartContext, removeFromCart: removeFromCartContext, updateCartQuantity: updateCartQuantityContext, getCartTotal, getCartItemCount, showCartSidebar, setShowCartSidebar } = useCart()
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [minRating, setMinRating] = useState(0)
  const [showNotifications, setShowNotifications] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 10

  // Use shared products data
  const productsData = sharedProductsData

  // Use shared categories
  const categories = sharedCategories.map(cat => ({
    ...cat,
    count: cat.id === "all" 
      ? productsData.length 
      : productsData.filter(p => p.category === cat.id).length
  }))

  useEffect(() => {
    setProducts(productsData)
    setFilteredProducts(productsData)
  }, [])

  // Show notification
  const showNotification = (message, type = "success") => {
    const id = Date.now()
    setShowNotifications(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setShowNotifications(prev => prev.filter(n => n.id !== id))
    }, 3000)
  }


  useEffect(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Filter by rating
    if (minRating > 0) {
      filtered = filtered.filter(product => product.rating >= minRating)
    }

    // Sort products
    switch (sortBy) {
      case "price-asc":
        filtered = [...filtered].sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered = [...filtered].sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating)
        break
      case "name":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
        break
      case "featured":
      default:
        filtered = [...filtered].sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return 0
        })
        break
    }

    setFilteredProducts(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [selectedCategory, searchQuery, products, priceRange, minRating, sortBy])

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const endIndex = startIndex + productsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

  const addToCart = (product) => {
    if (!product.inStock) {
      showNotification("Ce produit n'est pas disponible", "error")
      return
    }
    
    const existingItem = cart.find(item => item.id === product.id)
    if (existingItem) {
      showNotification(`${product.name} ajouté au panier (x${existingItem.quantity + 1})`)
    } else {
      showNotification(`${product.name} ajouté au panier`)
    }
    
    addToCartContext(product)
    setShowCartSidebar(true)
  }

  const removeFromCart = (productId) => {
    const product = cart.find(item => item.id === productId)
    showNotification(`${product?.name} retiré du panier`)
    removeFromCartContext(productId)
  }

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    updateCartQuantityContext(productId, quantity)
  }

  const handleToggleFavorite = (productId) => {
    console.log("🛒 Shop - handleToggleFavorite called with productId:", productId, "Type:", typeof productId)
    const product = products.find(p => p.id === productId)
    console.log("🛒 Shop - Found product:", product ? { id: product.id, name: product.name } : "NOT FOUND")
    const wasFavorite = isFavorite(productId)
    console.log("🛒 Shop - Was favorite?", wasFavorite)
    console.log("🛒 Shop - Calling toggleFavorite with:", productId)
    toggleFavorite(productId)
    if (wasFavorite) {
      showNotification(`${product?.name} retiré des favoris`)
    } else {
      showNotification(`${product?.name} ajouté aux favoris`)
    }
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


      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {showCartSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCartSidebar(false)}
              className="fixed inset-0 bg-black/80 z-40"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-slate-900 border-l border-amber-600/30 z-50 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-amber-600/30 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Panier ({getCartItemCount()})
                </h2>
                <button
                  onClick={() => setShowCartSidebar(false)}
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Votre panier est vide</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-800/50 rounded-lg p-4 border border-amber-600/20"
                      >
                        <div className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-white mb-1">{item.name}</h3>
                            <p className="text-amber-500 font-bold mb-2">{item.price} DH</p>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto w-8 h-8 rounded bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center text-red-400"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-amber-600/30 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total:</span>
                    <span className="text-2xl font-bold text-amber-500">
                      {getCartTotal().toFixed(2)} DH
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      showNotification("Fonctionnalité de checkout à venir!", "error")
                    }}
                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all transform hover:scale-105"
                  >
                    Commander maintenant
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
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
                { label: "Shop" }
              ]} 
            />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Shop
            </h1>
          </motion.div>

        </div>
      </section>

      {/* Main Shop Layout with Sidebar */}
      <section className="relative py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4 flex items-center justify-between gap-4">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900/50 border border-amber-600/20 rounded-lg text-white hover:bg-slate-800/50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="font-semibold">Filtres</span>
            </button>
            <div className="text-xs text-gray-400">
              {filteredProducts.length} résultat{filteredProducts.length > 1 ? 's' : ''}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Filters - Desktop Only */}
            <aside className="hidden lg:block lg:w-80 flex-shrink-0">
              <div className="bg-slate-900/50 border border-amber-600/20 rounded-lg p-6 space-y-6 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-4">Filtres</h2>
                
                {/* Search */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Rechercher</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-amber-600/20 rounded text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Par Catégories</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category.id}
                          onChange={() => setSelectedCategory(category.id)}
                          className="w-4 h-4 text-amber-500 bg-slate-800 border-amber-600/30 focus:ring-amber-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                          {category.name} ({category.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Prix</label>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>{priceRange[0]} DH</span>
                      <span>{priceRange[1]} DH</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Note</label>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="rating"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="w-4 h-4 text-amber-500 bg-slate-800 border-amber-600/30 focus:ring-amber-500 focus:ring-2"
                        />
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < rating
                                  ? "text-amber-500 fill-amber-500"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                          {rating} Star{rating > 1 ? "s" : ""}
                        </span>
                      </label>
                    ))}
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === 0}
                        onChange={() => setMinRating(0)}
                        className="w-4 h-4 text-amber-500 bg-slate-800 border-amber-600/30 focus:ring-amber-500 focus:ring-2"
                      />
                      <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                        Toutes
                      </span>
                    </label>
                  </div>
                </div>

                {/* Featured Products */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Promotions</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={sortBy === "featured"}
                        onChange={(e) => e.target.checked && setSortBy("featured")}
                        className="w-4 h-4 text-amber-500 bg-slate-800 border-amber-600/30 focus:ring-amber-500 focus:ring-2 rounded"
                      />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        En vedette
                      </span>
                    </label>
                  </div>
                </div>

                {/* Stock Availability */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Disponibilité</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={true}
                        readOnly
                        className="w-4 h-4 text-amber-500 bg-slate-800 border-amber-600/30 focus:ring-amber-500 focus:ring-2 rounded"
                      />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        En stock
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Side - Products */}
            <div className="flex-1">
              {/* Top Bar with Results and Sort */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 lg:mb-6">
                <div className="text-xs sm:text-sm text-gray-400 hidden sm:block">
                  Affichage de {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} sur {filteredProducts.length} résultats
                </div>
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <span className="text-xs sm:text-sm text-gray-400">Trier:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 bg-slate-800/50 border border-amber-600/20 rounded text-white focus:outline-none focus:border-amber-500 transition-colors appearance-none cursor-pointer text-xs sm:text-sm"
                  >
                    <option value="featured">Par défaut</option>
                    <option value="price-asc">Prix: Croissant</option>
                    <option value="price-desc">Prix: Décroissant</option>
                    <option value="rating">Meilleure note</option>
                    <option value="name">Nom: A-Z</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-6">🔍</div>
                  <p className="text-2xl font-bold text-gray-300 mb-2">Aucun produit trouvé</p>
                  <p className="text-gray-500 mb-6">Essayez d'ajuster vos filtres</p>
                  <button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("all")
                      setPriceRange([0, 1000])
                      setMinRating(0)
                    }}
                    className="px-6 py-3 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 transition-colors"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              ) : (
                <>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
              {paginatedProducts.map((product) => (
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

                  {/* Action Icons - Top Right */}
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex flex-row sm:flex-col gap-1.5 sm:gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        console.log("🖱️ Button clicked - Product:", { id: product.id, name: product.name })
                        handleToggleFavorite(product.id)
                      }}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                          isFavorite(product.id)
                            ? "text-red-500 fill-red-500"
                            : "text-gray-700"
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700" />
                    </button>
                  </div>

                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-slate-800">
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

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="w-full py-1 sm:py-2 bg-amber-500 text-slate-950 font-semibold rounded hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-[10px] sm:text-sm"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 bg-slate-800/50 border border-amber-600/20 rounded text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {/* First page */}
                      {currentPage > 2 && (
                        <>
                          <button
                            onClick={() => setCurrentPage(1)}
                            className="px-3 py-2 bg-slate-800/50 border border-amber-600/20 rounded text-white hover:bg-slate-700 transition-colors"
                          >
                            1
                          </button>
                          {currentPage > 3 && (
                            <span className="px-2 text-gray-400">...</span>
                          )}
                        </>
                      )}

                      {/* Previous page */}
                      {currentPage > 1 && (
                        <button
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="px-3 py-2 bg-slate-800/50 border border-amber-600/20 rounded text-white hover:bg-slate-700 transition-colors"
                        >
                          {currentPage - 1}
                        </button>
                      )}

                      {/* Current page */}
                      <button
                        className="px-3 py-2 bg-amber-500 text-slate-950 font-semibold rounded border border-amber-500"
                      >
                        {currentPage}
                      </button>

                      {/* Next page */}
                      {currentPage < totalPages && (
                        <button
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="px-3 py-2 bg-slate-800/50 border border-amber-600/20 rounded text-white hover:bg-slate-700 transition-colors"
                        >
                          {currentPage + 1}
                        </button>
                      )}

                      {/* Last page */}
                      {currentPage < totalPages - 1 && (
                        <>
                          {currentPage < totalPages - 2 && (
                            <span className="px-2 text-gray-400">...</span>
                          )}
                          <button
                            onClick={() => setCurrentPage(totalPages)}
                            className="px-3 py-2 bg-slate-800/50 border border-amber-600/20 rounded text-white hover:bg-slate-700 transition-colors"
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 bg-slate-800/50 border border-amber-600/20 rounded text-white hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/80 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-full max-w-sm bg-slate-900 border-r border-amber-600/30 z-50 flex flex-col shadow-2xl lg:hidden"
            >
              <div className="p-4 border-b border-amber-600/30 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Filtres</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {/* Search */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Rechercher</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-amber-600/20 rounded text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Par Catégories</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="category-mobile"
                          checked={selectedCategory === category.id}
                          onChange={() => setSelectedCategory(category.id)}
                          className="w-4 h-4 text-amber-500 bg-slate-800 border-amber-600/30 focus:ring-amber-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                          {category.name} ({category.count})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Prix</label>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>{priceRange[0]} DH</span>
                      <span>{priceRange[1]} DH</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-amber-500"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Note</label>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="rating-mobile"
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="w-4 h-4 text-amber-500 bg-slate-800 border-amber-600/30 focus:ring-amber-500 focus:ring-2"
                        />
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < rating
                                  ? "text-amber-500 fill-amber-500"
                                  : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                          {rating} Star{rating > 1 ? "s" : ""}
                        </span>
                      </label>
                    ))}
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="rating-mobile"
                        checked={minRating === 0}
                        onChange={() => setMinRating(0)}
                        className="w-4 h-4 text-amber-500 bg-slate-800 border-amber-600/30 focus:ring-amber-500 focus:ring-2"
                      />
                      <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
                        Toutes
                      </span>
                    </label>
                  </div>
                </div>

                {/* Featured Products */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Promotions</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={sortBy === "featured"}
                        onChange={(e) => e.target.checked && setSortBy("featured")}
                        className="w-4 h-4 text-amber-500 bg-slate-800 border-amber-600/30 focus:ring-amber-500 focus:ring-2 rounded"
                      />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        En vedette
                      </span>
                    </label>
                  </div>
                </div>

                {/* Stock Availability */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Disponibilité</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={true}
                        readOnly
                        className="w-4 h-4 text-amber-500 bg-slate-800 border-amber-600/30 focus:ring-amber-500 focus:ring-2 rounded"
                      />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        En stock
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-amber-600/30 space-y-3">
                <button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setPriceRange([0, 1000])
                    setMinRating(0)
                    setSortBy("featured")
                  }}
                  className="w-full py-2.5 bg-slate-800/50 border border-amber-600/20 text-white font-semibold rounded hover:bg-slate-700 transition-colors text-sm"
                >
                  Réinitialiser
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="w-full py-2.5 bg-amber-500 text-slate-950 font-semibold rounded hover:bg-amber-400 transition-colors text-sm"
                >
                  Appliquer les filtres
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Simple Product Detail Modal */}
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
                      onClick={() => handleToggleFavorite(selectedProduct.id)}
                      className={`w-full py-2.5 border rounded font-semibold transition-colors text-sm ${
                        isFavorite(selectedProduct.id)
                          ? "border-red-500 text-red-500 hover:bg-red-500/10"
                          : "border-amber-600/50 text-amber-500 hover:border-amber-500"
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Heart
                          className={`w-4 h-4 ${
                            isFavorite(selectedProduct.id)
                              ? "fill-red-500"
                              : ""
                          }`}
                        />
                        {isFavorite(selectedProduct.id)
                          ? "Retirer des favoris"
                          : "Ajouter aux favoris"}
                      </span>
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


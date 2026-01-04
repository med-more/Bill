import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingCart, Star, Filter, X, Heart } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ScrollToTop from "../components/ScrollToTop"

export default function Shop() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)

  // Sample products data
  const productsData = [
    {
      id: 1,
      name: "Professional Pool Cue",
      category: "equipment",
      price: 299,
      originalPrice: 349,
      image: "/images/1.jpg",
      rating: 4.8,
      reviews: 124,
      description: "Premium carbon fiber cue with leather grip",
      inStock: true,
      featured: true,
    },
    {
      id: 2,
      name: "Championship Billiard Balls Set",
      category: "equipment",
      price: 89,
      image: "/images/2.jpg",
      rating: 4.9,
      reviews: 89,
      description: "Tournament-grade phenolic resin balls",
      inStock: true,
      featured: false,
    },
    {
      id: 3,
      name: "Premium Cue Case",
      category: "accessories",
      price: 149,
      originalPrice: 179,
      image: "/images/3.jpg",
      rating: 4.7,
      reviews: 56,
      description: "Hard-shell protective case with velvet interior",
      inStock: true,
      featured: false,
    },
    {
      id: 4,
      name: "Luxury Table Cloth",
      category: "accessories",
      price: 199,
      image: "/images/4.jpg",
      rating: 4.6,
      reviews: 42,
      description: "Professional-grade felt in multiple colors",
      inStock: true,
      featured: true,
    },
    {
      id: 5,
      name: "Legends Academy T-Shirt",
      category: "merchandise",
      price: 39,
      image: "/images/5.jpg",
      rating: 4.5,
      reviews: 78,
      description: "Premium cotton with embroidered logo",
      inStock: true,
      featured: false,
    },
    {
      id: 6,
      name: "Premium Chalk Set",
      category: "accessories",
      price: 24,
      image: "/images/6.jpg",
      rating: 4.8,
      reviews: 156,
      description: "12-pack of professional billiard chalk",
      inStock: true,
      featured: false,
    },
    {
      id: 7,
      name: "Tournament Rack",
      category: "equipment",
      price: 45,
      image: "/images/1.jpg",
      rating: 4.7,
      reviews: 91,
      description: "Durable wooden rack with precision angles",
      inStock: true,
      featured: false,
    },
    {
      id: 8,
      name: "Legends Academy Hoodie",
      category: "merchandise",
      price: 69,
      originalPrice: 89,
      image: "/images/2.jpg",
      rating: 4.9,
      reviews: 112,
      description: "Premium fleece hoodie with zip-up design",
      inStock: true,
      featured: true,
    },
    {
      id: 9,
      name: "Cue Tip Shaper",
      category: "accessories",
      price: 19,
      image: "/images/3.jpg",
      rating: 4.4,
      reviews: 67,
      description: "Professional tip maintenance tool",
      inStock: true,
      featured: false,
    },
    {
      id: 10,
      name: "Elite Pool Cue Set",
      category: "equipment",
      price: 449,
      originalPrice: 549,
      image: "/images/4.jpg",
      rating: 5.0,
      reviews: 203,
      description: "Professional tournament-grade cue set with case",
      inStock: true,
      featured: true,
    },
    {
      id: 11,
      name: "Billiard Gloves Pack",
      category: "accessories",
      price: 34,
      image: "/images/5.jpg",
      rating: 4.6,
      reviews: 145,
      description: "Set of 3 professional billiard gloves",
      inStock: true,
      featured: false,
    },
    {
      id: 12,
      name: "Legends Academy Cap",
      category: "merchandise",
      price: 29,
      originalPrice: 39,
      image: "/images/6.jpg",
      rating: 4.7,
      reviews: 98,
      description: "Premium snapback cap with embroidered logo",
      inStock: true,
      featured: false,
    },
    {
      id: 13,
      name: "Pool Table Brush",
      category: "accessories",
      price: 27,
      image: "/images/1.jpg",
      rating: 4.5,
      reviews: 76,
      description: "Professional table maintenance brush",
      inStock: true,
      featured: false,
    },
    {
      id: 14,
      name: "Championship Cue Stand",
      category: "equipment",
      price: 79,
      image: "/images/2.jpg",
      rating: 4.8,
      reviews: 134,
      description: "Elegant wooden cue stand for 4 cues",
      inStock: true,
      featured: true,
    },
    {
      id: 15,
      name: "Legends Academy Polo Shirt",
      category: "merchandise",
      price: 49,
      originalPrice: 59,
      image: "/images/3.jpg",
      rating: 4.6,
      reviews: 87,
      description: "Premium polo shirt with embroidered logo",
      inStock: true,
      featured: false,
    },
    {
      id: 16,
      name: "Billiard Ball Cleaner",
      category: "accessories",
      price: 15,
      image: "/images/4.jpg",
      rating: 4.3,
      reviews: 92,
      description: "Professional cleaning solution for billiard balls",
      inStock: true,
      featured: false,
    },
    {
      id: 17,
      name: "Pro Cue Extension",
      category: "equipment",
      price: 89,
      image: "/images/5.jpg",
      rating: 4.7,
      reviews: 56,
      description: "Adjustable cue extension for reach shots",
      inStock: false,
      featured: false,
    },
    {
      id: 18,
      name: "Legends Academy Jacket",
      category: "merchandise",
      price: 99,
      originalPrice: 129,
      image: "/images/6.jpg",
      rating: 4.9,
      reviews: 167,
      description: "Premium windbreaker jacket with logo",
      inStock: true,
      featured: true,
    },
    {
      id: 19,
      name: "Billiard Triangle Rack",
      category: "equipment",
      price: 22,
      image: "/images/1.jpg",
      rating: 4.4,
      reviews: 201,
      description: "Durable plastic triangle rack",
      inStock: true,
      featured: false,
    },
    {
      id: 20,
      name: "Cue Tip Repair Kit",
      category: "accessories",
      price: 39,
      image: "/images/2.jpg",
      rating: 4.6,
      reviews: 78,
      description: "Complete kit for cue tip maintenance",
      inStock: true,
      featured: false,
    },
    {
      id: 21,
      name: "Legends Academy Backpack",
      category: "merchandise",
      price: 79,
      originalPrice: 99,
      image: "/images/3.jpg",
      rating: 4.8,
      reviews: 143,
      description: "Premium backpack with cue compartment",
      inStock: true,
      featured: true,
    },
    {
      id: 22,
      name: "Pool Table Cover",
      category: "accessories",
      price: 129,
      image: "/images/4.jpg",
      rating: 4.7,
      reviews: 65,
      description: "Waterproof table protection cover",
      inStock: true,
      featured: false,
    },
    {
      id: 23,
      name: "Professional Cue Tip",
      category: "accessories",
      price: 12,
      image: "/images/5.jpg",
      rating: 4.5,
      reviews: 234,
      description: "High-quality leather cue tip replacement",
      inStock: true,
      featured: false,
    },
    {
      id: 24,
      name: "Legends Academy Mug",
      category: "merchandise",
      price: 19,
      image: "/images/6.jpg",
      rating: 4.6,
      reviews: 112,
      description: "Ceramic mug with Legends Academy logo",
      inStock: true,
      featured: false,
    },
  ]

  const categories = [
    { id: "all", name: "All Products", count: productsData.length },
    { id: "equipment", name: "Equipment", count: productsData.filter(p => p.category === "equipment").length },
    { id: "accessories", name: "Accessories", count: productsData.filter(p => p.category === "accessories").length },
    { id: "merchandise", name: "Merchandise", count: productsData.filter(p => p.category === "merchandise").length },
  ]

  useEffect(() => {
    setProducts(productsData)
    setFilteredProducts(productsData)
  }, [])

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

    setFilteredProducts(filtered)
  }, [selectedCategory, searchQuery, products])

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
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
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,119,6,0.1),transparent_50%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Legends <span className="text-amber-500">Shop</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Premium billiards equipment, accessories, and exclusive merchandise
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 mb-8"
          >
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-amber-600/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
            </div>

            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center justify-center gap-2 px-6 py-3 bg-amber-600/20 border border-amber-600/30 rounded-lg hover:bg-amber-600/30 transition-all"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`flex flex-wrap gap-3 mb-12 ${showFilters ? 'block' : 'hidden md:flex'}`}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/50"
                    : "bg-slate-900/50 border border-amber-600/30 text-gray-300 hover:border-amber-500/50"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-gray-400 mb-4">No products found</p>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="group relative bg-gradient-to-br from-slate-900/50 to-slate-950/50 border border-amber-600/20 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300"
                >
                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        favorites.includes(product.id)
                          ? "text-red-500 fill-red-500"
                          : "text-white"
                      }`}
                    />
                  </button>

                  {/* Featured Badge */}
                  {product.featured && (
                    <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      Featured
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-slate-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="px-6 py-3 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 transition-all transform hover:scale-105"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span className="text-sm text-gray-400">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-amber-500">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Stock Status */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          product.inStock
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-lg hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-amber-600/30"
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Product Image */}
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-800">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <span className="text-gray-400">
                        {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-4">
                      {selectedProduct.name}
                    </h2>

                    <p className="text-gray-300 mb-6">
                      {selectedProduct.description}
                    </p>

                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-4xl font-bold text-amber-500">
                        ${selectedProduct.price}
                      </span>
                      {selectedProduct.originalPrice && (
                        <span className="text-2xl text-gray-500 line-through">
                          ${selectedProduct.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={() => {
                          addToCart(selectedProduct)
                          setSelectedProduct(null)
                        }}
                        disabled={!selectedProduct.inStock}
                        className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-lg hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </button>

                      <button
                        onClick={() => toggleFavorite(selectedProduct.id)}
                        className={`w-full py-3 border-2 rounded-lg font-bold transition-all ${
                          favorites.includes(selectedProduct.id)
                            ? "border-red-500 text-red-500 hover:bg-red-500/10"
                            : "border-amber-600/50 text-amber-500 hover:border-amber-500"
                        }`}
                      >
                        {favorites.includes(selectedProduct.id)
                          ? "Remove from Favorites"
                          : "Add to Favorites"}
                      </button>
                    </div>
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


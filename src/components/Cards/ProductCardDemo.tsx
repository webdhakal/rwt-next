// This was the original content
// import { ProductProps } from '@/types';

// const ProductCard: React.FC<ProductProps> = ({ product, onAddToCart }) => {
//     return (
//         <div className="product-card">
//             <img src={product.imageUrl} alt={product.name} />
//             <h2>{product.name}</h2>
//             <p>{product.description}</p>
//             <p>${product.price}</p>
//             <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
//         </div>
//     );
// };

// export default ProductCard;

// This is the new card concept design
import { useState } from 'react'
import { FaShippingFast } from 'react-icons/fa'
import { CiHeart } from 'react-icons/ci'
import { CgDetailsMore } from 'react-icons/cg'
import { Link } from '@inertiajs/react'
import RatingStart from '@/utils/RatingStart'

const DEMO_DATA = {
  prodName: 'Apple',
  price: 1024.99,
  discount: 35,
  description:
    'Discover the perfect blend of innovation and design in this cutting-edge device that redefines your technological experience.',
  rating: 3.5,
  freeShipping: true,
}
const ProductCardDemo = () => {
  const [isLiked, setIsLiked] = useState(false)
  return (
    <Link
      href="#"
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4"
    >
      <div className="relative w-full max-w-sm transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-200 hover:scale-105">
        <div className="relative">
          <img src="http://placeholder.co/640" alt="Product" className="h-48 w-full object-cover" />
          <div className="absolute right-4 top-4 flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setIsLiked(!isLiked)}
              className={`rounded-full p-2 transition-all duration-300 ${isLiked ? 'bg-red-100 text-red-500' : 'bg-white/50 text-gray-600 hover:bg-white/70'} `}
            >
              <CiHeart className="text-2xl" />
            </Link>
            <Link
              href="/"
              className="rounded-full bg-white/50 p-2 text-gray-600 transition-all duration-300 hover:bg-white/70"
            >
              <CgDetailsMore className="text-2xl" />
            </Link>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Apple</h2>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-gray-900">$1024.99</span>
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700 line-through">
                {DEMO_DATA.price - (DEMO_DATA.discount / 100) * DEMO_DATA.price}
              </span>
            </div>
          </div>

          <p className="mb-4 line-clamp-2 text-sm text-gray-500">
            Discover the perfect blend of innovation and design in this cutting-edge device that
            redefines your technological experience.
          </p>
          <div className="mb-6 flex flex-col gap-2 text-sm text-gray-600">
            <RatingStart rating={DEMO_DATA.rating} />
            {DEMO_DATA.freeShipping && (
              <div className="mt-2 flex items-center space-x-2">
                <FaShippingFast className="text-lg" />
                <span>Free Shipping</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCardDemo

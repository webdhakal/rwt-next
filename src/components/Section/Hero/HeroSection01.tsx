import { Button } from '@/shadcn/ui/button'
import { Card, CardContent } from '@/shadcn/ui/card'
import { Badge } from '@/shadcn/ui/badge'
import { ArrowRight, Star, ShoppingCart, Heart } from 'lucide-react'
import { randomImage } from '@/Libs/Helper'
import { AnimatedSection } from '@/components/AnimatedSection'

const featuredProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: '$299.99',
    originalPrice: '$399.99',
    image: randomImage(91),
    rating: 4.8,
    reviews: 1247,
    badge: 'Best Seller',
    category: 'Electronics',
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: '$199.99',
    originalPrice: '$249.99',
    image: randomImage(92),
    rating: 4.6,
    reviews: 892,
    badge: 'New',
    category: 'Wearables',
  },
  {
    id: 3,
    name: 'Minimalist Backpack',
    price: '$89.99',
    originalPrice: '$119.99',
    image: randomImage(93),
    rating: 4.9,
    reviews: 634,
    badge: 'Limited',
    category: 'Fashion',
  },
  {
    id: 4,
    name: 'Organic Skincare Set',
    price: '$79.99',
    originalPrice: '$99.99',
    image: randomImage(94),
    rating: 4.7,
    reviews: 456,
    badge: 'Eco-Friendly',
    category: 'Beauty',
  },
]

export default function HeroSection() {
  return (
    <AnimatedSection>
      <section className="from-primary/5 to-accent/5 relative overflow-hidden bg-gradient-to-br via-background lg:mt-26">
        {/* Background Pattern */}
        <div className="bg-grid-pattern absolute inset-0 opacity-5" />

        <div className="relative mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
          {/* Hero Header */}
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4 text-sm font-medium">
              🎉 New Collection Launch - Up to 40% Off
            </Badge>
            <h1 className="mb-6 space-y-2 text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-5xl">
              Discover Premium
              <span className="block text-primary">Products</span>
              <span className="block text-accent">That Matter</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Curated collection of high-quality products designed to enhance your lifestyle. From
              tech to fashion, find everything you need in one place.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="group px-8 py-3 text-lg">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent px-8 py-3 text-lg">
                View Collections
              </Button>
            </div>
          </div>

          {/* Featured Products Grid */}
          <div className="hidden grid-cols-1 gap-6 sm:grid-cols-2 md:grid lg:grid-cols-4 lg:gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="bg-card/80 group cursor-pointer border-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <CardContent className="p-0">
                  {/* Product Image */}
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || '/placeholder.svg'}
                      alt={product.name}
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-56"
                    />
                    <div className="absolute left-3 top-3">
                      <Badge
                        variant={
                          product.badge === 'New'
                            ? 'default'
                            : product.badge === 'Best Seller'
                              ? 'secondary'
                              : 'outline'
                        }
                        className="text-xs font-medium"
                      >
                        {product.badge}
                      </Badge>
                    </div>
                    <div className="absolute right-3 top-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    {/* Quick Actions Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Button
                        size="sm"
                        className="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Quick Add
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3 p-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews})</span>
                      </div>
                    </div>

                    <h3 className="line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-primary">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-foreground">{product.price}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                      <Badge variant="destructive" className="ml-auto text-xs">
                        Save{' '}
                        {Math.round(
                          ((Number.parseFloat(product.originalPrice.slice(1)) -
                            Number.parseFloat(product.price.slice(1))) /
                            Number.parseFloat(product.originalPrice.slice(1))) *
                          100,
                        )}
                        %
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-r from-primary to-accent"
                  />
                ))}
              </div>
              <span>Join 50,000+ happy customers</span>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  )
}

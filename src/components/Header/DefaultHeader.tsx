'use client'

import { useState, useEffect, useRef } from 'react'
import { usePage } from '@inertiajs/react'
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  GitCompare,
  MapPin,
  X,
  Instagram,
  Facebook,
  Twitter,
} from 'lucide-react'
import { Button } from '@/shadcn/ui/button'
import { Input } from '@/shadcn/ui/input'
import { Badge } from '@/shadcn/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/shadcn/ui/sheet'
import { Dialog, DialogContent, DialogTrigger } from '@/shadcn/ui/dialog'
import { PageProps } from '@/types'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shadcn/ui/hover-card'

export default function DefaultHeader() {
  const { props } = usePage<PageProps>()
  const { quickAccessCategory, menus, auth } = props

  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount] = useState(3)
  const [compareCount] = useState(2)
  const [wishlistCount] = useState(5)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < lastScrollY) {
        setIsVisible(true)
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current)
        }
        hideTimeoutRef.current = setTimeout(() => {
          if (!isHovered) {
            setIsVisible(false)
          }
        }, 3000)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current)
        }
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [lastScrollY, isHovered])

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    hideTimeoutRef.current = setTimeout(() => {
      if (!isHovered) {
        setIsVisible(false)
      }
    }, 3000)
  }

  return (
    <header
      ref={headerRef}
      className={`fixed left-0 right-0 top-0 z-50 border-b bg-white shadow-sm transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Bar */}
      <div className="hidden bg-slate-900 px-4 py-2 text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Free shipping on orders over Rs.5000</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>Need help? Call: +977-9800000000</span>
            <div className="flex items-center gap-2">
              <span>Follow us:</span>
              <div className="flex items-center gap-2">
                <Facebook size={20} />
                <Instagram size={20} />
                <Twitter size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <a className="text-xl font-bold text-slate-900 md:text-2xl" href={'/'}>
              Right Way Traders
            </a>
          </div>

          {/* Desktop Search Bar */}
          <div className="mx-8 hidden max-w-2xl flex-1 md:flex">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border-2 border-slate-200 py-3 pl-4 pr-12 focus:border-primary"
              />
              <Button
                size="sm"
                className="absolute bottom-1 right-1 top-1 bg-primary px-4 hover:bg-primarydark"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Search Button */}
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="top-4 translate-y-0 p-8 sm:max-w-md">
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-lg border-2 border-slate-200 py-3 pl-4 pr-12 focus:border-primary"
                    autoFocus
                  />
                  <Button
                    size="sm"
                    className="absolute bottom-1 right-1 top-1 bg-primary px-4 hover:bg-primarydark"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Compare - Hidden on mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="relative hidden sm:flex"
              href={route('compare')}
            >
              <GitCompare className="h-5 w-5" />
              {compareCount > 0 && (
                <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0 text-xs">
                  {compareCount}
                </Badge>
              )}
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="relative" href={route('wishlist')}>
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0 text-xs">
                  {wishlistCount}
                </Badge>
              )}
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative" href={route('cart')}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 p-0 text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>

            {/* User Account */}
            {auth.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full md:h-10 md:w-10">
                    <Avatar className="h-8 w-8 md:h-10 md:w-10">
                      <AvatarImage
                        src={auth.user.avatar || '/placeholder.svg'}
                        alt={auth.user.name}
                      />
                      <AvatarFallback>
                        {auth.user.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{auth.user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {auth.user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Button>
                <Button
                  size="sm"
                  className="bg-primary px-2 text-xs hover:bg-emerald-700 md:px-4 md:text-sm"
                >
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 min-h-screen overflow-scroll">
                <div className="mt-8 flex flex-col gap-4">
                  {/* Categories in Mobile */}
                  <div className="space-y-2">
                    <h3 className="mb-4 text-lg font-semibold">Categories</h3>
                    {quickAccessCategory.map((category) => (
                      <div key={category.id} className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start font-medium">
                          {category.name}
                        </Button>
                        <div className="ml-4 space-y-1">
                          {category.submenu.map((subItem) => (
                            <Button
                              key={subItem.id}
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start text-sm text-slate-600"
                            >
                              {subItem.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 border-t pt-4">
                    <h3 className="mb-4 text-lg font-semibold">Menu</h3>
                    {menus.map((menu) => (
                      <div key={menu.id}>
                        <Button variant="ghost" className="w-full justify-start">
                          {menu.name}
                        </Button>
                        {menu.subMenu && (
                          <div className="ml-4 mt-2 space-y-2">
                            {menu.subMenu.map((subItem) => (
                              <Button
                                key={subItem.id}
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-sm"
                              >
                                {subItem.name}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="hidden border-t bg-slate-50 px-4 py-3 md:block">
        <div className="mx-auto hidden max-w-7xl items-center gap-6 md:flex">
          <HoverCard openDelay={80} closeDelay={120}>
            <HoverCardTrigger asChild>
              <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none">
                <Menu className="h-4 w-4" />
                Quick Access
              </button>
            </HoverCardTrigger>
            <HoverCardContent
              side="bottom"
              align="start"
              sideOffset={8}
              className="w-[320px] rounded-xl border bg-white p-3 shadow-xl outline-none"
            >
              <div className="space-y-3">
                {menus.map((menu) => (
                  <div key={menu.id} className="rounded-lg p-2 hover:bg-slate-50">
                    {/* Top-level menu link */}
                    <a
                      href={menu.href}
                      className="block rounded-md px-2 py-1.5 text-sm font-semibold text-slate-800 hover:text-primary"
                    >
                      {menu.name}
                    </a>

                    {/* Submenu */}
                    {!!menu.subMenu?.length && (
                      <div className="">
                        {menu.subMenu.map((sub) => (
                          <a
                            key={sub.id}
                            href={sub.href}
                            className="block rounded-md px-2 py-1 text-sm text-slate-600 hover:bg-slate-100 hover:text-primary"
                          >
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </HoverCardContent>
          </HoverCard>

          {quickAccessCategory.map((category) => (
            <HoverCard key={category.id} openDelay={80} closeDelay={120}>
              <HoverCardTrigger asChild>
                <button className="rounded-md px-2 py-1 text-sm font-medium text-slate-700 transition hover:text-primary focus:outline-none">
                  {category.name}
                </button>
              </HoverCardTrigger>
              {!!category.submenu?.length && (
                <HoverCardContent
                  side="bottom"
                  align="center"
                  sideOffset={8}
                  className="w-[480px] rounded-xl border bg-white p-4 shadow-xl outline-none"
                >
                  <div className="grid grid-cols-2 gap-2">
                    {category.submenu.map((sub) => (
                      <a
                        key={sub.id}
                        href={sub.href}
                        className="block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-primary"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                </HoverCardContent>
              )}
            </HoverCard>
          ))}
        </div>
      </div>
    </header>
  )
}

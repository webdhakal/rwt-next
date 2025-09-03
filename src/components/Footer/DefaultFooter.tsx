import { Link, useForm, usePage } from '@inertiajs/react'
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa6'
import ApplicationLogo from '@/utils/ApplicationLogo'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/shadcn/ui/accordion'
import { Category, Contact, Company, Account } from '@/MOCK_DATA'
import { Send, Shield, Truck, HeadphonesIcon, Award } from 'lucide-react'
import { Button } from '@/shadcn/ui/button'
import type { FormEventHandler } from 'react'

export const DefaultFooter = () => {
  const { appName } = usePage().props

  const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
    email: '',
  })

  const submitSubscriber: FormEventHandler = (e) => {
    e.preventDefault()

    post(route('subscriber'), {
      preserveScroll: true,
      onSuccess: () => reset('email'),
    })
  }

  const ecommerceFeatures = [
    { icon: Shield, title: 'Secure Payment', description: '100% secure transactions' },
    { icon: Truck, title: 'Free Shipping', description: 'On orders over $50' },
    { icon: HeadphonesIcon, title: '24/7 Support', description: 'Dedicated customer service' },
    { icon: Award, title: 'Quality Guarantee', description: '30-day return policy' },
  ]

  const paymentMethods = [
    { name: 'Visa', logo: '/visa-logo-generic.png' },
    { name: 'Mastercard', logo: '/mastercard-logo.png' },
    { name: 'PayPal', logo: '/paypal-logo.png' },
    { name: 'Apple Pay', logo: '/apple-pay-logo.png' },
  ]

  return (
    <footer className="border-t border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="hidden py-16 lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Brand Section */}
          <div className="col-span-4 space-y-6">
            <ApplicationLogo />
            <p className="max-w-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Your trusted eCommerce destination for quality products, exceptional service, and
              unbeatable prices. Shop with confidence and discover amazing deals every day.
            </p>

            {/* Newsletter Subscription */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">Stay Updated</h3>
              <form onSubmit={submitSubscriber} className="space-y-3">
                <div className="relative flex overflow-hidden rounded-lg border border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-800">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="flex-1 border-none bg-transparent px-4 py-3 text-slate-800 placeholder-slate-500 outline-none dark:text-slate-200"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={processing}
                    className="absolute bottom-0 right-0 top-0 h-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 hover:from-cyan-600 hover:to-blue-700"
                  >
                    <Send />
                  </Button>
                </div>
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </form>
              <p className="text-xs text-slate-500">
                Get exclusive offers and updates. Unsubscribe anytime.
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="col-span-2">
            <h3 className="mb-6 font-semibold text-slate-800 dark:text-slate-200">Categories</h3>
            <ul className="space-y-3">
              {Category.map((item, index) => (
                <li key={`${item}-${index}`}>
                  <Link
                    href="#"
                    className="text-slate-600 transition-colors hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-2">
            <h3 className="mb-6 font-semibold text-slate-800 dark:text-slate-200">Company</h3>
            <ul className="space-y-3">
              {Company.map((item, index) => (
                <li key={`${item}-${index}`}>
                  <Link
                    href="#"
                    className="text-slate-600 transition-colors hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="col-span-2">
            <h3 className="mb-6 font-semibold text-slate-800 dark:text-slate-200">Account</h3>
            <ul className="space-y-3">
              {Account.map((item, index) => (
                <li key={`${item}-${index}`}>
                  <Link
                    href="#"
                    className="text-slate-600 transition-colors hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2">
            <h3 className="mb-6 font-semibold text-slate-800 dark:text-slate-200">Contact</h3>
            <ul className="space-y-4">
              {Contact.map((item, index) => (
                <li key={`${item}-${index}`} className="flex items-start gap-3">
                  <div className="mt-0.5 h-5 w-5 flex-shrink-0">
                    <item.icon className="h-5 w-5 text-cyan-600" />
                  </div>
                  <span className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-8 lg:hidden">
          <div className="mb-8 text-center">
            <ApplicationLogo />
            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
              Your trusted eCommerce destination for quality products and exceptional service.
            </p>
          </div>

          {/* Mobile Newsletter */}
          <div className="mb-8 rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
            <h3 className="mb-4 text-center font-semibold text-slate-800 dark:text-slate-200">
              Stay Updated
            </h3>
            <form onSubmit={submitSubscriber} className="space-y-3">
              <div className="relative flex overflow-hidden rounded-lg border border-slate-200 dark:border-slate-600">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="flex-1 border-none bg-transparent px-4 py-3 text-slate-800 placeholder-slate-500 outline-none dark:text-slate-200"
                  required
                />
                <Button
                  type="submit"
                  disabled={processing}
                  className="absolute bottom-0 right-0 top-0 h-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6"
                >
                  <Send />
                </Button>
              </div>
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </form>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem
              value="category"
              className="rounded-lg bg-white shadow-sm dark:bg-slate-800"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <span className="font-semibold">Categories</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <ul className="space-y-3">
                  {Category.map((item, index) => (
                    <li key={`${item}-${index}`}>
                      <Link
                        href="#"
                        className="text-slate-600 transition-colors hover:text-cyan-600 dark:text-slate-400"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="company"
              className="rounded-lg bg-white shadow-sm dark:bg-slate-800"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <span className="font-semibold">Company</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <ul className="space-y-3">
                  {Company.map((item, index) => (
                    <li key={`${item}-${index}`}>
                      <Link
                        href="#"
                        className="text-slate-600 transition-colors hover:text-cyan-600 dark:text-slate-400"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="account"
              className="rounded-lg bg-white shadow-sm dark:bg-slate-800"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <span className="font-semibold">Account</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <ul className="space-y-3">
                  {Account.map((item, index) => (
                    <li key={`${item}-${index}`}>
                      <Link
                        href="#"
                        className="text-slate-600 transition-colors hover:text-cyan-600 dark:text-slate-400"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="contact"
              className="rounded-lg bg-white shadow-sm dark:bg-slate-800"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <span className="font-semibold">Contact</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4">
                <ul className="space-y-4">
                  {Contact.map((item, index) => (
                    <li key={`${item}-${index}`} className="flex items-start gap-3">
                      <div className="mt-0.5 h-5 w-5 flex-shrink-0">
                        <item.icon className="h-5 w-5 text-cyan-600" />
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {item.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="border-t border-slate-200 py-8 dark:border-slate-700">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* Copyright */}
            <div className="text-center lg:text-left">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                &copy; {new Date().getFullYear()} All rights reserved by{' '}
                <Link href="#" className="font-medium text-cyan-600 hover:text-cyan-700">
                  {appName}
                </Link>
              </p>
            </div>

            {/* Payment Methods */}
            <div className="flex flex-col items-center gap-4">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Accepted Payments
              </span>
              <div className="flex items-center gap-3">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="flex h-8 w-12 items-center justify-center rounded border border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-700"
                  >
                    <img
                      src={method.logo || '/placeholder.svg'}
                      alt={method.name[0]}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="flex flex-col items-center gap-4">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Follow Us
              </span>
              <div className="flex items-center gap-3">
                <FaFacebook className="h-8 w-8 cursor-pointer rounded-full bg-gradient-to-br from-blue-500 to-blue-600 p-2 text-white transition-transform hover:scale-110" />
                <FaInstagram className="h-8 w-8 cursor-pointer rounded-full bg-gradient-to-br from-pink-500 to-purple-600 p-2 text-white transition-transform hover:scale-110" />
                <FaXTwitter className="h-8 w-8 cursor-pointer rounded-full bg-gradient-to-br from-slate-700 to-slate-800 p-2 text-white transition-transform hover:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

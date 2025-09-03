import { useForm, usePage } from '@inertiajs/react'
import { FormEventHandler, useEffect, useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import CloseButton from '../Button/CloseButton'
import { InputWithLabel } from '@/shadcn/ui/input'
import { Button } from '@/shadcn/ui/button'
import { Mail, Send } from 'lucide-react'
import { randomImage } from '@/Libs/Helper'
import { AspectRatio } from '@/shadcn/ui/aspect-ratio'
import FlashToast from '@/utils/FlashToast'

const SUBSCRIBER_KEY = 'subscriber'
const VISIT_COUNT_KEY = 'visitCount'

const SubscriberModal = () => {
  const [showModal, setShowModal] = useState(false)
  const [visitCount, setVisitCount] = useState(Number(localStorage.getItem(VISIT_COUNT_KEY)) || 0)

  useEffect(() => {
    const subscriber = localStorage.getItem(SUBSCRIBER_KEY)
    if (subscriber) return

    const randomTrigger = Math.floor(Math.random() * 2) + 2
    if (visitCount >= randomTrigger) {
      setShowModal(true)
      localStorage.setItem(VISIT_COUNT_KEY, '0')
    } else {
      const newVisitCount = visitCount + 1
      localStorage.setItem(VISIT_COUNT_KEY, newVisitCount.toString())
      setVisitCount(newVisitCount)
    }
  }, [])

  const closeModal = () => setShowModal(false)

  const { props } = usePage()
  const flashMessage = props.flash?.message || null

  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
  })

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('subscriber'), {
      preserveScroll: true,
      onSuccess: () => {
        localStorage.setItem(SUBSCRIBER_KEY, data.email)
        reset('email')
        setTimeout(closeModal, 5000)
      },
    })
  }

  if (!showModal) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="group relative w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        {/* {flashMessage && (
          <div className="flex items-center justify-center gap-2 p-2  font-extrabold text-success">
            <FaCheckCircle />
            <p className="text-center  font-bold">{flashMessage}</p>
          </div>
        )} */}
        <FlashToast />
        <h2 className="mb-4 text-xl font-bold">Subscribe to Our Newsletter</h2>
        <p className="mb-4 text-gray-600">Stay updated by subscribing to our newsletter.</p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-[120px_auto] place-items-center gap-2"
        >
          <AspectRatio ratio={1}>
            <img
              src={randomImage()}
              alt="Subscriber Image"
              className="h-full w-full select-none rounded-md object-cover"
            />
          </AspectRatio>
          <InputWithLabel
            id="email"
            label="Your Email Address"
            placeholder="Join with us"
            labelClassName="block"
            className="flex-col"
            inputClassName="rounded-r-none focus-visible:ring-0"
            onChange={(e) => setData('email', e.target.value)}
            icon={{
              value: Mail,
              align: 'prepend',
            }}
            renderAfterComponent={
              <Button
                size="icon"
                disabled={processing}
                variant="secondary"
                className="rounded-l-none"
              >
                <Send className="" />
              </Button>
            }
            error={errors.email}
          />
        </form>
      </div>
    </div>
  )
}

export default SubscriberModal

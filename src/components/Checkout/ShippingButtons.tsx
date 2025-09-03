const ShippingButtons = () => {
  return (
    <div className="flex gap-4 mobile:flex-center">
      <button className="bg-primary w-full text-white rounded-lg px-6 py-4 mobile:text-sm">
        NEW SHIPPING
      </button>
      <button className="bg-primary w-full text-white rounded-lg px-6 py-4 mobile:text-sm">
        USER SHIPPING
      </button>
    </div>
  )
}

export default ShippingButtons

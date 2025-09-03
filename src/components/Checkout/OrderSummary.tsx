// import GrayLine from '../utils/GrayLine'

const OrderSummary = () => {
  return (
    <div className="mt-4 rounded-md border border-green-500 p-4">
      <h1 className="mb-4">Order Summary</h1>
      <div className="mb-2 flex justify-between">
        <p className="text-slate-500">Sub Total:</p>
        <p className="font-semibold">$1,000.00</p>
      </div>
      {/* <GrayLine /> */}
      <div className="mb-2 mt-2 flex justify-between">
        <p className="text-slate-500">Shipping estimate:</p>
        <p className="font-semibold">$600.00</p>
      </div>
      {/* <GrayLine /> */}
      <div className="mb-2 mt-2 flex justify-between">
        <p className="text-slate-500">Tax estimate:</p>
        <p className="font-semibold">$137.00</p>
      </div>
      {/* <GrayLine /> */}
      <div className="mt-2 flex justify-between text-lg font-bold">
        <h1>Order Total:</h1>
        <p>$1,737.00</p>
      </div>
    </div>
  )
}

export default OrderSummary

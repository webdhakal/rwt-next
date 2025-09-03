import { ChangeEvent } from 'react'
import NepalMap from '../NepalMap'
import { Checkbox } from '@/shadcn/ui/checkbox'
import { Input } from '@/shadcn/ui/input'
const BillingDetails = ({
  handleUsersDetailsChange,
  IS_USER_LOOGED_IN,
}: {
  handleUsersDetailsChange: (e: ChangeEvent<HTMLInputElement>) => void
  IS_USER_LOOGED_IN: boolean
}) => {
  return (
    <>
      <h1 className="mt-6 text-lg font-semibold">Billing Details</h1>
      <div>
        {/* <InputField
          label="Country / Region"
          required={true}
          handleChangeCallback={handleUsersDetailsChange}
          name="country"
          placeholder="Nepal (NP)"
        /> */}
        <div className="space-y-2">
          <NepalMap />
        </div>
        <div className="mt-4">
          {/* <InputField
            hideOptionalIndicator={true}
            handleChangeCallback={handleUsersDetailsChange}
            name="address"
            placeholder="Your address..."
          /> */}
          <div className="mobile:flex-col mobile:gap-1 flex gap-4">
            {/* <InputField
              label="First Name"
              required={true}
              handleChangeCallback={handleUsersDetailsChange}
              name="first_name"
            />
            <InputField
              label="Last Name"
              required={true}
              handleChangeCallback={handleUsersDetailsChange}
              name="second_name"
            /> */}
            <Input
              className="h-8 w-full text-xs lg:w-[250px]"
              name="first_name"
              placeholder="First Name"
            />
            <Input
              className="h-8 w-full text-xs lg:w-[250px]"
              name="last_name"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="mobile:flex-col mobile:gap-1 flex gap-4">
          {/* <InputField
            label="Phone Number"
            required={true}
            handleChangeCallback={handleUsersDetailsChange}
            name="phone_number"
          />
          <InputField
            label="Email"
            required={true}
            handleChangeCallback={handleUsersDetailsChange}
            name="email"
          /> */}
          <Input />
          <Input />
        </div>
        {!IS_USER_LOOGED_IN && (
          <div className="mobile:mt-3 mt-6 flex items-center gap-2">
            {/* <CheckboxOne label="Create Account?" /> */}
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Create Account?
              </label>
            </div>
          </div>
        )}
      </div>
      <div>
        <h1 className="mt-8 text-lg font-semibold">Additional Information</h1>
        <p className="mt-1">
          Order Notes <span className="text-slate-500">(Optional)</span>
        </p>
        <textarea
          name="order_notes"
          id=""
          className="mt-2 h-24 w-full resize-none rounded-md border border-slate-500"
        ></textarea>
      </div>
    </>
  )
}

export default BillingDetails

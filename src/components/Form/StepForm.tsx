import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/shadcn/ui/input-otp'
import { Switch } from '@/shadcn/ui/switch'
import { useForm, usePage } from '@inertiajs/react'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { ClipboardList, NotebookIcon, ShieldCheck } from 'lucide-react'
import { FormEventHandler, useState } from 'react'

const stepData = [
  {
    id: 1,
    title: 'Account Info',
    description: 'Step details here',
    icon: <NotebookIcon className="ml-2 size-4.5" />,
  },
  {
    id: 2,
    title: 'Review',
    description: 'Step details here',
    icon: <ClipboardList className="ml-2 size-4.5" />,
  },
  {
    id: 3,
    title: 'Confirmation',
    description: 'Step details here',
    icon: <ShieldCheck className="ml-2 size-4.5" />,
  },
]

const Steps = ({ currentStep }: { currentStep: number }) => {
  return (
    <ul className="flex gap-1">
      {stepData.map((step) => (
        <li
          key={step.id}
          className={`relative mb-10 grid grow grid-cols-[auto_1fr] items-center space-x-2 border-2 border-dotted border-gray-400 p-2 ${currentStep === step.id ? 'bg-primary text-white' : ''}`}
        >
          <span className={`row-span-2 flex size-8 items-center justify-center rounded-full`}>
            {step.icon}
          </span>
          <h3 className="font-medium leading-tight">{step.title}</h3>
          <p className="text-sm">{step.description}</p>
        </li>
      ))}
    </ul>
  )
}

const StepForm = () => {
  const { appName } = usePage().props

  const { data, setData, post, processing, errors } = useForm({
    name: '',
    username: '',
    email: '',
    phone: '',
    companyInfo: '',
    role: 'user',
    otp_code: '',
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [enabled, setEnabled] = useState<boolean>(false)
  const handleToggle = (value: boolean) => {
    setEnabled(value)
    setData('role', value ? 'vendor' : 'user')
  }

  const attributes = {
    toggleOnText: 'You are vendor!',
    toggleOffText: 'You are user!',
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('register'))
  }

  return (
    <div className="relative mx-auto h-[580px] max-w-2xl rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold">Sign Up to {appName}</h2>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <>
            <Steps currentStep={1} />
            <div className="flex gap-4">
              <div className="mb-4 grow">
                <label className="mobile:text-sm mb-2.5 block font-medium text-black dark:text-white">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Enter your first name"
                    className="mobile:py-2 mobile:pl-4 mobile:pr-5 w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                {errors.name && <div>{errors.name}</div>}
              </div>

              <div className="mb-4 grow">
                <label className="mobile:text-sm mb-2.5 block font-medium text-black dark:text-white">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    onChange={(e) => setData('username', e.target.value)}
                    placeholder="Enter your username"
                    className="mobile:py-2 mobile:pl-4 mobile:pr-5 w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                {errors.username && <div>{errors.username}</div>}
              </div>
            </div>
            <div className="mb-4">
              <label className="mobile:text-sm mb-2.5 block font-medium text-black dark:text-white">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="Enter your email"
                  className="mobile:py-2 mobile:pl-4 mobile:pr-5 w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

                <span className="mobile:top-2 mobile:right-2 absolute right-4 top-4">
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.5">
                      <path
                        d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                        fill=""
                      />
                    </g>
                  </svg>
                </span>
              </div>
              {errors.email && <div>{errors.email}</div>}
            </div>
            <div className="mb-4 flex items-center gap-2">
              {/* <SwitcherOne
                                enabled={enabled}
                                setEnabled={handleToggle}
                                attributes={attributes}
                            /> */}
              <Switch />
              <span>(Please select options if you want to vendor!)</span>

              {errors.role && <div>{errors.role}</div>}
            </div>
          </>
        )}

        {/* Step 2: Phone and MFA */}
        {currentStep === 2 && (
          <>
            <Steps currentStep={2} />
            <div className="mb-2">
              <label className="mobile:text-sm mb-2.5 block font-medium text-black dark:text-white">
                Mobile Number
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="phone"
                  onChange={(e) => setData('email', e.target.value)}
                  placeholder="Enter your mobile number"
                  className="mobile:py-2 mobile:pl-4 mobile:pr-5 w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

                <span className="mobile:top-2 mobile:right-2 absolute right-4 top-4">
                  {/* <FaMobileAlt className="text-2xl" /> */}
                </span>
              </div>
              {errors.phone && <div>{errors.phone}</div>}
            </div>
            <span className="text-primarydark">
              (Please enter the otp received for mobile number verification.)
            </span>
            <div className="mt-2 flex flex-col items-center gap-4 border-2 border-dashed border-primarydark py-6">
              <label htmlFor="otp" className="uppercase">
                Enter your 6 digit otp code here
              </label>
              <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} className="p-3">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {/* <OtpForm /> */}
            </div>
          </>
        )}

        {/* Step 3: Company Information */}
        {currentStep === 3 && (
          <>
            <Steps currentStep={3} />
            <div className="mb-2 border-double border-primarydark p-3">
              <div className="mb-4">
                <label className="mobile:text-sm mb-2.5 block font-medium text-black dark:text-white">
                  Company Information
                </label>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                  <div
                    id="FileUpload"
                    className="relative block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      id="vendor_certificates"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary">Click to upload</span> or drag and drop
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                      <p>(max, 800 X 800px)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Navigation Buttons */}
        <div className="absolute bottom-0 left-0 right-0 mx-2 mb-2 flex justify-between gap-3">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="mobile:p-2 w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            >
              Previous
            </button>
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="mobile:p-2 w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              disabled={processing}
              className="w-full rounded-lg bg-primary px-4 py-2 text-white"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default StepForm

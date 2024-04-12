import { useNavigate } from "react-router-dom"

const Welcome = () => {
    const navigate = useNavigate()
  return (
    <div className="h-screen flex flex-col items-center justify-center mx-auto">
    <img src="logo.svg" alt="logo" className="w-44 h-20" />

    <div className="max-w-[622px] bg-white mx-auto p-3 sm:p-12 flex flex-col items-center justify-center">
      <img src="Sun and cloud.svg" alt="sun" />
      <div className="text-[#001D4E] text-2xl font-bold text-center">
        Welcome to Evercare selfcare diagnosis
      </div>

      <div className="text-center text-lg font-normal leading-6 my-4">
        Welcome to Evercare's Selfcare Diagnosis Form—an easy way to
        prioritize your health. Your proactive step towards understanding
        your needs is commendable. Let's embark on this wellness journey
        together. <br className="mt-2" /> Thank you for choosing Evercare—we're here to support you
      </div>

      <button onClick={() => navigate('getting-started')} className="rounded-lg bg-[#002355] text-white py-2 px-4 md:px-10 text-center text-base font-normal leading-6 my-5" type="button">Let&apos;s get started</button>
    </div>
  </div>
  )
}

export default Welcome
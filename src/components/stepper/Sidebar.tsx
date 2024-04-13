// import { useState } from "react"
import Stepper from "./Stepper"

const Sidebar = () => {
    // const [currentStep, setCurrentStep] = useState<number>(1)

  return (
    <div className="w-[230px] hidden md:flex flex-col justify-between p-4 m-2 my-4 md:my-8 bg-white rounded-l-2xl">
        <div>
        <Stepper/>
        {/* <Stepper {...{ currentStep, setCurrentStep }} /> */}
        </div>
        <img src="sidebardown.svg" alt="public/sidebardown" />
    </div>
  )
}

export default Sidebar
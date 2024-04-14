import { useEffect } from "react"

import Sidebar from "../stepper/Sidebar";
import GettingStartedForm from "./GettingStartedForm";
import useCountStore from "../../store/store";
import Lifestyle from "../lifestyle/Lifestyle";
import HealthCheckups from "../HealthCheckups/HealthCheckups";
import MedicalHistory from "../MedicalHistory/MedicalHistory";

const GettingStarted = () => {
  const count = useCountStore(state => state.count)

  // useEffect(() => {
  //   window.location.reload()
  // },[ count === 1 ])

  return (
    <div className="sm:mx-20 max-w-2x">
      <div className="flex justify-center h-screen">
        <Sidebar />
        <div className="flex flex-1 mx-10 my-4 md:my-8 w-full overflow-y-scroll no-scrollbar">
          {count === 1 && <GettingStartedForm />}
          {count === 2 && <Lifestyle />}
          {count === 3 && <HealthCheckups />}
          {count === 4 && <MedicalHistory />}
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;

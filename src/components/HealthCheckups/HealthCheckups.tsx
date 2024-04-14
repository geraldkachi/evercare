import { useState } from "react";
import { PreviousSurgeriesorHospitalizationsData, bloodSugarPressureData, recentLabTestsData, visitDoctorData } from "../../data/data";
import useCountStore from "../../store/store";
import Button from "../Button/Button";
import Input from "../Input/Input";

const HealthCheckups = () => {
 
const { count, visitDoctor, bloodSugarPressure, recentLabTests, previousSurgeriesorHospitalizations, form } = useCountStore()
const others = useCountStore((state) => state.form.othersHistor);

// console.log(visitDoctor, 'visitDoctor')
// console.log(bloodSugarPressure, 'bloodSugarPressure')
// console.log(recentLabTests, 'recentLabTests')
// console.log(previousSurgeriesorHospitalizations, 'previousSurgeriesorHospitalizations')
const disabledProps = !visitDoctor.length || !bloodSugarPressure.length || !recentLabTests.length || !previousSurgeriesorHospitalizations.length
const [error, setError] = useState('');

const handleOthers = (e: React.ChangeEvent<HTMLInputElement>) => {
  useCountStore.setState({
    form: {
      ...form,
      othersHistor: String(e.target.value),
    },
  });
  setError('');
};


  return (
    <>
      <div className="flex justify-center w-full">

        <div className="flex flex-col max-w-2xl w-full mt-10">
          <div className="break-all mb-10">
            <div className="text-2xl text-[#1C1C1C] font-bold">Health Checkups</div>
            <div className="text-[#444444] text-[14px] ">Tell us what your day to day life is like?</div>
          </div>

        {/* section one */}
          <div className="flex items-center gap-2">
            <div className="text-lg leading-7 font-bold my-2">How often do you visit the doctor/hospital?</div>
          </div>
          <div className="flex items-center flex-wrap gap-2 mb-4">
            {visitDoctorData.map(({value}) => {
              const index = visitDoctor.indexOf(value);
              const isSelected = index !== -1;
             
              const radio = true;

              const RBoxgrouplogic = (): void => {
                if (radio) {
                  useCountStore.setState({visitDoctor: [value]});
                } else {
                  if (isSelected) {
                    visitDoctor.splice(index, 1);
                  } else {
                    visitDoctor.push(value);
                  }
                  useCountStore.setState({visitDoctor: [...visitDoctor]});
                }
              };
              return (
                <div key={value} 
                onClick={RBoxgrouplogic}
                className={`${visitDoctor.includes(value) && '!border !border-purple-600 text-purple-600' }  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
              )
            })}
          </div>

          {/* section two */}
          <div className="flex items-center gap-2">
            <div className="text-lg leading-7 font-bold my-2">How often do you check your blood pressure, blood sugar, or other relevant health indicators at home?</div>
          </div>
          <div className="flex items-center flex-wrap gap-2 mb-4">
            {bloodSugarPressureData.map(({value}) => {
              const index = bloodSugarPressure.indexOf(value);
              const isSelected = index !== -1;
             
              const radio = true;

              const RBoxgrouplogic = (): void => {
                if (radio) {
                  useCountStore.setState({bloodSugarPressure: [value]});
                } else {
                  if (isSelected) {
                    bloodSugarPressure.splice(index, 1);
                  } else {
                    bloodSugarPressure.push(value);
                  }
                  useCountStore.setState({bloodSugarPressure: [...bloodSugarPressure]});
                }
              };
              return (
                <div key={value} onClick={RBoxgrouplogic}
                className={`${bloodSugarPressure.includes(value) && '!border !border-purple-600 text-purple-600' } whitespace-nowrap cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
              )
            })}
          </div>

          {/* section three */}
          <div className="flex items-center gap-2">
            <div className="text-lg leading-7 font-bold my-2">What are the recent Lab Tests or Screenings you have done?</div>
          </div>
          <div className="flex items-center flex-wrap gap-2 mb-4">
            {recentLabTestsData.map(({value}) => {
              const index = recentLabTests.indexOf(value);
              const isSelected = index !== -1;
             
              const radio = true;

              const RBoxgrouplogic = (): void => {
                if (radio) {
                  useCountStore.setState({recentLabTests: [value]});

                } else {
                  if (isSelected) {
                    recentLabTests.splice(index, 1);
                  } else {
                    recentLabTests.push(value);
                  }
                  useCountStore.setState({recentLabTests: [...recentLabTests]});

                }
              };
              return (
                <div key={value} onClick={RBoxgrouplogic}
                className={`${recentLabTests.includes(value) && '!border !border-purple-600 text-purple-600' } whitespace-nowrap cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
              )
            })}
          </div>

          <div>
          <Input
                label="Others?"
                value={others}
                className="mb-1"
                type="text"
                onChange={handleOthers}
                name="message"
                placeholder="Please state"
              />
          </div>

          {/* section four */}
          <div className="flex items-center gap-2">
            <div className="text-lg leading-7 font-bold my-2">Do you smoke or use tobacco products?</div>
          </div>
          <div className="flex items-center flex-wrap gap-2 mb-4">
            {PreviousSurgeriesorHospitalizationsData.map(({value}) => {
              const index = previousSurgeriesorHospitalizations.indexOf(value);
              const isSelected = index !== -1;
             
              const radio = true;

              const RBoxgrouplogic = (): void => {
                if (radio) {
                  useCountStore.setState({previousSurgeriesorHospitalizations: [value]})
                } else {
                  if (isSelected) {
                    previousSurgeriesorHospitalizations.splice(index, 1);
                  } else {
                    previousSurgeriesorHospitalizations.push(value);
                  }
                  useCountStore.setState({previousSurgeriesorHospitalizations: [...previousSurgeriesorHospitalizations]});
                }
              };
              return (
                <div key={value} onClick={RBoxgrouplogic}
                className={`${previousSurgeriesorHospitalizations.includes(value) && '!border !border-purple-600 text-purple-600' } whitespace-nowrap cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
              )
            })}
          </div>

          {error && <span className="text-xs text-red-600">{error}</span> }
          

          <div>
          <Button title="Continue" disabled={disabledProps} onClick={() => {useCountStore.setState({count: count + 1})}} className="mt-5 te w-full sm:w-[unset]" />
          </div>
        </div>
      </div>
    </>
  )
}

export default HealthCheckups
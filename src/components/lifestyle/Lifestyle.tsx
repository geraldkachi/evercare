import { dietaryArray, physicalActivityData, sleepPatternsData, smokeTobaccoProductsData } from "../../data/data"
import Button from "../Button/Button"
import useCountStore from "../../store/store";

const Lifestyle = () => {
  const { count, dietaryPreference, physicalActivity, sleepPatterns, tobaccoProducts } = useCountStore()

// console.log(selectedValues, 'selectedValues')
// console.log(selectedValues2, 'selectedValues 2')
// console.log(selectedValues3, 'selectedValues 3')
// console.log(selectedValues4, 'selectedValues 4')

const disabledProps = !dietaryPreference.length || !physicalActivity.length || !sleepPatterns.length || !tobaccoProducts.length
  return (
      <div className="flex justify-center w-full mb-5">

        <div className="flex flex-col max-w-2xl w-full mt-10">
          <div className="break-all mb-10">
            <div className="text-2xl text-[#1C1C1C] font-bold">Lifestyle</div>
            <div className="text-[#444444] text-[14px] ">Tell us what your day to day life is like?</div>
          </div>

        {/* section one */}
          <div className="flex items-center gap-2">
            <div className="text-lg leading-7 font-bold my-2">What is your dietary preference?</div>
          </div>
          <div className="flex items-center gap-2 mb-4">
            {dietaryArray.map(({value}) => {
              const index = dietaryPreference.indexOf(value);
              const isSelected = index !== -1;
             
              const radio = true;

              const RBoxgrouplogic = (): void => {
                if (radio) {
                  useCountStore.setState({dietaryPreference: [value]});
                } else {
                  if (isSelected) {
                    dietaryPreference.splice(index, 1);
                  } else {
                    dietaryPreference.push(value);
                  }
                  useCountStore.setState({dietaryPreference: [...dietaryPreference]});
                }
              };
              return (
                <div key={value} 
                onClick={RBoxgrouplogic}
                className={`${dietaryPreference.includes(value) && '!border !border-purple-600 text-purple-600' }  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
              )
            })}
          </div>

          {/* section two */}
          <div className="flex items-center gap-2">
            <div className="text-lg leading-7 font-bold my-2">What is the nature of your Physical Activity?</div>
          </div>
          <div className="flex items-center flex-wrap gap-2 mb-4">
            {physicalActivityData.map(({value}) => {
              const index = physicalActivity.indexOf(value);
              const isSelected = index !== -1;
             
              const radio = true;

              const RBoxgrouplogic = (): void => {
                if (radio) {
                  useCountStore.setState({physicalActivity: [value]});
                } else {
                  if (isSelected) {
                    physicalActivity.splice(index, 1);
                  } else {
                    physicalActivity.push(value);
                  }
                  useCountStore.setState({physicalActivity: [...physicalActivity]});
                }
              };
              return (
                <div key={value} onClick={RBoxgrouplogic}
                className={`${physicalActivity.includes(value) && '!border !border-purple-600 text-purple-600' } whitespace-nowr cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
              )
            })}
          </div>

          {/* section three */}
          <div className="flex items-center gap-2">
            <div className="text-lg leading-7 font-bold my-2">What are your Sleep Patterns?</div>
          </div>
          <div className="flex items-center flex-wrap gap-2 mb-4">
            {sleepPatternsData.map(({value}) => {
              const index = sleepPatterns.indexOf(value);
              const isSelected = index !== -1;
             
              const radio = true;

              const RBoxgrouplogic = (): void => {
                if (radio) {
                  useCountStore.setState({sleepPatterns: [value]});
                } else {
                  if (isSelected) {
                    sleepPatterns.splice(index, 1);
                  } else {
                    sleepPatterns.push(value);
                  }
                  useCountStore.setState({sleepPatterns: [...sleepPatterns]});
                }
              };
              return (
                <div key={value} onClick={RBoxgrouplogic}
                className={`${sleepPatterns.includes(value) && '!border !border-purple-600 text-purple-600' } whitespace-nowrap cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
              )
            })}
          </div>

          {/* section four */}
          <div className="flex items-center gap-2">
            <div className="text-lg leading-7 font-bold my-2">Do you smoke or use tobacco products?</div>
          </div>
          <div className="flex items-center flex-wrap gap-2 mb-4">
            {smokeTobaccoProductsData.map(({value}) => {
              const index = tobaccoProducts.indexOf(value);
              const isSelected = index !== -1;
             
              const radio = true;

              const RBoxgrouplogic = (): void => {
                if (radio) {
                  useCountStore.setState({tobaccoProducts: [value]});
                } else {
                  if (isSelected) {
                    tobaccoProducts.splice(index, 1);
                  } else {
                    tobaccoProducts.push(value);
                  }
                  useCountStore.setState({tobaccoProducts: [...tobaccoProducts]});
                }
              };
              return (
                <div key={value} onClick={RBoxgrouplogic}
                className={`${tobaccoProducts.includes(value) && '!border !border-purple-600 text-purple-600' } whitespace-nowrap cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
              )
            })}
          </div>
          

          <div>
            <Button title="Continue" disabled={disabledProps}  onClick={() => {useCountStore.setState({count: count + 1})}} className="mt-5 mb-10 te w-full sm:w-[unset]" />
          </div>
        </div>
      </div>
  )
}

export default Lifestyle
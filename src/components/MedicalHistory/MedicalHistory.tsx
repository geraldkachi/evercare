import { useState } from "react";

const MedicalHistory = () => {
  const [step, setStep] = useState('')
  return (
    <div className="flex justify-center w-full">
      {step &&
        <div className="flex flex-col max-w-2xl items-star w-full mt-10">
          <div className="break-all mb-10">
            <div className="text-lg md:text-2xl text-[#1C1C1C] mb-2">Are you currently managing any <br /> chronic condition?</div>
            <div className="text-[#444444] text-[14px] ">Are you currently managing any chronic condition at this time or have you ever <br /> managed any chronic condition?</div>
          </div>
          <div className="flex flex-col">

            <div className="flex items-start flex-1 gap-2 w-full md:pr-32">
              <div onClick={() => setYesOpt('yes')} className={`${yesOpt == 'yes' && 'bg-purple-100 border border-purple-600'} flex items-center justify-center border cursor-pointer border-[#424242] rounded-[4px] text-sm font-normal leading-6 px-4 py-6 w-full text-center bg-white`}>Yes, I am / I have</div>
              <div onClick={() => {setYesOpt('no'); setSelectedValues([]);}} className={`${yesOpt == 'no' && 'bg-purple-100 border border-purple-600'} flex items-center justify-center border cursor-pointer border-[#424242] rounded-[4px] text-sm font-normal leading-6 px-4 py-6 w-full text-center bg-white`}>No, I’m not / I don’t</div>
            </div>

            {yesOpt == 'yes' && (
              <div>
                {/* <div className="my-5" /> */}
                <hr className="border my-8 border-black " />
                <div className="break-all mb-10">
                  <div className="text-lg md:text-lg font-semibold text-[#1C1C1C] mb-2">What condition/s are your managing?</div>
                  <div className="text-lg md:text-lg text-[#1C1C1C] italic mb-2">(select all that apply) </div>
                </div>

                <div className="flex flex-wrap gap-2 max-w-fit">
                  {chronicCondition.map((item, i) => {
                  const index = selectedValues.indexOf(item.value);
                  const isSelected = index !== -1;
                  // console.log(isSelected, 'isSelected')
                  // console.log(index, 'index')

                  // const RBoxgrouplogic = (): void => {
                  //   if (radio) {
                  //     setSelectedValues([item.value]);
                  //   } else {
                  //     if (isSelected) {
                  //       selectedValues.splice(index, 1);
                  //     } else {
                  //       selectedValues.push(item.value);
                  //     }
                  //     setSelectedValues([...selectedValues]);
                  //   }
                  // };

                  return (
                  <div key={i} onClick={() =>
                    setSelectedValues((prev) => {
                      const spr = [...prev]
                      const i = spr.indexOf(item.value)
                      if (i > -1 || isSelected) {
                        spr.splice(i, 1)
                      } else  {
                        spr.push(item.value)
                      }
                      return spr
                    })} className={`${selectedValues.includes(item.value) && '!border !border-purple-600 text-purple-600' }  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{item.value}</div>
                  )}
                  )}
                </div>

                <Input
                label="Others?"
                value={others}
                className="my-10"
                type="text"
                onChange={handleOthers}
                name="lastName"
                placeholder="Please state"
              />
              </div>
            )}

            <div>
              <Button title={`${yesOpt == 'yes' ? 'Finish' : 'Continue'}`} disabled={!yesOpt || (yesOpt == 'yes' && !selectedValues.length)  || (yesOpt === 'no'&& selectedValues.length as unknown as boolean)} className="mb-20 mt-10 te w-full sm:w-[unset]" onClick={() => {
                if (yesOpt == 'yes') {
                  navigate('/finish')
                  // useCountStore.persist.clearStorage();
                } else if (yesOpt == 'no') {
                  increment()
                }
              }} />
            </div>
          </div>

        </div>
      }

      {!step &&
        <form onSubmit={handleSubmit} className="flex flex-col max-w-2xl w-full mt-10">
          <div className="break-all mb-10">
            <div className="text-lg md:text-2xl text-[#002355] font-bold">Getting started</div>
            <div className="text-[#444444] text-[14px] ">We would like to have a brief information about you</div>
          </div>
          <div>

            <div className="grid md:grid-cols-2 gap-3">
              <Input
                label="What’s your name?"
                className="mb-1"
                value={firstName}
                type="text"
                onChange={handleFirstName}
                name="firstName"
                placeholder="First Name"
              />
              <Input
                value={lastName}
                className="mb-1"
                type="text"
                onChange={handleLastName}
                name="lastName"
                placeholder="hr@tch.com"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <Input
                label="Date of Birth"
                className="mb-1"
                value={date}
                type="date"
                onChange={handleDate}
                name="date"
                placeholder="DD/MM/YY"
                TrailingIcon={() => <img className="pr-3" src="dateinput.svg" />}
              />

              <div className="flex flex-col">
                <label className="mb-[5px] text-[#0D1227] leading-6 flex items-center text-left text-xs md:text-sm font-normal">
                  {"What’s your gender?"}</label>

                <div className="flex items-start flex-1 gap-2 w-full">
                  <div onClick={() => useCountStore.setState({ form: { ...form, gender: "male" } })} className={`${gender == 'male' && 'bg-purple-100 border border-purple-600'} flex items-center justify-center border cursor-pointer border-[#424242] rounded-[4px] text-sm font-normal leading-6 px-6 py-3 w-full text-center bg-white`}>Male</div>
                  <div onClick={() => useCountStore.setState({ form: { ...form, gender: "female" } })} className={`${gender == 'female' && 'bg-purple-100 border border-purple-600'} flex items-center justify-center border cursor-pointer border-[#424242] rounded-[4px] text-sm font-normal leading-6 px-6 py-3 w-full text-center bg-white`}>Female</div>
                </div>
              </div>
            </div>

            <Input
              label="What’s your phone number?"
              className="mb-1"
              value={phoneNumber}
              type="text"
              onChange={handlePhoneNumber}
              name="phoneNumber"
              placeholder="  +234 | Your number goes here"
              LeadingIcon={() => <img className="pl-3" src="nigeria-flag.svg" />}
            />
            {error && <div className="text-red-600 text-xs">{error}</div>}

            <div>
              <label className="my-1 text-[#0D1227] leading-[19.6px] flex items-center text-left text-xs md:text-sm font-semibold">Enter your address here (Optional)</label>
              <textarea value={address} onChange={handleAddress} rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-[4px] border border-[#424242] focus:bg-white focus:border focus:outline-none focus:border-[#1D8EE6] placeholder:text-[#ABABAB] placeholder:leading-6" placeholder="Write your thoughts here..."></textarea>
            </div>

            <Button title="Continue" disabled={displayBtn} className="mt-5 te w-full sm:w-[unset]" onClick={() => { setStep('lief') }} />
            {/* <Button title="Continue" className="mt-5" onClick={increment} /> */}
          </div>
        </form>
      }
    </div>
  )
}

export default MedicalHistory
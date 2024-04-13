import Button from "../Button/Button";
import Input from "../Input/Input";
import useCountStore from "../../store/store";
import { useState } from "react";
const GettingStartedForm = () => {
  const [step, setStep] = useState('')
    const form = useCountStore((state) => state.form);
    const { increment } = useCountStore()
    const firstName = useCountStore((state) => state.form.firstName);
    const lastName = useCountStore((state) => state.form.lastName);
    const date = useCountStore((state) => state.form.date);
    const phoneNumber = useCountStore((state) => state.form.phoneNumber);
    const handleFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
      useCountStore.setState({
        form: {
          ...form,
          firstName: String(e.target.value),
        },
      });
    };
  
    const handleLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
      useCountStore.setState({
        form: {
          ...form,
          lastName: String(e.target.value),
        },
      });
    };
    const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
      useCountStore.setState({
        form: {
          ...form,
          phoneNumber: String(e.target.value),
        },
      });
    };
    const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
      useCountStore.setState({
        form: {
          ...form,
          date: Number(e.target.value),
        },
      });
    };
   
    
  return (
      <div className="flex justify-center w-full">
        {step && 
        <>Life</>
        }
        {!step && 

        <form className="flex flex-col max-w-2xl w-full mt-10">
        <div className="break-all mb-10">
            <div className="text-lg md:text-2xl text-[#002355]">Getting started</div>
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
            name="first name"
            placeholder="First Name"
            />
          <Input
            value={lastName}
            className="mb-1"
            type="text"
            onChange={handleLastName}
            name="last name"
            placeholder="hr@tch.com"
            />
        </div>

      <div className="grid md:grid-cols-2 gap-3">
          <Input
            label="Date of Birth"
            className="mb-1"
            value={date}
            type="text"
            onChange={handleDate}
            name="date"
            placeholder="First Name"
            TrailingIcon={() => <img className="pr-3" src="dateinput.svg" />}
            />
          <div className="flex flex-col">
          <label className="mb-1 text-[#0D1227] leading-6 flex items-center text-left text-xs md:text-sm font-normal">
					{"What’s your gender?"}</label>

            <div className="flex items-start flex-1 gap-2 w-full">
              <div className="flex items-center justify-center border cursor-pointer border-[#424242] rounded-[4px] text-sm font-normal leading-6 px-6 py-3 w-full text-center bg-white">Male</div>
              <div className="flex items-center justify-center border cursor-pointer border-[#424242] rounded-[4px] text-sm font-normal leading-6 px-6 py-3 w-full text-center bg-white">Female</div>
            </div>
          </div>
        </div>
      
          <Input
            label="What’s your phone number?"
            className="mb-1"
            value={phoneNumber}
            type="text"
            onChange={handlePhoneNumber}
            name="first name"
            placeholder="+234 | Your number goes here"
            LeadingIcon={() => <img className="pl-3" src="nigeria-flag.svg" />}
            />

        {/* <Input
          label="Official Email"
          className="mb-1"
          inputClassName="w-full"
          value={email}
          type="email"
          name="email"
          onChange={handleEmail}
          placeholder="hr@tch.com"
          /> */}
        <div>
        <label className="my-1 text-[#0D1227] leading-[19.6px] flex items-center text-left text-xs md:text-sm font-semibold">Enter your address here (Optional)</label>
        <textarea rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-[4px] border border-[#424242] focus:bg-white focus:border focus:outline-none focus:border-[#1D8EE6] placeholder:text-[#ABABAB] placeholder:leading-6" placeholder="Write your thoughts here..."></textarea>
        </div>
      
        <Button title="Continue" loading className="mt-5 te w-full sm:w-[unet]" onClick={() => {setStep('lief')}} />
        {/* <Button title="Continue" className="mt-5" onClick={increment} /> */}
      </div>
    </form>
    }
      </div>
  )
}

export default GettingStartedForm
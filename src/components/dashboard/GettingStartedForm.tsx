import Button from "../Button/Button";
import Input from "../Input/Input";
import useCountStore from "../../store/store";
import { FormEvent, useState } from "react";
import * as yup from 'yup';
import { chronicConditionData } from "../../data/data";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  phoneNumber: yup.string().matches(/^\+234\d{10}$/, 'Invalid Nigerian phone number').required('Phone number is required'),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  date: yup.string().required(),
  address: yup.string().required(),
  gender: yup.string().required()
})

const GettingStartedForm = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState('')
  const form = useCountStore((state) => state.form);
  const { count, chronicCondition } = useCountStore()
  const firstName = useCountStore((state) => state.form.firstName);
  const lastName = useCountStore((state) => state.form.lastName);
  const date = useCountStore((state) => state.form.date);
  const address = useCountStore((state) => state.form.address);
  const phoneNumber = useCountStore((state) => state.form.phoneNumber);
  const gender = useCountStore((state) => state.form.gender);
  const others = useCountStore((state) => state.form.others);
  const [yesOpt, setYesOpt] = useState('')
  const [error, setError] = useState('');

  // const [selectedValues, setSelectedValues] = useState<{value: string, label: string}[]>([]);
  // interface ArrayType {
  //     value: string, 
  //     label: string
  // }

  // const [selectedValues, setSelectedValues] = useState<any[]>([]);
  // console.log(selectedValues, 'selectedValues')
  console.log(chronicCondition, 'chronicCondition')


  const displayBtn = !phoneNumber || !firstName || !lastName || !gender || !address || !date;

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
    setError('');
  };
  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    useCountStore.setState({
      form: {
        ...form,
        date: String(e.target.value),
      },
    });
  };
  const handleAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    useCountStore.setState({
      form: {
        ...form,
        address: String(e.target.value),
      },
    });
    setError('');
  };
  const handleOthers = (e: React.ChangeEvent<HTMLInputElement>) => {
    useCountStore.setState({
      form: {
        ...form,
        others: String(e.target.value),
      },
    });
    setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    schema
      .validate({ phoneNumber })
      .then(() => {
        // Validation success
        console.log('Valid phone number:', phoneNumber);
        // Here you can perform further actions like submitting the form
      })
      .catch((validationError) => {
        // Validation failed
        console.error('Validation error:', validationError);
        setError(validationError.errors[0]);
      });
  };

  return (
    <div className="flex justify-center w-full">
      {step &&
        <div className="flex flex-col max-w-2xl items-star w-full mt-10">
          <div className="break-all mb-10">
            <div className="text-2xl text-[#1C1C1C] mb-2">Are you currently managing any <br /> chronic condition?</div>
            <div className="text-[#444444] text-[14px] ">Are you currently managing any chronic condition at this time or have you ever <br /> managed any chronic condition?</div>
          </div>
          <div className="flex flex-col">

            <div className="flex items-start flex-1 gap-2 w-full md:pr-32">
              <div onClick={() => setYesOpt('yes')} className={`${yesOpt == 'yes' && 'bg-purple-100 border border-purple-600'} flex items-center justify-center border cursor-pointer border-[#424242] rounded-[4px] text-sm font-normal leading-6 px-4 py-6 w-full text-center bg-white`}>Yes, I am / I have</div>
              <div onClick={() => {setYesOpt('no'); useCountStore.setState({chronicCondition: []});}} className={`${yesOpt == 'no' && 'bg-purple-100 border border-purple-600'} flex items-center justify-center border cursor-pointer border-[#424242] rounded-[4px] text-sm font-normal leading-6 px-4 py-6 w-full text-center bg-white`}>No, I’m not / I don’t</div>
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
                  {chronicConditionData.map(({value}) => {
                  const index = chronicCondition?.indexOf(value);
                  const isSelected = index !== -1;
                  // console.log(isSelected, 'isSelected')
                  // console.log(index, 'index')
                  const radio = false;
                  const RBoxgrouplogic = (): void => {
                    if (radio) {
                      useCountStore.setState({chronicCondition: [value]});
                    } else {
                      if (isSelected) {
                        chronicCondition?.splice(index, 1);
                      } else {
                        chronicCondition?.push(value);
                      }
                      useCountStore.setState({chronicCondition: [...chronicCondition]});
                    }
                  };

                  return (
                  <div key={value} 
                  onClick={RBoxgrouplogic}
                  // onClick={() =>
                  //   // useCountStore.setState({chronicCondition: ()});
                  //   setSelectedValues((prev) => {
                  //     const spr = [...prev]
                  //     const i = spr.indexOf(item.value)
                  //     if (i > -1 || isSelected) {
                  //       spr.splice(i, 1)
                  //     } else  {
                  //       spr.push(item.value)
                  //     }
                  //     return spr
                  //   })}
                     className={`${chronicCondition?.includes(value) && '!border !border-purple-600 text-purple-600' }  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
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
              <Button title={`${yesOpt == 'yes' ? 'Finish' : 'Continue'}`} disabled={!yesOpt || (yesOpt == 'yes' && !chronicCondition?.length)  || (yesOpt === 'no'&& chronicCondition?.length as unknown as boolean)} className="mb-20 mt-10 te w-full sm:w-[unset]" onClick={() => {
                if (yesOpt == 'yes') {
                  navigate('/a-second-opinion')
                  // useCountStore.persist.clearStorage();
                } else if (yesOpt == 'no') {
                  // increment()
                  useCountStore.setState({count: count + 1})
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
              type="tel"
              onChange={handlePhoneNumber}
              name="phoneNumber"
              placeholder="  +234 | Your number goes here"
              LeadingIcon={() => <img className="pl-3" src="nigeria-flag.svg" />}
            />
            {error && <div className="text-red-600 text-xs">{error}</div>}

            <div>
              <label className="my-1 text-[#0D1227] leading-[19.6px] flex items-center text-left text-xs md:text-sm font-">Enter your address here (Optional)</label>
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

export default GettingStartedForm
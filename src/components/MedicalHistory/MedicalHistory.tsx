import { FormEvent, useState } from "react";
import useCountStore from "../../store/store";
import { underliningconditionData, currentlyManagingAnyoFtheseConditionsData, medicalUnderliningConditionToReferToUs } from "../../data/data";
import Input from "../Input/Input";
import Button from "../Button/Button";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";


const MedicalHistory = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState('hmm')
  const [yesOpt, setYesOpt] = useState('')
  const [error, setError] = useState('');

  const {underliningcondition, currentlyManagingAnyoFtheseConditions, form } = useCountStore()
  const others = useCountStore(state => state.form.othersMedicalHistory)
  const contactInfoEmailnPhone = useCountStore(state => state.form.contactInfoEmailnPhone)

  // console.log(underliningcondition[0], 'underliningcondition')

  const disabledBtn = (yesOpt == 'yes') ? (!underliningcondition.length || !currentlyManagingAnyoFtheseConditions.length) : (underliningcondition[0] == 'No' ? !underliningcondition.length : !contactInfoEmailnPhone )

  const schema = Yup.object().shape({
    contactInfo: Yup.string()
      .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Invalid phone number or email')
      .required('Phone number or email is required'), 
  });

  // console.log(currentlyManagingAnyoFtheseConditions, 'currentlyManagingAnyoFtheseConditions')

  const handleOthers = (e: React.ChangeEvent<HTMLInputElement>) => {
    useCountStore.setState({
      form: {
        ...form,
        othersMedicalHistory: String(e.target.value),
      },
    });
    // setError('');
  };
  const handleContactInfoEmailnPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    useCountStore.setState({
      form: {
        ...form,
        contactInfoEmailnPhone: String(e.target.value),
      },
    });
    // setError('');
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await schema.validate({ contactInfo: contactInfoEmailnPhone }, { abortEarly: false });
      setError('');
      console.log('Phone number/email:', contactInfoEmailnPhone);
      // You can submit the form data to your backend or perform other actions here
    } catch (validationError) {
      setError(validationError.errors[0]);
    }
  };

  return (
    <div className="flex justify-center w-full">
      {step &&
        <div className="flex flex-col max-w-2xl items-star w-full mt-10">
          <div className="break-all mb-10">
            <div className="text-2xl text-[#1C1C1C] mb-2">Medical History</div>
            <div className="text-[#444444] text-[14px] ">Tell us about your medical history?</div>
          </div>

            <div className="break-all mb-10">
              <div className="text-lg md:text-lg font-semibold text-[#1C1C1C] mb-2">Do you have any non-chronic medical underlining <br /> condition in the past or recently?</div>
            </div>
          <div className="flex flex-col">
            <div className="flex items-start flex-1 gap-2 w-full md:pr-32">
              <div onClick={() => setYesOpt('yes')} className={`${yesOpt == 'yes' && 'bg-purple-100 border border-purple-600'} flex items-center justify-center border cursor-pointer border-[#424242] rounded-[4px] text-sm font-normal leading-6 px-4 py-6 w-full text-center bg-white`}>Yes, I am / I have</div>
              <div onClick={() => {setYesOpt('no'); useCountStore.setState({underliningcondition: []}); useCountStore.setState({currentlyManagingAnyoFtheseConditions: []});}} className={`${yesOpt == 'no' && 'bg-purple-100 border border-purple-600'} flex items-center justify-center border cursor-pointer border-[#424242] rounded-[4px] text-sm font-normal leading-6 px-4 py-6 w-full text-center bg-white`}>No, I’m not / I don’t</div>
            </div>

            {yesOpt == 'yes' && (
              <div>
                {/* <div className="my-5" /> */}
                <hr className="border my-8 border-black " />
                <div className="break-all mb-10">
                  <div className="text-lg md:text-lg font-semibold text-[#1C1C1C] mb-2">What non-chronic medical underliningcondition(s) are your managing? </div>
                  <div className="text-lg md:text-lg text-[#1C1C1C] italic mb-2">(select all that apply) </div>
                </div>

                    <div className="flex flex-wrap gap-2 max-w-fit">
                      {underliningconditionData.map(({value}) => {
                      const index = underliningcondition.indexOf(value);
                      const isSelected = index !== -1;
                      // console.log(isSelected, 'isSelected')
                      // console.log(index, 'index')
                      const radio = false;
                      const RBoxgrouplogic = (): void => {
                        if (radio) {
                          useCountStore.setState({underliningcondition: [value]});
                        } else {
                          if (isSelected) {
                            underliningcondition.splice(index, 1);
                          } else {
                            underliningcondition.push(value);
                          }
                          useCountStore.setState({chronicCondition: [...underliningcondition]});
                        }
                      };

                      return (
                      <div key={value} onClick={RBoxgrouplogic} className={`${underliningcondition.includes(value) && '!border !border-purple-600 text-purple-600' }  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                      )}
                      )}
                    </div>

                    <Input
                    label="Others?"
                    value={others}
                    className="my-10"
                    type="text"
                    onChange={handleOthers}
                    name="others"
                    placeholder="Please state"
                  />
                  {error && <span className="text-xs text-red-600">{error}</span>}

                  {/* section yes or no */}
                <div className="flex items-center gap-2">
                  <div className="text-lg leading-7 font-bold my-2">Are you currently managing any of these conditions?</div>
                </div>
                  <div className="flex items-center flex-wrap gap-2 mb-4">
                    {currentlyManagingAnyoFtheseConditionsData.map(({value}) => {
                      const index = currentlyManagingAnyoFtheseConditions.indexOf(value);
                      const isSelected = index !== -1;
                    
                      const radio = true;

                      const RBoxgrouplogic = (): void => {
                        if (radio) {
                          useCountStore.setState({currentlyManagingAnyoFtheseConditions: [value]});
                        } else {
                          if (isSelected) {
                            currentlyManagingAnyoFtheseConditions.splice(index, 1);
                          } else {
                            currentlyManagingAnyoFtheseConditions.push(value);
                          }
                          useCountStore.setState({currentlyManagingAnyoFtheseConditions: [...currentlyManagingAnyoFtheseConditions]});
                        }
                      };
                      return (
                        <div key={value} onClick={RBoxgrouplogic}
                        className={`${currentlyManagingAnyoFtheseConditions.includes(value) && '!border !border-purple-600 text-purple-600' } whitespace-nowrap cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                      )
                    })}
                  </div>
              </div>
            )}
            

            {/* NO */}
            {yesOpt == 'no' && (
               <div>
               {/* <div className="my-5" /> */}
               <hr className="border my-8 border-black " />
               <div className="break-all mb-0">
                 <div className="text-lg md:text-lg font-semibold text-[#1C1C1C] mb-2">Do you have/know anyone that has a medical underlining condition <br /> to refer to us?</div>
               </div>

                   <div className="flex flex-wrap gap-2 max-w-fit">
                     {medicalUnderliningConditionToReferToUs.map(({value}) => {
                     const index = underliningcondition.indexOf(value);
                     const isSelected = index !== -1;
                     // console.log(isSelected, 'isSelected')
                     // console.log(index, 'index')
                     const radio = true;
                     const RBoxgrouplogic = (): void => {
                       if (radio) {
                         useCountStore.setState({underliningcondition: [value]});
                       } else {
                         if (isSelected) {
                           underliningcondition.splice(index, 1);
                         } else {
                           underliningcondition.push(value);
                         }
                         useCountStore.setState({chronicCondition: [...underliningcondition]});
                       }
                     };

                     return (
                     <div key={value} onClick={RBoxgrouplogic} className={`${underliningcondition.includes(value) && '!border !border-purple-600 text-purple-600' }  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                     )}
                     )}
                   </div>



                   <div className="break-all mt-3 md:-mb-4">
                 <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">If yes, kindly provide their phone number/email</div>
               </div>
                   <Input
                   label=""
                   value={contactInfoEmailnPhone}
                   className="mb-10"
                   type="text"
                   onChange={handleContactInfoEmailnPhone}
                   placeholder="Please state"
                 />
                {/* {error && <span className="text-xs text-red-600">{error}</span>} */}
                </div>

            )}
          </div>

          {yesOpt && <div>
              <Button title={`${yesOpt == 'no' ? 'Finish' : 'Continue'}`} 
              disabled={disabledBtn}
              // disabled={!yesOpt || (yesOpt == 'yes' && !underliningcondition.length)  || (yesOpt === 'no'&& underliningcondition.length as unknown as boolean)}
               className="mb-20 mt-10 te w-full sm:w-[unset]" onClick={() => {
                if (yesOpt == 'yes') {
                  // useCountStore.persist.clearStorage();
                  // increment()
                } else if (yesOpt == 'no') {
                  navigate('/finish')
                }
              }} />
            </div>}

        </div>
      }

      {/* {!step &&
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
          </div>
        </form> */}
      
    </div>
  )
}

export default MedicalHistory
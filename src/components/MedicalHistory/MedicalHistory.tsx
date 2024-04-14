import { FormEvent, useState } from "react";
import useCountStore from "../../store/store";
import { underliningconditionData, currentlyManagingAnyoFtheseConditionsData, medicalUnderliningConditionToReferToUs, anyKnownAllergicReactionsToTheseMedicationsData, adhereToTheseMedicationsData, barriersPreventingTreatmentPlan } from "../../data/data";
import Input from "../Input/Input";
import Button from "../Button/Button";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";


const MedicalHistory = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState('')
  const [yesOpt, setYesOpt] = useState('')
  const [error, setError] = useState('');

  const { underliningcondition, currentlyManagingAnyoFtheseConditions, nyKnownAllergicReactionsToTheseMedications, adhereToTheseMedications, form } = useCountStore()
  const others = useCountStore(state => state.form.othersMedicalHistory)
  const currentMedications = useCountStore(state => state.form.currentMedications)
  const contactInfoEmailnPhone = useCountStore(state => state.form.contactInfoEmailnPhone)
  const IfYesStateTheAllergies = useCountStore(state => state.form.IfYesStateTheAllergies)

  // console.log(currentlyManagingAnyoFtheseConditions[0], 'currentlyManagingAnyoFtheseConditions')

  const disabledBtn = (yesOpt == 'yes') ? (!underliningcondition.length || !currentlyManagingAnyoFtheseConditions.length) : (underliningcondition[0] == 'No' ? !underliningcondition.length : !contactInfoEmailnPhone)

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
  const handleIfYesStateTheAllergies = (e: React.ChangeEvent<HTMLInputElement>) => {
    useCountStore.setState({
      form: {
        ...form,
        IfYesStateTheAllergies: String(e.target.value),
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
  const handleCurrentMedications = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    useCountStore.setState({
      form: {
        ...form,
        currentMedications: String(e.target.value),
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
    } catch (validationError: any) {
      setError(validationError.errors[0]);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col max-w-2xl items-star w-full mt-10">
        <div className="break-all mb-10">
          <div className="text-2xl text-[#1C1C1C] mb-2">Medical History</div>
          <div className="text-[#444444] text-[14px] ">Tell us about your medical history?</div>
        </div>
        {!step &&
          <div>


            <div className="break-all mb-10">
              <div className="text-lg md:text-lg font-semibold text-[#1C1C1C] mb-2">Do you have any non-chronic medical underlining <br /> condition in the past or recently?</div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-start flex-1 gap-2 w-full md:pr-32">
                <div onClick={() => setYesOpt('yes')} className={`${yesOpt == 'yes' && 'bg-purple-100 border border-purple-600'} flex items-center justify-center border cursor-pointer border-[#424242] rounded-[4px] text-sm font-normal leading-6 px-4 py-6 w-full text-center bg-white`}>Yes, I am / I have</div>
                <div onClick={() => { setYesOpt('no'); useCountStore.setState({ underliningcondition: [] }); useCountStore.setState({ currentlyManagingAnyoFtheseConditions: [] }); }} className={`${yesOpt == 'no' && 'bg-purple-100 border border-purple-600'} flex items-center justify-center border cursor-pointer border-[#424242] rounded-[4px] text-sm font-normal leading-6 px-4 py-6 w-full text-center bg-white`}>No, I’m not / I don’t</div>
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
                    {underliningconditionData.map(({ value }) => {
                      const index = underliningcondition.indexOf(value);
                      const isSelected = index !== -1;
                      // console.log(isSelected, 'isSelected')
                      // console.log(index, 'index')
                      const radio = false;
                      const RBoxgrouplogic = (): void => {
                        if (radio) {
                          useCountStore.setState({ underliningcondition: [value] });
                        } else {
                          if (isSelected) {
                            underliningcondition.splice(index, 1);
                          } else {
                            underliningcondition.push(value);
                          }
                          useCountStore.setState({ underliningcondition: [...underliningcondition] });
                        }
                      };

                      return (
                        <div key={value} onClick={RBoxgrouplogic} className={`${underliningcondition.includes(value) && '!border !border-purple-600 text-purple-600'}  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                      )
                    }
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
                    {currentlyManagingAnyoFtheseConditionsData.map(({ value }) => {
                      const index = currentlyManagingAnyoFtheseConditions.indexOf(value);
                      const isSelected = index !== -1;

                      const radio = true;

                      const RBoxgrouplogic = (): void => {
                        if (radio) {
                          useCountStore.setState({ currentlyManagingAnyoFtheseConditions: [value] });
                        } else {
                          if (isSelected) {
                            currentlyManagingAnyoFtheseConditions.splice(index, 1);
                          } else {
                            currentlyManagingAnyoFtheseConditions.push(value);
                          }
                          useCountStore.setState({ currentlyManagingAnyoFtheseConditions: [...currentlyManagingAnyoFtheseConditions] });
                        }
                      };
                      return (
                        <div key={value} onClick={RBoxgrouplogic}
                          className={`${currentlyManagingAnyoFtheseConditions.includes(value) && '!border !border-purple-600 text-purple-600'} whitespace-nowrap cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
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
                    {medicalUnderliningConditionToReferToUs.map(({ value }) => {
                      const index = underliningcondition.indexOf(value);
                      const isSelected = index !== -1;
                      // console.log(isSelected, 'isSelected')
                      // console.log(index, 'index')
                      const radio = true;
                      const RBoxgrouplogic = (): void => {
                        if (radio) {
                          useCountStore.setState({ underliningcondition: [value] });
                        } else {
                          if (isSelected) {
                            underliningcondition.splice(index, 1);
                          } else {
                            underliningcondition.push(value);
                          }
                          useCountStore.setState({ underliningcondition: [...underliningcondition] });
                        }
                      };

                      return (
                        <div key={value} onClick={RBoxgrouplogic} className={`${underliningcondition.includes(value) && '!border !border-purple-600 text-purple-600'}  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                      )
                    }
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

              {yesOpt && <div>
                <Button title={`${yesOpt == 'no' ? 'Finish' : 'Continue'}`}
                  disabled={disabledBtn}
                  // disabled={!yesOpt || (yesOpt == 'yes' && !underliningcondition.length)  || (yesOpt === 'no'&& underliningcondition.length as unknown as boolean)}
                  className="mb-20 mt-10 te w-full sm:w-[unset]" onClick={() => {
                    if (yesOpt == 'yes' && currentlyManagingAnyoFtheseConditions[0] == 'Yes') {
                      setStep('list')
                    } else if (yesOpt == 'no') {
                      navigate('/finish')
                    }
                  }} />
              </div>}
            </div>



          </div>
        }

        {/* LIST */}
        {step === 'list' && (
          <div>
            <div>
              <div className="break-all mt-3 md:mb-4">
                <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">List all your current Medications.</div>
              </div>
              {/* <label className="my-1 text-[#0D1227] leading-[19.6px] flex items-center text-left text-xs md:text-sm font-">List all your current Medications.</label> */}
              <textarea value={currentMedications} onChange={handleCurrentMedications} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-[4px] border border-[#424242] focus:bg-white focus:border focus:outline-none focus:border-[#1D8EE6] placeholder:text-[#ABABAB] placeholder:leading-6" placeholder="Please state"></textarea>
            </div>

            <div>
              <div className="break-all mt-3 md:mb-4">
                <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">Do you have any known allergic reactions to these <br /> medications?</div>
              </div>
              <div className="flex flex-wrap gap-2 max-w-fit">
                {anyKnownAllergicReactionsToTheseMedicationsData.map(({ value }) => {
                  const index = nyKnownAllergicReactionsToTheseMedications.indexOf(value);
                  const isSelected = index !== -1;

                  const radio = true;
                  const RBoxgrouplogic = (): void => {
                    if (radio) {
                      useCountStore.setState({ nyKnownAllergicReactionsToTheseMedications: [value] });
                    } else {
                      if (isSelected) {
                        nyKnownAllergicReactionsToTheseMedications.splice(index, 1);
                      } else {
                        nyKnownAllergicReactionsToTheseMedications.push(value);
                      }
                      useCountStore.setState({ nyKnownAllergicReactionsToTheseMedications: [...nyKnownAllergicReactionsToTheseMedications] });
                    }
                  };

                  return (
                    <div key={value} onClick={RBoxgrouplogic} className={`${nyKnownAllergicReactionsToTheseMedications.includes(value) && '!border !border-purple-600 text-purple-600'}  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                  )
                }
                )}
              </div>


              <div className="break-all mt-3 md:-mb-2">
                <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">If yes, State the allergies</div>
              </div>
              <Input
                // label="Others?"
                value={IfYesStateTheAllergies}
                className=""
                type="text"
                onChange={handleIfYesStateTheAllergies}
                name="others"
                placeholder="Please state"
              />


              <div className="break-all mt-3 md:mb-4">
                <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">How much do you adhere to these medications?</div>
              </div>
              <div className="flex flex-wrap gap-2 max-w-fit">
                {adhereToTheseMedicationsData.map(({ value }) => {
                  const index = adhereToTheseMedications.indexOf(value);
                  const isSelected = index !== -1;

                  const radio = true;
                  const RBoxgrouplogic = (): void => {
                    if (radio) {
                      useCountStore.setState({ adhereToTheseMedications: [value] });
                    } else {
                      if (isSelected) {
                        adhereToTheseMedications.splice(index, 1);
                      } else {
                        adhereToTheseMedications.push(value);
                      }
                      useCountStore.setState({ adhereToTheseMedications: [...adhereToTheseMedications] });
                    }
                  };

                  return (
                    <div key={value} onClick={RBoxgrouplogic} className={`${adhereToTheseMedications.includes(value) && '!border !border-purple-600 text-purple-600'}  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                  )
                }
                )}
              </div>

              {yesOpt && <div>
                <Button title={`${yesOpt == 'no' ? 'Finish' : 'Next'}`}
                  disabled={!currentMedications || !adhereToTheseMedications.length || !nyKnownAllergicReactionsToTheseMedications.length}
                  className="mb-20 mt-10 te w-full sm:w-[unset]" onClick={() => {
                    if (yesOpt == 'yes' && currentlyManagingAnyoFtheseConditions[0] == 'Yes') {
                      setStep('medication')
                    }
                  }} />
              </div>}
            </div>
          </div>
        )}

        {/* Medication */}
        {step === 'medication' && (
          <div>
            <div>
              <div className="break-all mt-3 md:mb-4">
                <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">Are there any barriers preventing you from accessing <br /> healthcare or following your treatment plan?</div>
              </div>
             
              <div className="flex flex-wrap gap-2 max-w-fit">
                {barriersPreventingTreatmentPlan.map(({ value }) => {
                  const index = adhereToTheseMedications.indexOf(value);
                  const isSelected = index !== -1;

                  const radio = true;
                  const RBoxgrouplogic = (): void => {
                    if (radio) {
                      useCountStore.setState({ adhereToTheseMedications: [value] });
                    } else {
                      if (isSelected) {
                        adhereToTheseMedications.splice(index, 1);
                      } else {
                        adhereToTheseMedications.push(value);
                      }
                      useCountStore.setState({ adhereToTheseMedications: [...adhereToTheseMedications] });
                    }
                  };

                  return (
                    <div key={value} onClick={RBoxgrouplogic} className={`${adhereToTheseMedications.includes(value) && '!border !border-purple-600 text-purple-600'}  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                  )
                }
                )}
              </div>
            </div>

            <div>
              <div className="break-all mt-3 md:mb-4">
                <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">Do you have any known allergic reactions to these <br /> medications?</div>
              </div>
              <div className="flex flex-wrap gap-2 max-w-fit">
                {anyKnownAllergicReactionsToTheseMedicationsData.map(({ value }) => {
                  const index = nyKnownAllergicReactionsToTheseMedications.indexOf(value);
                  const isSelected = index !== -1;

                  const radio = true;
                  const RBoxgrouplogic = (): void => {
                    if (radio) {
                      useCountStore.setState({ nyKnownAllergicReactionsToTheseMedications: [value] });
                    } else {
                      if (isSelected) {
                        nyKnownAllergicReactionsToTheseMedications.splice(index, 1);
                      } else {
                        nyKnownAllergicReactionsToTheseMedications.push(value);
                      }
                      useCountStore.setState({ nyKnownAllergicReactionsToTheseMedications: [...nyKnownAllergicReactionsToTheseMedications] });
                    }
                  };

                  return (
                    <div key={value} onClick={RBoxgrouplogic} className={`${nyKnownAllergicReactionsToTheseMedications.includes(value) && '!border !border-purple-600 text-purple-600'}  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                  )
                }
                )}
              </div>


              <div className="break-all mt-3 md:-mb-2">
                <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">If yes, State the allergies</div>
              </div>
              <Input
                // label="Others?"
                value={IfYesStateTheAllergies}
                className=""
                type="text"
                onChange={handleIfYesStateTheAllergies}
                name="others"
                placeholder="Please state"
              />


              <div className="break-all mt-3 md:mb-4">
                <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">How much do you adhere to these medications?</div>
              </div>
              <div className="flex flex-wrap gap-2 max-w-fit">
                {adhereToTheseMedicationsData.map(({ value }) => {
                  const index = adhereToTheseMedications.indexOf(value);
                  const isSelected = index !== -1;

                  const radio = true;
                  const RBoxgrouplogic = (): void => {
                    if (radio) {
                      useCountStore.setState({ adhereToTheseMedications: [value] });
                    } else {
                      if (isSelected) {
                        adhereToTheseMedications.splice(index, 1);
                      } else {
                        adhereToTheseMedications.push(value);
                      }
                      useCountStore.setState({ adhereToTheseMedications: [...adhereToTheseMedications] });
                    }
                  };

                  return (
                    <div key={value} onClick={RBoxgrouplogic} className={`${adhereToTheseMedications.includes(value) && '!border !border-purple-600 text-purple-600'}  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                  )
                }
                )}
              </div>

              {yesOpt && <div>
                <Button title={`${yesOpt == 'no' ? 'Finish' : 'Next'}`}
                  disabled={!currentMedications || !adhereToTheseMedications.length || !nyKnownAllergicReactionsToTheseMedications.length}
                  className="mb-20 mt-10 te w-full sm:w-[unset]" onClick={() => {
                    if (yesOpt == 'yes' && currentlyManagingAnyoFtheseConditions[0] == 'Yes') {
                      setStep('medication')
                    }
                  }} />
              </div>}
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default MedicalHistory
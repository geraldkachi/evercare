import { FormEvent, useState } from "react";
import useCountStore from "../../store/store";
import { underliningconditionData, currentlyManagingAnyoFtheseConditionsData, medicalUnderliningConditionToReferToUs, anyKnownAllergicReactionsToTheseMedicationsData, adhereToTheseMedicationsData, barriersPreventingTreatmentPlanData, ifYesWhatAreTheseBarriersData, membersOrCaregiversInvolvedInYourCareData, carryingOutTheseActivitiesData, natureOfThePainData, natureOFYourMobilityData, historyOfAnyChronicDiseasesData, experiencedAnySignificantChangesInYourFealthoRLifestyleRecentlyData, doYouFeelPainWhenCarryingOutTheseActivitiesData, natureOfYourMobilityData, whatIsTheNatureOfThePainData } from "../../data/data";
import Input from "../Input/Input";
import Button from "../Button/Button";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";


const MedicalHistory = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState('')
  const [yesOpt, setYesOpt] = useState('')
  const [error, setError] = useState('');

  const { underliningcondition, currentlyManagingAnyoFtheseConditions, nyKnownAllergicReactionsToTheseMedications, adhereToTheseMedications, barriersPreventingTreatmentPlan, ifYesWhatAreTheseBarriers, membersOrCaregiversInvolvedInYourCare, carryingOutTheseActivities, natureOfThePain, natureOFYourMobility, historyOfAnyChronicDiseases, experiencedAnySignificantChangesInYourFealthoRLifestyleRecently, doYouFeelPainWhenCarryingOutTheseActivities, whatIsTheNatureOfThePain, whatIsTheNatureOfYourMobilityEnd, form } = useCountStore()
  const others = useCountStore(state => state.form.othersMedicalHistory)
  const currentMedications = useCountStore(state => state.form.currentMedications)
  const contactInfoEmailnPhone = useCountStore(state => state.form.contactInfoEmailnPhone)
  const IfYesStateTheAllergies = useCountStore(state => state.form.IfYesStateTheAllergies)
  const othersBarriers = useCountStore(state => state.form.othersBarriers)
  const whatTypeAndFrequency = useCountStore(state => state.form.whatTypeAndFrequency)
  const painFelt = useCountStore(state => state.form.painFelt)
  const engageInRegularPA = useCountStore(state => state.form.engageInRegularPhysicalActivity)
  const whereIsThisPainFelt = useCountStore(state => state.form.whereIsThisPainFelt)

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
  const handleOthersBarriers = (e: React.ChangeEvent<HTMLInputElement>) => {
    useCountStore.setState({
      form: {
        ...form,
        othersBarriers: String(e.target.value),
      },
    });
    // setError('');
  };

  const handleWhatTypeAndFrequency = (e: React.ChangeEvent<HTMLInputElement>) => {
    useCountStore.setState({
      form: {
        ...form,
        whatTypeAndFrequency: String(e.target.value),
      },
    });
    // setError('');
  };
  const handlePainFelt = (e: React.ChangeEvent<HTMLInputElement>) => {
    useCountStore.setState({
      form: {
        ...form,
        painFelt: String(e.target.value),
      },
    });
    // setError('');
  };

  const handleEngageInRegularPhysicalActivity = (e: React.ChangeEvent<HTMLInputElement>) => {
    useCountStore.setState({
      form: {
        ...form,
        engageInRegularPhysicalActivity: String(e.target.value),
      },
    });
    // setError('');
  };
  const handleWhereIsThisPainFelt = (e: React.ChangeEvent<HTMLInputElement>) => {
    useCountStore.setState({
      form: {
        ...form,
        whereIsThisPainFelt: String(e.target.value),
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
                    } else if(currentlyManagingAnyoFtheseConditions[0] == 'No') {
                      setStep('managing-conditions')
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
                {barriersPreventingTreatmentPlanData.map(({ value }) => {
                  const index = barriersPreventingTreatmentPlan.indexOf(value);
                  const isSelected = index !== -1;

                  const radio = true;
                  const RBoxgrouplogic = (): void => {
                    if (radio) {
                      useCountStore.setState({ barriersPreventingTreatmentPlan: [value] });
                    } else {
                      if (isSelected) {
                        barriersPreventingTreatmentPlan.splice(index, 1);
                      } else {
                        barriersPreventingTreatmentPlan.push(value);
                      }
                      useCountStore.setState({ barriersPreventingTreatmentPlan: [...barriersPreventingTreatmentPlan] });
                    }
                  };

                  return (
                    <div key={value} onClick={RBoxgrouplogic} className={`${barriersPreventingTreatmentPlan.includes(value) && '!border !border-purple-600 text-purple-600'}  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                  )
                }
                )}
              </div>
            </div>

            <div>
              <div className="break-all mt-3 md:mb-4">
                <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">If yes, What are these barriers? (Tick as it applies to you)</div>
              </div>
              <div className="flex flex-wrap gap-2 max-w-fit">
                {ifYesWhatAreTheseBarriersData.map(({ value }) => {
                  const index = ifYesWhatAreTheseBarriers.indexOf(value);
                  const isSelected = index !== -1;

                  const radio = true;
                  const RBoxgrouplogic = (): void => {
                    if (radio) {
                      useCountStore.setState({ ifYesWhatAreTheseBarriers: [value] });
                    } else {
                      if (isSelected) {
                        ifYesWhatAreTheseBarriers.splice(index, 1);
                      } else {
                        ifYesWhatAreTheseBarriers.push(value);
                      }
                      useCountStore.setState({ ifYesWhatAreTheseBarriers: [...ifYesWhatAreTheseBarriers] });
                    }
                  };

                  return (
                    <div key={value} onClick={RBoxgrouplogic} className={`${ifYesWhatAreTheseBarriers.includes(value) && '!border !border-purple-600 text-purple-600'}  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                  )
                }
                )}
              </div>

              <Input
                label="Others?"
                value={othersBarriers}
                className=" mt-3"
                type="text"
                onChange={handleOthersBarriers}
                name="others"
                placeholder="Please state"
              />


              <div className="break-all mt-3 md:mb-4">
                <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">Are there any family members or caregivers <br /> involved in your care?</div>
              </div>
              <div className="flex flex-wrap gap-2 max-w-fit">
                {membersOrCaregiversInvolvedInYourCareData.map(({ value }) => {
                  const index = membersOrCaregiversInvolvedInYourCare.indexOf(value);
                  const isSelected = index !== -1;

                  const radio = true;
                  const RBoxgrouplogic = (): void => {
                    if (radio) {
                      useCountStore.setState({ membersOrCaregiversInvolvedInYourCare: [value] });
                    } else {
                      if (isSelected) {
                        membersOrCaregiversInvolvedInYourCare.splice(index, 1);
                      } else {
                        membersOrCaregiversInvolvedInYourCare.push(value);
                      }
                      useCountStore.setState({ membersOrCaregiversInvolvedInYourCare: [...membersOrCaregiversInvolvedInYourCare] });
                    }
                  };

                  return (
                    <div key={value} onClick={RBoxgrouplogic} className={`${membersOrCaregiversInvolvedInYourCare.includes(value) && '!border !border-purple-600 text-purple-600'}  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                  )
                }
                )}
              </div>

              {yesOpt && <div>
                <Button title={`${yesOpt == 'no' ? 'Finish' : 'Next'}`}
                  disabled={!currentMedications || !adhereToTheseMedications.length || !nyKnownAllergicReactionsToTheseMedications.length}
                  className="mb-20 mt-10 te w-full sm:w-[unset]" onClick={() => {
                    if (yesOpt == 'yes' && currentlyManagingAnyoFtheseConditions[0] == 'Yes') {
                      setStep('after-medication')
                    }
                  }} />
              </div>}
            </div>
          </div>
        )}

        {step == 'after-medication' && (
           <div>
           <div>
             <div className="break-all mt-3 md:mb-4">
               <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">Do you engage in regular physical activity? If so, <br /> what type and frequency?</div>
             </div>
            
             <Input
               label="Others?"
               value={whatTypeAndFrequency}
               className=" mt-3"
               type="text"
               onChange={handleWhatTypeAndFrequency}
               name="others"
               placeholder="Please state"
             />
           </div>

           <div>
             <div className="break-all mt-3 md:mb-4">
               <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">Do you feel pain when carrying out these activities?</div>
             </div>
             <div className="flex flex-wrap gap-2 max-w-fit">
               {carryingOutTheseActivitiesData.map(({ value }) => {
                 const index = carryingOutTheseActivities.indexOf(value);
                 const isSelected = index !== -1;

                 const radio = true;
                 const RBoxgrouplogic = (): void => {
                   if (radio) {
                     useCountStore.setState({ carryingOutTheseActivities: [value] });
                   } else {
                     if (isSelected) {
                       carryingOutTheseActivities.splice(index, 1);
                     } else {
                       carryingOutTheseActivities.push(value);
                     }
                     useCountStore.setState({ carryingOutTheseActivities: [...carryingOutTheseActivities] });
                   }
                 };

                 return (
                   <div key={value} onClick={RBoxgrouplogic} className={`${carryingOutTheseActivities.includes(value) && '!border !border-purple-600 text-purple-600'}  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                 )
               }
               )}
             </div>


             <div className="break-all mt-3 md:mb-4">
               <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">What is the nature of the pain?</div>
             </div>
             <div className="flex flex-wrap gap-2 max-w-fit">
               {natureOfThePainData.map(({ value }) => {
                 const index = natureOfThePain.indexOf(value);
                 const isSelected = index !== -1;

                 const radio = true;
                 const RBoxgrouplogic = (): void => {
                   if (radio) {
                     useCountStore.setState({ natureOfThePain: [value] });
                   } else {
                     if (isSelected) {
                       natureOfThePain.splice(index, 1);
                     } else {
                       natureOfThePain.push(value);
                     }
                     useCountStore.setState({ natureOfThePain: [...natureOfThePain] });
                   }
                 };

                 return (
                   <div key={value} onClick={RBoxgrouplogic} className={`${natureOfThePain.includes(value) && '!border !border-purple-600 text-purple-600'}  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                 )
               }
               )}
             </div>

             <div className="break-all mt-3 md:mb-4">
               <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">Where is this pain felt?</div>
             </div>
             
             <Input
               label=""
               value={painFelt}
               className="md:-mt-8"
               type="text"
               onChange={handlePainFelt}
               name="others"
               placeholder="Please state"
             />


             <div className="break-all mt-3 md:mb-4">
               <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">What is the nature of your Mobility?</div>
             </div>
             <div className="flex flex-wrap gap-2 max-w-fit">
               {natureOFYourMobilityData.map(({ value }) => {
                 const index = natureOFYourMobility.indexOf(value);
                 const isSelected = index !== -1;

                 const radio = true;
                 const RBoxgrouplogic = (): void => {
                   if (radio) {
                     useCountStore.setState({ natureOFYourMobility: [value] });
                   } else {
                     if (isSelected) {
                       natureOFYourMobility.splice(index, 1);
                     } else {
                       natureOFYourMobility.push(value);
                     }
                     useCountStore.setState({ natureOFYourMobility: [...natureOFYourMobility] });
                   }
                 };

                 return (
                   <div key={value} onClick={RBoxgrouplogic} className={`${natureOFYourMobility.includes(value) && '!border !border-purple-600 text-purple-600'}  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                 )
               }
               )}
             </div>

             {yesOpt && <div>
               <Button title={`${yesOpt == 'no' ? 'Finish' : 'Next'}`}
                 disabled={!currentMedications || !adhereToTheseMedications.length || !nyKnownAllergicReactionsToTheseMedications.length}
                 className="mb-20 mt-10 te w-full sm:w-[unset]" onClick={() => {
                   if (yesOpt == 'yes' && currentlyManagingAnyoFtheseConditions[0] == 'Yes') {
                     navigate('/finish')
                   }
                 }} />
             </div>}
           </div>
         </div>
        )}

        
        {/* // Are you currently managing any of these conditions? */}
        {(currentlyManagingAnyoFtheseConditions[0] == 'No' && step == 'managing-conditions') && (
          <div>
          <div>
            <div className="break-all mt-3 md:mb-4">
              <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">Do you have a family history of any chronic diseases (e.g., heart <br /> disease, diabetes, cancer)?</div>
            </div>
           
           
            <div className="flex flex-wrap gap-2 max-w-fit">
              {historyOfAnyChronicDiseasesData.map(({ value }) => {
                const index = historyOfAnyChronicDiseases.indexOf(value);
                const isSelected = index !== -1;

                const radio = true;
                const RBoxgrouplogic = (): void => {
                  if (radio) {
                    useCountStore.setState({ historyOfAnyChronicDiseases: [value] });
                  } else {
                    if (isSelected) {
                      historyOfAnyChronicDiseases.splice(index, 1);
                    } else {
                      historyOfAnyChronicDiseases.push(value);
                    }
                    useCountStore.setState({ historyOfAnyChronicDiseases: [...historyOfAnyChronicDiseases] });
                  }
                };

                return (
                  <div key={value} onClick={RBoxgrouplogic} className={`${historyOfAnyChronicDiseases.includes(value) && '!border !border-purple-600 text-purple-600'}  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                )
              }
              )}
            </div>
          </div>

          <div>
            <div className="break-all mt-3 md:mb-4">
              <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">Have you experienced any significant changes in your <br /> health or lifestyle recently?</div>
            </div>
           
           
            <div className="flex flex-wrap gap-2 max-w-fit">
              {experiencedAnySignificantChangesInYourFealthoRLifestyleRecentlyData.map(({ value }) => {
                const index = experiencedAnySignificantChangesInYourFealthoRLifestyleRecently.indexOf(value);
                const isSelected = index !== -1;

                const radio = true;
                const RBoxgrouplogic = (): void => {
                  if (radio) {
                    useCountStore.setState({ experiencedAnySignificantChangesInYourFealthoRLifestyleRecently: [value] });
                  } else {
                    if (isSelected) {
                      experiencedAnySignificantChangesInYourFealthoRLifestyleRecently.splice(index, 1);
                    } else {
                      experiencedAnySignificantChangesInYourFealthoRLifestyleRecently.push(value);
                    }
                    useCountStore.setState({ experiencedAnySignificantChangesInYourFealthoRLifestyleRecently: [...experiencedAnySignificantChangesInYourFealthoRLifestyleRecently] });
                  }
                };

                return (
                  <div key={value} onClick={RBoxgrouplogic} className={`${experiencedAnySignificantChangesInYourFealthoRLifestyleRecently.includes(value) && '!border !border-purple-600 text-purple-600'}  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                )
              }
              )}
            </div>
          </div>

          <div>
            <div className="break-all mt-3 md:mb-4">
              <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">Do you engage in regular physical activity? If so, what <br /> type and frequency?</div>
            </div>
            <Input
              label=""
              value={engageInRegularPA}
              className="md:-mt-8"
              type="text"
              onChange={handleEngageInRegularPhysicalActivity}
              name="others"
              placeholder="Please state"
            />


            <div className="break-all mt-3 md:mb-4">
              <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">Do you feel pain when carrying out these activities?</div>
            </div>
            <div className="flex flex-wrap gap-2 max-w-fit">
              {doYouFeelPainWhenCarryingOutTheseActivitiesData.map(({ value }) => {
                const index = doYouFeelPainWhenCarryingOutTheseActivities.indexOf(value);
                const isSelected = index !== -1;

                const radio = true;
                const RBoxgrouplogic = (): void => {
                  if (radio) {
                    useCountStore.setState({ doYouFeelPainWhenCarryingOutTheseActivities: [value] });
                  } else {
                    if (isSelected) {
                      doYouFeelPainWhenCarryingOutTheseActivities.splice(index, 1);
                    } else {
                      doYouFeelPainWhenCarryingOutTheseActivities.push(value);
                    }
                    useCountStore.setState({ doYouFeelPainWhenCarryingOutTheseActivities: [...doYouFeelPainWhenCarryingOutTheseActivities] });
                  }
                };

                return (
                  <div key={value} onClick={RBoxgrouplogic} className={`${doYouFeelPainWhenCarryingOutTheseActivities.includes(value) && '!border !border-purple-600 text-purple-600'}  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                )
              }
              )}
            </div>


            {yesOpt && <div>
              <Button title={`${yesOpt == 'no' ? 'Finish' : 'Next'}`}
                // disabled={!currentMedications || !adhereToTheseMedications.length || !nyKnownAllergicReactionsToTheseMedications.length}
                className="mb-20 mt-10 te w-full sm:w-[unset]" onClick={() => {
                  if (yesOpt == 'yes' && doYouFeelPainWhenCarryingOutTheseActivities[0] == 'No') {
                    navigate('/finish')
                  } else if(doYouFeelPainWhenCarryingOutTheseActivities[0] == 'Yes') {
                    setStep("pain-final")
                  }
                }} />
            </div>}
          </div>
        </div>
        )}

        {/* Final Natural of the Pain */}

        {step == 'pain-final' && (
           <div>
           <div>
             <div className="break-all mt-3 md:mb-4">
               <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">What is the nature of the pain?</div>
             </div>
            
            
             <div className="flex flex-wrap gap-2 max-w-fit">
               {whatIsTheNatureOfThePainData.map(({ value }) => {
                 const index = whatIsTheNatureOfThePain.indexOf(value);
                 const isSelected = index !== -1;
 
                 const radio = true;
                 const RBoxgrouplogic = (): void => {
                   if (radio) {
                     useCountStore.setState({ whatIsTheNatureOfThePain: [value] });
                   } else {
                     if (isSelected) {
                       whatIsTheNatureOfThePain.splice(index, 1);
                     } else {
                       whatIsTheNatureOfThePain.push(value);
                     }
                     useCountStore.setState({ whatIsTheNatureOfThePain: [...whatIsTheNatureOfThePain] });
                   }
                 };
 
                 return (
                   <div key={value} onClick={RBoxgrouplogic} className={`${whatIsTheNatureOfThePain.includes(value) && '!border !border-purple-600 text-purple-600'}  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                 )
               }
               )}
             </div>
           </div>
 
           <div>
             <div className="break-all mt-3 md:mb-4">
               <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">Where is this pain felt?</div>
             </div>
             <Input
               label=""
               value={whereIsThisPainFelt}
               className="md:-mt-8"
               type="text"
               onChange={handleWhereIsThisPainFelt}
               name="others"
               placeholder="Please state"
             />
 
 
             <div className="break-all mt-3 md:mb-4">
               <div className="text-lg md:text-lg font-semibold text-[#1C1C1C]">What is the nature of your Mobility?</div>
             </div>
             <div className="flex flex-wrap gap-2 max-w-fit">
               {natureOfYourMobilityData?.map(({ value }) => {
                 const index = whatIsTheNatureOfYourMobilityEnd.indexOf(value);
                 const isSelected = index !== -1;
 
                 const radio = true;
                 const RBoxgrouplogic = (): void => {
                   if (radio) {
                     useCountStore.setState({ whatIsTheNatureOfYourMobilityEnd: [value] });
                   } else {
                     if (isSelected) {
                       whatIsTheNatureOfYourMobilityEnd.splice(index, 1);
                     } else {
                       whatIsTheNatureOfYourMobilityEnd.push(value);
                     }
                     useCountStore.setState({ whatIsTheNatureOfYourMobilityEnd: [...whatIsTheNatureOfYourMobilityEnd] });
                   }
                 };
 
                 return (
                   <div key={value} onClick={RBoxgrouplogic} className={`${whatIsTheNatureOfYourMobilityEnd.includes(value) && '!border !border-purple-600 text-purple-600'}  cursor-pointer border border-[#1c1c1c] text-xs px-4 py-2 rounded-3xl max-w`}>{value}</div>
                 )
               }
               )}
             </div>
 
 
             {yesOpt && <div>
               <Button title={`${yesOpt == 'no' ? 'Finish' : 'Next'}`}
                 disabled={!whatIsTheNatureOfThePain.length || !whatIsTheNatureOfYourMobilityEnd.length || !whereIsThisPainFelt}
                 className="mb-20 mt-10 te w-full sm:w-[unset]" onClick={() => navigate('/finish')} />
             </div>}
           </div>
         </div>
        )}
      </div>

    </div>
  )
}

export default MedicalHistory
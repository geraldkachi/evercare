import { useNavigate } from "react-router-dom"
import useCountStore from "../../store/store"
import Button from "../Button/Button"
import { useEffect } from "react"

const RequestASecondOpinion = () => {
    const navigate = useNavigate()
    const { resetState } = useCountStore()
    // const resetState = () => useCountStore.setState({}, true);
    useEffect(() => {
        useCountStore.setState({})
        resetState
        useCountStore.setState({
            count: 1,
            // increment: () => set((state) => ({ count: state.count + 1 })),
            // decrement: () => set((state) => ({ count: state.count - 1 })),
            complete: false,
            // toggleComplete: () => ({ complete: !complete })),
            chronicCondition: [],

            dietaryPreference: [],
            physicalActivity: [],
            sleepPatterns: [],
            tobaccoProducts: [],

            visitDoctor: [],
            bloodSugarPressure: [],
            recentLabTests: [],
            previousSurgeriesorHospitalizations: [],

            underliningcondition: [],
            currentlyManagingAnyoFtheseConditions: [],

            nyKnownAllergicReactionsToTheseMedications: [],
            adhereToTheseMedications: [],
            barriersPreventingTreatmentPlan: [],
            ifYesWhatAreTheseBarriers: [],
            membersOrCaregiversInvolvedInYourCare: [],
            carryingOutTheseActivities: [],
            natureOfThePain: [],
            natureOFYourMobility: [],
            historyOfAnyChronicDiseases: [],
            experiencedAnySignificantChangesInYourFealthoRLifestyleRecently: [],
            doYouFeelPainWhenCarryingOutTheseActivities: [],
            whatIsTheNatureOfYourMobilityEnd: [],
            whatIsTheNatureOfThePain: [],
            form: {
                address: '',
                state: '',
                country: '',
                industry: '',
                employeeSize: '',
                firstName: '',
                lastName: '',
                role: '',
                email: '',
                date: '',
                others: '',
                phoneNumber: '',
                password: '',
                confirmPassword: '',
                gender: '', // 'male', 'female' or '' for unselected
                othersHistor: '',
                othersMedicalHistory: '',
                contactInfoEmailnPhone: '',
                currentMedications: '',
                IfYesStateTheAllergies: '',
                othersBarriers: '',
                whatTypeAndFrequency: '',
                painFelt: '',
                engageInRegularPhysicalActivity: '',
                whereIsThisPainFelt: '',
            }
        }, true);
        // window.location.reload()
    }, [])


    return (
        <div className="flex flex-col items-center justify- max-w-md mx-auto h-screen w-screen">
            <div className="mb-12">
                <img src="logo.svg" className="h-8 my-5" alt="" />
            </div>
            <div className="flex flex-col mx-3">
                <img src="doctor.svg" alt="doctor" className="h-64 mb-6" />

                <div className="flex text-2xl text-[#002355] leading-6 font-bold text-center mb-2">Oh.. Sorry to hear this. We would be happy to offer a second opinion on your health challenge.</div>
                <div className="text-sm text-[#444444] leading-6 my-2 text-center">You deserve the best care. Don’t hesitate to ask for a second opinion. It’s your right. We at Evercare respect it, and it’s a step toward personalized, effective treatment.</div>

                <div className="flex items-center gap-4 justify-between mx-auto mt-10">
                    <Button variant="secondary" title="No, thanks" onClick={() => {
                        // useCountStore.persist.clearStorage();
                        resetState;
                        useCountStore.setState({ count: 1 });
                        navigate('/getting-started')
                    }} />
                    <Button title="Request a second opinion" onClick={() => { navigate('/getting-started'); useCountStore.setState({ count: 1 }); }} />
                </div>
            </div>
        </div>
    )
}

export default RequestASecondOpinion
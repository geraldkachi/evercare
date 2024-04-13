import { useNavigate } from "react-router-dom"
import useCountStore from "../../store/store"
import Button from "../Button/Button"

const Finish = () => {
    const navigate = useNavigate()
    const { resetState } = useCountStore()
    // const resetState = () => useCountStore.setState({}, true);


  return (
    <div className="flex flex-col items-center justify- max-w-md mx-auto h-screen w-screen">
        <div className="mb-20">
            <img src="logo.svg" className="h-8 my-5" alt="" />
        </div>
        <div className="flex flex-col mx-3">
            <img src="doctor.svg" alt="doctor" className="h-64 mb-6" />

            <div className="flex text-2xl text-[#002355] leading-6 font-bold text-center">Oh.. Sorry to hear this. We would be happy to offer a second opinion on your health challenge.</div>
            <div className="text-sm text-[#444444] leading-6 my-2 text-center">You deserve the best care. Don’t hesitate to ask for a second opinion. It’s your right. We at Evercare respect it, and it’s a step toward personalized, effective treatment.</div>

            <div className="flex items-center gap-4 justify-between mx-auto mt-10">
                <Button variant="secondary" title="No, thanks" onClick={() => {
                    // useCountStore.persist.clearStorage();
                    // resetState()
                    // useCountStore.setState({count: 1});
                    // window. location. reload()
                    navigate('/getting-started')
                }} />
                <Button title="Request a second opinion" onClick={() => navigate('/getting-started')} />
            </div>
        </div>
    </div>
  )
}

export default Finish
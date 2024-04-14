

const Finish = () => {
  return (
    <div className="flex flex-col items-center justify- max-w-md mx-auto h-screen w-screen">
        <div className="mb-20">
            <img src="logo.svg" className="h-8 my-5" alt="" />
        </div>
        <div className="flex flex-col mx-3">
            <img src="doctor2.svg" alt="doctor" className="h-64 mb-6" />

            <div className="flex text-2xl text-[#002355] leading-6 font-bold text-center mb-2">Thank you for taking out time to answer this questions.</div>
            <div className="text-sm text-[#444444] leading-6 my-2 text-center">You deserve the best care. Don’t hesitate to get in touch. You deserve the best care.</div>

            {/* <div className="flex items-center gap-4 justify-between mx-auto mt-10">
                <Button variant="secondary" title="No, thanks" onClick={() => {
                    // useCountStore.persist.clearStorage();
                    resetState;
                    useCountStore.setState({count: 1});
                    navigate('/getting-started')
                }} />
                <Button title="Request a second opinion" onClick={() => {navigate('/getting-started'); useCountStore.setState({count: 1});}} />
            </div> */}
        </div>
    </div>
  )
}

export default Finish
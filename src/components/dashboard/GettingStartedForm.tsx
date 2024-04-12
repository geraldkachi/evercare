import Button from "../Button/Button";
import Input from "../Input/Input";
import useCountStore from "../../store/store";
const GettingStartedForm = () => {
    const form = useCountStore((state) => state.form);
    const { increment } = useCountStore()
    const firstName = useCountStore((state) => state.form.firstName);
    const lastName = useCountStore((state) => state.form.lastName);
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
    
  return (
    <form className="flex w-full mt-10">
          <div className="break-all mb-10">
            <div className="text-lg md:text-2xl text-[#002355]">Getting started</div>
            <div className="text-[#444444] text-[14px] ">We would like to have a brief information about you</div>
        </div>
      <div>

      <div className="grid md:grid-cols-2 gap-3">
          <Input
            label="What’s your name?"
            // ref={formInput}
            className="mb-1"
            value={firstName}
            type="text"
            onChange={handleFirstName}
            name="first name"
            placeholder="First Name"
          />
          <Input
            label="w"
            // ref={formInput}
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
            value={firstName}
            type="text"
            onChange={handleFirstName}
            name="first name"
            placeholder="First Name"
          />
          <div className="flex items-start justify-between mt-10">
            <Button title="Create" />
            <Button title="Create" />
          </div>
        </div>
      
          <Input
            label="What’s your phone number?"
            className="mb-1"
            value={firstName}
            type="text"
            onChange={handleFirstName}
            name="first name"
            placeholder="First Name"
          />

        <Input
          label="Official Email"
          className="mb-1"
          inputClassName="w-full"
          value={"officialEmail"}
          type="email"
          name="email"
          // onChange={handleOfficialEmail}
          // sOfficial email"
          placeholder="hr@tch.com"
        />
        <div>
        {/* <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your address here (Optional)</label> */}
        <label className="my-1 text-[#0D1227] leading-[19.6px] flex items-center text-left text-xs md:text-sm font-semibold">Enter your address here (Optional)</label>
        <textarea className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-[4px] border focus:bg-white focus:border focus:border-[#1D8EE6] border-gray-300 placeholder:text-[#ABABAB] placeholder:leading-6" placeholder="Write your thoughts here..."></textarea>
        </div>
      
        <Button title="Continue" className="mt-5" onClick={increment} />
      </div>
    </form>
  )
}

export default GettingStartedForm
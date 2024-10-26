import { ChangeEvent } from "react";

interface labelledInput {
    label:string,
    placeholder:string,
    type:string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelledInput = ({label,placeholder,type,onChange}:labelledInput) => {
  return <div>
    <div className="flex flex-col my-2">
        <label className="font-medium my-2 text-lg">{label}</label>
        <input placeholder={placeholder} type={type} className="py-2 px-3" onChange={onChange}/>
    </div>
  </div>;
};

export default LabelledInput;

import Select from "react-select"
import { ReactNode } from "react"
import { useController } from "react-hook-form"
interface FieldProps {
    type?: string,
    control: any,
    name: string,
    errMsg?: string | null,
    required?: boolean
}
export const TextInputField = ({ control, type = "text", name, errMsg = null}: FieldProps): ReactNode => {
    const { field } = useController({
        control: control,
        name: name
       
    })
    return (<>

        <input
            id={name}
            type={type}
            autoComplete={name}
            {...field}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <span className="text-red-500">{errMsg}</span>
    </>)
}

export const SelectFieldComponent = ({errMsg=null,name,control, options=[]}:{errMsg?: string | null, name:string, control:any, options?: any[]}) => {
    const {field} = useController({
        control: control,
        name: name
    })
    return (<>
        <select className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" {...field}>
            <option value="">---Select Any One---</option>
            {
                options && options.map((opt, ind)=>(
                    <option key={ind} value={opt.value}>{opt.label}</option>
                ))
            }
        </select>
        <span className="text-red-500">{errMsg}</span>
    </>)
}

export const SelectOptionComponent = ({errMsg=null,name,control, options=[]}:{errMsg?: string | null, name:string, control:any, options?: any[]}) => {
    const {field} = useController({
        control: control,
        name: name
    })
    return (<>

        <Select options={options} {...field} isClearable={true} />
       
        <span className="text-red-500">{errMsg}</span>
    </>)
}
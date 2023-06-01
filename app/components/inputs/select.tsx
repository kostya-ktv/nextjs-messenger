"use client";
import ReactSelect from "react-select";

interface ISelect {
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}
const Select: React.FC<ISelect> = (props) => {
  const { label, onChange, options, disabled, value } = props;
  return (
    <div className="z-[100]">
      <label
        className="
      block text-sm font-medium leading-6 text-gray-600"
      >
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          onChange={onChange}
          isMulti
          options={options}
          value={value}
          classNames={{ control: () => "text-sm" }}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
        />
      </div>
    </div>
  );
};
export default Select;

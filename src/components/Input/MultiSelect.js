import { useState } from "react";

const MultiSelect = ({
  labelTitle,
  options,
  selectedOptions,
  updateFormValue,
}) => {
  const [selectedValues, setSelectedValues] = useState(selectedOptions || []);

  const handleSelectChange = (event) => {
    const selectedOptions = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedValues(selectedOptions);
    updateFormValue(selectedOptions);
  };

  return (
    <div className="my-4">
      <label className="text-lg">{labelTitle}</label>
      <select
        multiple
        value={selectedValues}
        onChange={handleSelectChange}
        className="form-multiselect mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      >
        <option disabled value="">
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultiSelect;

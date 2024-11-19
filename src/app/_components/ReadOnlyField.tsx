interface IReadOnlyFieldProps {
  label: string;
  value: string | undefined;
}

const ReadOnlyField: React.FC<IReadOnlyFieldProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col">
      <label className="font-extralight">{label}</label>
      {value ? <span className="font-medium">{value}</span> : "-"}
    </div>
  );
};

export default ReadOnlyField;

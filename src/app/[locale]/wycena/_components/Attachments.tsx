import { IFormikProps } from "../../../shared/interfaces";
import FileUploader from "../../../_components/FileUploader";

const Attachments: React.FC<IFormikProps> = ({
  errors,
  touched,
  values,
  setFieldValue,
  setFieldTouched,
}: IFormikProps) => {
  return (
    <FileUploader
      fieldName="pliki"
      values={values}
      errors={errors}
      touched={touched}
      setFieldValue={setFieldValue}
      setFieldTouched={setFieldTouched}
    />
  );
};

export default Attachments;

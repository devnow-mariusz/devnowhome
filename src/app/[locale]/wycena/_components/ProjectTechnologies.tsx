import { IFormikProps } from "../../../shared/interfaces";
import AddRemoveTechnology from "./AddRemoveTechnology";

const ProjectTechnologies: React.FC<IFormikProps> = ({
  errors,
  touched,
  values,
  handleChange,
  handleBlur,
  setFieldValue,
}: IFormikProps) => {
  return (
    <AddRemoveTechnology
      values={values}
      errors={errors}
      touched={touched}
      handleChange={handleChange}
      handleBlur={handleBlur}
      setFieldValue={setFieldValue}
    />
  );
};

export default ProjectTechnologies;

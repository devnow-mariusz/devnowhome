import dynamic from "next/dynamic";
import { IFormikProps } from "../../../shared/interfaces";

const TextEditor = dynamic(() => import("../../../_components/TextEditor"), {
  ssr: false,
});

const ProjectDescription: React.FC<IFormikProps> = ({ values }) => {
  return <TextEditor values={values} />;
};

export default ProjectDescription;

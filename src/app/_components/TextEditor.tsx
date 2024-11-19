import { useEffect } from "react";
import { useQuill } from "react-quilljs";
import { useField } from "formik";
import { IFormikProps } from "../shared/interfaces";
import "quill/dist/quill.snow.css";

const TextEditor: React.FC<IFormikProps> = ({ values }) => {
  const { quill, quillRef } = useQuill();
  const [, , helpers] = useField("opisProjektu");

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        helpers.setValue(quill.root.innerHTML);
      });
    }
  }, [quill, helpers]);

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(values.opisProjektu);
    }
  }, [quill]);

  return (
    // TODO change to Card
    <div className="bg-secondary text-base-100 rounded-2xl p-6">
      <div ref={quillRef} />
    </div>
  );
};

export default TextEditor;

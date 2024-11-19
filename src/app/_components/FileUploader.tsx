import { Fragment, useRef } from "react";
import { FieldArray } from "formik";
import {
  IFileUploader,
  IFileUploaderError,
  IPriceEstimationFormData,
} from "../shared/interfaces";
import { getFileExtension } from "../_utils/filesHelpers";
import { useTranslation } from "react-i18next";

const FileUploader = ({
  fieldName,
  values,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
}: IFileUploader) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fieldErrors = errors?.[fieldName as keyof IPriceEstimationFormData] as
    | IFileUploaderError[]
    | undefined;

  const fieldTouched =
    (touched?.[fieldName as keyof IPriceEstimationFormData] as
      | boolean
      | undefined) === true;

  const fieldValues = values[
    fieldName as keyof IPriceEstimationFormData
  ] as File[];

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  async function handleUploadFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const newFiles = Array.from(event.currentTarget.files ?? []);

    const fileToBase64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () =>
          resolve(reader.result?.toString().split(",")[1] ?? "");
        reader.onerror = (error) => reject(error);
      });
    };

    const convertedFiles = await Promise.all(
      newFiles.map(async (file: File) => {
        const fileData = await fileToBase64(file);
        return {
          name: file.name,
          type: file.type,
          data: fileData,
          size: file.size,
        };
      })
    );

    setFieldValue?.(fieldName as keyof IPriceEstimationFormData, [
      ...(fieldValues ?? []),
      ...convertedFiles,
    ]);

    setFieldTouched?.(fieldName, true, false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <FieldArray
      name={fieldName}
      render={(arrayHelpers) => (
        //TODO change to Card
        <div className="w-full max-w-xl p-6 mx-auto bg-secondary text-base-100 rounded-2xl">
          <div className="flex justify-center">
            <input
              multiple
              type="file"
              name={fieldName}
              className="hidden"
              ref={fileInputRef}
              onChange={handleUploadFiles}
            />
            <div className="mb-6 flex flex-col items-center">
              <button
                type="button"
                className="btn btn-primary sm:btn-wide"
                onClick={handleButtonClick}
              >
                {t("step_four.button_files")}
              </button>
              <div className="label justify-center">
                <div className="label-text-alt text-base-100">
                  {t("step_four.files_description")}
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-xl font-bold mb-4">
            {t("step_four.added_files_title")}
          </h2>
          <div className="overflow-x-auto">
            {!!fieldValues.length ? (
              <table className="table">
                <thead>
                  <tr>
                    <th className="hidden sm:table-cell pl-0"></th>
                    <th className="pl-0 text-base-100">{t("table_name")}</th>
                    <th className="text-base-100">{t("table_size")}</th>
                    <th className="text-base-100">{t("table_type")}</th>
                  </tr>
                </thead>
                <tbody>
                  {fieldValues.map((file: File, index: number) => (
                    <Fragment key={index}>
                      <tr>
                        <td className="hidden sm:table-cell pl-0">
                          {index + 1}
                        </td>
                        <td className="pl-0">{file.name.split(".")[0]}</td>
                        <td>{(file.size / (1024 * 1024)).toFixed(2)} MB</td>
                        <td>{getFileExtension(file)}</td>
                        <td>
                          <button
                            className="btn btn-circle btn-xs"
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                      {fieldErrors && fieldTouched ? (
                        <tr>
                          <td colSpan={5} className="p-0">
                            <div className="label">
                              <div className="label-text-alt text-error">
                                {[
                                  fieldErrors[index]?.size,
                                  fieldErrors[index]?.type,
                                ]
                                  .filter(Boolean)
                                  .join(" | ")}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            ) : (
              t("step_four.no_files")
            )}
          </div>
        </div>
      )}
    />
  );
};

export default FileUploader;

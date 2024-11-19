import { forwardRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import classNames from "classnames";
import { FieldArray } from "formik";
import { useTranslation } from "react-i18next";
import { IFormikProps } from "../../../shared/interfaces";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = dynamic<any>(
  () => import("react-datepicker").then((mod) => mod.default),
  { ssr: false }
);

const AddRemoveTechnology: React.FC<IFormikProps> = ({
  handleChange,
  handleBlur,
  setFieldValue,
  values,
  errors,
  touched,
}) => {
  const [localesLoaded, setLocalesLoaded] = useState(false);
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const loadLocales = async () => {
    const { registerLocale } = await import("react-datepicker");
    const { pl, enGB } = await import("date-fns/locale");

    registerLocale("pl", pl);
    registerLocale("enGB", enGB);
    setLocalesLoaded(true);
  };

  useEffect(() => {
    loadLocales();
  }, []);

  const adjustLocale = (locale: string) => {
    if (locale === "en") {
      return "enGB";
    } else {
      return locale;
    }
  };

  const CustomDateInput = forwardRef<HTMLInputElement, any>(
    ({ value, onClick }, ref) => (
      <input
        readOnly
        type="text"
        name="projektDeadline"
        placeholder={t("step_two.datepicker_placeholder")}
        className={classNames("input input-bordered w-full max-w-sm !pl-10", {
          "input-error": errors?.projektDeadline && touched?.projektDeadline,
        })}
        value={value}
        onClick={onClick}
        onChange={handleChange}
        onBlur={handleBlur}
        ref={ref}
      />
    )
  );

  CustomDateInput.displayName = "CustomDateInput";

  if (!localesLoaded) {
    return null;
  }

  return (
    // TODO change to Card
    <div className="w-full max-w-xl bg-secondary rounded-2xl flex justify-center">
      <div className="w-full max-w-xl flex flex-col p-6 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-1 text-base-100">
            {t("step_two.deadline_title")}:
          </h2>
          <label className="form-control w-full max-w-sm">
            <DatePicker
              showIcon
              minDate={new Date()}
              locale={adjustLocale(locale)}
              selected={
                values.projektDeadline ? new Date(values.projektDeadline) : null
              }
              onChange={(date: Date) => {
                setFieldValue?.("projektDeadline", date);
              }}
              customInput={<CustomDateInput />}
              dateFormat="dd/MM/yyyy"
            />
            {touched?.projektDeadline && errors?.projektDeadline ? (
              <div className="label">
                <span className="label-text-alt text-error">
                  {String(errors.projektDeadline)}
                </span>
              </div>
            ) : null}
          </label>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-1 text-base-100">
            {t("step_two.requirements_header")}:
          </h2>
          <div className="flex justify-between">
            <label className="form-control w-full max-w-sm">
              <input
                type="text"
                name="technologia"
                placeholder={t("step_two.input_placeholder")}
                className={classNames("input input-bordered w-full max-w-sm", {
                  "input-error": errors?.technologia && touched?.technologia,
                })}
                value={values.technologia}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={values.brakTechnologii}
              />
              {touched?.technologia && errors?.technologia ? (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {errors.technologia}
                  </span>
                </div>
              ) : null}
            </label>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (values.technologia.trim()) {
                  setFieldValue?.("technologie", [
                    ...values.technologie,
                    { nazwa: values.technologia },
                  ]);
                  setFieldValue?.("technologia", "");
                }
              }}
              disabled={values.brakTechnologii}
            >
              {t("step_two.button_add")}
            </button>
          </div>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer flex justify-between">
            <span className="label-text text-base-100">
              {t("step_two.switch_text")}
            </span>
            {/* TODO tooltip */}
            <input
              type="checkbox"
              className="toggle toggle-accent"
              name="brakTechnologii"
              onChange={(e) => {
                handleChange?.(e);
                setFieldValue?.("technologie", [], false);
              }}
              onBlur={handleBlur}
              checked={values.brakTechnologii}
            />
          </label>
        </div>
        <FieldArray
          name="technologie"
          render={(arrayHelpers) => (
            <div className="w-full text-base-100">
              <h3 className="text-xl font-bold mb-4">
                {t("step_two.added_requirements_title")}:
              </h3>
              <ul>
                {values.technologie.length >= 1
                  ? values.technologie.map((item, index) => (
                      <li
                        key={index}
                        className="p-2 text-lg flex justify-between items-center"
                      >
                        {item.nazwa}

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
                      </li>
                    ))
                  : t("step_two.no_elements")}
              </ul>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default AddRemoveTechnology;

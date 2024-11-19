import { useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import { Trans, useTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import { IFormikProps } from "../../../shared/interfaces";
import { getFileExtension } from "../../../_utils/filesHelpers";
import ReadOnlyField from "../../../_components/ReadOnlyField";
import { getFormattedDate } from "../../../_utils/dates";

const Summary: React.FC<IFormikProps> = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
}) => {
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  return (
    <>
      <Head>
        <script
          src={`https://www.google.com/recaptcha/api.js?hl=${locale}`}
          async
          defer
        />
      </Head>
      <div className="w-full max-w-5xl grid grid-cols-1 gap-4 text-base-100">
        <div className="card bg-secondary w-full">
          <div className="card-body">
            <h2 className="card-title mb-4 text-2xl">
              {t("step_five.first_section_title")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <ReadOnlyField label={t("name")} value={values.imie} />
              <ReadOnlyField label={t("last_name")} value={values.nazwisko} />
              <ReadOnlyField
                label={t("phone_number")}
                value={values.numerTelefonu}
              />
              <ReadOnlyField label={t("email_address")} value={values.email} />
            </div>
            {values.firma && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <ReadOnlyField
                  label={t("company_name")}
                  value={values.nazwaFirmy}
                />
                <ReadOnlyField label={t("city")} value={values.miasto} />
                <ReadOnlyField
                  label={t("postal_code")}
                  value={values.kodPocztowy}
                />
                <ReadOnlyField label={t("street")} value={values.ulica} />
                <ReadOnlyField label="NIP" value={values.nip} />
              </div>
            )}
          </div>
        </div>
        <div className="card bg-secondary w-full">
          <div className="card-body">
            <h2 className="card-title mb-4 text-2xl">
              {t("step_five.second_section_title")}
            </h2>
            <div className="text-base-100 font-extralight flex flex-col">
              <span className="font-extralight text-base">
                {t("step_five.second_section_deadline_title")}
              </span>
              <span className="font-medium">
                {values.projektDeadline
                  ? getFormattedDate(values.projektDeadline)
                  : "-"}
              </span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-extralight text-base mb-1">
                {t("step_five.second_section_technologie_title")}
              </h2>
              <ul className="flex flex-wrap gap-4">
                {!!values.technologie.length
                  ? values.technologie.map((item, index) => (
                      <li key={index}>
                        <div className="badge badge-accent">{item.nazwa}</div>
                      </li>
                    ))
                  : t("step_five.no_data")}
              </ul>
            </div>
          </div>
        </div>
        <div className="card bg-secondary w-full">
          <div className="card-body">
            <h2 className="card-title mb-4 text-2xl">
              {t("step_five.third_section_title")}
            </h2>
            {values.opisProjektu ? (
              <div dangerouslySetInnerHTML={{ __html: values.opisProjektu }} />
            ) : (
              t("step_five.no_data")
            )}
          </div>
        </div>
        <div className="card bg-secondary w-full">
          <div className="card-body">
            <h2 className="card-title mb-4 text-2xl">
              {t("step_five.fourth_section_title")}
            </h2>
            <div className="overflow-x-auto">
              {!!values?.pliki?.length ? (
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
                    {values?.pliki?.map((file: File, index: number) => (
                      <tr key={index}>
                        <td className="hidden sm:table-cell pl-0">
                          {index + 1}
                        </td>
                        <td className="pl-0">{file.name.split(".")[0]}</td>
                        <td>{(file.size / (1024 * 1024)).toFixed(2)} MB</td>
                        <td>{getFileExtension(file)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                t("step_five.no_data")
              )}
            </div>
          </div>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer justify-end">
            <span className="label-text">
              <Trans
                i18nKey="step_five.consent_text"
                components={{
                  1: (
                    <Link
                      className="link link-accent"
                      href="/polityka-prywatnosci"
                    />
                  ),
                }}
              />
            </span>
            <input
              type="checkbox"
              className="checkbox ml-2"
              name="politykaPrywatnosci"
              onChange={handleChange}
              onBlur={handleBlur}
              checked={values.politykaPrywatnosci}
            />
          </label>
          {touched?.politykaPrywatnosci && errors?.politykaPrywatnosci ? (
            <div className="label justify-end">
              <span className="label-text-alt text-error">
                {errors?.politykaPrywatnosci}
              </span>
            </div>
          ) : null}
        </div>
        <div className="flex w-full flex-col mt-4">
          <ReCAPTCHA
            className="flex justify-end"
            ref={recaptchaRef}
            sitekey="6LcTiHMqAAAAAEksqNxi-nMgR0hMlMqlhOee9a3d"
            onChange={(value) => {
              setFieldValue?.("captchaToken", value);
            }}
            onExpired={() => setFieldValue?.("captchaToken", "")}
          />
          {touched?.captchaToken && errors?.captchaToken ? (
            <div className="label justify-end">
              <span className="label-text-alt text-error">
                {errors.captchaToken}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Summary;

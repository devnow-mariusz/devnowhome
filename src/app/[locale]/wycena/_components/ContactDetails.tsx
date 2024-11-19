import { useTranslation } from "react-i18next";
import { IFormikProps } from "../../../shared/interfaces";
import classNames from "classnames";

const ContactDetails: React.FC<IFormikProps> = ({
  errors,
  touched,
  handleChange,
  handleBlur,
  values,
}: IFormikProps) => {
  const { t } = useTranslation();

  return (
    // TODO change to Card
    <div className="w-full max-w-xl bg-secondary rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      <div className="flex items-center flex-col">
        <label className="form-control w-full max-w-xs mb-3">
          <input
            placeholder={t("name")}
            className={classNames("input input-bordered w-full max-w-xs", {
              "input-error": errors?.imie && touched?.imie,
            })}
            type="text"
            name="imie"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.imie}
          />
          {touched?.imie && errors?.imie ? (
            <div className="label">
              <span className="label-text-alt text-error">{errors?.imie}</span>
            </div>
          ) : null}
        </label>
        <label className="form-control w-full max-w-xs mb-3">
          <input
            placeholder={t("last_name")}
            className={classNames("input input-bordered w-full max-w-xs", {
              "input-error": errors?.nazwisko && touched?.nazwisko,
            })}
            type="text"
            name="nazwisko"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.nazwisko}
          />
          {touched?.nazwisko && errors?.nazwisko ? (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.nazwisko}
              </span>
            </div>
          ) : null}
        </label>
        <label className="form-control w-full max-w-xs mb-3">
          <input
            placeholder={t("email_address")}
            className={classNames("input input-bordered w-full max-w-xs", {
              "input-error": errors?.email && touched?.email,
            })}
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {touched?.email && errors?.email ? (
            <div className="label">
              <span className="label-text-alt text-error">{errors.email}</span>
            </div>
          ) : null}
        </label>
        <label className="form-control w-full max-w-xs mb-3">
          <input
            placeholder={t("phone_number")}
            className={classNames("input input-bordered w-full max-w-xs", {
              "input-error": errors?.numerTelefonu && touched?.numerTelefonu,
            })}
            type="tel"
            name="numerTelefonu"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.numerTelefonu}
          />
          {touched?.numerTelefonu && errors?.numerTelefonu ? (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.numerTelefonu}
              </span>
            </div>
          ) : null}
        </label>
        <div className="form-control w-full max-w-xs mb-3">
          <label className="label cursor-pointer flex justify-between">
            <span className="label-text text-base-100">{t("company")}</span>
            <input
              type="checkbox"
              className="toggle toggle-accent"
              name="firma"
              onChange={handleChange}
              onBlur={handleBlur}
              checked={values.firma}
            />
          </label>
        </div>
      </div>
      <div className="flex items-center flex-col">
        <label className="form-control w-full max-w-xs mb-3">
          <input
            placeholder={t("company_name")}
            className={classNames("input input-bordered w-full max-w-xs", {
              "input-error": errors?.nazwaFirmy && touched?.nazwaFirmy,
            })}
            type="text"
            name="nazwaFirmy"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.nazwaFirmy}
            disabled={!values.firma}
          />
          {touched?.nazwaFirmy && errors?.nazwaFirmy ? (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.nazwaFirmy}
              </span>
            </div>
          ) : null}
        </label>
        <label className="form-control w-full max-w-xs mb-3">
          <input
            placeholder={t("city")}
            className={classNames("input input-bordered w-full max-w-xs", {
              "input-error": errors?.miasto && touched?.miasto,
            })}
            type="text"
            name="miasto"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.miasto}
            disabled={!values.firma}
          />
          {touched?.miasto && errors?.miasto ? (
            <div className="label">
              <span className="label-text-alt text-error">{errors.miasto}</span>
            </div>
          ) : null}
        </label>
        <label className="form-control w-full max-w-xs mb-3">
          <input
            placeholder={t("postal_code")}
            className={classNames("input input-bordered w-full max-w-xs", {
              "input-error": errors?.kodPocztowy && touched?.kodPocztowy,
            })}
            type="text"
            name="kodPocztowy"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.kodPocztowy}
            disabled={!values.firma}
          />
          {touched?.kodPocztowy && errors?.kodPocztowy ? (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.kodPocztowy}
              </span>
            </div>
          ) : null}
        </label>
        <label className="form-control w-full max-w-xs mb-3">
          <input
            placeholder={t("street")}
            className={classNames("input input-bordered w-full max-w-xs", {
              "input-error": errors?.ulica && touched?.ulica,
            })}
            type="text"
            name="ulica"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.ulica}
            disabled={!values.firma}
          />
          {touched?.ulica && errors?.ulica ? (
            <div className="label">
              <span className="label-text-alt text-error">{errors.ulica}</span>
            </div>
          ) : null}
        </label>
        <label className="form-control w-full max-w-xs mb-3">
          <input
            placeholder="NIP"
            className={classNames("input input-bordered w-full max-w-xs", {
              "input-error": errors?.nip && touched?.nip,
            })}
            type="text"
            name="nip"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.nip}
            disabled={!values.firma}
          />
          {touched?.nip && errors?.nip ? (
            <div className="label">
              <span className="label-text-alt text-error">{errors.nip}</span>
            </div>
          ) : null}
        </label>
      </div>
    </div>
  );
};

export default ContactDetails;

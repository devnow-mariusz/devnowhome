import {
  FormikErrors,
  FormikTouched,
  FormikHandlers,
  FormikHelpers,
} from "formik";

export interface IPriceEstimationFormData {
  imie: string;
  nazwisko: string;
  email: string;
  numerTelefonu: string;
  firma: boolean;
  nazwaFirmy?: string;
  miasto?: string;
  kodPocztowy?: string;
  ulica?: string;
  nip?: string;
  technologie: { nazwa: string }[];
  technologia: string;
  brakTechnologii: boolean;
  opisProjektu: string;
  pliki: File[] | null;
  politykaPrywatnosci: boolean;
  projektDeadline: Date;
  captchaToken?: string;
}

export interface ICallOrderFormData {
  imie: string;
  numerTelefonu: string;
  politykaPrywatnosci: boolean;
  captchaToken?: string;
}

export interface IFormikProps {
  errors?: FormikErrors<IPriceEstimationFormData>;
  touched?: FormikTouched<IPriceEstimationFormData>;
  values: IPriceEstimationFormData;
  validateForm?: FormikHelpers<IPriceEstimationFormData>["validateForm"];
  handleChange?: FormikHandlers["handleChange"];
  handleBlur?: FormikHandlers["handleBlur"];
  setFieldValue?: FormikHelpers<IPriceEstimationFormData>["setFieldValue"];
  setFieldTouched?: FormikHelpers<IPriceEstimationFormData>["setFieldTouched"];
}

export interface IFileUploaderError {
  ["type"]?: string;
  ["size"]?: string;
}

export interface IFileUploader extends IFormikProps {
  fieldName: string;
}

//ten typ przyda sie podczas wysylki danych przez smtp (jest plik do tego), a ze mamy formularz kontaktowy i formularz wyceny, to mozemy polaczyc to do jednego interface-u (poprzez extend..) wyodrebniajac to co je łączy i stworzyc dwa? osobne a przynajmniej jeden podstawowy i jakis odrebny np dla formularza wyceny
export interface IContactFormData {
  imie: string;
  nazwisko: string;
  email: string;
  wiadomosc: string;
  recaptchaValue?: string;
}

export interface IFileWithSize {
  name: string;
  data: string;
  type: string;
  size: number;
}

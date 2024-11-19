"use client";
import { useRouter } from "next/navigation";
import { useTranslation, Trans } from "react-i18next";
import { monda } from "../../../fonts";

const Offer: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="container">
      <div className="divider divider-multicolor-double mb-14 mt-0">
        <h1
          className={`card-title text-3xl text-base-100 font-bold uppercase text-wrap sm:text-nowrap ${monda.className}`}
        >
          {t("page_title")}
        </h1>
      </div>
      <div className="flex flex-wrap gap-4 lg:gap-0 justify-center">
        <div className="rounded-2xl glass bg-[#b87cdbc4] w-full lg:w-80 lg:h-[700px] shadow-xl lg:mt-6 hover:drop-shadow-2xl">
          <div className="card-body text-base-100 ">
            <h2 className="card-title font-light text-4xl pb-5">
              <Trans i18nKey="basic_site.title" components={{ 1: <br /> }} />
            </h2>
            <p>{t("basic_site.description")}</p>
            <div className="divider m-0"></div>
            <p className="text-lg">
              {t("from")}{" "}
              <span className="font-light text-3xl">
                {t("basic_site.price")}
              </span>{" "}
              {t("currency")}
            </p>
            <ul className="list-none space-y-2 pt-5 mb-6">
              <li>❱ {t("basic_site.features.feature1")}</li>
              <li>❱ {t("basic_site.features.feature2")}</li>
              <li>❱ {t("free_hour")}</li>
            </ul>
            <div className="card-actions justify-center">
              <button
                onClick={() => router.push("/wycena")}
                className="btn btn-primary border-none hover:bg-primary max-w-[60%] self-center"
              >
                {t("button_valuation")}
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-2xl glass bg-[#00000087] w-full lg:w-80 lg:h-[750px] shadow-xl z-10 lg:ml-[-20px] lg:mr-[-20px] hover:drop-shadow-2xl">
          <div className="card-body text-base-100">
            <h2 className="card-title font-light text-4xl pb-5">
              <Trans i18nKey="complex_site.title" components={{ 1: <br /> }} />
            </h2>
            <p>{t("complex_site.description")}</p>
            <div className="divider m-0"></div>
            <p className="text-lg">
              {t("from")}{" "}
              <span className="font-light text-3xl">
                {t("complex_site.price")}
              </span>{" "}
              {t("currency")}
            </p>
            <ul className="list-none space-y-2 pt-5 mb-6">
              <li>❱ {t("complex_site.features.feature1")}</li>
              <li>❱ {t("complex_site.features.feature2")}</li>
              <li>❱ {t("complex_site.features.feature3")}</li>
              <li>❱ {t("complex_site.features.feature4")}</li>
              <li>❱ {t("free_hour")}</li>
            </ul>
            <div className="card-actions justify-center">
              <button
                onClick={() => router.push("/wycena")}
                className="btn btn-primary border-none hover:bg-primary max-w-[60%] self-center"
              >
                {t("button_valuation")}
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-2xl glass bg-[#748c35] w-full lg:w-80 lg:h-[700px] shadow-xl lg:mt-6 hover:drop-shadow-2xl">
          <div className="card-body text-base-100">
            <h2 className="card-title font-light text-4xl pb-5">
              <Trans i18nKey="online_shop.title" components={{ 1: <br /> }} />
            </h2>
            <p>{t("online_shop.description")}</p>
            <div className="divider m-0"></div>
            <p className="text-lg">
              {t("from")}{" "}
              <span className="font-light text-3xl">
                {t("online_shop.price")}
              </span>{" "}
              {t("currency")}
            </p>
            <ul className="list-none space-y-2 pt-5 mb-6">
              <li>❱ {t("online_shop.features.feature1")}</li>
              <li>❱ {t("online_shop.features.feature2")}</li>
              <li>❱ {t("online_shop.features.feature3")}</li>
              <li>❱ {t("free_hour")}</li>
            </ul>
            <div className="card-actions justify-center">
              <button
                onClick={() => router.push("/wycena")}
                className="btn btn-primary border-none hover:bg-primary max-w-[60%] self-center"
              >
                {t("button_valuation")}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-4 lg:mt-6">
          <div className="rounded-2xl glass bg-[#00b6ff] shadow-xl w-full hover:drop-shadow-2xl">
            <div className="card-body text-base-100">
              <h2 className="text-2xl mb-4"> {t("each_variant.title")}:</h2>
              <ul className="list-inside pl-4">
                <li className="mb-2">❱ {t("each_variant.feature1")}</li>
                <li className="mb-2">❱ {t("each_variant.feature2")}</li>
              </ul>
            </div>
          </div>
          <div role="alert" className="alert mt-6 lg:mt-0 flex p-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-info h-6 w-6 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="text-justify">{t("alert_message")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;

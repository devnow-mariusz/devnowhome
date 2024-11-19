"use client";
import { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import { useTranslation } from "react-i18next";
import { portfolioProjects } from "../../../_static-data/constants";
import { monda } from "../../../fonts";
import "photoswipe/style.css";

const Realizations: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
      gallery: "#portfolio",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      if (!!lightbox) {
        lightbox.destroy();
        lightbox = null;
      }
    };
  }, []);

  return (
    <div className="card bg-base-100 w-full shadow-xl">
      <div className="card-body p-4 sm:p-8">
        <div className="divider divider-start divider-multicolor-single mb-12 mt-7 sm:mt-4">
          <h1
            className={`card-title text-3xl text-default font-bold uppercase text-wrap sm:text-nowrap ${monda.className}`}
          >
            {t("page_title")}
          </h1>
        </div>
        <div className="flex flex-wrap" id="portfolio">
          {portfolioProjects.map((project, index) => (
            <div className="p-2 w-full sm:w-1/2 lg:w-1/3" key={index}>
              <div className="card glass bg-purple_dark h-[500px]">
                <figure>
                  <a
                    key={index}
                    href={project.src}
                    data-pswp-width={project.width}
                    data-pswp-height={project.height}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col"
                  >
                    <img
                      src={project.thumbnail}
                      alt={`Portfolio project image ${index + 1}`}
                      className="object-cover w-full h-auto"
                    />
                  </a>
                </figure>
                <div className="card-body text-base-100">
                  <h2 className="card-title">{project.name}</h2>
                  <p className="font-bold">
                    {t("project_description")}:{" "}
                    <span className="font-light">
                      {t(`${project.description}`)}
                    </span>
                  </p>
                  <p className="font-bold">
                    {t("project_technologies")}:{" "}
                    <span className="font-light">{t(`${project.techs}`)}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Realizations;

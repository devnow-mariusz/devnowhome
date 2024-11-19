import Attachments from "../[locale]/wycena/_components/Attachments";
import ContactDetails from "../[locale]/wycena/_components/ContactDetails";
import ProjectDescription from "../[locale]/wycena/_components/ProjectsDescription";
import ProjectTechnologies from "../[locale]/wycena/_components/ProjectTechnologies";
import Summary from "../[locale]/wycena/_components/Summary";

export const portfolioProjects = [
  {
    src: "/s_m_k-min.png",
    thumbnail: "/thumbnails/s_m_k_thumbnail.png",
    name: "System Monitorowania Kształcenia Pracowników Medycznych",
    description: "description.maintain_and_develop",
    techs: "Angular, Typescript",
    width: 2880,
    height: 2586,
  },
  {
    src: "/lawyer-min.png",
    thumbnail: "/thumbnails/lawyer_thumbnail.png",
    name: "Kancelaria Radcy Prawnego",
    description: "description.comprehensive_preparation",
    techs: "Wordpress",
    width: 2880,
    height: 8246,
  },
  {
    src: "/med-min.png",
    thumbnail: "/thumbnails/med_thumbnail.png",
    name: "Medworkly",
    description: "description.maintain_and_develop",
    techs: "React, Redux, GraphQL, Leaflet, Formik, MaterialUI",
    width: 2912,
    height: 1573,
  },
  {
    src: "/esd_pack-min.png",
    thumbnail: "/thumbnails/esd_pack_thumbnail.png",
    name: "Artpol",
    description: "description.comprehensive_preparation",
    techs: "Wordpress, i18n",
    width: 2880,
    height: 10852,
  },
  {
    src: "/brake-min.png",
    thumbnail: "/thumbnails/brake_thumbnail.png",
    name: "Brake Game",
    description: "description.skeleton_preparation",
    techs: "Next.js, Typescript, ChakraUI",
    width: 2912,
    height: 3346,
  },
  {
    src: "/bikes-min.png",
    thumbnail: "/thumbnails/bikes_thumbnail.png",
    name: "Bike Rental",
    description: "description.comprehensive_preparation",
    techs: "Wordpress, WooCommerce",
    width: 2880,
    height: 9188,
  },
];

export const homePathnames = ["/", "/pl", "/en"];

export const menuElements = [
  { id: 0, locale: "menu_home", path: "/", visible: true },
  { id: 1, locale: "menu_realizations", path: "/realizacje", visible: true },
  { id: 2, locale: "menu_project_x", path: "/px", visible: false },
  { id: 3, locale: "menu_about", path: "/o-mnie", visible: false },
  { id: 4, locale: "menu_offer", path: "/oferta", visible: true },
  { id: 5, locale: "menu_valuation", path: "/wycena", visible: true },
  { id: 6, locale: "menu_contact", path: "/kontakt", visible: true },
  {
    id: 7,
    locale: "menu_git",
    path: "https://github.com/devnow-mariusz/",
    visible: true,
  },
];

export const technologies = [
  { id: 1, src: "/techs/javascript.png", alt: "Javascript", big: false },
  { id: 2, src: "/techs/typescript.png", alt: "Typescript", big: true },
  { id: 3, src: "/techs/angular.png", alt: "Angular", big: true },
  { id: 4, src: "/techs/react.png", alt: "React", big: false },
  { id: 5, src: "/techs/nodejs.png", alt: "NodeJS", big: true },
  { id: 6, src: "/techs/redux.png", alt: "Redux", big: false },
  { id: 7, src: "/techs/html.png", alt: "HTML", big: false },
  { id: 8, src: "/techs/css.png", alt: "CSS", big: false },
  { id: 9, src: "/techs/mysql.png", alt: "MySQL", big: true },
  { id: 10, src: "/techs/chakraui.png", alt: "ChakraUI", big: false },
  { id: 11, src: "/techs/material.png", alt: "MUI", big: false },
  { id: 12, src: "/techs/tailwind.png", alt: "Tailwind", big: false },
  { id: 13, src: "/techs/graphql.png", alt: "GraphQL", big: false },
  { id: 14, src: "/techs/mapbox.png", alt: "Mapbox", big: true },
  { id: 15, src: "/techs/leaflet.png", alt: "Leaflet", big: true },
];

export const steps = [
  {
    id: 1,
    locale: "step_one.step_name",
    component: ContactDetails,
  },
  {
    id: 2,
    locale: "step_two.step_name",
    component: ProjectTechnologies,
  },
  {
    id: 3,
    locale: "step_three.step_name",
    component: ProjectDescription,
  },
  {
    id: 4,
    locale: "step_four.step_name",
    component: Attachments,
  },
  {
    id: 5,
    locale: "step_five.step_name",
    component: Summary,
  },
];

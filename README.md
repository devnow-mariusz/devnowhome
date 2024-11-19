## Opis projektu

Dynamiczna, dwujęzyczna strona domowa Devnow.net zbudowana na frameworku NextJS.

Podgląd: https://devnow.net

## Użyte technologie / biblioteki

- NextJS
- TypeScript
- Nodemailer
- Classnames
- Date-fns
- Formik
- Framer-motion
- i18next
- Photoswipe
- Quill
- React-datepicker
- Yup
- TailwindCSS
- DaisyUI

Ponadto podpięte zostało: Google Recaptcha oraz Google Analytics.

## Cel projektu

Celem projektu jest prezentacja oferty Devnow.net, umożliwienie szybkiej wyceny i kontaktu z wykonawcą.

## Optymalizacja

W celu optymalizacji działania (szybkość ładowania / SEO), zastosowano:

- Server Side Rendering (przerzucenie części odpowiedzialności za uruchomienie kodu z urządzenia klienckiego na serwer)
- Znaczniki Image i Script, które odpowiadają: za np. wczytywanie plików graficznych w odpowiednim formacie oraz za wczytywanie skryptów w odpowiednim momencie (np. podczas interakcji użytkownika z interfejsem aplikacji)
- Użycie optimizePackageImports w pliku konfiguracyjnym dla wybranych bibliotek w celu ładowania jedynie potrzebnych części kodu z tychże bibliotek

## Uruchomienie

Aplikacja została uruchomiona na hostingu współdzielonym w środowisku NodeJS.

"use client";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

type IStatCounterProps = {
  end: number;
  speed: number;
  start: boolean;
};

const StatCounter: React.FC<IStatCounterProps> = ({ end, speed, start }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startCount = 0;
    const increment = end / speed;

    const timer = setInterval(() => {
      startCount += increment;
      if (startCount >= end) {
        clearInterval(timer);
        startCount = end;
      }
      setCount(Math.ceil(startCount));
    }, 30);

    return () => clearInterval(timer);
  }, [end, speed, start]);

  return <span>{count}+</span>;
};

const Stats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={statsRef}
      className="flex justify-center items-center mt-10 mb-10"
    >
      <div className="stats rounded-none w-full stats-vertical lg:stats-horizontal !bg-transparent !overflow-hidden gap-4">
        <div className="stat p-0">
          <div className="stat-figure text-purple_light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
              />
            </svg>
          </div>
          <div className="stat-title text-base-100 text-2xl">
            {t("stats.projects")}
          </div>
          <div className="stat-value text-base-100 text-5xl">
            <StatCounter end={20} speed={80} start={isVisible} />
          </div>
          <div className="stat-desc text-base-100 text-sm">
            {t("stats.completed_projects")}
          </div>
        </div>
        <div className="stat p-0">
          <div className="stat-figure text-purple_light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
          </div>
          <div className="stat-title text-base-100 text-2xl">
            {t("stats.years")}
          </div>
          <div className="stat-value text-base-100 text-5xl">
            <StatCounter end={6} speed={50} start={isVisible} />
          </div>
          <div className="stat-desc text-base-100 text-sm">
            {t("stats.active_years")}
          </div>
        </div>
        <div className="stat p-0">
          <div className="stat-figure text-purple_light">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84"
              />
            </svg>
          </div>
          <div className="stat-title text-base-100 text-2xl">
            {t("stats.technologies")}
          </div>
          <div className="stat-value text-base-100 text-5xl">
            <StatCounter end={30} speed={100} start={isVisible} />
          </div>
          <div className="stat-desc text-base-100 text-sm">
            {t("stats.technologies_used")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;

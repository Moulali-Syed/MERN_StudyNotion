import { useState } from 'react';
import { HomePageExplore } from '../../../data/homepage-explore';
import HighLightText from './HighLightText';
import CourseCard from './CourseCard';

const tabsName = [
  'Free',
  'New to Coding',
  'Most Popular',
  'Skill Paths',
  'Career Paths',
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter(
      (course) => course.tag.toLowerCase() === value.toLowerCase()
    );

    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };
  return (
    <div>
      <div className="text-4xl text-center font-semibold">
        Unlock the <HighLightText text={'Power Of Code'} />
      </div>
      <p className="text-center text-richblack-300 text-lg mt-3">
        Learn to build anything you can imagine
      </p>
      <div className="w-fit flex mx-auto rounded-full bg-richblack-800 mt-2 mb-16 border-richblack-100 p-2">
        {tabsName.map((tab, tabIndex) => {
          return (
            <div
              className={`text-[14px] flex items-center gap-2 ${
                currentTab === tab
                  ? 'bg-richblack-900 text-richblack-5 font-meduim'
                  : 'text-richblack-200'
              } rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-2 py-2`}
              key={tabIndex}
              onClick={() => setMyCards(tab)}
            >
              {tab}
            </div>
          );
        })}
      </div>
      <div className="hidden lg:block lg:h-[200px]"></div>

      {/* course card */}
      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {courses.map((course, courseIndex) => {
          return (
            <CourseCard
              key={courseIndex}
              cardData={course}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
};
export default ExploreMore;

import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import timelineImage from '../../../assets/Images/TimelineImage.png';

const timeline = [
  {
    Logo: Logo1,
    Heading: 'Leadership',
    Description: 'Fully committed to the success of company',
  },
  {
    Logo: Logo2,
    Heading: 'Responsibility',
    Description: 'Students will always be our top priority',
  },
  {
    Logo: Logo3,
    Heading: 'Flexibility',
    Description: 'The ability to switch is an important skills',
  },
  {
    Logo: Logo4,
    Heading: 'Solve the problem',
    Description: 'Code your way to a solution',
  },
];
const TimeLineSection = () => {
  return (
    <div className="flex flex-col gap-15 items-center justify-start lg:flex-row">
      <div className="w-[90%]  flex flex-col gap-11 lg:w-[45%]">
        {timeline.map((el, i) => {
          return (
            <div key={i} className="flex flex-row gap-6">
              <div>
                <img
                  className="w-[40px] h-[40px] bg-white flex items-center"
                  src={el.Logo}
                  alt={el.Heading}
                />
              </div>
              <div>
                <h2 className="font-semibold text-[18px]">{el.Heading}</h2>
                <p className="text-base">{el.Description}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="relative shadow-blue-200">
        <img
          src={timelineImage}
          alt="timeline image"
          className="shadow-white object-cover h-fit"
        />
        <div className="absolute bg-caribbeangreen-700 flex text-white uppercase p-4 left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="flex items-center gap-3 border-r border-caribbeangreen-50 px-7">
            <p className="text-3xl font-bold">10</p>
            <p className="text-sm font-bold text-caribbeangreen-5">
              Years of Experience
            </p>
          </div>
          <div className="flex gap-5 items-center px-7">
            <p className="text-3xl font-bold">250</p>
            <p className="text-sm font-bold text-caribbeangreen-5">
              Type of Courses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TimeLineSection;

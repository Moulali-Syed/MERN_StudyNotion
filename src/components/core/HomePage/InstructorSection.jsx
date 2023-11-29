import { FaArrowRight } from 'react-icons/fa';
import Instructor from '../../../assets/Images/Instructor.png';
import CTAButton from './CTAButton';
import HighLightText from './HighLightText';
const InstructorSection = () => {
  return (
    <div className="flex flex-col-reverse gap-6 lg:gap-20 items-center md:flex-row">
      <div className="w-[90%] md:w-[50%] mt-16">
        <img src={Instructor} alt="instructor image" />
      </div>
      <div className="w-[90%] md:w-[50%] flex flex-col gap-6">
        <div className="text-4xl font-semibold w-[50%]">
          Become an <HighLightText text={'Instructor'} />
        </div>
        <p className="font-medium text-[16px] w-[80%] text-richblack-300">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </p>
        <div className="w-fit">
          <CTAButton active={true} linkto={'/signup'}>
            <div className="flex flex-row gap-2 items-center">
              Start Teaching Today
              <FaArrowRight />
            </div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};
export default InstructorSection;

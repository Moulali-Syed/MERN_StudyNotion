import HighLightText from './HighLightText';
import knowYourProgress from '../../../assets/Images/Know_your_progress.png';
import compareWithOthers from '../../../assets/Images/Compare_with_others.png';
import planYourLessons from '../../../assets/Images/Plan_your_lessons.png';
import CTAButton from './CTAButton';

const LearningLanguageSection = () => {
  return (
    <div className="mt-20">
      <div className="flex flex-col gap-5">
        <div className="text-3xl font-semibold text-center md:text-4xl">
          Your Swiss Knife for <HighLightText text={'learning any language'} />
        </div>
        <div className="text-center text-richblack-600 mx-auto text-xl mt-4 font-medium md:w-[70%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className="flex flex-col md:flex-row items-center mt-5">
          <img
            src={knowYourProgress}
            alt="know your progress image"
            className="object-contain md:-mr-32"
          />
          <img
            src={compareWithOthers}
            alt="compare with others image"
            className="object-contain -mt-14 md:-mt-0"
          />
          <img
            src={planYourLessons}
            alt="plan your lessons"
            className="object-contain -mt-24 md:-ml-36"
          />
        </div>

        <div className="mx-auto mb-8 w-fit">
          <CTAButton active={true} linkto={'/signup'}>
            Learn More
          </CTAButton>
        </div>
      </div>
    </div>
  );
};
export default LearningLanguageSection;

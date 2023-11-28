import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import HighLightText from '../components/core/HomePage/HighLightText';
import CTAButton from '../components/core/HomePage/CTAButton';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import Footer from '../components/core/common/Footer';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import TimeLineSection from '../components/core/HomePage/TimelineSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
        <Link to="/signup">
          <div className="group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 w-fit p-2 mt-16 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:scale-95 hover:drop-shadow-none ">
            <div className="flex gap-2 items-center rounded-full p-2 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-3xl font-semibold mt-5">
          Empower Your Future with <HighLightText text={'Coding Skills'} />
        </div>

        <div className="w-[90%] mt-4 text-center text-lg font-bold text-richblack-300">
          With our online coding courses,you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes and personalized feedback from
          instructors.
        </div>
        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={'/signup'}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={'/login'}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
        {/* code section 1 */}
        <div>
          <CodeBlocks
            position={'lg:flex-row'}
            heading={
              <div className="text-4xl font-bold">
                Unlock Your <HighLightText text={'coding potential '} />
                with our online courses
              </div>
            }
            subheading={
              'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'
            }
            ctabtn1={{
              btnText: 'try it yourself',
              linkto: '/signup',
              active: true,
            }}
            ctabtn2={{
              btnText: 'Learn More',
              linkto: '/login',
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a>\n<ahref="three/">Three</a>\n/nav>`}
            codeColor={'text-yellow-25'}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* code section 2 */}
        <div>
          <CodeBlocks
            position={'lg:flex-row-reverse'}
            heading={
              <div className="text-4xl font-bold">
                Unlock Your <HighLightText text={'coding potential '} />
                with our online courses
              </div>
            }
            subheading={
              'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'
            }
            ctabtn1={{
              btnText: 'try it yourself',
              linkto: '/signup',
              active: true,
            }}
            ctabtn2={{
              btnText: 'Learn More',
              linkto: '/login',
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a>\n<ahref="three/">Three</a>\n/nav>`}
            codeColor={'text-white'}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>
      </div>
      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[333px]">
          <div className="w-11/12 max-w-maxContent flex items-center justify-between gap-5 mx-auto">
            <div className="flex gap-7 text-white mt-[150px] mx-auto">
              <CTAButton active={true} linkto={'/signup'}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={'/signup'}>
                <div className="flex items-center gap-3">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex gap-5 mb-10 mt-20">
            <div className="text-4xl font-semibold w-[45%]">
              Get the skills you need for a
              <HighLightText text=" Job that is in demand" />
            </div>
            <div className="flex flex-col gap-10 w-[40%] items-start">
              <p className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </p>
              <CTAButton active={true} linkto={'/signup'}>
                Learn More
              </CTAButton>
            </div>
          </div>
          <TimeLineSection />
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8  text-white">
        <InstructorSection />
        <h2 className="text-center text-4xl font-semibold mt-10">
          Review From Other Learners
        </h2>
        {/* Review Slider */}
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Home;

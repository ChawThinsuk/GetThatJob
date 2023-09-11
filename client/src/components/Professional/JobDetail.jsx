import { Link } from 'react-router-dom';
import leftArrow from '../../assets/pro2/leftArrow.svg';
import applyicon from '../../assets/pro2/applyicon.svg';
import { JobHeader } from './JobHeader';

export const JobDetail = () => {
  let text =
    '- Lorem ipsum dolor sit amet, consectetur adipiscing elit. - Aeneanaliquam turpis eget egestas porta. - Quisque tristique nuncut sempretium bibendum. - Phasellus sit amet turpis laoreet, mattis elitut, luctus ligula. - Nullam blandit arcu eget justohendreritfinibus.';
  const paragraph = text.split('- ').filter(Boolean);
  return (
    <div className='flex flex-col w-full min-h-screen bg-[#F5F5F6] pt-8 pl-[10%] pr-[10%] pb-[40px]'>
      <Link to='/'>
        <button className='flex items-center h-[24px]'>
          <img src={leftArrow} className='w-[24px] h-[24px]' />
          <p className=' font-[Inter] text-[14px] text-[#616161]'>BACK</p>
        </button>
      </Link>
      <div className='flex flex-col mt-[10px]'>
        <JobHeader />
        {/*------------------------------------------------------Job Detail Section-----------------------------------------------*/}
        <section className='flex flex-col mt-[54px] px-[16px] gap-[16px]'>
          <div className='flex flex-col gap-[8px]'>
            <h1 className='text-[24px] text-[#BF5F82] font-[400] font-[Montserrat]'>
              About The company name SA
            </h1>
            <p className='w-[760px] text-[16px] text-[#373737] font-[400] font-[Inter] leading-[24px] tracking-[0.5px]'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque porta nunc viverra velit tincidunt, non vehicula
              augue vehicula. Donec viverra luctus nisl, sed vehicula ligula.
              Vivamus maximus metus a magna fermentum ullamcorper. Phasellus
              ultrices vestibulum ligula ut pellentesque. Quisque quis congue
              quam. Nunc porttitor risus lorem, in blandit augue iaculis vitae.
              Cras sit amet fringilla neque. Fusce ac elit ut quam ultrices
              bibendum. Curabitur vitae dignissim quam. Suspendisse aliquet
              massa id orci volutpat ullamcorper. Nunc at ante sem. Etiam
              elementum, mi eget aliquam lobortis, elit libero tempus ex, vel
              pretium nisi risus ac augue.
            </p>
          </div>
          <div className='flex flex-col gap-[8px]'>
            <h1 className='text-[24px] text-[#BF5F82] font-[400] font-[Montserrat]'>
              About the job position
            </h1>
            <p className='w-[760px] text-[16px] text-[#373737] font-[400] font-[Inter] leading-[24px] tracking-[0.5px]'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              quis diam fringilla, luctus lectus dictum, volutpat lacus. Vivamus
              lacinia felis ut mauris lacinia elementum. Sed faucibus dapibus
              egestas. Etiam dolor neque, posuere at purus cursus, molestie
              eleifend lacus. Aenean eu diam eu enim commodo accumsan ut sit
              amet odio. Nam maximus varius leo, et porttitor ante sodales ut.
              Pellentesque euismod commodo nunc ut tincidunt. Sed fringilla nunc
              leo, a euismod ipsum aliquet placerat. Integer suscipit semper mi,
              sit amet mollis augue mollis in. Proin vestibulum accumsan elit,
              id pellentesque diam fermentum eget. Aliquam mattis quis quam ut
              faucibus. Duis finibus nulla nec enim eleifend dapibus.
            </p>
          </div>
          <div className='flex flex-col  gap-[3px]'>
            <h1 className='text-[24px] text-[#BF5F82] font-[400] font-[Montserrat] mb-[5px]'>
              Mandatory Requirements
            </h1>
            {paragraph.map((text, index) => {
              return (
                <p
                  className='w-[760px] text-[16px] text-[#373737] font-[400] font-[Inter]  tracking-[0.5px]'
                  key={index}
                >
                  - {text}
                </p>
              );
            })}
          </div>{' '}
          <div className='flex flex-col gap-[3px]'>
            <h1 className='text-[24px] text-[#BF5F82] font-[400] font-[Montserrat] mb-[5px]'>
              Optional Requirements
            </h1>
            {paragraph.map((text, index) => {
              return (
                <p
                  className='w-[760px] text-[16px] text-[#373737] font-[400] font-[Inter] tracking-[0.5px]'
                  key={index}
                >
                  - {text}
                </p>
              );
            })}
          </div>
          <div className='flex justify-center mt-5'>
            <button className='flex items-center justify-center gap-[8px] bg-[#F48FB1] hover:bg-[#de7b9c] w-[173px] h-[56px] py-[16px] px-[20px] rounded-[16px] transition-all duration-300'>
              <img src={applyicon} className='w-[24px] h-[24px]' />
              <p className='text-[14px] text-white font-[Inter] tracking-[1.25px] '>
                APPLY NOW
              </p>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

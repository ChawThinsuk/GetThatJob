import { Link } from 'react-router-dom';
import leftArrow from '../../assets/pro2/leftArrow.svg';
import followOn from '../../assets/pro2/followOn.svg';
import followOff from '../../assets/pro2/followOff.svg';
import time from '../../assets/pro2/time.svg';
import applyicon from '../../assets/pro2/applyicon.svg';
import category from '../../assets/pro2/category.svg';
import calendar from '../../assets/pro2/calendar.svg';
import money from '../../assets/pro2/money.svg';

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
        {/*---------------------------------------------------------Company Logo Section-------------------------------------------*/}
        <section className='flex justify-between mt-[16px]'>
          <div className='flex  gap-[16px]'>
            <img src='../../../img/user.png' className='w-[80px] h-[80px]' />
            <div>
              <p className='text-[24px] font-[Montserrat]'>The companay name</p>
              <div className='flex items-center gap-[4px]'>
                <img src={followOn} className='w-[40px] h-[40px]' />
                <p className='text-[14px]  text-[#616161] font-[Inter] font-[400] tracking-[1.25px]'>
                  Following
                </p>
              </div>
            </div>
          </div>
          <button className='flex items-center justify-center gap-[8px] bg-[#F48FB1] w-[173px] h-[56px] py-[16px] px-[20px] rounded-[16px]'>
            <img src={applyicon} className='w-[24px] h-[24px]' />
            <p className='text-[14px] text-white font-[Inter] tracking-[1.25px] '>
              APPLY NOW
            </p>
          </button>
        </section>
        {/*------------------------------------------------------Job Title Section-----------------------------------------------*/}
        <section className='flex flex-col items-center mt-[10px]'>
          <h1 className='text-[48px] text-[#373737] font-[400] font-[Montserrat] '>
            JOB TITLE
          </h1>
          <div className='flex gap-[4px]'>
            <img src={time} className='w-[15px] h-[15px]' />
            <p className='text-[10px] font-[Inter] tracking-[1.5px]'>
              posted 2 day ago
            </p>
          </div>
          {/*boxes div*/}
          <div className='flex gap-[32px] mt-[20px]'>
            <div className='flex flex-col items-center w-[281px] h-[77px] pt-[8px] pb-[16px] px-[32px] border-[1px] border-[#BF5F82] bg-white rounded-[8px] shadow-pro2'>
              <p className='text-[16px] text-[#616161] font-[400] font-[Montserrat] tracking-[0.15px]'>
                Category
              </p>
              <div className='flex items-center gap-2 '>
                <img src={category} className='w-[29px] h-[29px]' />
                <p className='text-[24px] text-[#373737] font-[400] font-[Montserrat]'>
                  Manufacturing
                </p>
              </div>
            </div>
            <div className='flex flex-col items-center w-[208px] h-[77px] pt-[8px] pb-[16px] px-[28px] border-[1px] border-[#BF5F82] bg-white rounded-[8px] shadow-pro2'>
              <p className='text-[16px] text-[#616161] font-[400] font-[Montserrat] tracking-[0.15px]'>
                Type
              </p>
              <div className='flex items-center gap-2 '>
                <img src={calendar} className='w-[29px] h-[29px]' />
                <p className='text-[24px] text-[#373737] font-[400] font-[Montserrat]'>
                  Full Time
                </p>
              </div>
            </div>
            <div className='flex flex-col items-center w-[254px] h-[77px] pt-[8px] pb-[16px] px-[32px] border-[1px] border-[#BF5F82] bg-white rounded-[8px] shadow-pro2'>
              <p className='text-[16px] text-[#616161] font-[400] font-[Montserrat] tracking-[0.15px]'>
                Salary
              </p>
              <div className='flex items-center gap-2 '>
                <img src={money} className='w-[29px] h-[29px]' />
                <p className='text-[24px] text-[#373737] font-[400] font-[Montserrat]'>
                  2000 - 2500
                </p>
              </div>
            </div>
          </div>
        </section>
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
            <button className='flex items-center justify-center gap-[8px] bg-[#F48FB1] w-[173px] h-[56px] py-[16px] px-[20px] rounded-[16px]'>
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

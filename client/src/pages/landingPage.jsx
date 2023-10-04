import Navbar from '../components/navbar';
import Section1 from '../components/landing-page/section-1';
import Section2 from '../components/landing-page/section-2';
import Section3 from '../components/landing-page/section-3';
import Footer from '../components/landing-page/footer';

function LandingPage() {
  return (
    <>
      <Navbar />
      <Section1 />
      <Section2 />
      <Section3 />
      <Footer />
    </>
  );
}
// test
export default LandingPage;

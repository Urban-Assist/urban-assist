
import ServiceCards from '../components/ServicesCards';
import Sidenav from '../components/Sidenav';

function Dashboard() {

  return (

    <div class="relative bg-[#f7f6f9] h-full min-h-screen font-[sans-serif]">
      <div class="flex items-start">

        <Sidenav />
        <ServiceCards />

      </div>
    </div>
  );
}
export default Dashboard;
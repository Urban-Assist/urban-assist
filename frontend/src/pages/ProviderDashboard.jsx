
import ServiceCards from '../components/ServicesCards';
import ProviderSidenav from '../components/ProviderSidenav';

function UserDashboard() {

  return (

    <div class="relative bg-[#f7f6f9] h-full min-h-screen font-[sans-serif]">
      <div class="flex items-start">

        <ProviderSidenav />
        <ServiceCards title="Register for a service"/>

      </div>
    </div>
  );
}
export default UserDashboard;
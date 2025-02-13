
import ServiceCards from '../components/ServicesCards';
import UserSidenav from '../components/UserSidenav';

function UserDashboard() {

  return (

    <div class="relative bg-[#f7f6f9] h-full min-h-screen font-[sans-serif]">
      <div class="flex items-start">

        <UserSidenav />
        <ServiceCards title="Our Premium Services"/>

      </div>
    </div>
  );
}
export default UserDashboard;
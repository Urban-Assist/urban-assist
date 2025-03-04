
import logo from '../assets/Logo.png';


function UserSidenav() {

  return (
    <>
      <nav id="sidebar" class="lg:min-w-[250px] w-max max-lg:min-w-8">
        <div id="sidebar-collapse-menu"
          class="bg-white shadow-lg h-screen fixed top-0 left-0 overflow-auto z-[99] lg:min-w-[250px] lg:w-max max-lg:w-0 max-lg:invisible transition-all duration-500">
          <div class="flex items-center gap-2 pt-6 pb-2 px-4 sticky top-0 bg-white min-h-[64px] z-[100]">
            <a href="/"><img src={logo} alt="logo"
              class='w-[140px]' />
            </a>
            <button id="close-sidebar" class='lg:hidden ml-auto'>
              <svg class="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>

          <div class="py-4 px-4">
            <ul class="space-y-2">
              <li>
                <a href="/dashboard"
                  class="text-gray-800 text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2.5 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-[18px] h-[18px] mr-3"
                    viewBox="0 0 24 24">
                    <path
                      d="M19.56 23.253H4.44a4.051 4.051 0 0 1-4.05-4.05v-9.115c0-1.317.648-2.56 1.728-3.315l7.56-5.292a4.062 4.062 0 0 1 4.644 0l7.56 5.292a4.056 4.056 0 0 1 1.728 3.315v9.115a4.051 4.051 0 0 1-4.05 4.05zM12 2.366a2.45 2.45 0 0 0-1.393.443l-7.56 5.292a2.433 2.433 0 0 0-1.037 1.987v9.115c0 1.34 1.09 2.43 2.43 2.43h15.12c1.34 0 2.43-1.09 2.43-2.43v-9.115c0-.788-.389-1.533-1.037-1.987l-7.56-5.292A2.438 2.438 0 0 0 12 2.377z"
                      data-original="#000000" />
                    <path
                      d="M16.32 23.253H7.68a.816.816 0 0 1-.81-.81v-5.4c0-2.83 2.3-5.13 5.13-5.13s5.13 2.3 5.13 5.13v5.4c0 .443-.367.81-.81.81zm-7.83-1.62h7.02v-4.59c0-1.933-1.577-3.51-3.51-3.51s-3.51 1.577-3.51 3.51z"
                      data-original="#000000" />
                  </svg>
                  <span class="overflow-hidden text-ellipsis whitespace-nowrap">Book a Service</span>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    class="arrowIcon w-3 fill-current -rotate-90 ml-auto transition-all duration-500"
                    viewBox="0 0 451.847 451.847">
                    <path
                      d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z"
                      data-original="#000000" />
                  </svg>
                </a>

              </li>

              <li>
                <a href="javascript:void(0)"
                  class="text-gray-800 text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2.5 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-[18px] h-[18px] mr-3"
                    viewBox="0 0 510 510">
                    <g fill-opacity=".9">
                      <path
                        d="M255 0C114.75 0 0 114.75 0 255s114.75 255 255 255 255-114.75 255-255S395.25 0 255 0zm0 459c-112.2 0-204-91.8-204-204S142.8 51 255 51s204 91.8 204 204-91.8 204-204 204z"
                        data-original="#000000" />
                      <path d="M267.75 127.5H229.5v153l132.6 81.6 20.4-33.15-114.75-68.85z" data-original="#000000" />
                    </g>
                  </svg>
                  <span class="overflow-hidden text-ellipsis whitespace-nowrap">My bookings</span>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    class="arrowIcon w-3 fill-current -rotate-90 ml-auto transition-all duration-500"
                    viewBox="0 0 451.847 451.847">
                    <path
                      d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z"
                      data-original="#000000" />
                  </svg>
                </a>

              </li>

              <li>
                <a href="javascript:void(0)"
                  class="text-gray-800 text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2.5 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-[18px] h-[18px] mr-3"
                    viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span class="overflow-hidden text-ellipsis whitespace-nowrap">Favorites</span>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    class="arrowIcon w-3 fill-current -rotate-90 ml-auto transition-all duration-500" viewBox="0 0 451.847 451.847">
                    <path
                      d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="javascript:void(0)"
                  class="text-gray-800 text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2.5 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-[18px] h-[18px] mr-3"
                    viewBox="0 0 25 25">
                    <g data-name="Action Expand">
                      <path
                        d="M21.5 1.25h-18A2.25 2.25 0 0 0 1.25 3.5v18a2.25 2.25 0 0 0 2.25 2.25h18a2.25 2.25 0 0 0 2.25-2.25v-18a2.25 2.25 0 0 0-2.25-2.25zm.75 20.25a.75.75 0 0 1-.75.75h-18a.75.75 0 0 1-.75-.75v-18a.75.75 0 0 1 .75-.75h18a.75.75 0 0 1 .75.75z"
                        data-original="#000000" />
                      <path d="M11.75 7.25h1.5v10.5h-1.5z" data-original="#000000" />
                      <path d="M7.25 11.75h10.5v1.5H7.25z" data-original="#000000" />
                    </g>
                  </svg>
                  <span class="overflow-hidden text-ellipsis whitespace-nowrap">Saved Address</span>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    class="arrowIcon w-3 fill-current -rotate-90 ml-auto transition-all duration-500"
                    viewBox="0 0 451.847 451.847">
                    <path
                      d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z"
                      data-original="#000000" />
                  </svg>
                </a>

              </li>
            </ul>

            <div class="mt-6">
              <h6 class="text-blue-600 text-sm font-bold px-3">General Settings</h6>
              <ul class="mt-3 space-y-2">

                <li>
                  <a href="javascript:void(0)"
                    class="text-gray-800 text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2.5 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-[18px] h-[18px] mr-3"
                            viewBox="0 0 512 512">
                            <path
                              d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0"
                              data-original="#000000" />
                          </svg>
                    <span>Profile</span>
                  </a>
                </li>


                <li>
                  <a href="javascript:void(0)"
                    class="text-gray-800 text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2.5 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" class="w-[18px] h-[18px] mr-3"
                      viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0-4-4m4 4H10" />
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6" />
                    </svg>
                    <span>Log Out</span>
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </nav>

      <button id="open-sidebar" class='lg:hidden ml-4 mt-4 fixed top-0 left-0 bg-white z-[50]'>
        <svg class="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
        </svg>
      </button></>
  );

}



export default UserSidenav;

import logo from '../assets/Logo.png';


function ProviderSidenav() {

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
                <a href="/dashboard2"
                  class="text-gray-800 text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2.5 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-[18px] h-[18px] mr-3"
                    viewBox="0 0 24 24">
                    <path
                      d="M18 2c2.206 0 4 1.794 4 4v12c0 2.206-1.794 4-4 4H6c-2.206 0-4-1.794-4-4V6c0-2.206 1.794-4 4-4zm0-2H6a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h12a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6z"
                      data-original="#000000" />
                    <path d="M12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1z" data-original="#000000" />
                    <path d="M6 12a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1z" data-original="#000000" />
                  </svg>
                  <span class="overflow-hidden text-ellipsis whitespace-nowrap">Register a Service</span>
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
                <a href="/add-availability"
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
                  <span class="overflow-hidden text-ellipsis whitespace-nowrap">Your Availability</span>
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
                    viewBox="0 0 512 512">
                    <path
                      d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0"
                      data-original="#000000" />
                  </svg>
                  <span class="overflow-hidden text-ellipsis whitespace-nowrap">Bookings</span>
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
                              viewBox="0 0 64 64">
                              <path
                                d="M61.4 29.9h-6.542a9.377 9.377 0 0 0-18.28 0H2.6a2.1 2.1 0 0 0 0 4.2h33.978a9.377 9.377 0 0 0 18.28 0H61.4a2.1 2.1 0 0 0 0-4.2Zm-15.687 7.287A5.187 5.187 0 1 1 50.9 32a5.187 5.187 0 0 1-5.187 5.187ZM2.6 13.1h5.691a9.377 9.377 0 0 0 18.28 0H61.4a2.1 2.1 0 0 0 0-4.2H26.571a9.377 9.377 0 0 0-18.28 0H2.6a2.1 2.1 0 0 0 0 4.2Zm14.837-7.287A5.187 5.187 0 0 1 22.613 11a5.187 5.187 0 0 1-10.364 0 5.187 5.187 0 0 1 5.187-5.187ZM61.4 50.9H35.895a9.377 9.377 0 0 0-18.28 0H2.6a2.1 2.1 0 0 0 0 4.2h15.015a9.377 9.377 0 0 0 18.28 0H61.4a2.1 2.1 0 0 0 0-4.2Zm-34.65 7.287A5.187 5.187 0 1 1 31.937 53a5.187 5.187 0 0 1-5.187 5.187Z"
                                data-name="Layer 47" data-original="#000000" />
                            </svg>
                  <span class="overflow-hidden text-ellipsis whitespace-nowrap">My Services</span>
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
                {/* <li>
                  <a href="javascript:void(0)"
                    class="text-gray-800 text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2.5 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-[18px] h-[18px] mr-3"
                      viewBox="0 0 214.27 214.27">
                      <path
                        d="M196.926 55.171c-.11-5.785-.215-11.25-.215-16.537a7.5 7.5 0 0 0-7.5-7.5c-32.075 0-56.496-9.218-76.852-29.01a7.498 7.498 0 0 0-10.457 0c-20.354 19.792-44.771 29.01-76.844 29.01a7.5 7.5 0 0 0-7.5 7.5c0 5.288-.104 10.755-.215 16.541-1.028 53.836-2.436 127.567 87.331 158.682a7.495 7.495 0 0 0 4.912 0c89.774-31.116 88.368-104.849 87.34-158.686zm-89.795 143.641c-76.987-27.967-75.823-89.232-74.79-143.351.062-3.248.122-6.396.164-9.482 30.04-1.268 54.062-10.371 74.626-28.285 20.566 17.914 44.592 27.018 74.634 28.285.042 3.085.102 6.231.164 9.477 1.032 54.121 2.195 115.388-74.798 143.356z"
                        data-original="#000000" />
                      <path
                        d="m132.958 81.082-36.199 36.197-15.447-15.447a7.501 7.501 0 0 0-10.606 10.607l20.75 20.75a7.477 7.477 0 0 0 5.303 2.196 7.477 7.477 0 0 0 5.303-2.196l41.501-41.5a7.498 7.498 0 0 0 .001-10.606 7.5 7.5 0 0 0-10.606-.001z"
                        data-original="#000000" />
                    </svg>
                    <span>Profile</span>
                  </a>
                </li>
                
                <li>
                  <a href="javascript:void(0)"
                    class="text-gray-800 text-sm flex items-center cursor-pointer hover:bg-gray-100 rounded-md px-3 py-2.5 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-[18px] h-[18px] mr-3"
                      viewBox="0 0 64 64">
                      <path
                        d="M32.667 5.11A25.116 25.116 0 0 0 32 5.045V2.88a2.08 2.08 0 1 0-4.16 0v2.165C15.027 6.102 4.96 16.837 4.96 29.92v18.5L3.47 52.8h-.59a2.08 2.08 0 1 0 0 4.16h54.08a2.08 2.08 0 1 0 0-4.16h-.59l-1.49-4.38v-9.568a18.585 18.585 0 0 1-4.16 1.209v8.703a2.08 2.08 0 0 0 .11.67l1.145 3.366H7.865l1.144-3.366a2.08 2.08 0 0 0 .111-.67V29.92c0-11.488 9.312-20.8 20.8-20.8.142 0 .285.001.426.004a18.7 18.7 0 0 1 2.32-4.014zM23.68 61.12a2.08 2.08 0 0 1 2.08-2.08h8.32a2.08 2.08 0 1 1 0 4.16h-8.32a2.08 2.08 0 0 1-2.08-2.08z"
                        data-original="#000000" />
                      <g fill-rule="evenodd" clip-rule="evenodd">
                        <path
                          d="M46.56 12.909c-4.221 0-7.627 3.434-7.627 7.651s3.406 7.651 7.627 7.651c4.22 0 7.626-3.434 7.626-7.651s-3.406-7.651-7.626-7.651zm-3.467 7.651c0-1.936 1.56-3.491 3.467-3.491 1.906 0 3.466 1.555 3.466 3.491s-1.56 3.491-3.466 3.491c-1.906 0-3.467-1.555-3.467-3.491z"
                          data-original="#000000" />
                        <path
                          d="M44.342 2.88a2.08 2.08 0 0 0-2.005 1.526l-.75 2.711a14.256 14.256 0 0 0-4.138 2.402l-2.709-.703a2.08 2.08 0 0 0-2.325.978l-2.218 3.86a2.08 2.08 0 0 0 .316 2.49l1.964 2.01a14.478 14.478 0 0 0 0 4.813l-1.965 2.009a2.08 2.08 0 0 0-.315 2.49l2.218 3.86a2.08 2.08 0 0 0 2.325.978l2.709-.702a14.256 14.256 0 0 0 4.139 2.402l.749 2.71a2.08 2.08 0 0 0 2.005 1.526h4.436a2.08 2.08 0 0 0 2.005-1.526l.75-2.71a14.257 14.257 0 0 0 4.14-2.402l2.706.702a2.08 2.08 0 0 0 2.326-.978l2.218-3.86a2.08 2.08 0 0 0-.316-2.49l-1.964-2.01a14.477 14.477 0 0 0 0-4.813l1.965-2.009a2.08 2.08 0 0 0 .315-2.49l-2.219-3.86a2.08 2.08 0 0 0-2.324-.978l-2.709.702a14.256 14.256 0 0 0-4.138-2.402l-.749-2.71a2.08 2.08 0 0 0-2.007-1.526zm.956 6.421.626-2.261h1.271l.627 2.261a2.08 2.08 0 0 0 1.446 1.45 10.098 10.098 0 0 1 4.38 2.544 2.08 2.08 0 0 0 1.983.532l2.257-.585.644 1.12-1.64 1.678a2.08 2.08 0 0 0-.528 1.971c.208.812.32 1.666.32 2.549s-.112 1.737-.32 2.549a2.08 2.08 0 0 0 .527 1.97l1.641 1.68-.644 1.12-2.257-.586a2.08 2.08 0 0 0-1.982.532 10.096 10.096 0 0 1-4.38 2.544 2.08 2.08 0 0 0-1.447 1.45l-.628 2.261h-1.272l-.624-2.261a2.08 2.08 0 0 0-1.447-1.45 10.097 10.097 0 0 1-4.38-2.544 2.08 2.08 0 0 0-1.983-.532l-2.257.585-.645-1.12 1.642-1.678a2.08 2.08 0 0 0 .527-1.971c-.208-.812-.32-1.666-.32-2.549s.112-1.737.32-2.548a2.08 2.08 0 0 0-.527-1.972l-1.642-1.678.645-1.12 2.257.585a2.08 2.08 0 0 0 1.982-.532 10.097 10.097 0 0 1 4.38-2.544 2.08 2.08 0 0 0 1.447-1.45z"
                          data-original="#000000" />
                      </g>
                    </svg>
                    <span>Notification Settings</span>
                  </a>
                </li> */}
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



export default ProviderSidenav;
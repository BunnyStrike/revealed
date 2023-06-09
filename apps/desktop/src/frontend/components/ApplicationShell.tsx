import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  AdjustmentsHorizontalIcon,
  BuildingStorefrontIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import {
  IconApps,
  IconBrandSteam,
  IconDeviceGamepad2,
  IconDoorExit,
  IconLogin,
  IconVideo,
} from '@tabler/icons-react'
import { useLocation } from 'react-router-dom'

import { supabaseClient } from '../utils/database'
import { SidebarMenu } from './SidebarMenu'

const navigation = [
  { name: 'Home', link: '/home', icon: HomeIcon },
  { name: 'Apps', link: '/apps', icon: IconApps },
  { name: 'Games', link: '/games', icon: IconDeviceGamepad2 },
  {
    name: 'Steam Deck',
    link: '/steam-deck',
    isSteamos: true,
    icon: IconBrandSteam,
    children: [
      { name: 'Utilities', link: '/steam-deck/apps' },
      { name: 'Boot Videos', link: '/steam-deck/boot-videos', icon: IconVideo },
    ],
  },
  // { name: 'Boot Videos', link: '/boot-videos', icon: IconVideo },
  {
    name: 'Stores',
    link: '/stores',
    icon: BuildingStorefrontIcon,
    children: [
      { name: 'Steam', link: '/stores/steamStore' },
      { name: 'Epic Games', link: '/stores/epicStore' },
      { name: 'GOG', link: '/stores/gogStore' },
      { name: 'Fanatical', link: '/stores/fanaticalStore' },
    ],
  },
  { name: 'Settings', link: '/settings', icon: AdjustmentsHorizontalIcon },
  {
    name: 'Login',
    link: '/login/revealed',
    icon: IconLogin,
    showWhenLoggedIn: false,
  },
  {
    name: 'Logout',
    link: () => supabaseClient.auth.signOut(),
    icon: IconLogin,
    showWhenLoggedIn: true,
  },
  {
    name: 'Quit',
    icon: IconDoorExit,
  },
]
interface RevealedApplicationShellPros {
  children: React.ReactNode
}

export default function RevealedApplicationShell({
  children,
}: RevealedApplicationShellPros) {
  return (
    <>
      <div className='bg-neutral'>
        {/* Static sidebar for desktop */}
        <div className='fixed inset-y-0 flex w-20 flex-col sm:z-50 sm:w-60'>
          <SidebarMenu navigation={navigation} />
        </div>

        <main className='pl-20 sm:pl-60'>
          <div>{children}</div>
        </main>
      </div>
    </>
  )
}

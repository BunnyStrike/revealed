function BackgroundIllustration(props: any) {
  return (
    <svg
      viewBox='0 0 1090 1090'
      aria-hidden='true'
      fill='none'
      preserveAspectRatio='none'
      {...props}
    >
      <circle cx={545} cy={545} r='544.5' />
      <circle cx={545} cy={545} r='480.5' />
      <circle cx={545} cy={545} r='416.5' />
      <circle cx={545} cy={545} r='352.5' />
    </svg>
  )
}

export function AuthLayout({ title, subtitle, children, logo }: any) {
  return (
    <main className='flex min-h-full overflow-hidden pt-16 sm:py-28 '>
      <div className='mx-auto flex w-full max-w-2xl flex-col items-center px-4  sm:px-6'>
        {/* <a href='/' aria-label='Home'>
          <img
            className='h-11'
            width={44}
            height={44}
            src={logo}
            alt='Your Company'
          />
        </a> */}
        <div className='relative mt-12  sm:mt-16 '>
          <BackgroundIllustration
            width='1090'
            height='1090'
            className='absolute -top-7 left-1/2 -z-10 h-[788px] -translate-x-1/2 stroke-purple-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:-top-9 sm:h-auto'
          />
          <h1 className='text-center text-2xl font-medium tracking-tight text-gray-900'>
            {title}
          </h1>
          {subtitle && (
            <p className='mt-3 text-center text-lg text-gray-600'>{subtitle}</p>
          )}
        </div>
        <div className='sm:rounded-5xl -mx-4 mt-10 flex-auto bg-slate-800 px-4 py-10 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:p-24'>
          {children}
        </div>
      </div>
    </main>
  )
}

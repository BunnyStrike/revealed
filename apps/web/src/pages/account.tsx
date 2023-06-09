import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useUser } from '@supabase/auth-helpers-react'

import { Button, FormButton, FormFieldset } from '@revealed/ui'

import { api } from '~/utils/api'
import { Container } from '~/components/Container'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'
import { Pricing } from '~/components/Pricing'
import { StripePricingTable } from '~/components/StripePricingTable'
import AdminScreen from '~/components/admin/AdminScreen'
import { supabaseClientGlobal } from './_app'

export default function AccountPage() {
  const [currentTab, setCurrentTab] = useState(0)
  const router = useRouter()
  const user = useUser()
  const { mutateAsync: createCheckoutSession } =
    api.stripe.createCheckoutSession.useMutation()
  const { mutateAsync: createBillingPortalSession } =
    api.stripe.createBillingPortalSession.useMutation()

  const { data: subscriptionStatus } = api.user.subscriptionStatus.useQuery()

  const secondaryNavigation = [{ name: 'Overview' }, { name: 'Billing' }]

  if (user?.app_metadata?.role === 'ADMIN') {
    secondaryNavigation.push({
      name: 'Admin',
    })
  }

  useEffect(() => {
    router.query.tab === 'overview' && setCurrentTab(0)
    router.query.tab === 'billing' && setCurrentTab(1)
    router.query.tab === 'admin' && setCurrentTab(2)
  }, [router.query])

  useEffect(() => {
    if (!user?.id) {
      void router.push('/')
    }
  }, [router, user])

  const handleCreateBillingPortalSession = async () => {
    const { billingPortalUrl } = await createBillingPortalSession()

    if (billingPortalUrl) {
      window.location.assign(billingPortalUrl)
    }
  }

  // const handleCheckout = async () => {
  //   const res = await createCheckoutSession()
  //   console.log(res)
  // }

  return (
    <>
      <Head>
        <title>Revealed</title>
        <meta
          name='description'
          content='The all-in-one tool for your Steam Deck. Enjoy your favorite apps, manage your games, launch Game Mode. Sign up to be notified soon.'
        />
      </Head>
      <Header />
      <main className='h-full'>
        <Container>
          {/* <AdminScreen className='h-full bg-black' /> */}

          {currentTab === 0 && (
            <div className='mt-4'>
              <FormButton
                title='Email'
                description={`${user?.email}`}
                button={<></>}
              />
              <FormButton
                title='Password'
                description='********'
                button={
                  <Link href='/change-password' className='btn-secondary btn'>
                    Change
                  </Link>
                }
              />

              <FormButton
                title='Account'
                description={`${user?.user_metadata?.role || 'User'}`}
                button={
                  <Button
                    onClick={() => supabaseClientGlobal.auth.signOut()}
                    className='btn-warning btn'
                  >
                    Sign Out
                  </Button>
                }
              />
            </div>
          )}

          {currentTab === 1 && (
            <div className='mt-4'>
              <p>Upgrade your plan today!</p>

              {!!subscriptionStatus ? (
                <button
                  onClick={() => void handleCreateBillingPortalSession()}
                  className='btn-primary btn'
                >
                  Manage Billing
                </button>
              ) : (
                // <StripePricingTable />
                <Pricing hideMarketing />
              )}
            </div>
          )}

          {currentTab === 2 && (
            <div className='mt-4'>
              <AdminScreen className='h-full bg-black' />
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  )
}

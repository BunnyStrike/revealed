import { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

import { api } from '~/utils/api'
// import { supabaseClient } from '~/utils/database'
import { AuthLayout } from '~/components/AuthLayout'
import { Button } from '~/components/Button'
import { SelectField, TextField } from '~/components/Fields'
import { AuthPortal } from '~/components/auth'

export function MarketingRegisterPage() {
  const user = useUser()
  const router = useRouter()
  const supabaseClient = useSupabaseClient()
  const { mutateAsync: createCheckoutSession } =
    api.stripe.createCheckoutSession.useMutation()

  const { mutateAsync: createBillingPortalSession } =
    api.stripe.createBillingPortalSession.useMutation()
  const { push } = useRouter()
  const { mutate: userUpsert } = api.user.upsert.useMutation()

  useEffect(() => {
    if (user?.id) {
      userUpsert({
        id: user.id,
        email: user.email,
      })
      void router.push('/account?tab=billing')
    }
  }, [router, user, userUpsert])

  return (
    <>
      <Head>
        <title>Revealed</title>
      </Head>
      <AuthLayout title='Sign up for an account'>
        {/* <form>
          <div className='grid grid-cols-2 gap-6'>
            <TextField
              label='First name'
              id='first_name'
              name='first_name'
              type='text'
              autoComplete='given-name'
              required
            />
            <TextField
              label='Last name'
              id='last_name'
              name='last_name'
              type='text'
              autoComplete='family-name'
              required
            />
            <TextField
              className='col-span-full'
              label='Email address'
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
            />
            <TextField
              className='col-span-full'
              label='Password'
              id='password'
              name='password'
              type='password'
              autoComplete='new-password'
              required
            />
            <SelectField
              className='col-span-full'
              label='How did you hear about us?'
              id='referral-source'
              name='referral_source'
            >
              <option>AltaVista search</option>
              <option>Super Bowl commercial</option>
              <option>Our route 34 city bus ad</option>
              <option>The “Never Use This” podcast</option>
            </SelectField>
          </div>
          <Button type='submit' color='cyan' className='mt-8 w-full'>
            Get started today
          </Button>
        </form> */}
        <AuthPortal
          supabaseClient={supabaseClient}
          view='sign_up'
          redirectTo='/account?tab=billing'
        />
      </AuthLayout>
    </>
  )
}

export default MarketingRegisterPage

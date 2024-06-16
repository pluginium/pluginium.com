import ContentContainer from '@/components/ContentContainer'
import PageHeader from '@/components/PageHeader'

import image from '@/../public/illustrations/contact.svg'

import type { Metadata } from 'next'

const description =
  "Let's start a conversation! Reach out to us and let's make some magic happen together."

export const metadata: Metadata = {
  title: 'Contact',
  description,
  openGraph: {
    url: 'contact',
  },
}

export default function Contact() {
  return (
    <>
      <PageHeader image={image} subtitle={description}>
        Contact
      </PageHeader>
      <ContentContainer>
        <form
          name="contact"
          method="POST"
          encType="multipart/form-data"
          className="space-y-6"
        >
          <input type="hidden" name="form-name" value="contact" />
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label>
                First name *
                <input type="text" name="firstName" required />
              </label>
            </div>

            <div>
              <label>
                Last name *
                <input type="text" name="lastName" required />
              </label>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label>
              Email *
              <input type="email" name="email" required />
            </label>

            <label>
              Phone *
              <input
                type="text"
                name="phone"
                pattern="^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,}$"
                required
              />
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label>
              Company
              <input type="text" name="company" />
            </label>

            <label>
              Website
              <input type="url" name="personalUrl" />
            </label>
          </div>

          <div>
            <label>
              Message *
              <textarea name="message" maxLength={2000} required></textarea>
            </label>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="rounded-md bg-emerald-600 px-3 pb-1 pt-2 font-semibold text-stone-50 transition-colors hover:bg-emerald-700 dark:bg-emerald-400 dark:text-stone-950 dark:hover:bg-emerald-300"
            >
              Submit
            </button>
          </div>
        </form>
      </ContentContainer>
    </>
  )
}

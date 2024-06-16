import ContentContainer from '@/components/ContentContainer'
import PageHeader from '@/components/PageHeader'
import { getAllPlatforms, getPageBySlug } from '@/lib/api'
import markdownToHtml from '@/lib/markdownToHtml'

import image from '@/../public/illustrations/services.svg'

import type { Metadata } from 'next'

const description =
  'We specialize in developing custom solutions to enhance the functionality and performance of various software platforms, tailored to meet your specific business needs.'

export const metadata: Metadata = {
  title: 'Services',
  description,
  openGraph: {
    url: 'services',
  },
}

export default async function ServicesPage() {
  const platforms = getAllPlatforms()
  const page = getPageBySlug('services')

  const content = await markdownToHtml(page.content)

  return (
    <>
      <PageHeader image={image} subtitle={description}>
        Services
      </PageHeader>

      {content && (
        <ContentContainer
          className="mb-12 border-b-1/2 pb-12"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      <ContentContainer>
        <h2>Contact Us</h2>
        <form
          name="services"
          method="POST"
          encType="multipart/form-data"
          className="space-y-6"
        >
          <input type="hidden" name="form-name" value="services" />
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
              Work Email *
              <input type="email" name="email" required />
            </label>

            <label>
              Work Phone *
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
              Company *
              <input type="text" name="company" required />
            </label>

            <label>
              Company Website
              <input type="url" name="personalUrl" />
            </label>
          </div>

          <div className="space-y-6 border-t-1/2 pt-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label>
                Project Start Date *
                <select name="startDate" required>
                  <option>-- Select --</option>
                  <option value="asap">As soon as possible</option>
                  <option value="quarter">Within the next three months</option>
                  <option value="year">Within the next year</option>
                  <option value="info">
                    No start date, just gathering information
                  </option>
                </select>
              </label>

              <label>
                Project Timeline
                <select name="timeline">
                  <option>-- Select --</option>
                  <option value="quarter">3 months</option>
                  <option value="half">6 months</option>
                  <option value="full">1 year</option>
                  <option value="full">More than 1 year</option>
                </select>
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label>
                Platform *
                <select name="platform" required>
                  <option>-- Select --</option>
                  <optgroup label="Platforms">
                    {platforms.map((platform) => (
                      <option key={platform.slug} value={platform.slug}>
                        {platform.title}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Other">
                    <option value="multiple">Multiple platforms</option>
                    <option value="other">A platform not listed</option>
                    <option value="unsure">Unsure which platform</option>
                  </optgroup>
                </select>
              </label>

              <label>
                Project Budget *
                <select name="budget" required>
                  <option>-- Select --</option>
                  <option value="20k">$5,000 - $20,000</option>
                  <option value="50k">$20,000 - $50,000</option>
                  <option value="100k">$50,000 - $100,000</option>
                  <option value="plus">$100,000+</option>
                </select>
              </label>
            </div>
          </div>

          <div>
            <label>
              Brief project description *
              <textarea name="description" maxLength={2000} required></textarea>
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

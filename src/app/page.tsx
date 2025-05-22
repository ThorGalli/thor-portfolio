'use client'
import ArticleSection from '@/components/navigation/articleSection'
import ArticleWindow from '@/components/navigation/articleWindow'
import NavbarLayout from '@/layouts/navbar'
import Image from 'next/image'

export default function Home() {
  return (
    <NavbarLayout childrenWrapperClass="max-h-[calc(100vh-3rem)] min-h-[calc(100vh-3rem)] overflow-auto">
      <main className="pb-8 pt-2">
        <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-4 lg:items-start">
          <div className="flex flex-col-reverse items-center gap-4 lg:flex-row lg:items-stretch">
            <ArticleWindow
              id="greeting"
              title={
                <>
                  Hello there, my name is{' '}
                  <span className="text-yellow-400">Thor Galli</span>!
                </>
              }
            >
              <ArticleSection className="flex flex-col gap-2 text-xl">
                <p>
                  I&apos;m a{' '}
                  <span className="text-blue-400">Full Stack Developer</span>{' '}
                  with{' '}
                  <span className="text-yellow-400">
                    {formatMonthsWorked(totalTime)}
                  </span>{' '}
                  of professional experience in Web Development and{' '}
                  <span className="text-cyan-400">C1 English</span> proficiency.
                </p>
                <p>
                  This is my portfolio, feel free to browse around and
                  don&apos;t forget to check out the{' '}
                  <span className="text-blue-400">games </span> on the{' '}
                  <span className="text-yellow-400">other tabs</span> (👆 and
                  💣)
                </p>
              </ArticleSection>
              <ArticleSection subtitle="Contact">
                <div className="flex flex-col gap-3 lg:flex-row">
                  <ul className="ml-6 list-disc">
                    <li>
                      Email:{' '}
                      <a
                        href="mailto:gallithor@gmail.com"
                        target="_blank"
                        className="text-blue-400 underline"
                        rel="noreferrer"
                      >
                        gallithor@gmail.com
                      </a>
                    </li>
                    <li>
                      Phone:{' '}
                      <a
                        href="https://wa.me/5541999793999?text=Hello%20Thor!%20I%20saw%20your%20portfolio%20and%20I%20would%20like%20to%20talk%20to%20you!"
                        target="_blank"
                        className="text-green-400 underline"
                        rel="noreferrer"
                      >
                        +55 41 999 793 999
                      </a>
                    </li>
                    <li>
                      Location:{' '}
                      <a
                        href="https://maps.app.goo.gl/Nr6AWcDR1VKgLBzG7"
                        target="_blank"
                        className="text-yellow-400 underline"
                        rel="noreferrer"
                      >
                        Curitiba, PR - Brasil
                      </a>
                    </li>
                  </ul>
                  <div className="h-[2px] w-full rounded bg-slate-800 lg:hidden" />
                  <ul className="ml-6 list-disc">
                    <li>
                      Linkedin:{' '}
                      <a
                        href="https://linkedin.com/in/thor-galli/"
                        className="text-blue-400 underline"
                      >
                        /in/thor-galli
                      </a>
                    </li>
                    <li>
                      Github:{' '}
                      <a
                        href="https://github.com/ThorGalli"
                        className="text-green-400 underline"
                      >
                        github.com/ThorGalli
                      </a>
                    </li>
                  </ul>
                </div>
              </ArticleSection>
            </ArticleWindow>
            <div className="flex rounded-[14px] bg-slate-800 p-2">
              <Image
                className="rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                src="/assets/images/profile-pic.png"
                width={250}
                height={250}
                alt="profile-picture"
                draggable={false}
              />
            </div>
          </div>

          <ArticleWindow id="about-me" title="About me" useDrawer>
            <ArticleSection className="flex flex-col gap-4">
              <p>
                I am Thor, a Full Stack Developer with 4 years of professional
                experience and a background in Civil Engineering. This
                combination provides me with a unique perspective in software
                development, allowing me to understand and approach projects
                with a comprehensive and effective outlook.
              </p>
              <br />
              <p>
                I&apos;m{' '}
                <span className="text-yellow-400">
                  fluent in English and Portuguese
                </span>{' '}
                and my experience includes front-end development using the
                React.js Framework to build web apps from scratch, creating REST
                and GraphQL APIs to serve applications or to communicate with
                other third-party services, as well as bug fixing and
                maintenance of legacy projects.
              </p>
              <br />
              <p>
                I&apos;m most experienced in {typescript}, {node}, and {react}.
                <br />
                With strong foundations in the basics: {html}, {css},{' '}
                {javascript}, {sql}, {git}, and {linux}.
              </p>
              <br />
              <p>
                Whether it&apos;s creating new features, optimizing processes,
                or ensuring code quality, my goal is always to deliver quality
                technological solutions that add value and make a difference.
              </p>
              <br />
              <p>
                Due to my affinity for computers and gaming, I&apos;ve studied
                computer science and programming as a hobby for more than 15
                years, which for the most part was self-taught.
              </p>
            </ArticleSection>
          </ArticleWindow>

          <ArticleWindow id="experience" title="Experience" useDrawer>
            <ArticleSection
              job
              subtitle="Software Engineer at Howdy"
              time={
                <p>
                  January 2025 - present{' '}
                  <span className="text-slate-400">
                    ({formatMonthsWorked(howdyTime)} so far)
                  </span>
                </p>
              }
              footer={
                <p>
                  ⭐ Top Skills: {golang}, {typescript}, {react}, {node},{' '}
                  {microfrontend}, {microservices}
                </p>
              }
            >
              <p>
                Worked by <span className="text-pink-400">contracts</span> for
                Howdy&apos;s clients, including:{' '}
              </p>
              <div className="flex flex-col">
                <section className="profile-section ml-6">
                  <h3 className="profile-subtitle">
                    <li className="text-green-400">OrderMyGear (OMG)</li>
                  </h3>
                  <p className="profile-time">
                    January 2025 - present{' '}
                    <span className="text-slate-400">
                      ({formatMonthsWorked(howdyTime)} so far)
                    </span>
                  </p>
                  <ul className="ml-6 list-disc">
                    <li>Daily use of agile methodologies;</li>
                    <li>
                      Developed and maintained microservices and microfrontends
                      for a web application;
                    </li>
                    <li>
                      Followed best practices like unit testing and code
                      reviews;
                    </li>
                  </ul>
                </section>
              </div>
            </ArticleSection>
            <ArticleSection
              job
              subtitle="Full Stack Developer at Hewlett-Packard (HP)"
              time={
                <p>
                  March 2024 - January 2025{' '}
                  <span className="text-slate-400">
                    ({formatMonthsWorked(wiproTime)})
                  </span>
                </p>
              }
              footer={
                <p>
                  ⭐ Top Skills: {react}, {redux}, {typescript}, {graphql},{' '}
                  {node}, {microfrontend}, {microservices}
                </p>
              }
            >
              <ul className="ml-6 list-disc">
                <li>Daily use of agile methodologies;</li>
                <li>
                  Development and maintenance of a cross-platform application
                  with a large international user base;
                </li>
                <li>Provided support and guidance to the team;</li>
                <li>
                  Followed best practices like unit testing and code reviews;
                </li>
                <li>
                  Recorded demo videos of newly developed features for
                  presentation to teams and stakeholders.
                </li>
              </ul>
            </ArticleSection>
            <ArticleSection
              job
              subtitle="Full Stack Developer at Brainny Smart Solutions"
              time={
                <p>
                  June 2022 - April 2024{' '}
                  <span className="text-slate-400">
                    ({formatMonthsWorked(brainnyTime)})
                  </span>
                </p>
              }
              footer={
                <p>
                  ⭐ Top Skills: {react}, {next}, {nest}, {graphql},{' '}
                  {typescript}, {postgres}
                </p>
              }
            >
              <ul className="ml-6 list-disc">
                <li>Daily use of agile methodologies;</li>
                <li>
                  Full Stack development for a study platform using Next.js,
                  React and NestJS, integrated with GraphQL;
                </li>
                <li>
                  Provided support and guidance to junior developers and
                  interns;
                </li>
                <li>
                  Migrated deprecated services to use the latest Firebase APIs;
                </li>
                <li>
                  Developed, debugged, and maintained a web app using Java and
                  Spring;
                </li>
                <li>
                  Integrated communication between the front-end and back-end
                  using RestAPI;
                </li>
                <li>
                  Conducted automated unit testing, created informative videos
                  for completed tasks;
                </li>
                <li>
                  Code review for the approval of Pull Requests on GitLab;
                </li>
                <li> Created migrations for SQL databases.</li>
              </ul>
            </ArticleSection>
            <ArticleSection
              job
              subtitle="Freelance Developer"
              time={
                <p>
                  March 2021 - May 2022{' '}
                  <span className="text-slate-400">
                    ({formatMonthsWorked(freelanceTime)})
                  </span>
                </p>
              }
              footer={
                <p>
                  ⭐ Top Skills: {react}, {bootstrap}, {git}, {python}
                </p>
              }
            >
              <ul className="ml-6 list-disc">
                <li>
                  Development of Responsive Landing Pages and Hot Sites for
                  clients;
                </li>
                <li>Data cleaning and spreadsheet manipulation with Python;</li>
                <li>Web scraping with Python;</li>
                <li>Version control with Git and GitLab.</li>
              </ul>
            </ArticleSection>
          </ArticleWindow>

          <ArticleWindow id="education" title="Education" useDrawer>
            <ArticleSection
              subtitle="Bachelor of Technology - BTech, Computer Systems Analysis at SenacRS"
              time="2021 - 2024 (graduated)"
            />
            <ArticleSection
              subtitle="Bachelor's in Civil Engineering at Universidade Federal do Rio Grande"
              time="2014 - 2020 (graduated)"
            />
          </ArticleWindow>

          <p className="mx-4">
            Don&apos;t forget to check out the{' '}
            <span className="text-blue-400">games </span> on the{' '}
            <span className="text-yellow-400">other tabs</span> (There&apos;s a
            clicker 👆 and MineSweeper 💣)
          </p>
        </div>
      </main>
    </NavbarLayout>
  )
}

const freelanceTime = totalMonthsIn(
  new Date('2021-03-01'),
  new Date('2022-05-31'),
)
const brainnyTime = totalMonthsIn(
  new Date('2022-06-01'),
  new Date('2024-04-26'),
)

const wiproTime = totalMonthsIn(new Date('2024-03-01'), new Date('2025-01-31'))

const howdyTime = totalMonthsIn(new Date('2025-01-01'))

const totalTime = freelanceTime + brainnyTime + wiproTime + howdyTime

function totalMonthsIn(dateStart: Date, dateEnd = new Date()) {
  const timeWorked = dateEnd.getTime() - dateStart.getTime()
  const totalMonthsWorked = timeWorked / (1000 * 3600 * 24 * 30)
  return totalMonthsWorked
}

function formatMonthsWorked(months: number) {
  const roundedMonths = Math.round(months)
  const yearsWorked = Math.floor(roundedMonths / 12)
  const monthsWorked = Math.round(roundedMonths % 12)

  const month = monthsWorked === 1 ? 'month' : 'months'
  const year = yearsWorked === 1 ? 'year' : 'years'

  if (yearsWorked === 0) return `${monthsWorked} ${month}`

  const timeWorked =
    `${yearsWorked} ${year}` +
    (monthsWorked > 0 ? ` and ${monthsWorked} ${month}` : '')
  return timeWorked
}

const golang = <span className="text-blue-300">Go (Golang)</span>
const react = <span className="text-cyan-400">React</span>
const next = <span className="font-bold text-white">Next.js</span>
const node = <span className="text-green-400">Node.js</span>
const nest = <span className="text-yellow-400">NestJS</span>
const graphql = <span className="text-pink-400">GraphQL</span>
const typescript = <span className="text-blue-400">TypeScript</span>
const postgres = <span className="text-yellow-400">PostgreSQL</span>
const java = <span className="text-orange-400">Java</span>
const spring = <span className="text-green-400">Spring</span>
const python = <span className="text-yellow-400">Python</span>
const bootstrap = <span className="text-purple-400">Bootstrap</span>
const git = <span className="text-red-400">Git</span>
const linux = <span className="text-teal-300">Linux</span>
const css = <span className="text-blue-400">CSS</span>
const javascript = <span className="text-yellow-400">JavaScript</span>
const sql = <span className="text-pink-400">SQL</span>
const redux = <span className="text-purple-400">Redux</span>
const html = <span className="text-red-400">HTML</span>
const microservices = <span className="text-green-400">Microservices</span>
const microfrontend = <span className="text-yellow-400">Microfrontends</span>

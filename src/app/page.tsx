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
                I’m a Full Stack Software Engineer with 5+ years of experience
                building scalable SaaS systems.
              </p>
              <p>
                I’ve contributed to core platforms used daily by thousands of
                users, working with companies like Azul Brazilian Airlines, HP,
                and OrderMyGear. My work spans modern web applications, API
                design, data integration, and cloud-based production
                environments.
              </p>
              <p>
                I build with {react} and {next} on the front end, design REST
                and {graphql} APIs, and focus on performance, reliability, and
                maintainable architecture. Comfortable working in both legacy
                systems and new product builds.
              </p>
              <p>
                Tech focus: {typescript}, {next}, {react}, {node}, {java}, {sql}
                , and GCP.
              </p>
              <p>
                I care about pragmatic engineering decisions, transparent
                communication, and building clean systems that scale.
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
                    <li>
                      Core engineer in a lean team building a product discovery
                      and search platform (~12K searches/day);
                    </li>
                    <li>
                      Built and optimized {next} (SSR) front-end experiences
                      integrated with high-scale REST APIs;
                    </li>
                    <li>
                      Developed and maintained APIs powering search, product
                      data, and internal platform services;
                    </li>
                    <li>
                      Integrated services across {microfrontend} and
                      consolidated product data flows;
                    </li>
                    <li>
                      Improved delivery reliability with automated testing and
                      CI/CD pipelines;
                    </li>
                    <li>
                      Worked with GCP (Cloud Run, Kubernetes, Buckets, Secrets,
                      Load Balancers) in production;
                    </li>
                    <li>
                      Resolved monorepo vulnerabilities, upgraded dependencies,
                      and authored technical documentation.
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
                <li>
                  Collaborated with international teams in English (Design, QA,
                  Engineering, Management);
                </li>
                <li>
                  Developed and maintained a cross-platform application with a
                  large international user base;
                </li>
                <li>
                  Built {microfrontend} projects and {microservices} APIs;
                </li>
                <li>Integrated APIs and services across micro frontends;</li>
                <li>
                  Conducted code reviews and implemented automated testing
                  (Jest);
                </li>
                <li>
                  Delivered stakeholder demo presentations for new features.
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
                <li>
                  Assigned to outsourcing contracts including Azul Brazilian
                  Airlines;
                </li>
                <li>
                  Full Stack development using {next}, {react}, {nest}, and{' '}
                  {graphql};
                </li>
                <li>
                  Developed and maintained applications with {java} and {spring}
                  ;
                </li>
                <li>
                  Integrated front-end and back-end systems via REST APIs;
                </li>
                <li>Reviewed Pull Requests and mentored junior developers;</li>
                <li>
                  Created SQL migrations and maintained relational databases.
                </li>
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
                  Built responsive Landing Pages and marketing websites for
                  clients;
                </li>
                <li>
                  Developed data cleaning and web scraping solutions with{' '}
                  {python};
                </li>
                <li>Managed version control using {git}.</li>
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
const sql = <span className="text-pink-400">SQL</span>
const redux = <span className="text-purple-400">Redux</span>
const microservices = <span className="text-green-400">Microservices</span>
const microfrontend = <span className="text-yellow-400">Microfrontends</span>

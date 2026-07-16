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
                src="/assets/images/profile-pic.jpg"
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
                building SaaS products used by thousands of users.
              </p>
              <br />
              <p>
                I’ve worked with companies such as HP, Azul Brazilian Airlines,
                and OrderMyGear, contributing across the entire product
                lifecycle, from discovery and implementation to production
                operations and long-term maintenance. My experience spans modern
                web applications, APIs, cloud infrastructure, and distributed
                systems.
              </p>
              <br />
              <p>
                While I enjoy solving technical problems, my primary focus is
                building the right{' '}
                <span className="text-yellow-400">product</span>. I believe the
                most valuable engineering work happens before code is written:
                understanding user needs, refining requirements, questioning
                assumptions, and choosing pragmatic solutions that balance
                business goals, engineering effort, and long-term
                maintainability.
              </p>
              <br />
              <p>
                The rise of AI-assisted development has only reinforced this
                perspective. As implementation becomes faster and more
                automated, the ability to define problems clearly, translate
                product requirements into technical solutions, and exercise
                engineering judgment becomes increasingly important. I use AI
                tools daily to accelerate development, but I treat them as force
                multipliers rather than decision makers.
              </p>
              <br />
              <p>
                Technically, I build with {react}, {next}, {typescript}, {node},
                {java}, {sql}, {graphql}, and {gcp}, with experience across
                frontend, backend, cloud infrastructure, and developer tooling.
              </p>
              <br />
              <p>
                I care about product thinking, clean architecture, transparent
                communication, and building software that delivers measurable
                value to users.
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
                Full-time contractor placed on long-term SaaS engagements (for
                example, {<span className="text-green-400">OrderMyGear</span>}).
                Participate in structured engineering mentorship, ongoing
                professional development (language and tooling training), and
                contribute to a distributed engineering community focused on
                high standards and continuous improvement.
              </p>

              <ul className="ml-6 list-disc">
                <li>
                  Contract work across multiple client products, focusing on
                  reliability, architecture, and developer experience.
                </li>
                <li>
                  Regular mentorship, technical guidance, and performance
                  feedback routines.
                </li>
                <li>Active participation in tooling and AI workshops.</li>
              </ul>

              <div className="mt-4 flex flex-col">
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
                      Core engineer in a lean team building a new product
                      discovery and search platform (~12K searches/day) used
                      across legacy and active products;
                    </li>
                    <li>
                      Leveraged AI-assisted prototyping and tooling ({cursor},{' '}
                      {cody}, v0, Unblocked) to accelerate development cycles
                      and reduce rework;
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
                      Contributed to data quality and standards adoption
                      (PromoStandards-aligned) across ~800K SKUs and 500+
                      suppliers;
                    </li>
                    <li>
                      Integrated services across {microfrontend} and
                      consolidated product data flows;
                    </li>
                    <li>
                      Improved delivery reliability through automated testing
                      (Vitest) and CI/CD pipelines (GitHub Actions);
                    </li>
                    <li>
                      Worked with {gcp} in production (Cloud Run, Kubernetes,
                      Storage Buckets, Secrets, Load Balancers);
                    </li>
                    <li>
                      Resolved monorepo vulnerabilities, upgraded dependencies,
                      and authored technical documentation and solution
                      blueprints.
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
                  Collaborated with international teams, communicating in
                  English with Designers, Developers, QA and Managers;
                </li>
                <li>
                  Leveraged Microsoft&apos;s {copilot} to accelerate feature
                  development and workflows (reported productivity improvements
                  in the team);
                </li>
                <li>
                  Built and maintained cross-platform applications with a large
                  international user base, using micro frontends and
                  microservices architecture;
                </li>
                <li>Integrated APIs and services across micro frontends;</li>
                <li>
                  Conducted code reviews, approved PRs on GitHub and implemented
                  automated testing with Jest;
                </li>
                <li>Recorded demo videos of new features for stakeholders.</li>
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
                  Assigned to outsourcing contracts with clients such as{' '}
                  {
                    <span className="text-yellow-400">
                      Azul Brazilian Airlines
                    </span>
                  }{' '}
                  and Bridge MT;
                </li>
                <li>
                  Full Stack development for a study platform using {next},{' '}
                  {react} and {nest}, integrated with {graphql};
                </li>
                <li>
                  Leveraged {copilot} to accelerate documentation and code
                  writing; migrated deprecated services to the latest Firebase
                  APIs;
                </li>
                <li>
                  Developed, debugged and maintained backend services with{' '}
                  {java} and {spring};
                </li>
                <li>
                  Integrated front-end and back-end via REST APIs, reviewed PRs
                  on GitLab and mentored junior developers;
                </li>
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
                  Developed responsive landing pages, hot sites and marketing
                  websites for clients;
                </li>
                <li>
                  Performed data cleaning and spreadsheet manipulation with{' '}
                  {python}, and built/deployed web scraping solutions;
                </li>
                <li>
                  Managed version control and deployments using Git and GitLab.
                </li>
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

const copilot = <span className="text-sky-400">Copilot</span> // GitHub Copilot (blue/cyan)
const cody = <span className="text-violet-400">Cody</span> // Cody (Approx purple)
const claude = <span className="text-amber-300">Claude</span> // Anthropic Claude (warm/amber)
const cursor = <span className="text-indigo-400">Cursor</span> // Cursor (indigo-ish)
const gcp = <span className="text-blue-500">GCP</span> // Google Cloud Platform (blue)

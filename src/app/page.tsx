import NavbarLayout from '@/layouts/navbar'
import Image from 'next/image'

export default function Home() {
  const totalTime = totalTimeSince(new Date('2022-06-01'))

  return (
    <NavbarLayout>
      <main className="mb-8 mt-2">
        <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-4 lg:items-start">
          <div className="flex flex-col-reverse items-center gap-4 lg:flex-row lg:items-stretch">
            <article id="greeting" className="profile-article">
              <h2 className="text-3xl font-bold">
                Hello there, my name is{' '}
                <span className="text-yellow-400">Thor Galli</span>!
              </h2>
              <section className="profile-section flex flex-col gap-2 text-xl">
                <p>
                  I&apos;m a{' '}
                  <span className="text-blue-400">Full Stack Developer</span>{' '}
                  with <span className="text-yellow-400">{totalTime}</span> of
                  professional experience in Web Development.
                </p>
                <p className="text-sm text-slate-400">
                  ({totalTime} employed + 1 year of freelancing)
                </p>
                <p>
                  This is my portfolio, feel free to browse around and
                  don&apos;t forget to check out the{' '}
                  <span className="text-blue-400">games </span> on the{' '}
                  <span className="text-yellow-400">other tabs</span> (👆 and
                  💣)
                </p>
              </section>
              <section className="profile-section">
                <h3 className="profile-subtitle">Contact</h3>
                <div className="flex flex-col gap-3 lg:flex-row">
                  <ul className="ml-6 list-disc">
                    <li>
                      Email:{' '}
                      <a
                        href="mailto:gallithor@gmail.com"
                        target="_blank"
                        className="text-blue-400"
                        rel="noreferrer"
                      >
                        gallithor@gmail.com
                      </a>
                    </li>
                    <li>
                      Phone:{' '}
                      <span className="text-green-400">+55 53 9 8144 1755</span>
                    </li>
                    <li>
                      Location:{' '}
                      <span className="text-yellow-400">
                        Pelotas, RS - Brasil
                      </span>
                    </li>
                  </ul>
                  <div className="h-[2px] w-full rounded bg-slate-800 lg:hidden" />
                  <ul className="ml-6 list-disc">
                    <li>
                      Linkedin:{' '}
                      <a
                        href="https://linkedin.com/in/thor-galli/"
                        className="text-blue-400"
                      >
                        /in/thor-galli
                      </a>
                    </li>
                    <li>
                      Github:{' '}
                      <a
                        href="https://github.com/ThorGalli"
                        className="text-green-400"
                      >
                        github.com/ThorGalli
                      </a>
                    </li>
                  </ul>
                </div>
              </section>
            </article>
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

          <article id="about-me" className="profile-article">
            <h2 className="text-3xl font-bold">About me</h2>
            <section className="profile-section flex flex-col gap-4">
              <p>
                I&apos;m most experienced in{' '}
                <span className="text-blue-400">TypeScript</span>,{' '}
                <span className="text-green-400">Node.js</span> and{' '}
                <span className="text-cyan-400">React</span>, with strong
                foundations in the basics:{' '}
                <span className="text-yellow-400">
                  HTML, CSS, JavaScript, SQL, Git and Linux.
                </span>
              </p>
              <p>
                My goals are to hone my skills and keep pushing to become an
                exceptional Software Developer.
                <br />
                I&apos;m{' '}
                <span className="text-yellow-400">
                  fluent in English and Portuguese
                </span>
                . I&apos;ve worked in both big and small teams using the Agile
                development methodology, Scrum, CI/CD and Git flow.
              </p>
              <p>
                Engineering background: as a child, I was curious and interested
                in how things worked (to be honest, I still am), this led me to
                study and graduate in Civil Engineering, where I acquired
                advanced knowledge of physics, calculus, algebra, geometry,
                statistics, administration and economy. This combination of
                knowledge and skills has proven to be very useful in my career
                as they&apos;ve helped me quickly understand and adapt to new
                projects.
              </p>
              <p>
                Due to my affinity to computers and gaming, I&apos;ve studied
                computer science and programming as a hobby for more than 15
                years, which for the most part was self-taught.
              </p>
            </section>
          </article>

          <article id="experience" className="profile-article">
            <h2 className="text-3xl font-bold">Experience</h2>

            <section className="profile-section">
              <h3 className="profile-subtitle">
                <span className="text-yellow-200">
                  Full Stack Developer at Brainny Smart Solutions{' {'}
                </span>
              </h3>
              <p className="profile-time">June 2022 - Present</p>
              <ul className="ml-6 list-disc">
                <li>
                  Development, bug fixing, and maintenance of multiple full
                  stack web applications.
                </li>
                <li>
                  Testing and reports for completed tasks, code reviewing,{' '}
                  <span className="text-pink-400">outsourcing</span> to
                  different projects on demand.
                </li>
                <li>
                  Top Skills: React, Next.js, NestJS, GraphQL, TypeScript,
                  PostgreSQL.
                </li>
              </ul>

              <div className="ml-4 mt-4 flex flex-col">
                <h3 className="profile-subtitle text-pink-400">
                  Outsourcing contracts {' {'}
                </h3>
                <section className="profile-section ml-4">
                  <h3 className="profile-subtitle">
                    <span className="text-blue-400">
                      BRIDGE Management Technologies
                    </span>
                  </h3>
                  <p className="profile-time">August 2023 - Present</p>
                  <ul className="ml-6 list-disc">
                    <li>
                      Bug fixing, maintenance, and development of a full stack
                      web application.
                    </li>
                    <li>
                      Top skills: Java, Spring, PostgreSQL, JavaScript, HTML.
                    </li>
                  </ul>
                </section>
                <section className="profile-section ml-4">
                  <h3 className="profile-subtitle">
                    <span className="text-blue-400">
                      Wunderman Thompson Technology Brasil
                    </span>
                  </h3>
                  <p className="profile-time">
                    May 2023 - July 2023 (3 months)
                  </p>
                  <ul className="ml-6 list-disc">
                    <li>
                      Bug fixing and maintenance of a front end web application.
                    </li>
                    <li>Top skills: React, Redux, TypeScript, Git, Scrum.</li>
                  </ul>
                </section>
                <p className="profile-subtitle text-pink-400">{'}'}</p>
              </div>
              <p className="profile-subtitle text-yellow-200">{'}'}</p>
            </section>

            <section className="profile-section">
              <h3 className="profile-subtitle">
                <span className="text-yellow-200">
                  Freelance Developer{' {'}
                </span>
              </h3>
              <p className="profile-time">Mar 2021 - May 2022</p>

              <ul className="ml-6 list-disc">
                <li>
                  Development of Responsive Landing Pages built with Bootstrap
                  and React
                </li>
                <li>Data Cleaning and formating with Python</li>
                <li>Top Skills: React, Bootstrap, Git, Python</li>
              </ul>
              <p className="profile-subtitle text-yellow-200">{'}'}</p>
            </section>
          </article>

          <article id="education" className="profile-article">
            <h2 className="text-3xl font-bold">Education</h2>
            <section className="profile-section">
              <h3 className="profile-subtitle text-yellow-200">
                Bachelor of Technology - BTech, Computer Systems Analysis at
                SenacRS
              </h3>
              <p className="profile-time">
                2021 - present (graduation in 2024){' '}
              </p>
            </section>
            <section className="profile-section">
              <h3 className="profile-subtitle text-yellow-200">
                Bachelor&apos;s in Civil Engineering at Universidade Federal do
                Rio Grande
              </h3>
              <p className="profile-time">2014 - 2020 (graduated)</p>
            </section>
          </article>
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

function totalTimeSince(date: Date) {
  const now = new Date()
  const timeWorked = now.getTime() - date.getTime()
  const totalMonthsWorked = timeWorked / (1000 * 3600 * 24 * 30)
  const yearsWorked = Math.floor(totalMonthsWorked / 12)
  const monthsWorked = Math.floor(totalMonthsWorked % 12)

  const month = monthsWorked === 1 ? 'month' : 'months'
  const year = yearsWorked === 1 ? 'year' : 'years'
  const time =
    `${yearsWorked} ${year} ` +
    (monthsWorked > 0 ? `and ${monthsWorked} ${month}` : '')
  return time
}

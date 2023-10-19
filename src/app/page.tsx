import NavbarLayout from '@/layouts/navbar'
import Image from 'next/image'

export default function Home() {
  const totalTime = totalTimeSince(new Date('2022-06-01'))

  return (
    <NavbarLayout>
      <main className="mt-6">
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
              </section>
              <section className="profile-section">
                <h3 className="text-xl font-semibold">Contact</h3>
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
                  <li>
                    Linkedin:{' '}
                    <a
                      href="https://www.linkedin.com/in/thor-galli/"
                      className="text-blue-400"
                    >
                      /in/thor-galli
                    </a>
                  </li>
                </ul>
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
              <h3 className="text-xl font-semibold">
                Full Stack Developer at BRIDGE Management Technologies
              </h3>
              <p className="profile-time">August 2023 - Present</p>
              <ul className="ml-6 list-disc">
                <li>Outsourced by Brainny Smart Solutions</li>
                <li>
                  Bug fixing, maintenance, and development of a full stack web
                  application.
                </li>
                <li>Top skills: Java, Spring, PostgreSQL, JavaScript, HTML.</li>
              </ul>
            </section>
            <section className="profile-section">
              <h3 className="text-xl font-semibold">
                Front End Developer at Wunderman Thompson Technology Brasil
              </h3>
              <p className="profile-time">May 2023 - July 2023 (3 months)</p>
              <ul className="ml-6 list-disc">
                <li>Outsourced by Brainny Smart Solutions</li>
                <li>
                  Bug fixing and maintenance of a front end web application.
                </li>
                <li>Top skills: React, Redux, TypeScript, Git, Scrum.</li>
              </ul>
            </section>
            <section className="profile-section">
              <h3 className="text-xl font-semibold">
                Full Stack Developer at Brainny Smart Solutions
              </h3>
              <p className="profile-time">June 2022 - Present</p>
              <ul className="ml-6 list-disc">
                <li>
                  Development, bug fixing, and maintenance of multiple full
                  stack web applications.
                </li>
                <li>
                  Testing and reports for completed tasks, code reviewing,
                  outsourcing to different projects on demand.
                </li>
                <li>
                  Top Skills: React, Next.js, NestJS, GraphQL, TypeScript,
                  PostgreSQL.
                </li>
              </ul>
            </section>
          </article>

          <article id="education" className="profile-article">
            <h2 className="text-3xl font-bold">Education</h2>
            <section className="profile-section">
              <h3 className="text-xl font-semibold">
                Bachelor of Technology - BTech, Computer Systems Analysis at
                SenacRS
              </h3>
              <p className="profile-time">
                March 2022 - present (graduation in 2024){' '}
              </p>
            </section>
            <section className="profile-section">
              <h3 className="text-xl font-semibold">
                Bachelor&apos;s in Civil Engineering at Universidade Federal do
                Rio Grande
              </h3>
              <p className="profile-time">
                March 2014 - December 2020 (graduated)
              </p>
            </section>
          </article>
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

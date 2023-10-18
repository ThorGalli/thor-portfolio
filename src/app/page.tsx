import NavbarLayout from '@/layouts/navbar'
import Image from 'next/image'

export default function Home() {
  const startedWorking = new Date('2022-06-01')
  const now = new Date()
  const timeWorked = now.getTime() - startedWorking.getTime()
  const totalMonthsWorked = timeWorked / (1000 * 3600 * 24 * 30)
  const yearsWorked = Math.floor(totalMonthsWorked / 12)
  const monthsWorked = Math.floor(totalMonthsWorked % 12)

  const month = monthsWorked === 1 ? 'month' : 'months'
  const year = yearsWorked === 1 ? 'year' : 'years'
  const time =
    `${yearsWorked} ${year} ` +
    (monthsWorked > 0 ? `and ${monthsWorked} ${month}` : '')

  return (
    <NavbarLayout>
      <main className="mt-6">
        <div className="mx-auto flex max-w-screen-lg flex-col items-center gap-2 lg:flex-row lg:items-start">
          <div id="self-introduction" className="flex flex-col gap-4">
            <section
              id="greeting"
              className="flex flex-col-reverse items-center gap-4 lg:flex-row"
            >
              <div className="flex flex-col gap-4 text-2xl">
                <p>
                  Hello there, my name is{' '}
                  <span className="text-yellow-400">Thor Galli</span>!
                </p>
                <p>
                  I&apos;m a Full Stack Developer with{' '}
                  <span className="text-yellow-400">{time}</span> of
                  professional experience in Web Development.
                </p>
                <p className="text-sm text-slate-400">
                  ({time} employed + 1 year of freelancing)
                </p>
              </div>
              <Image
                className="mb-2 max-h-[200px] max-w-[200px] rounded-full shadow-[0_0_10px_2px] shadow-yellow-800"
                src="/assets/images/profile-pic.png"
                alt="profile-picture"
                width={200}
                height={200}
                draggable={false}
                style={{ marginBottom: '0.5rem' }}
              />
            </section>
            <section id="about-me" className="flex flex-col gap-4 ">
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
          </div>
        </div>
      </main>
    </NavbarLayout>
  )
}

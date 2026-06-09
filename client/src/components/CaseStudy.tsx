import { useState, useRef } from 'react'

const sections = [
  {
    id: 'introduction',
    label: 'Introduction',
    subsections: [],
  },
  {
    id: 'problem-domain',
    label: 'Problem Domain',
    subsections: [
      { id: 'what-is-observability', label: 'What is Observability?' },
      { id: 'what-are-metrics', label: 'What are Metrics, really?' },
      { id: 'how-are-metrics-stored', label: 'How are Metrics Stored?' },
    ],
  },
  {
    id: 'building-trickl',
    label: 'Building Trickl',
    subsections: [
      { id: 'our-approach', label: 'Our Approach' },
    ],
  },
  {
    id: 'design-decisions',
    label: 'Design Decisions & Tradeoffs',
    subsections: [],
  },
  {
    id: 'future-work',
    label: 'Future Work',
    subsections: [],
  },
]

function IntroductionSection() {
  return (
    <>
      <h2>Introduction</h2>
      <p>
        Trickl is an open-source metrics observability platform built for small development teams
        who want full visibility into their systems without the cost or complexity of managed
        solutions. It bundles a production-ready telemetry pipeline — collection, storage, and
        visualization — and deploys it directly into your own AWS environment in under 30 minutes.
      </p>
      <p>
        On top of the core pipeline, Trickl includes a "Smart Metrics" system that actively monitors
        cardinality growth and surfaces recommendations to keep your time series database lean. This
        case study walks through why we built it, how it works, and the decisions we made along the way.
      </p>
    </>
  )
}

function ProblemDomainSection() {
  return (
    <>
      <h2>Problem Domain</h2>

      <h3 id="what-is-observability">What is Observability?</h3>
      <p>
        After an application transitions from development to production, and grows in complexity
        and/or traffic, troubleshooting becomes increasingly more challenging. Bugs that you weren't
        aware of come into focus, and inefficiencies are highlighted when the system is under
        increased stress. In order to meaningfully deduce the root causes of what you're
        investigating, you need empirical evidence, i.e. data about the system that a developer may
        use to analyse problems.
      </p>
      <p>
        Telemetry data is typically emitted in the form of logs, metrics, and traces, which provide
        teams with valuable insight into how their system is operating at any given time across
        different dimensions. Traces follow user requests across different components as they
        propagate through the system; logs are written records of events that occurred; and metrics
        are numerical measurements of behaviour/state collected over time, sort of like vital signs.
      </p>
      <p>
        Good observability practices allow you to optimize your system and improve user experience,
        while streamlining the discovery process that is involved in identifying bottlenecks or bugs.
      </p>
      <p>
        Conversely, poor observability practices can degrade the user experience over time (as you
        fail to rectify bottlenecks and bugs in your burgeoning system in a timely manner).
        Additionally, if your observability implementation is done haphazardly, you'll now have a
        second, cumbersome system to take care of.
      </p>

      <h3 id="what-are-metrics">What are Metrics, really?</h3>
      <p>Metrics define the scope of this platform.</p>
      <p>
        Metrics measure the numerical state of a system over time. They are your system's vital
        signs (often appearing on dashboards that look like electrocardiograms). When queried
        effectively, they provide critical insight into identifying performance issues, and
        understanding system behaviours; equipping developers to make decisions that will improve
        system performance.
      </p>
      <div className="cs-placeholder">Image: A typical metric graph</div>
      <p>
        Every engineering team's observability needs are different, but certain metrics are
        universally important.
      </p>
      <ul>
        <li><strong>Latency</strong>; the time it takes for data to travel from one point to another.</li>
        <li><strong>Traffic</strong>; the volume of requests or transactions a system can/is processing.</li>
        <li><strong>Errors</strong>; information about failed requests or processes.</li>
        <li><strong>Saturation</strong>; monitoring resource utilization.</li>
      </ul>
      <p>
        Instrumenting your applications to produce these metrics is, however, only part of the
        challenge. Once your system begins emitting metrics, these samples need to be transported
        and stored in an appropriate manner, while remaining affordable as the system grows. At any
        point in time the volume of emitted samples can spike (for reasons we'll explain later) in
        such a way as to overwhelm your storage solution; if this were to occur during a critical
        time, your discovery process will be impeded, if not outright halted.
      </p>
      <div className="cs-placeholder">Quotes &amp; statistics: the cost of managed observability</div>

      <h3 id="how-are-metrics-stored">How are Metrics Stored?</h3>
      <p>
        Metrics are composed of the metric's name, its labels (which are a set of key value pairs),
        and an arbitrary numerical value which represents a measurement of a given type, at a
        specific time. Knowing how much memory is being used at any given time tells you something,
        but without the context of knowing how memory usage has changed over the past minute, hour,
        day or week, that single value is of little use. A time-series is a sequence of a particular
        label set for a metric (and its value) tracked over time. Therefore, every distinct
        combination of a metric name and its labels produces a separate time series to be stored and
        tracked; these time-series are what you usually see displayed on a dashboard. To store and
        query time-series data efficiently, you use a time-series database (TSDB), which tracks the
        changing values for that particular time-series chronologically. TSDBs are built in such a
        way that they can efficiently ingest, store and query large amounts of timestamped, numerical
        data points, making them the obvious choice for the observation of metrics.
      </p>
      <div className="cs-placeholder">Image: The shape of typical time-series data</div>
      <p>
        As you'll see, even if you've instrumented your apps thoughtfully and have chosen an
        optimised, deliberate storage solution, you can run into significant issues.
      </p>
    </>
  )
}

function BuildingTricklSection() {
  return (
    <>
      <h2>Building Trickl</h2>

      <h3 id="our-approach">Our Approach</h3>
      <p>
        Trickl aims to sit somewhere between Managed OSS Platform and Self-Hosted OSS Tools by
        assisting small development teams in setting up their own self-hosted OSS platform.
        Normally this process could take weeks, but with Trickl, the entire process is complete
        in 30 minutes. The user provides their AWS information, and Trickl provisions all the
        services needed on a VPS right in their own AWS environment.
      </p>
      <p>
        On top of assisting the user with the setup process, Trickl also adds a Cardinality
        Control system, "Smart Metrics", to mitigate Cardinality Explosion. By reviewing the
        queries made in Grafana by the user and the volume of time series being created by a
        single metric, our Smart Metrics system is able to make recommendations to the user
        where they could reduce Cardinality in their Time Series Database.
      </p>
    </>
  )
}

function DesignDecisionsSection() {
  return (
    <>
      <h2>Design Decisions &amp; Tradeoffs</h2>
      <p>Coming soon.</p>
    </>
  )
}

function FutureWorkSection() {
  return (
    <>
      <h2>Future Work</h2>
      <p>Coming soon.</p>
    </>
  )
}

const sectionComponents: Record<string, React.FC> = {
  'introduction': IntroductionSection,
  'problem-domain': ProblemDomainSection,
  'building-trickl': BuildingTricklSection,
  'design-decisions': DesignDecisionsSection,
  'future-work': FutureWorkSection,
}

function CaseStudy() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const goToSection = (index: number) => {
    setCurrentIndex(index)
    contentRef.current?.scrollTo({ top: 0 })
  }

  const section = sections[currentIndex]
  const SectionContent = sectionComponents[section.id]
  const nextSection = sections[currentIndex + 1] ?? null

  return (
    <div className="case-study-layout">
      <nav className="case-study-sidenav">
        <ul>
          {sections.map((s, i) => (
            <li key={s.id}>
              <button
                className={`sidenav-btn${i === currentIndex ? ' active' : ''}`}
                onClick={() => goToSection(i)}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main ref={contentRef} className="case-study-content">
        <SectionContent />

        {nextSection && (
          <button className="next-section-card" onClick={() => goToSection(currentIndex + 1)}>
            <span className="next-section-label">Next</span>
            <span className="next-section-title">
              {nextSection.label} <span className="next-section-arrow">→</span>
            </span>
          </button>
        )}
      </main>

      {section.subsections.length > 0 && (
        <aside className="case-study-on-this-page">
          <p className="on-this-page-title">On this page</p>
          <ul>
            {section.subsections.map(sub => (
              <li key={sub.id}>
                <a href={`#${sub.id}`}>{sub.label}</a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  )
}

export default CaseStudy

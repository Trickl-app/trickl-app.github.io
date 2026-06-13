import { useState, useRef } from 'react'
import typicalMetricsDashboard from '../assets/typical_metrics_dashboard.png'
import telemetry from '../assets/telemetry.png'
import cardinalityExplosionGraph from '../assets/cardinality_explosion_graph.png'
import basicBackend from '../assets/basic_backend.gif'

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
      { id: 'what-is-telemetry', label: 'What is Telemetry?' },
      { id: 'why-are-metrics-important', label: 'Why are metrics important?' },
      { id: 'how-are-metrics-stored', label: 'How are Metrics Stored?' },
    ],
  },
  {
    id: 'domain-challenges',
    label: 'Domain Challenges',
    subsections: [
      { id: 'platform-implementation', label: 'Platform Implementation' },
      { id: 'what-is-cardinality', label: 'What is Cardinality?' },
      { id: 'cardinality-control', label: 'Cardinality Control' },
      { id: 'observability-landscape', label: 'The Metrics Observability Landscape' },
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
        Trickl is an open-source, scalable metrics observability platform, with built-in cardinality
        control measures for small-to-medium sized development teams.
      </p>
      <p>
        It automates the provisioning and configuration of a self-managed metrics backend on AWS,
        simplifying setup and reducing ongoing operational burden.
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
        As an application transitions from development to production and complexity and traffic begin to grow,
        troubleshooting becomes increasingly more challenging. Previously unknown bugs become apparent, and
        inefficiencies are highlighted when the system is placed under increased stress. In order to meaningfully
        deduce the root causes and preemptively identify potential issues, empirical evidence is required (i.e. data)
        to drive investigation. Naturally, this data would be emitted from (or alongside) the application itself.
        Observability is the collection and analysis of this data. A good rule of thumb to measure the efficacy of
        an observability implementation is if it allows one to understand any system state the application may have
        produced (even ones that couldn’t be predicted), without having to understand or update the internal state
        of the system being observed (i.e. without changing the code).
      </p>
      <div className="cs-stat-callout">
        <span className="cs-stat-number">76%</span>
        <p className="cs-stat-text">fewer hours resolving system outages.<br/> - Organizations with full-stack observability vs. those without.</p>
        <span className="cs-stat-source">2024 New Relic Observability Study</span>
      </div>
      <p>
        By following best practices when it comes to observability, you can optimize your system and improve user
        experience, while streamlining the discovery process for identifying bottlenecks or bugs.
      </p>
      <p>
        Failure to implement proper observability practices can result in a degraded user experience and lead to
        a chain of hard-to-diagnose issues, leaving your system brittle and broken. ITIC’s 2024 survey found that
        over 90% of midsize and large enterprises put the cost of an hour of downtime above $300,000, and for
        smaller businesses more than $10,000 per hour.
      </p>

      <h3 id="what-is-telemetry">What is Telemetry?</h3>
      <p>
        In this context, telemetry data refers to the information that is continuously emitted by your systems
        and its supporting infrastructure as they run.
      </p>
      <figure className="cs-figure">
        <img src={telemetry} alt="The three pillars of telemetry: logs, metrics, and traces" className="cs-image cs-image--half" />
      </figure>
      <p>
        Telemetry data is typically emitted in the form of logs, metrics, and traces, which provide teams with
        valuable insight into how their system is operating at any given time. Traces follow user requests across
        different components as they propagate through the system; logs are written records of events that occurred;
        and metrics are numerical measurements of behaviour/state collected over time, sort of like vital signs.
      </p>
      <p>
        Metrics are generally considered to be the base unit of observability; they are disposable, have a
        predictable storage footprint, and may be aggregated at query time to better serve the end user. They are
        the most visualizable of the types of data thus far mentioned, which is why they are often the first signal
        an organization configures their applications to emit.
      </p>
      <figure className="cs-figure">
        <img src={typicalMetricsDashboard} alt="A typical metrics dashboard" className="cs-image cs-image--three-quarter" />
        <figcaption className="cs-caption">A typical metrics dashboard. Latency, error rate, and request volume displayed as time-series graphs.</figcaption>
      </figure>

      <h3 id="why-are-metrics-important">Why are metrics important?</h3>
      <p>
        When queried effectively, metrics provide critical insight into identifying performance issues, and
        understanding system behaviours; equipping developers to make decisions that will improve system performance.
      </p>
      <div className="cs-stat-callout">
        <span className="cs-stat-number">95%</span>
        <p className="cs-stat-text">of organizations rely on metrics, more than any other telemetry type, ahead of logs (87%) and traces (57%).</p>
        <span className="cs-stat-source">Grafana Labs Observability Survey, 1,255 practitioners</span>
      </div>
      <p>
        Every engineering team’s observability needs are different, but certain metrics are universally important.
      </p>
      <ul>
        <li><strong>Latency</strong>: the time it takes for data to travel from one point to another.</li>
        <li><strong>Traffic</strong>: the volume of requests or transactions a system can/is processing.</li>
        <li><strong>Errors</strong>: information about failed requests or processes.</li>
        <li><strong>Saturation</strong>: monitoring resource utilization.</li>
      </ul>
      <h4>How are metrics produced?</h4>
      <p>
        In order for an application to begin emitting metrics and other observability data, it first needs to be
        instrumented. Instrumentation of an application is the process of adding code, agents, or another monitoring
        implementation into the application, such that it emits telemetry data. The emerging standard for
        instrumentation is OpenTelemetry (OTel). OTel instrumentation may be automatic (where their instrumentation
        SDK hooks into supported libraries and code within the application, in order to emit telemetry signals with
        minimal code changes); or it may be manual, where a developer can (among other things) define specific
        attributes to be emitted in the telemetry signal they’re building, via OTel’s SDK or APIs.
      </p>
      <p>
        Instrumenting your applications to produce these metrics is only part of the challenge. Once your system
        begins emitting metrics, these samples need to be transported and stored in a manner that preserves their
        time-based nature. This storage solution needs to remain stable and affordable as the system grows; factors
        that contribute to cost include the infrastructure hosting the solution, as well as the time developers spend
        maintaining it. At any point in time the volume of emitted samples may spike in such a way as to overwhelm
        your storage solution; this may be caused by a surge in traffic to your application, or a change in its
        instrumentation. If this were to occur during a critical time, your discovery process is likely to stop
        working altogether, resulting in the loss of critical data when needed most.
      </p>

      <h3 id="how-are-metrics-stored">How are Metrics Stored?</h3>
      <p>
        Metrics are composed of the metric’s name, its labels (which are a set of key value pairs), and an
        arbitrary numerical value which represents a measurement of a given type, at a specific time. Knowing how
        much memory is being used at any given time tells you something, but without the context of knowing how
        memory usage has changed over the past minute, hour, day or week, that single value is of little use. A
        time-series is a sequence of a particular label set for a metric (and its value) tracked over time.
        Therefore, every distinct combination of a metric name and its labels produces a separate time series to
        be stored and tracked; these time-series are what you usually see displayed on a dashboard. To store and
        query time-series data efficiently, you use a time-series database (TSDB), which tracks the changing values
        for that particular time-series chronologically. TSDBs are built in such a way that they can efficiently
        ingest, store and query large amounts of timestamped, numerical data points, making them the obvious choice
        for the observation of metrics.
      </p>
      <div className="cs-placeholder">Image: The shape of typical time-series data</div>
      <p>
        However, even if you’ve instrumented your apps thoughtfully and have chosen an optimised, deliberate
        storage solution, you can run into significant issues.
      </p>
    </>
  )
}

function DomainChallengesSection() {
  return (
    <>
      <h2>Domain Challenges</h2>

      <h3 id="platform-implementation">Platform Implementation</h3>
      <p>
        An observability platform, sometimes referred to as a backend pipeline, generally requires at minimum an
        ingestion point and a TSDB; most TSDBs expose a UI to query data, but in order to actually create
        visualizations over time, a separate visualization component is required.
      </p>
      <p>
        Metrics may flow from an instrumented app to an observability platform in two ways. They may be
        pulled/scraped by a component in the pipeline, or pushed (by an agent running alongside the source
        application) to a component in the pipeline. In the push-style model, a collector accepts emitted metrics
        and forwards the samples to the TSDB for storage. The data is then exposed through a visualization layer
        for querying and tracking, which is where a developer may choose to implement dashboards.
      </p>
      <p>
        Each component in the pipeline introduces its own unique operational concerns. First, a decision must be
        made at each stage regarding which dependency to incorporate. After those choices have been made, the next
        hurdle is the configuration overhead. The chosen collector must be configured to receive and forward samples
        reliably; and the TSDB must be sized appropriately, potentially configured to scale if the need should
        arise, such that the query layer remains responsive when the data grows beyond your expectations.
      </p>
      <figure className="cs-figure">
        <img src={basicBackend} alt="A basic metrics observability backend pipeline" className="cs-image" />
      </figure>
      <p>
        This is, of course, an over-simplified model — but the point stands: building a metrics pipeline means
        orchestrating and synchronizing several complex dependencies, each one introducing a new point of failure
        if misconfigured or poorly provisioned.
      </p>
      <p>
        Even a well provisioned pipeline can quickly become unstable. For instance, if an app's metrics are
        unknowingly instrumented with unbounded labels (labels with an indeterminate number of values that tend to
        grow with the system over time, often directly correlated with the app's traction), this causes metric
        cardinality to spike, which may be catastrophic for the TSDB.
      </p>

      <h3 id="what-is-cardinality">What is Cardinality?</h3>
      <p>
        We can define cardinality as the number of unique combinations that are possible for a given metric and
        its label set; therefore, cardinality is a measurement of the number of time-series produced by a metric.
      </p>
      <div className="cs-placeholder">Image: cardinality diagram</div>
      <p>
        The above metric, <code>http_requests_total</code>, has 2 labels: <code>instance</code> and{' '}
        <code>status</code>. Instance has 2 potential values, while status has 3. These can be combined in any
        way possible; therefore the cardinality is 2 × 3 = 6. This is a very limited example; in reality the
        unique combinations of labels often exceeds this and may continue to increase with the addition of labels
        that have an unbounded quantity, such as a <code>request_id</code> label. Since a new value for this
        label is generated for each request, that results in a new time-series for whichever metric incorporates
        it. Unbounded labels are almost always a unique identifier of something or someone in the system — for
        example, a user ID.
      </p>
      <p>
        To give an example, let's say you run a service with 10,000 users. Your service tracks the status code of
        each request (5 possible values), 10 URL paths, and runs on servers across 2 regions. A developer
        instruments the application to produce a metric called <code>http_requests_total</code>, with all of
        these details included as labels:
      </p>
      <pre><code>{`http_requests_total{
  user_id="1",
  url_path="/api/example",
  status_code="200",
  region="us-east-1"
} 1`}</code></pre>
      <p>
        Assuming all combinations are possible, the cardinality of this metric would be
        10,000 × 10 × 5 × 2 = 1,000,000. For 10,000 users and just three other relatively benign labels,
        you'd have 1,000,000 time-series to keep track of.
      </p>
      <p>
        In the situation where you have instrumented an application to emit a metric containing an unbounded label
        such as <code>user_id</code>, the number of possible time-series will grow in parallel with the
        application's traffic. As the user count grows, values are not simply attributed to existing time-series;
        instead, each new combination of labels creates a new time-series.
      </p>
      <p>
        This rapid growth in the number of time-series is known as a <strong>cardinality explosion</strong>. As a
        result of this rapid influx of data through the pipeline, your TSDB must maintain more indexing
        structures, in-memory state, and metadata associated with each series. If your TSDB isn't provisioned to
        handle this increased memory burden, your query layer becomes vastly less responsive — making it difficult
        to track metrics and, in extreme cases, borderline impossible to use. In their 2025 observability study,
        Grafana identified cardinality spikes as a common source of increased resource usage, memory pressure, and
        system instability.
      </p>
      <p>
        In particular, significant explosion incidents result in an out-of-memory error, causing your
        observability stack to come to a grinding halt. Without cardinality control measures, your infrastructure
        will need to scale its storage and compute structures to accommodate the surge, resulting in greater costs.
      </p>
      <figure className="cs-figure">
        <img src={cardinalityExplosionGraph} alt="Cardinality explosion graph" className="cs-image" />
        <figcaption className="cs-caption">An initial moderate flow of time-series data rapidly undergoing a cardinality explosion at approximately 14:50.</figcaption>
      </figure>

      <h3 id="cardinality-control">Cardinality Control</h3>
      <p>
        Preventing cardinality from becoming unwieldy is an important and often altogether neglected part of the
        observability pipeline. A certain label may not be useful today, but could be of paramount importance when
        high-resolution data is needed to debug an issue. For example, a pod ID label can demonstrate that all
        metrics which contain a crash error are associated with a given set of pods in a Kubernetes cluster;
        without that added dimension, bug resolution becomes increasingly difficult — if not outright impossible —
        without peering directly into the system. Being able to control these dimensions ad hoc allows a developer
        to maintain pipeline stability without sacrificing granularity during critical periods. It also avoids the
        pitfalls of adjusting app instrumentation, which can be a slow and cumbersome process when comprehensive
        CI/CD practices are in place.
      </p>

      <h3 id="observability-landscape">The Metrics Observability Landscape</h3>
      <p>
        Engineering teams are presented with several options to tackle these challenges, each of which comes with
        its own set of tradeoffs.
      </p>
      <h4>End-to-End Managed Platforms</h4>
      <p>
        End-to-end managed platforms such as Datadog, New Relic, and Dynatrace own and manage the entire
        observability pipeline. These platforms are composed of proprietary software; their pipelines (and
        required instrumentation of your apps) are simple, and come with a rich set of features as well as
        industry-leading support. You do, however, pay large costs which scale with usage and can reach
        eye-watering amounts when you produce enough telemetry data. Platforms like these often lead to vendor
        lock-in, making egress difficult, if not impossible.
      </p>
      <h4>Managed OSS Platforms</h4>
      <p>
        Managed OSS platforms such as Grafana Cloud and Chronosphere provide experiences similar to E2E managed
        platforms, but are typically comprised of open-source components rather than proprietary ones (though
        mixed models exist, e.g. Grafana Cloud's adaptive telemetry service). Since they're built on open-source
        components, you're not locked into a proprietary data format, nor peering into a completely abstracted
        black box — and so you could, in theory, create your own platform using similar tools and migrate while
        retaining historical data. However, your data still lives on the vendor's servers, and you pay ongoing
        usage fees that scale with the volume of your telemetry data.
      </p>
      <h4>Self-Hosted OSS Tools</h4>
      <p>
        Self-hosted OSS components such as Prometheus, Mimir, VictoriaMetrics, Grafana, and OpenTelemetry
        Collector are all production-grade and may be carefully stitched together to yield a suitable platform.
        The provisioning process is no small challenge: each component must be configured, performance settings
        tuned, everything wired together, and the system maintained indefinitely — and that's just bare metal. A
        cloud deployment adds the overhead of translating all of that into cloud infrastructure. The setup process
        can take weeks, and the burdens don't end at deployment; your team must consider scaling, upgrades, and
        platform incident responses. You do end up with complete data ownership, personalised flexibility, and
        very little cost beyond the infrastructure hosting the platform. For teams that require strict data
        ownership — whether for compliance or otherwise — a self-hosted platform is often the only viable solution.
      </p>
      <p>
        If a self-hosted implementation is considered ideal, there is another hurdle to conquer: implementing
        cardinality control. There are very few, if any, open-source implementations of cardinality control
        measures comparable to Grafana Adaptive Telemetry — wherein their adaptive metrics service can detect
        unused labels among existing time-series and recommend them as targets to drop or aggregate. A team would
        have to reverse-engineer these features from scratch, requiring a solid understanding of time-series data,
        the ability to leverage component APIs, and a pipeline that supports adding or removing rules ad hoc
        without disrupting sample ingestion.
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
  'domain-challenges': DomainChallengesSection,
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

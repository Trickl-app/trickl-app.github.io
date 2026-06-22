import { useState, useRef, useEffect } from 'react'
import typicalMetricsDashboard from '../assets/typical_metrics_dashboard.png'
import cardinalityExplosionGraph from '../assets/cardinality_explosion_graph.png'
import basicBackend from '../assets/basic_backend.gif'
import timeSeriesEx from '../assets/time-series-ex.png'
import exampleTimeseriesDist from '../assets/example-timeseries-dist.png'
import tricklLandscapeComparison from '../assets/trickl-landscape comparison.png'
import smartmetricsPipelinelight from '../assets/full-arch-light.png'
import smartmetricsPipelinedark from '../assets/full-arch-dark.png'
import vmagentArch from '../assets/vmagent-arch.png'
import statefulStateless from '../assets/stateful-stateless.png'
import promQLQuery from '../assets/promQLQuery.png'
import grafanaVm from '../assets/grafana-vm.gif'
import sms from '../assets/sms.png'
import nodeArch from '../assets/node-arch.png'
import cloudwatch from '../assets/cloudwatch.png'
import tsdbcomp from '../assets/tsdbcomp.png'

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
    label: 'Building the Platform',
    subsections: [
      { id: 'our-approach', label: 'Our Approach' },
      { id: 'metrics-pipeline', label: 'Metrics Observability Pipeline' },
      { id: 'smart-metrics-service', label: 'Smart Metrics Service' },
      { id: 'cloud-infrastructure', label: 'Cloud Infrastructure' },
      { id: 'observing-observability', label: 'Observing Observability' },
    ],
  },
  {
    id: 'design-decisions',
    label: 'Design Decisions & Tradeoffs',
    subsections: [
      { id: 'tsdb', label: 'TSDB' },
      { id: 'long-term-retention', label: 'Long Term Retention' },
      { id: 'automation', label: 'Automation' },
      { id: 'llms-in-cardinality', label: 'LLMs in Cardinality Management' },
    ],
  },
  {
    id: 'future-work',
    label: 'Future Work',
    subsections: [
      { id: 'fw-infrastructure', label: 'Infrastructure' },
      { id: 'fw-cicd', label: 'CI / CD' },
      { id: 'fw-smart-metrics', label: 'Smart-Metrics Service' },
    ],
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
        troubleshooting becomes increasingly more challenging. Placing the system under increased stress exposes 
        previously unknown bugs and uncovers inefficiencies. To find root causes and predict future issues, 
        investigators need empirical data. Naturally, this data would be emitted from (or alongside) the application itself. 
      </p>
      <p>
        Observability is the collection and analysis of this data. A good rule of thumb to measure the efficacy of an 
        observability implementation is if it allows one to understand any system state the application may have produced
         (even ones that couldn’t be predicted), without having to understand or update the internal state of the system 
         being observed (i.e. without changing the code). 
      </p>
      <p>
        By following best practices when it comes to observability, the system can be optimized (improving user experience),
         while streamlining the discovery process for identifying bottlenecks or bugs. 
      </p>
      <div className="cs-stat-callout">
        <span className="cs-stat-number">76%</span>
        <p className="cs-stat-text">fewer hours resolving system outages.<br/> - Organizations with full-stack observability vs. those without.</p>
        <span className="cs-stat-source">2024 New Relic Observability Study</span>
      </div>
      <p>
        Failure to implement proper observability practices can result in a degraded user experience and lead to a chain
         of hard-to-diagnose issues, leaving the observed system brittle and broken. ITIC's 2024 survey found that over 90% of
          midsize and large enterprises put the cost of an hour of downtime above $300,000, and for smaller businesses
           more than $10,000 per hour. 
      </p>

      <h3 id="what-is-telemetry">What is Telemetry?</h3>
      <p>
        In this context, telemetry data refers to the information that is continuously emitted by observed systems
        and their supporting infrastructure as they run.
      </p>
      <p>
        Telemetry data is typically emitted in the form of logs, metrics, and traces, which provide teams with valuable 
        insight into how their system is operating at any given time. 
        <ul>
          <li>Traces follow user requests across different components as they propagate through the system.</li>  
          <li>Logs are written records of events that occurred.</li>
          <li>Metrics are numerical measurements of behaviour/state collected over time, sort of like vital signs.</li> 
        </ul>
      </p>
      <figure className="cs-figure">
        <img src={typicalMetricsDashboard} alt="A typical metrics dashboard" className="cs-image cs-image--three-quarter" />
        <figcaption className="cs-caption">A typical metrics dashboard. Latency, error rate, and request volume displayed as time-series graphs.</figcaption>
      </figure>
      <p>
        Metrics are generally considered to be the base unit of observability; they are disposable, have a predictable
        storage footprint, and may be aggregated at query time to better serve the end user. Since metrics are a
        measurement over time, they are a natural fit to display on graphs or charts where one of the axes is
        time; as such, they are often the first signal an organization configures their applications to emit,
        in order to visualize changes in application state over time.
</p>


      <h3 id="why-are-metrics-important">Why are metrics important?</h3>
      <p>
        When queried effectively, metrics provide critical insight into performance issues and system behaviors;
        equipping developers to make decisions that will improve system performance. 
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
        <li><strong>Latency</strong>: The delay between an action and its response.</li>
        <li><strong>Traffic</strong>: The volume of requests or transactions a system can/is processing.</li>
        <li><strong>Errors</strong>: Information about failed requests or processes.</li>
        <li><strong>Saturation</strong>: Monitoring resource utilization.</li>
      </ul>
      <h4>How are metrics produced?</h4>
      <p>
        In order for an application to begin emitting metrics and other observability data, it first needs to be 
        instrumented. Instrumentation of an application is the process of adding code, agents, or other monitoring 
        implementations into the application, such that it emits telemetry data. The modern standard for instrumentation 
        is OpenTelemetry (OTel). OTel instrumentation may be automatic (where their instrumentation SDK hooks into 
        supported libraries and code within the application, in order to emit telemetry signals with minimal code 
        changes); or it may be manual, where a developer can (among other things) define specific attributes to be 
        emitted in the telemetry signal they’re building, via OTel’s SDK or APIs. OTel metrics are exported using the OpenTelemetry
        Protocol (OTLP), and are referred to as such.
      </p>
      <p>
        Instrumenting applications to produce these metrics is only part of the challenge. Once the system begins
        emitting metrics, these samples need to be transported and stored in a manner that preserves their time-based
        nature. This storage solution needs to remain stable and affordable as the system grows. Factors that contribute
        to cost include the infrastructure hosting the solution, as well as the time spent maintaining it. At any point
        in time the volume of emitted samples may spike in such a way as to overwhelm the observability platform’s storage solution; this may
        be caused by a surge in traffic to the application emitting the metrics, or a change in its instrumentation. If this occurred
        during an outage or unexpected incident, discovery processes are likely to stop working altogether, resulting
        in the loss of critical data when it’s needed most.
      </p>

      <h3 id="how-are-metrics-stored">How are Metrics Stored?</h3>
      <p>
        Metrics are composed of the metric’s name, its labels (which are a set of key value pairs), and a numerical
        value which represents a measurement of a given type, at a specific time. Knowing how much memory is being
        used at any given time tells a developer something, but without knowing how memory usage has changed over the past
        minute, hour, day or week, that single value is of little use. A time-series is a sequence of a particular
        label set for a metric (and its value) tracked over time.
      </p>

      <figure className="cs-figure">
        <img src={timeSeriesEx} alt="A time-series example" className="cs-image" />
        <figcaption className="cs-caption">Memory usage (MB) tracked over 24 hours for a single time-series, identified by its label set.</figcaption>
      </figure>

      <p>
        Therefore, every distinct combination of a metric
        name and its labels produces a separate time-series to be stored and tracked; these time-series are what are usually displayed on a dashboard. To store and query time-series data efficiently requires a time-series
        database (TSDB), which tracks the changing values for that particular time-series chronologically. TSDBs are
        built in such a way that they can efficiently ingest, store and query large amounts of timestamped, numerical
        data points, making them the obvious choice for the observation of metrics. Each new time series requires new index entries and new memory structures to maintain (in order to store metadata and in-memory state); the
        storage engine has to manage each new series as if it were an independent stream. As such, memory acts as one of the
        primary constraints for TSDBs.
      </p>
      <p>
        However, even if apps have been instrumented thoughtfully and an optimised, deliberate storage solution
        has been chosen, significant issues may still emerge.
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
        An observability platform generally requires at minimum, an ingestion point and a TSDB; most TSDBs expose 
        a UI to query data, but in order to actually create visualizations over time, a separate visualization component is required.
      </p>
      <p>
        Metrics may flow from an instrumented app to an observability platform in two ways. They may be pulled/scraped by a 
        component in the pipeline, or pushed (by an agent running alongside the source application) to a component in the pipeline. 
        In the push-style model, metrics are pushed from the source application to an external collector, which then forwards the 
        samples to the TSDB for storage. The data is then exposed through a visualization layer for querying and tracking, which 
        is where a developer may choose to implement dashboards.
      </p>
      <p>
        Each component in the pipeline introduces its own unique operational concerns. First, a decision must be made at each 
        stage regarding which dependency to incorporate. After those choices have been made, the next hurdle is the configuration 
        overhead. The chosen collector must be configured to receive and forward samples reliably; and the TSDB must be sized 
        appropriately, potentially configured to scale if the need should arise, such that the query layer remains responsive 
        when the data grows beyond initial expectations.
      </p>
      <figure className="cs-figure">
        <img src={basicBackend} alt="A basic metrics observability backend pipeline" className="cs-image" />
        <figcaption className="cs-caption">A basic metrics observability pipeline. Instrumented applications push telemetry to a collector, which forwards it to a time-series database for storage and querying via a visualization layer.</figcaption>
      </figure>
      <p>
        This is an over-simplified model but the general point remains; building a metrics pipeline means orchestrating 
        and synchronizing several complex dependencies, each one introducing a new point of failure if misconfigured or 
        poorly provisioned. 
      </p>
      <p>
        Even a well provisioned pipeline can quickly become unstable. One of the most common ways that an observability platform 
        can become unstable is through metric cardinality explosion.
      </p>

      <h3 id="what-is-cardinality">What is Cardinality?</h3>
      <p>
        Cardinality may be defined as the number of unique combinations (not permutations; ordering doesn’t matter) that are 
        possible for a given metric and its label set; therefore, cardinality is a measurement of the number of time-series 
        produced by a metric.
      </p>
      <figure className="cs-figure">
        <img src={exampleTimeseriesDist} alt="Example time-series cardinality distribution" className="cs-image" />
        <figcaption className="cs-caption">Cardinality as a product of label value combinations for the metric <code>http_requests_total</code>.</figcaption>
      </figure>
      <p>
        The above metric, <code>http_requests_total</code>, has 2 labels: <code>instance</code> and{' '}
        <code>status</code>. Instance has 2 potential values, while status has 3. These can be combined in any
        way possible; therefore the cardinality is 2 × 3 = 6. This is a very limited example; in reality the
        unique combinations of labels often vastly exceeds this and may continue to increase with the addition of labels
        that have an unbounded quantity, such as a <code>request_id</code> label. Since a new value for this
        label is generated for each request, that results in a new time-series for whichever metric incorporates
        this label. Unbounded labels are almost always a unique identifier of something or someone in the system — for
        example, a user ID.
      </p>
      <p>
        To give an example, let’s say there is a service that has 10,000 users. This service may take into
        consideration the status code of the request a user has made (5 possible options). It also
        has 10 url paths, and the service runs on servers in 2 different regions. A developer instruments
        this service’s application/s to produce a metric called <code>http_requests_total</code>, with all of these details
        included as different labels.
      </p>
      <figure className="cs-figure">
        <pre><code>{`http_requests_total{
  user_id="1",
  url_path="/api/example",
  status_code="200",
  region="us-east-1"
} 1`}</code></pre>
        <figcaption className="cs-caption">A single sample of <code>http_requests_total</code> with four labels, each contributing a dimension to the metric's cardinality.</figcaption>
      </figure>
      <p>
        Assuming all combinations are possible, the cardinality of this metric would be
        10,000 × 10 × 5 × 2 = 1,000,000. So for 10,000 users, and about 3 other relatively benign labels,
        there'd be 1,000,000 time-series to keep track of.
      </p>
      <p>
        In the situation where someone has instrumented an application to emit a metric that contains an unbounded label
        such as <code>user_id</code>, the number of possible time-series will grow in parallel to an increase in
        the application's traffic. As the user count grows, values are not simply attributed to existing time-series;
        instead, each new combination of labels will create a new time-series.
      </p>
      <p>
        This surge in the number of distinct time-series is known as a <strong>cardinality explosion</strong>. As a result of this rapid 
        influx of new series through the pipeline, the TSDB will consume much more memory, due to index-structure 
        expansion for each new time-series, as well as the storage of in-memory metadata. A cardinality explosion’s 
        memory burden is distinct from spikes in existing series, since existing series don’t expand the index footprint 
        of the TSDB, nor do they introduce new metadata.
      </p>
      <p>
        If a TSDB isn’t provisioned to deal with this increased memory burden, then an observability platform’s query layer becomes vastly
        less responsive, making it difficult to track metrics and in extreme cases, borderline impossible to use. In 
        their 2025 observability study, Grafana identified cardinality spikes as a common source of increased resource 
        usage, memory pressures, and system instability.
      </p>
      <p>
        In particular, significant explosion incidents result in an out-of-memory error, which will cause an observability
        stack to come to a grinding halt. In order to account for an incident of this magnitude without cardinality control
        measures, the infrastructure will need to scale its storage and compute structures, resulting in greater costs.
      </p>
      <figure className="cs-figure">
        <img src={cardinalityExplosionGraph} alt="Cardinality explosion graph" className="cs-image" />
        <figcaption className="cs-caption">An initial moderate flow of time-series data rapidly undergoing a cardinality explosion at approximately 14:50.</figcaption>
      </figure>

      <h3 id="cardinality-control">Cardinality Control</h3>
      <p>
        Preventing cardinality from becoming unwieldy is an important and often neglected part of the observability pipeline. 
        A certain label may not be useful today, but could be of paramount importance when high-resolution data is needed 
        to debug an issue. For example, a pod ID label can demonstrate that all metrics which contain a crash error label 
        are associated with a given set of pods in a Kubernetes cluster. Without that added dimension to the metric, bug 
        resolution becomes increasingly difficult if not outright impossible without peering into the system. Being able 
        to control these dimensions ad hoc allows a developer to maintain pipeline stability without sacrificing granularity 
        during critical periods. It also avoids all the pitfalls of having to adjust app instrumentation, which can be a 
        slow and cumbersome process.
      </p>

      <h3 id="observability-landscape">The Metrics Observability Landscape</h3>
      <p>
        Engineering teams have several options to tackle these challenges; each of which comes with
        its own set of tradeoffs.
      </p>
      <h4>End-to-End Managed Platforms</h4>
      <p>
        End-to-End (E2E) managed platforms such as Datadog, New Relic, and Dynatrace, own and manage the entire 
        observability pipeline. These platforms are composed of proprietary software; their pipelines (and required 
        instrumentation of your apps) are simple to set up, and come with a rich set of features, as well as industry 
        leading support. Users must pay large costs which scale with usage, and can reach eyewatering amounts
        when enough telemetry data is produced.  Platforms like these and many others often lead to vendor lock-in, 
        making egress difficult.
      </p>
      <h4>Managed OSS Platforms</h4>
      <p>
        Managed OSS platforms such as Grafana Cloud and Chronosphere provide experiences similar to that of the E2E 
        Managed Platforms, but are typically comprised of open source components rather than proprietary ones 
        (although mixed-models exist e.g. Grafana Cloud’s adaptive telemetry service). Since they’re built on open 
        source components, users aren’t locked into a proprietary data format, nor are they peering into a completely
        abstracted blackbox; and so they could, in theory, create their own platform using similar tools and migrate
        while maintaining historical data. However, the telemetry data still lives on the vendor’s servers for as long as
        the platform is used, and there are ongoing usage fees that scale with the volume of telemetry data produced.
      </p>
      <h4>Self-Hosted OSS Tools</h4>
      <p>
        Self-hosted OSS components such as Prometheus, Mimir, VictoriaMetrics, Grafana, OpenTelemetry Collector, 
        etc, are all production grade, and may be carefully stitched together to yield a suitable platform. Of 
        It is rather challenging to provision the platform; components need to be configured and performance settings tuned;
        the different parts then need to be wired together, and then the platform has to be maintained indefinitely; and that’s
        just bare metal. If cloud deployment is necessary, then all of the previous challenges must also be translated into
        cloud infrastructure. The setup process is cumbersome; it may end up taking weeks, and burdens don’t
        end at deployment; teams will have to consider scaling, upgrades, and platform incident responses.
        The challenge results in complete data ownership, personalised flexibility, and very little cost beyond the
        infrastructure the platform is hosted on. For teams that require strict data ownership, whether that be 
        for data compliance reasons or otherwise, a self-hosted platform is often the only viable solution. 
      </p>
      <p>
        In cases where a self-hosted implementation is preferred, then there is another hurdle to conquer: 
        implementing cardinality control. There are very few, if any, open source implementations of cardinality 
        control measures à la Grafana Adaptive Telemetry; wherein their adaptive metrics service is able to detect 
        unused labels among existing time-series, and recommend them as targets to drop and/or aggregate. A user 
        would have to reverse engineer these features from scratch, which means learning a fair amount about time-series 
        data, and understanding how to leverage component APIs. Then it needs to be decided if the components can support 
        such functionality by leveraging said APIs. Finally, the pipeline has to support the ability to add or remove 
        cardinality control configs ad hoc, without disrupting the ingestion of samples.
      </p>
      <figure className="cs-figure">
        <img src={tricklLandscapeComparison} alt="Trickl landscape comparison" className="cs-image" />
        <figcaption className="cs-caption">A comparison of the metrics observability landscape, positioning Trickl relative to managed and self-hosted alternatives across cost, control, and operational complexity.</figcaption>
      </figure>
    </>
  )
}

function BuildingTricklSection() {
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') ?? 'dark')

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') ?? 'dark')
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <h2>Building the Platform</h2>
      <p>
        Trickl's architecture is composed of two closely related systems; a metrics observability
        pipeline and its Smart-Metrics service.
      </p>
      <figure className="cs-figure">
        <img src={theme === 'dark' ? smartmetricsPipelinedark : smartmetricsPipelinelight} alt="Smart Metrics pipeline diagram" className="cs-image" />
        <figcaption className="cs-caption">An overview of Trickl's architecture.</figcaption>
      </figure>

      <h3 id="metrics-pipeline">Metrics Observability Pipeline</h3>
      <p>
        The lifecycle of a metric as it flows through Trickl's architecture is as follows:
      </p>
      <p>
        An application needs to be instrumented such that it emits OpenTelemetry Protocol (OTLP)
        format metrics, providing Trickl with a consistent structure to receive and process. OTLP
        is the modern standard, and so Trickl prioritises OTLP metrics. An individual
        time-series datum is referred to as a "sample".
      </p>
      <p>
        The first component to receive those metrics is Vector, which acts as Trickl's collector
        gateway. Vector is an open-source data pipeline tool that is able to receive, process, and
        route telemetry data to downstream systems. Vector is used to split the metric
        stream into two paths; a live ingestion path where metrics can be filtered and modified
        (the primary path), and long-term archival storage, where unadulterated metrics are written to
        an S3 bucket.
      </p>
      <p>
        The long-term archive acts primarily as a safeguard. Preserving the original samples
        separately from those in the primary path ensures a consistent source-of-truth exists at
        all times. Samples stored in the primary path can be mutated (since labels can be removed),
        or they can be omitted entirely in the case of aggregation (where metrics are grouped into a
        single value); TSDBs that are not built around object storage tend to have short TTL policies
        to prevent an explosion in storage (since time-series samples are inherently high-volume), and
        so samples can be evicted from the TSDB over time. If a user chooses to drop an unbounded label
        from a metric, and then later decides that that label would provide valuable insight in helping
        resolve a newly discovered issue, then the user can import untainted samples from the archive
        into the TSDB (rather than waiting for new samples to accumulate). It also allows a user to
        view long term metrics (for example, to view seasonal trends in user activity) where they
        otherwise couldn't due to the TSDB's TTL policy.
      </p>

      <h4>TSDB</h4>
      <p>
        In the primary path, Vector forwards samples to VictoriaMetrics (which is the TSDB of choice
        for Trickl). VictoriaMetrics may be applied in clustered mode, where its functionality is spread
        across several components. The clustered configuration was chosen over single-node mode to
        support workloads that may grow at different rates across the ingestion, storage and query
        layers. This also allows each component to be scaled independently as the volume of metrics or
        query demand grows.
      </p>
      <p>
        The first component in the chain is <strong>vmagent</strong>, which is a tiny metrics
        collection agent. Cardinality-control rules can be applied via vmagent by leveraging different
        config files (where label-drop rules or aggregation rules can be applied), reducing unnecessary
        label dimensions before samples are indexed and stored by VictoriaMetrics' storage component
        (<strong>vmstorage</strong>). Crucially, vmagent can read changes in the config files without
        going offline, so the incoming stream of metrics isn't interrupted when cardinality-control
        rules are added or removed, ensuring no data loss (i.e. hot-reloading). Vmagent therefore, is
        the boundary between the raw incoming stream (which is still stored in the archive) and the
        optimized stream that is persisted in the TSDB. Its role is of paramount importance in the
        Smart-Metrics service's feedback loop.
      </p>
      <figure className="cs-figure">
        <img src={vmagentArch} alt="vmagent architecture diagram" className="cs-image" />
        <figcaption className="cs-caption">vmagent sits between the raw incoming stream and VictoriaMetrics, applying cardinality-control rules via hot-reloadable config before samples are indexed and stored.</figcaption>
      </figure>
      <p>
        Vmagent forwards samples to the next VictoriaMetrics component; <strong>vminsert</strong>,
        which acts as the write entry point of the deployment. Vminsert distributes samples across the
        vmstorage nodes for persistence. The routing is based on deterministic hashing of the sample's
        metric name and label set.
      </p>
      <p>
        <strong>Vmstorage</strong> persists the time-series samples to disk. It also uses memory for
        indexing, ingestion-buffering, and query execution assistance.
      </p>
      <figure className="cs-figure">
        <img src={statefulStateless} alt="Stateful and stateless VictoriaMetrics components" className="cs-image" />
        <figcaption className="cs-caption">The stateless vminsert and vmselect components can scale horizontally without coordination, while vmstorage is the stateful bottleneck responsible for persisting samples to disk.</figcaption>
      </figure>
      <p>
        Once samples are persisted, they also need to be made available for querying.{' '}
        <strong>Vmselect</strong> is the final component of the VictoriaMetrics deployment. Like
        vminsert, it operates statelessly, meaning that multiple vmselect nodes can run completely
        unaware of each other. vmselect takes queries in from a frontend (a Grafana dashboard for
        example), retrieves the relevant time-series data from vmstorage, and returns the result
        according to the parameters declared in the query. For repeated or overlapping queries,
        vmselect can maintain a cache to help improve response times.
      </p>
      <p>
        Trickl uses <strong>Grafana</strong> as its visualization layer, from which users may query
        the TSDB. Users can interact with an industry-standard frontend, build their own dashboards,
        and construct PromQL (the Prometheus query language used to query time-series data) queries
        against the data persisted within VictoriaMetrics.
      </p>
      <figure className="cs-figure">
        <img src={promQLQuery} alt="Grafana dashboard UI" className="cs-image" />
        <figcaption className="cs-caption">Trickl's Grafana visualization layer, where users build dashboards and construct PromQL queries against data persisted in VictoriaMetrics.</figcaption>
      </figure>
      <p>
        These queries are forwarded to vmselect, which fetches the appropriate data from vmstorage.
        Finally, the data is presented back to the user in the Grafana UI, usually in the form of
        graphs or tables.
      </p>
      <figure className="cs-figure">
        <img src={grafanaVm} alt="Grafana and VictoriaMetrics integration" className="cs-image" />
        <figcaption className="cs-caption">Trickl's custom Grafana plugin, through which the Smart-Metrics Service surfaces cardinality recommendations alongside the user's existing dashboards and queries.</figcaption>
      </figure>
      <h3 id="smart-metrics-service">Smart Metrics Service</h3>
      <p>
        The Smart-Metrics service observes how metrics are stored and queried, and offers
        recommendations to reduce cardinality in the live ingestion path.
        It is exposed through Trickl's custom Grafana plugin, which allows users to inspect and apply
        cardinality recommendations as they see fit.
      </p>
      <p>
        The placement within Grafana was done to keep Smart-Metrics convenient. A developer may
        easily transition from observation of dashboards or ad hoc querying, to reviewing aggregation
        or label-drop suggestions without the need to switch to (and learn) another tool. The plugin
        also comes with an AI agent that is able to explain recommendations in plain text, as well as
        converse about the current state of internal services.
      </p>
      <p>
        In order to generate recommendations, Smart-Metrics compares two distinct signals; what data
        users actually require, and all the data that exists in the TSDB.
      </p>
      <figure className="cs-figure">
        <img src={sms} alt="Smart Metrics Service signal comparison" className="cs-image cs-image--three-quarter" />
        <figcaption className="cs-caption">The Smart-Metrics Service cross-references active Grafana queries against the label dimensions present in storage to identify cardinality that provides no current query value.</figcaption>
      </figure>
      <p>
        Smart-Metrics focuses on identifying labels which contribute disproportionately to
        cardinality while currently providing no practical value. Generated recommendations
        are stored in a PostgreSQL database.
      </p>
      <p>
        Suggestions are made to the user on a per-label basis, and once decisions have been made,
        the system normalizes this decision into an appropriate vmagent configuration change. vmagent
        is then hot-reloaded so that rules are applied without halting the system. The system also
        moves in the opposite direction; if a user determines that a high-cardinality label would be
        helpful if inbound again, they may choose to undo the rules that filtered that label out.
      </p>

      <h3 id="cloud-infrastructure">Cloud Infrastructure</h3>
      <p>
        Trickl's cloud infrastructure is provisioned using AWS CDK. Since local development had
        involved containerizing each major component of the system, ECS was chosen as the deployment
        strategy, with EC2 backed compute, given that the observability platform needs to be up and
        running 24/7. An AWS application load balancer (ALB) acts as the single entry point into the
        deployed platform.
      </p>
      <p>
        The deployment is built around a three node architecture. The first node may best be
        classified as the "interface" node; it is responsible for housing the components responsible
        for metric sample intake and exportation; as well as Grafana and the Smart-Metrics service.
        The containers on this node don't tend to require scaling, and the most demanding of them
        (Smart-Metrics), is only run in response to a user request.
      </p>
      <figure className="cs-figure">
        <img src={nodeArch} alt="Three-node architecture diagram" className="cs-image" />
        <figcaption className="cs-caption">Trickl's three-node deployment: an interface node housing Vector, Grafana, and the SMS; a vmselect node for query serving; and a vmstorage node for time-series persistence.</figcaption>
      </figure>
      <p>
        The second and third nodes are for vmselect and vmstorage, respectively.
      </p>
      <p>
        Trickl's architecture was deliberately designed to avoid having query and storage concerns
        starve any other component in the system, while also leaving room for users to implement their
        own scaling strategy. Vmselect and vmstorage are scalable bottlenecks in the pipeline. Vmselect
        may become encumbered if users provision many dashboards built on demanding queries (which
        indirectly puts some level of stress on vmstorage too); and vmstorage may need to expand (and
        potentially even shard), as time-series data grows.
      </p>
      <p>
        Trickl doesn't currently provide any scaling strategies out of the box, but the nodes are
        defined as autoscaling groups so the user can choose to do so whenever they desire. The default
        configuration should handle storing between 50-100 billion samples per month, and Smart-Metrics'
        cardinality-control measures should massively reduce the burden on vminsert and keep overall
        time-series count low, alleviating the burden on vmstorage.
      </p>
      <p>
        Trickl provisions an RDS PostgreSQL database to store the persistent data that Smart-Metrics
        relies on, and it provisions an S3 bucket for long-term storage that Vector exports raw metric
        samples to.
      </p>
      <p>
        Metric ingestion is guarded by a WAF rule at the load balancer layer, which validates an API
        key that is created by AWS Secrets Manager on the first cloud deployment (this may be rotated
        in the future). Access to Grafana requires a valid Cognito account login, which may only be
        created by an administrator via the AWS console. All other services are directly inaccessible.
      </p>

      <h3 id="observing-observability">Observing Observability</h3>
      <p>
        Finally, each provisioned container writes logs to CloudWatch, providing a layer of
        meta-observability for the platform. This helps facilitate debugging once the system is
        deployed, allowing inspection of container startup failures, task crashes, configuration
        issues and more, without the need to connect to containers directly.
      </p>
      <figure className="cs-figure">
        <img src={cloudwatch} alt="CloudWatch logs" className="cs-image" />
        <figcaption className="cs-caption">Container logs aggregated in CloudWatch, providing visibility into Trickl's own deployed infrastructure for debugging startup failures, task crashes, and configuration issues.</figcaption>
      </figure>
    </>
  )
}

function DesignDecisionsSection() {
  return (
    <>
      <h2>Design Decisions &amp; Tradeoffs</h2>

      <h3 id="tsdb">TSDB</h3>
      <figure className="cs-figure">
        <img src={tsdbcomp} alt="TSDB comparison" className="cs-image" />
      </figure>
      <p>
        VictoriaMetrics is Trickl's choice of TSDB for the following reasons:
      </p>
      <ul>
        <li>It is incredibly performant; it uses less CPU and RAM than competing TSDBs, and has aggressive compression techniques to better utilise disk storage, which makes it a lot more affordable.</li>
        <li>It may be used in a simple clustered configuration that is relatively easy to deploy, scale, and maintain.</li>
        <li>The clustered configuration also sets up a separation of concerns that is more logically appropriate for the intended scale of this platform; the selection and storage components were anticipated to be the two major bottlenecks.</li>
        <li>VictoriaMetrics can ingest OTLP format metrics, which is Trickl's targeted format. VictoriaMetrics also supports Prometheus style metrics, but Trickl isn't currently provisioned to ingest them.</li>
      </ul>
      <p>
        VictoriaMetrics comes with these tradeoffs:
      </p>
      <ul>
        <li>It cannot write to, or read from, long-term storage.</li>
        <li>Vmselect's built in visualization/monitoring capabilities left something to be desired.</li>
        <li>Limited multi-tenancy features.</li>
      </ul>
      <p>
        Grafana Mimir and Prometheus (with a Thanos sidecar) are alternatives. Both of these choices
        are able to write to, and read from object storage. Mimir in particular was a candidate for
        Trickl's potential choice of TSDB. It implements a micro-services architecture with strong
        multi-tenancy features, but it is less performant and its micro-services architecture is more
        complicated to deploy, scale, and maintain. Mimir would better benefit a complex enterprise
        environment that requires advanced multi-tenancy features.
      </p>
      <p>
        Trickl implements VictoriaMetrics in the clustered configuration, with a sample retention
        policy of 1 month.
      </p>

      <h3 id="long-term-retention">Long Term Retention</h3>
      <p>
        While VictoriaMetrics is unable to read from or write to long term storage, Trickl's
        platform still implements long term retention of raw samples. This is so if the end user
        realises that the high cardinality data they previously dropped could solve a newly discovered
        issue, then that data still exists and may be used. It also meshes well as a data compliance
        feature, in that users retain an auditable trail of raw telemetry data entering the system.
      </p>
      <p>
        In order to write to long-term storage, Trickl uses Vector (Datadog), which offers the
        following benefits:
      </p>
      <ul>
        <li>It has a lightweight stream-based engine that can easily integrate into an existing pipeline.</li>
        <li>It can forward samples to multiple endpoints easily, including S3 buckets.</li>
        <li>It is able to apply custom transformations to samples before exporting them to an endpoint.</li>
        <li>It has native OTLP format support.</li>
      </ul>
      <p>
        Vector forwards a copy of each inbound sample to both VictoriaMetrics and an S3 bucket;
        before writing to the S3 bucket, Vector transforms the sample into one that can be used by
        VictoriaMetrics' API. We briefly considered Kafka, its strong buffering abilities might've
        been utilised to backfill a small amount of samples very quickly, should the user have chosen
        to undo a rule, creating a "just in time" metrics feature. However to transform and write to
        long-term storage, it would've required more dependencies. For operational simplicity, Vector
        was ideal.
      </p>
      <p>
        Vector acts as the entry point into Trickl's pipeline. Vmagent was considered as an
        alternative, with Vector positioned after it, instead of before. The benefit of putting
        vmagent first is that it would provide a unified entry point for multiple sample formats
        (for example. It would be able to intake Prometheus style metrics without any additional
        configuration); the downside is that aggregations and label drop rules applied by vmagent
        can leak into the S3 bucket; which would place unnecessary data in long term storage, or
        deprive it entirely of raw samples, depending on different vmagent configurations. Data
        integrity was deemed more valuable than multi-format support (which Vector may still be
        configured for in the future), so we chose to put vmagent behind Vector.
      </p>

      <h3 id="automation">Automation</h3>
      <p>
        Trickl's cardinality control measures are not automatic. The implementation of label-dropping
        and/or aggregation rules at the relevant point in the pipeline (vmagent) are only done in
        response to a user's decisions to accept or reject the recommendations Smart-Metrics presents
        them.
      </p>
      <p>
        Automating the workflow was well within Trickl's capabilities, but because Trickl is
        decoupled from the source application/s, the system has no insight into the context of the
        labels. Trickl is unable to determine why a label may or may not be useful, but a developer
        can. This applies even to unbounded labels. Let's say for example, a user has set up their
        application to emit samples to their Trickl deployment. They instrumented their app to emit
        a "http.requests.total" metric, which includes an unbounded label "trace_id". To Trickl's
        Smart-Metrics component, the label, if recently unqueried and not present in a dashboard,
        would be considered a prime target to filter. The problem is though, that even if a dashboard
        doesn't exist right now, a user may want those "trace_id" fields to correlate metrics to
        traces they're storing on a separate platform. Trickl simply can't know that the user intends
        to use "trace_id" in a dashboard, or in ad hoc queries, to correlate specific traces to a
        metric at an indeterminate point in time.
      </p>
      <p>
        Trickl anticipates that the end user knows what labels they need at the present moment in
        time, and going forward. The point of the platform is to facilitate cardinality management
        <em>for</em> the user, not execute those measures <em>instead of</em> the user, as this
        might result in the loss of high resolution data points that a developer might consider
        useful.
      </p>

      <h3 id="llms-in-cardinality">LLMs in Cardinality Management</h3>
      <p>
        Cardinality management is inherently a deterministic issue; a label is unqueried or it
        isn't; it's in a dashboard or it isn't, it has x unique values, is responsible for x% of
        the time-series a metric produces, and so on. At a glance, an LLM can take care of these
        issues with structured outputs, but it introduces a level of uncertainty into the mix. Even
        if all tools are provided to the agent, there's no guarantee that the agent will use all the
        tools. More importantly, there's no real added benefit; the operations can all be done with
        relative simplicity, and since the system is decoupled from the source application/s, it is
        dependent on user-agency anyway. Introducing an LLM, at least in the generation and
        application of cardinality management suggestions, adds no real benefit to the quality of
        cardinality control; really, it actually reduces it because the system can't guarantee that
        certain thresholds are always met when it comes to making a recommendation. For these
        reasons, Trickl's Smart-Metrics service takes a standard algorithmic approach to determining
        if a label is driving high-cardinality and may be safely dropped.
      </p>
      <p>
        That being said, LLMs do present a very intuitive use-case in this realm, and that is
        natural language explanations for the current state of the time-series database, as well as
        the recommendations generated. For the non-technical user, the AI agent that Trickl has
        integrated into its custom Grafana plugin, acts as an accessible interface to understand why
        suggestions have been made, and how they relate to the current state of VictoriaMetrics.
        Trickl's AI agent relies on the OpenAI API, so in order to use it, users need OpenAI API
        usage credits.
      </p>
    </>
  )
}

function FutureWorkSection() {
  return (
    <>
      <h2>Future Work</h2>

      <h3 id="fw-infrastructure">Infrastructure</h3>
      <ul>
        <li>
          <strong>Scaling policies:</strong> The system's components are deployed across separate
          auto-scaling groups, but no scaling policies are shipped out of the box. A logical next
          step would be to provide default scaling policies for users who anticipate a significant
          uptick in metrics generation, or who require zero-downtime should any node go offline.
        </li>
        <li>
          <strong>Grafana dashboard persistence:</strong> Currently, provisioned Grafana dashboards
          are lost on redeployment. Trickl could persist these dashboards in future releases.
        </li>
        <li>
          <strong>Vmagent config persistence:</strong> Applied vmagent rules are persisted, but on
          redeployment the user must manually trigger the Smart-Metrics service via the Grafana
          plugin to reload and apply them. Automating this on startup is the logical next step.
        </li>
      </ul>

      <h3 id="fw-cicd">CI / CD</h3>
      <ul>
        <li>
          <strong>Source repository integration:</strong> Implementing workflows for automatically
          committing cardinality control changes back to the source repository.
        </li>
      </ul>

      <h3 id="fw-smart-metrics">Smart-Metrics Service</h3>
      <ul>
        <li>
          <strong>Proactive undo suggestions:</strong> If a user previously dropped a label on a
          metric and later queries for that label, the SMS should detect the conflict and offer to
          undo the relevant rule. The ability to undo rules already exists — this would make the
          system proactively surface that option.
        </li>
        <li>
          <strong>Archive backfill on undo:</strong> When a rule is undone, give the user the
          option to populate the TSDB with matching data from long-term storage. This means a user
          who reinstates a previously dropped label can immediately query historical trends rather
          than waiting for new samples to accumulate.
        </li>
        <li>
          <strong>Post-rule series purge:</strong> Give the user the option to delete time-series
          associated with a metric that is being aggregated or whose label is being dropped. In
          most cases the user no longer requires those series; purging them would save storage,
          improve query performance, and improve the quality of future recommendations.
        </li>
        <li>
          <strong>Expanded AI agent tooling:</strong> Broadening the AI agent's tool set so it can
          produce richer, more detailed outputs about Trickl's current state across the board.
        </li>
      </ul>
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
  }

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 })
  }, [currentIndex])

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

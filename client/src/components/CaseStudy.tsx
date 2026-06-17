import { useState, useRef, useEffect } from 'react'
import typicalMetricsDashboard from '../assets/typical_metrics_dashboard.png'
import cardinalityExplosionGraph from '../assets/cardinality_explosion_graph.png'
import basicBackend from '../assets/basic_backend.gif'
import timeSeriesEx from '../assets/time-series-ex.png'
import exampleTimeseriesDist from '../assets/example-timeseries-dist.png'
import tricklLandscapeComparison from '../assets/trickl-landscape comparison-dark.png'
import smartmetricsPipeline from '../assets/full-arch.gif'
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
         of hard-to-diagnose issues, leaving your system brittle and broken. ITIC's 2024 survey found that over 90% of
          midsize and large enterprises put the cost of an hour of downtime above $300,000, and for smaller businesses
           more than $10,000 per hour. 
      </p>

      <h3 id="what-is-telemetry">What is Telemetry?</h3>
      <p>
        In this context, telemetry data refers to the information that is continuously emitted by your systems
        and its supporting infrastructure as they run.
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
        in order to visualize changes in application state.
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
        emitted in the telemetry signal they’re building, via OTel’s SDK or APIs.
      </p>
      <p>
        Instrumenting your applications to produce these metrics is only part of the challenge. Once your system begins 
        emitting metrics, these samples need to be transported and stored in a manner that preserves their time-based 
        nature. This storage solution needs to remain stable and affordable as the system grows. Factors that contribute 
        to cost include the infrastructure hosting the solution, as well as the time spent maintaining it. At any point 
        in time the volume of emitted samples may spike in such a way as to overwhelm your storage solution; this may 
        be caused by a surge in traffic to your application, or a change in its instrumentation. If this occurred 
        during an outage or unexpected incident, your discovery process is likely to stop working altogether, resulting 
        in the loss of critical data when it’s needed most. OTel metrics are exported using the OpenTelemetry 
        Protocol (OTLP), and are referred to as such.
      </p>

      <h3 id="how-are-metrics-stored">How are Metrics Stored?</h3>
      <p>
        Metrics are composed of the metric’s name, its labels (which are a set of key value pairs), and a numerical
        value which represents a measurement of a given type, at a specific time. Knowing how much memory is being
        used at any given time tells you something, but without knowing how memory usage has changed over the past
        minute, hour, day or week, that single value is of little use. A time-series is a sequence of a particular
        label set for a metric (and its value) tracked over time.
      </p>

      <figure className="cs-figure">
        <img src={timeSeriesEx} alt="A time-series example" className="cs-image" />
        <figcaption className="cs-caption">Memory usage (MB) tracked over 24 hours for a single time-series, identified by its label set.</figcaption>
      </figure>

      <p>
        Therefore, every distinct combination of a metric
        name and its labels produces a separate time-series to be stored and tracked; these time-series are what you
        usually see displayed on a dashboard. To store and query time-series data efficiently, you use a time-series
        database (TSDB), which tracks the changing values for that particular time-series chronologically. TSDBs are
        built in such a way that they can efficiently ingest, store and query large amounts of timestamped, numerical
        data points, making them the obvious choice for the observation of metrics. Each new time series requires a
        new index entries and new memory structures to maintain (in order to store metadata and in-memory state); the
        storage engine has to manage each new series as an independent stream. As such, memory acts as one of the
        primary constraints for TSDBs.
      </p>
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
        when the data grows beyond your expectations.
      </p>
      <figure className="cs-figure">
        <img src={basicBackend} alt="A basic metrics observability backend pipeline" className="cs-image" />
        <figcaption className="cs-caption">A basic metrics observability pipeline. Instrumented applications push telemetry to a collector, which forwards it to a time-series database for storage and querying via a visualization layer.</figcaption>
      </figure>
      <p>
        This is, of course, an over-simplified model but the point stands; building a metrics pipeline means orchestrating 
        and synchronizing several complex dependencies, each one introducing a new point of failure if misconfigured or 
        poorly provisioned. 
      </p>
      <p>
        Even a well provisioned pipeline can quickly become unstable. One of the most common ways that an observability platform 
        can become unstable is through metric cardinality explosion.
      </p>

      <h3 id="what-is-cardinality">What is Cardinality?</h3>
      <p>
        We can define cardinality as the number of unique combinations (not permutations; ordering doesn’t matter) that are 
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
        unique combinations of labels often exceeds this and may continue to increase with the addition of labels
        that have an unbounded quantity, such as a <code>request_id</code> label. Since a new value for this
        label is generated for each request, that results in a new time-series for whichever metric incorporates
        it. Unbounded labels are almost always a unique identifier of something or someone in the system — for
        example, a user ID.
      </p>
      <p>
        To give an example, let’s say you run a service that has 10,000 users. Your service may take into 
        consideration the status code of the request the user has made (5 possible options). You’ve also 
        got 10 url paths, and the service runs on servers in 2 different regions. A developer instruments 
        your application/s to produce a metric called <code>http_requests_total</code>, with all of these details 
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
        This surge in the number of distinct time-series is known as a <strong>cardinality explosion</strong>. As a result of this rapid 
        influx of new series through the pipeline, the TSDB will consume much more memory, due to index-structure 
        expansion for each new time-series, as well as the storage of in-memory metadata. A cardinality explosion’s 
        memory burden is distinct from spikes in existing series, since existing series don’t expand the index footprint 
        of the TSDB, nor do they introduce new metadata.
      </p>
      <p>
        If your TSDB isn’t provisioned to deal with this increased memory burden, then your query layer becomes vastly 
        less responsive, making it difficult to track metrics and in extreme cases, borderline impossible to use. In 
        their 2025 observability study, Grafana identified cardinality spikes as a common source of increased resource 
        usage, memory pressures, and system instability.
      </p>
      <p>
        In particular, significant explosion incidents result in an out-of-memory error, which will cause your observability 
        stack to come to a grinding halt. In order to account for an incident of this magnitude without cardinality control 
        measures, your infrastructure will need to scale its storage and compute structures, resulting in greater costs.
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
        Engineering teams are presented with several options to tackle these challenges, each of which comes with
        its own set of tradeoffs.
      </p>
      <h4>End-to-End Managed Platforms</h4>
      <p>
        End-to-End (E2E) managed platforms such as Datadog, New Relic, and Dynatrace, own and manage the entire 
        observability pipeline. These platforms are composed of proprietary software; their pipelines (and required 
        instrumentation of your apps) are simple to set up, and come with a rich set of features, as well as industry 
        leading support. You do, however, pay large costs which scale with usage, and can reach eyewatering amounts 
        when you produce enough telemetry data.  Platforms like these and many others often lead to vendor lock-in, 
        making egress difficult.
      </p>
      <h4>Managed OSS Platforms</h4>
      <p>
        Managed OSS platforms such as Grafana Cloud and Chronosphere provide experiences similar to that of the E2E 
        Managed Platforms, but are typically comprised of open source components rather than proprietary ones 
        (although mixed-models exist e.g. Grafana Cloud’s adaptive telemetry service). Since they’re built on open 
        source components, you’re not locked into a proprietary data format, nor are you peering into a completely 
        abstracted blackbox; and so you could, in theory, create your own platform using similar tools and migrate 
        while maintaining historical data. However, your data still lives on the vendor's servers for as long as 
        ou use them, and you pay ongoing usage fees that scale with the volume of your telemetry data.
      </p>
      <h4>Self-Hosted OSS Tools</h4>
      <p>
        Self-hosted OSS components such as Prometheus, Mimir, VictoriaMetrics, Grafana, OpenTelemetry Collector, 
        etc, are all production grade, and may be carefully stitched together to yield a suitable platform. Of 
        course, it is no small challenge to provision the platform; you’ll have to configure each component, 
        tune performance settings, wire them all together, and maintain the system indefinitely; and that’s 
        just bare metal. If you want it deployed to the cloud, you’ve also got to translate all of that into 
        cloud infrastructure. The setup process is cumbersome; it may end up taking weeks, and your burdens don’t 
        end at deployment; your team will have to consider scaling, upgrades, and platform incident responses. 
        You do end up with complete data ownership, personalised flexibility, and very little cost beyond the 
        infrastructure you host the platform on. For teams that require strict data ownership, whether that be 
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
  return (
    <>
      <h2>Building the Platform</h2>
      <p>
        Trickl's architecture is composed of two closely related systems: a metrics observability
        pipeline and a Smart-Metrics Service (SMS).
      </p>
      <figure className="cs-figure">
        <img src={smartmetricsPipeline} alt="Smart Metrics pipeline diagram" className="cs-image cs-image--three-quarter" />
        <figcaption className="cs-caption">An overview of Trickl's architecture.</figcaption>
      </figure>

      <h3 id="metrics-pipeline">Metrics Observability Pipeline</h3>
      <p>
        Let's walk through the lifecycle of a metric as it flows through Trickl's architecture.
      </p>
      <p>
        An application needs to be instrumented such that it emits OpenTelemetry Protocol (OTLP)
        format metrics, providing Trickl with a consistent structure to receive and process. OTLP
        is the emerging standard, and so Trickl prioritises OTLP metrics. An individual
        time-series datum is referred to as a "sample".
      </p>
      <p>
        The first component to receive those metrics is Vector, which acts as Trickl's collector
        gateway. Vector is an open-source data pipeline tool that is able to receive, process, and
        route telemetry data to downstream systems. This capability is used to split the metric
        stream into two paths: a live ingestion path where metrics can be filtered and modified
        (the primary path), and long-term archival storage, where the raw metrics are written to
        an S3 bucket.
      </p>
      <p>
        This long-term archive acts primarily as a safeguard. Preserving the original samples
        separately from those in the primary path ensures a consistent source of truth exists at
        all times. Samples in the primary path can be mutated — since labels can be removed — or
        omitted entirely in the case of aggregation, where metrics are grouped into a single value.
        TSDBs that are not built around object storage tend to have a short TTL policy to prevent
        unbounded storage growth, meaning samples can be evicted over time. If a user drops an
        unbounded label from a metric and later finds that label would provide valuable insight into
        a newly discovered issue, they can import untainted samples from the archive into the TSDB
        rather than waiting for new samples to accumulate. The archive also allows users to view
        long-term metrics — such as seasonal trends in user activity — that would otherwise be
        unavailable due to the TSDB's TTL policy.
      </p>

      <h4>TSDB</h4>
      <p>
        In the primary path, Vector forwards samples to VictoriaMetrics, which serves as Trickl's
        TSDB. VictoriaMetrics can be deployed in clustered mode, where its functionality is spread
        across several components. The clustered configuration was chosen over single-node mode to
        support workloads that may grow at different rates across the ingestion, storage, and query
        layers — allowing each component to be scaled independently as the volume of metrics or
        query demand grows.
      </p>
      <p>
        The first component in the chain is <strong>vmagent</strong>, a lightweight metrics
        collection agent. Cardinality-control rules are applied here via config files — where
        label-drop or aggregation rules can be declared — reducing unnecessary label dimensions
        before samples reach VictoriaMetrics' storage component (<strong>vmstorage</strong>).
        Crucially, vmagent can reload config changes without going offline, so the incoming stream
        of metrics is never interrupted when cardinality-control rules are added or removed. Vmagent
        is therefore the boundary between the raw incoming stream (preserved in the archive) and the
        optimized stream persisted in the TSDB — a role of paramount importance in the Smart-Metrics
        Service's feedback loop.
      </p>
      <figure className="cs-figure">
        <img src={vmagentArch} alt="vmagent architecture diagram" className="cs-image" />
        <figcaption className="cs-caption">vmagent sits between the raw incoming stream and VictoriaMetrics, applying cardinality-control rules via hot-reloadable config before samples are indexed and stored.</figcaption>
      </figure>
      <p>
        Vmagent forwards samples to <strong>vminsert</strong>, which acts as the write entry point
        of the VictoriaMetrics deployment. Vminsert distributes samples across the vmstorage nodes
        using deterministic hashing of the sample's metric name and label set.
      </p>
      <p>
        <strong>Vmstorage</strong> persists the time-series samples to disk and uses memory for
        indexing, ingestion buffering, and query execution assistance.
      </p>
      <figure className="cs-figure">
        <img src={statefulStateless} alt="Stateful and stateless VictoriaMetrics components" className="cs-image" />
        <figcaption className="cs-caption">The stateless vminsert and vmselect components can scale horizontally without coordination, while vmstorage is the stateful bottleneck responsible for persisting samples to disk.</figcaption>
      </figure>
      <p>
        Once samples are persisted, they need to be made available for querying.{' '}
        <strong>Vmselect</strong> is the final component of the VictoriaMetrics deployment. Like
        vminsert, it is stateless, meaning multiple vmselect nodes can run completely unaware of
        each other. Vmselect accepts queries from a frontend, retrieves the relevant time-series
        data from vmstorage, and returns the result according to the parameters declared in the
        query. For repeated or overlapping queries, vmselect can maintain a cache to help improve
        response times.
      </p>
      <p>
        Trickl uses <strong>Grafana</strong> as its visualization layer, from which users may query
        the TSDB. Users can interact with a familiar frontend, build their own dashboards, and
        construct PromQL queries against the data persisted within VictoriaMetrics. PromQL is the
        Prometheus query language used to query time-series data.
      </p>
      <figure className="cs-figure">
        <img src={promQLQuery} alt="Grafana dashboard UI" className="cs-image" />
        <figcaption className="cs-caption">Trickl's Grafana visualization layer, where users build dashboards and construct PromQL queries against data persisted in VictoriaMetrics.</figcaption>
      </figure>
      <p>
        These queries are sent to vmselect, the appropriate data is retrieved from vmstorage, and
        the result is presented back to the user in the Grafana UI — usually in the form of graphs
        or tables.
      </p>
      <figure className="cs-figure">
        <img src={grafanaVm} alt="Grafana and VictoriaMetrics integration" className="cs-image" />
        <figcaption className="cs-caption">Trickl's custom Grafana plugin, through which the Smart-Metrics Service surfaces cardinality recommendations alongside the user's existing dashboards and queries.</figcaption>
      </figure>
      <h3 id="smart-metrics-service">Smart Metrics Service</h3>
      <p>
        The Smart-Metrics Service observes how metrics are stored and queried, and offers
        recommendations to reduce potentially unnecessary cardinality in the live ingestion path.
        Exposed through Trickl's custom Grafana plugin, it allows users to inspect and apply
        cardinality recommendations as they see fit.
      </p>
      <p>
        This placement within Grafana is intentional. A developer can move directly from reviewing
        dashboards or constructing queries to inspecting aggregation or label-drop suggestions —
        without needing to switch to another tool. The plugin also includes an AI agent that can
        explain recommendations in plain language and converse about the current state of internal
        services.
      </p>
      <p>
        In order to generate recommendations, the Smart-Metrics Service compares two distinct
        signals: what is being queried, and what is in storage.
      </p>
      <figure className="cs-figure">
        <img src={sms} alt="Smart Metrics Service signal comparison" className="cs-image cs-image--three-quarter" />
        <figcaption className="cs-caption">The Smart-Metrics Service cross-references active Grafana queries against the label dimensions present in storage to identify cardinality that provides no current query value.</figcaption>
      </figure>
      <p>
        Smart-Metrics focuses on identifying labels that contribute disproportionately to
        cardinality while currently providing no practical query value. Generated recommendations
        are stored in a PostgreSQL database.
      </p>
      <p>
        Suggestions are surfaced to the user on a per-label basis. Once a decision is made, the
        system translates it into an appropriate vmagent configuration change and hot-reloads
        vmagent — applying the rule without halting ingestion. The system is also reversible; if a
        previously dropped label becomes relevant again, the user can reinstate it and resume
        receiving that dimension of data.
      </p>

      <h3 id="cloud-infrastructure">Cloud Infrastructure</h3>
      <p>
        Trickl's cloud infrastructure is provisioned using AWS CDK. Since local development
        involved containerizing each major component, ECS was chosen as the deployment strategy
        with EC2-backed compute — suited to an always-on observability platform.
      </p>
      <p>
        The deployment is built around a three-node architecture. The first node can best be
        described as the "interface" node: it houses the components responsible for metric sample
        intake and exportation, as well as Grafana and the Smart-Metrics Service. The containers
        on this node don't generally require scaling, and the most demanding of them —
        Smart-Metrics — is only run in response to a user request.
      </p>
      <figure className="cs-figure">
        <img src={nodeArch} alt="Three-node architecture diagram" className="cs-image" />
        <figcaption className="cs-caption">Trickl's three-node deployment: an interface node housing Vector, Grafana, and the SMS; a vmselect node for query serving; and a vmstorage node for time-series persistence.</figcaption>
      </figure>
      <p>
        The second and third nodes host vmselect and vmstorage respectively. This separation is
        intentional: both are scalable bottlenecks in the pipeline. Vmselect can become encumbered
        by demanding query load from dense dashboards (which indirectly stresses vmstorage too),
        while vmstorage may need to expand — and potentially shard — as time-series data grows.
      </p>
      <p>
        Trickl's architecture is deliberately designed to prevent query and storage concerns from
        starving other components, while leaving room for users to implement their own scaling
        strategy. Trickl doesn't currently provision scaling policies out of the box, but all nodes
        are defined as autoscaling groups so users can configure this themselves. The default
        configuration is estimated to handle between 50–100 billion samples per month, and
        Smart-Metrics' cardinality-control measures should significantly reduce the burden on
        ingestion components and keep overall time-series counts low.
      </p>
      <p>
        Trickl also provisions an RDS PostgreSQL database for the persistent data the SMS relies
        on, and an S3 bucket for the long-term archive that Vector exports raw metrics to.
      </p>

      <h3 id="observing-observability">Observing Observability</h3>
      <p>
        Finally, each provisioned container writes logs to CloudWatch, giving Trickl some
        observability over its own deployed infrastructure. This facilitates debugging once the
        system is live — enabling inspection of container startup failures, task crashes,
        configuration issues, and more without needing to connect to the service directly.
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
        <li>It is incredibly performant; it uses less CPU and RAM than competing TSDBs, and has aggressive compression techniques to better utilise disk storage, making it significantly more affordable.</li>
        <li>It may be deployed in a simple clustered configuration that is relatively easy to deploy, scale, and maintain.</li>
        <li>The clustered configuration sets up a separation of concerns that is logically appropriate for the scale of this project; the selection and storage components were anticipated to be the two major bottlenecks.</li>
        <li>VictoriaMetrics can ingest OTLP format metrics, which is Trickl's targeted format.</li>
      </ul>
      <p>
        VictoriaMetrics comes with these tradeoffs:
      </p>
      <ul>
        <li>It cannot write to, or read from, long-term storage.</li>
        <li>Vmselect's built-in visualization and monitoring capabilities left something to be desired.</li>
        <li>Limited multi-tenancy features.</li>
      </ul>
      <p>
        Grafana Mimir and Prometheus (with a Thanos sidecar) are alternatives. Both are able to
        write to and read from object storage. Mimir in particular was a candidate for Trickl's
        TSDB. It implements a micro-services architecture with strong multi-tenancy features, but
        it is significantly less performant and its micro-services architecture is more complicated
        to deploy, scale, and maintain. Mimir would better benefit a complex enterprise environment
        that requires advanced multi-tenancy features.
      </p>
      <p>
        Trickl implements VictoriaMetrics in the clustered configuration, with a sample retention
        policy of 1 month.
      </p>

      <h3 id="long-term-retention">Long Term Retention</h3>
      <p>
        While VictoriaMetrics is unable to read from or write to long-term storage, Trickl's
        platform still implements long-term retention of raw samples. This ensures that if a user
        realises that high-cardinality data they previously dropped could help resolve a newly
        discovered issue, that data still exists and can be used. It also serves as a data
        compliance feature, providing users with an auditable trail of raw telemetry data entering
        the system.
      </p>
      <p>
        In order to write to long-term storage, Trickl uses Vector (Datadog), which offers the
        following benefits:
      </p>
      <ul>
        <li>A lightweight stream-based engine that integrates easily into an existing pipeline.</li>
        <li>The ability to forward samples to multiple endpoints, including S3 buckets.</li>
        <li>Custom transformations can be applied to samples before exporting to an endpoint.</li>
        <li>Native OTLP format support.</li>
      </ul>
      <p>
        Vector forwards a copy of each inbound sample to both VictoriaMetrics and an S3 bucket;
        before writing to S3, Vector transforms the sample into a format compatible with
        VictoriaMetrics' API. Kafka was briefly considered — its strong buffering capabilities
        might have been used to backfill samples quickly should a user undo a rule, creating a
        "just in time" metrics feature. However, it would have required additional dependencies.
        For operational simplicity, Vector is the better choice.
      </p>
      <p>
        Vector acts as the entry point into Trickl's pipeline. Vmagent was considered as an
        alternative entry point, with Vector positioned after it. The benefit of putting vmagent
        first is a unified entry point for multiple sample formats — for example, it can ingest
        Prometheus-style metrics without additional configuration. The downside is that aggregation
        and label-drop rules applied by vmagent can leak into the S3 archive, either placing
        mutated data into long-term storage or depriving it of raw samples entirely, depending on
        configuration. Data integrity was deemed more valuable than multi-format support (which
        Vector may still be configured to handle in the future), so vmagent is positioned after
        Vector.
      </p>
      <div className="cs-placeholder">Image: Vector pipeline diagram</div>

      <h3 id="automation">Automation</h3>
      <p>
        Trickl's cardinality control measures are not automatic. Label-drop and aggregation rules
        are only applied at vmagent in response to a user's explicit decision to accept or reject
        a recommendation from the SMS.
      </p>
      <p>
        Automating the workflow was well within Trickl's capabilities, but because Trickl is
        decoupled from the source application, the system has no insight into the context of the
        labels. Trickl cannot determine why a label may or may not be useful — but a developer
        can. Consider a user whose instrumented app emits an{' '}
        <code>http.requests.total</code> metric with an unbounded <code>trace_id</code> label.
        To the Smart-Metrics component, if that label is recently unqueried and absent from any
        dashboard, it would be a prime candidate to filter. The problem is that a user may intend
        to use <code>trace_id</code> to correlate metrics to traces stored on a separate platform
        — something Trickl simply cannot know.
      </p>
      <p>
        Trickl anticipates that the end user knows what labels they need now and going forward.
        The platform is designed to facilitate cardinality management <em>for</em> the user, not
        to execute those measures <em>instead of</em> the user — doing so risks losing
        high-resolution data points that a developer may consider valuable.
      </p>

      <h3 id="llms-in-cardinality">LLMs in Cardinality Management</h3>
      <p>
        Cardinality management is inherently a deterministic problem: a label is unqueried or it
        isn't; it appears in a dashboard or it doesn't; it has <em>x</em> unique values and is
        responsible for <em>x</em>% of the time-series a metric produces. At a glance, an LLM
        could handle this with structured outputs, but it introduces unnecessary uncertainty. Even
        with all tools provided, there is no guarantee an agent will use all of them. More
        importantly, there is no real added benefit — the operations are straightforward, and
        since the system is decoupled from the source application, it is dependent on user agency
        regardless. Introducing an LLM into the generation and application of cardinality
        management suggestions actually reduces quality, because the system can no longer guarantee
        that specific thresholds are consistently met when making a recommendation. For these
        reasons, Trickl's Smart-Metrics service takes a standard algorithmic approach to
        determining whether a label is driving high cardinality and may be safely dropped.
      </p>
      <p>
        That said, LLMs present a genuinely intuitive use case in this domain: natural language
        explanations for the current state of the time-series database and the recommendations
        generated. For the non-technical user, the AI agent integrated into Trickl's custom
        Grafana plugin acts as an accessible interface for understanding why suggestions have been
        made and how they relate to the current state of VictoriaMetrics.
      </p>
      <div className="cs-placeholder">Image: AI agent plugin screenshot</div>
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

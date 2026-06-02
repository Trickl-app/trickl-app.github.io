const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'existing-solutions', label: 'Existing Solutions' },
  { id: 'our-solution', label: 'Our Solution' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'security', label: 'Security' },
  { id: 'trade-offs-and-challenges', label: 'Trade-offs and Challenges' },
  { id: 'future-work', label: 'Future Work' },
]

function CaseStudy() {
  return (
    <div className="case-study-layout">
      <nav className="case-study-sidenav">
        <ul>
          {sections.map(section => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="case-study-content">
        <section id="introduction">
          <h2>Introduction</h2>
          <p>
            Trickl is an open-source, easy to install metrics observability pipeline for small sized
            development teams. It uses an array of existing open-source observability tools in
            conjunction with a custom built "smart metrics" system that works to reduce cardinality
            explosion.
          </p>

          <h3>Engineering Domain - Metrics Observability</h3>
          <p>
            Observability of applications is the ability to inspect a software system's internal
            state by collecting and analyzing the telemetry data that is output by the application.
            This helps us as developers further understand the reasons for a system's state, rather
            than just the state itself. Instead of asking "Is the application working?", we can ask
            "WHY is the application slow or broken?" and more importantly, "How do I fix it?".
          </p>
          <p>
            There are 3 types of data collected from an application that we use to observe an
            application: Metrics, Logs and Traces. Although all 3 are essential for successful
            observability of an application, the pillar Trickle is concerned with is metrics.
            Metrics measure the numerical state of a system over time. It tries to answer questions
            like "How much?", "How often?" or "How fast?". Examples include resource usage (CPU,
            memory), traffic (requests per second, active connections), errors (error rate, failed
            requests), or latency of operations. Metrics use labels to specify context, such as
            which CPU is being measured, or what method an HTTP request is using.
          </p>
          <pre><code>{`cpu_usage_percent{host="web-server-01", cpu="0", mode="user"} 23.5
http_requests_total{method="GET", status_code="200", endpoint="/api/users"} 1042`}</code></pre>

          <h3>Subproblem - Cardinality Explosion</h3>
          <p>
            Metrics are stored in a time series database where they are tracked as a time series.
            The time series keeps track of how a metric's value changes over time. Each metric that
            contains a unique combination of metric name and label values results in a new time
            series being created - this is called "Cardinality". The result of cardinality left
            unchecked is something called "Cardinality Explosion", which refers to an ever
            increasing amount of new time series being created. This can happen when a label is
            added to a metric that could possibly contain an infinite or extremely large number of
            values.
          </p>
        </section>

        <section id="existing-solutions">
          <h2>Existing Solutions</h2>
          <p>We've identified three categories of existing solutions to this domain:</p>
          <ul>
            <li>End-to-end Managed Platforms</li>
            <li>Managed OSS Platforms</li>
            <li>Self-Hosted OSS Tools</li>
          </ul>

          <h3>End-to-end Managed Platforms</h3>
          <p>
            End-to-end managed platforms like Datadog, New Relic, and Dynatrace handle the entire
            observability pipeline, from instrumentation SDKs and data collection, all the way
            through to storage, querying, and visualization dashboards. These platforms are built on
            proprietary software, meaning you couldn't take their codebase and run it yourself even
            if you wanted to. The value proposition is simplicity and richness of features; you sign
            up, install their agent, and everything works. The tradeoffs are cost, which scales with
            usage and can become significant at production scale, and data ownership, as your
            telemetry data lives on the vendor's servers rather than your own infrastructure.
            Switching providers also means starting largely from scratch, as your historical data and
            dashboards are tied to their proprietary systems.
          </p>

          <h3>Managed OSS Platforms</h3>
          <p>
            Managed OSS platforms like Grafana Cloud and Chronosphere provide a similar end-to-end
            experience, but are built entirely on open source software rather than proprietary tools.
            Grafana Cloud for instance is built on Mimir for metrics, Loki for logs, Tempo for
            traces, and Grafana for visualization, all of which are freely available open source
            projects. The distinction from end-to-end managed platforms is that the underlying
            software is transparent, vendor-neutral, and compatible with open standards like
            OpenTelemetry and PromQL. You are not locked into a proprietary data format, and you
            could in theory migrate to a self hosted setup using the same tools. Like end-to-end
            managed platforms however, your data still lives on the vendor's servers and you pay
            ongoing usage fees, typically per active metric series, per volume of logs ingested, and
            per volume of traces ingested.
          </p>

          <h3>Self-Hosted OSS Tools</h3>
          <p>
            Self hosted OSS tools are the raw ingredients that developers have at their disposal
            when they want full control over their observability stack without using proprietary
            software. This category includes tools like Prometheus, Mimir, VictoriaMetrics, Loki,
            Tempo, Grafana, and the OpenTelemetry Collector, all of which are freely available and
            production grade. Notably these are the same tools that managed OSS platforms like
            Grafana Cloud are built on top of. The difference is that with self hosted OSS tools,
            your team is responsible for provisioning the infrastructure, configuring each component,
            tuning performance settings, wiring everything together, and maintaining it all ongoing.
            The setup process can take days to weeks, and the operational burden doesn't end at
            deployment; scaling, upgrades, and incident response all fall on your team. The upside
            is complete data ownership, no usage based fees beyond your own infrastructure costs,
            and full flexibility to configure the stack exactly as you need it.
          </p>
        </section>

        <section id="our-solution">
          <h2>Our Solution</h2>

          <h3>Self Hosted OSS Platform with Cardinality Control</h3>
          <p>
            Trickl aims to sit somewhere between Managed OSS Platform and Self Hosted OSS Tools by
            assisting small development teams in setting up their own self-hosted OSS platform.
            Normally, this process could take weeks, but with Trickl, the entire process is complete
            in 30 minutes. The user provides their AWS information, and Trickl will provision all the
            services needed on a VPS right in their own AWS environment.
          </p>
          <p>
            On top of assisting the user with the setup process, Trickl also adds a Cardinality
            Control system, "Smart Metrics", to mitigate Cardinality Explosion. By reviewing the
            queries made in Grafana by the user and the volume of time series being created by a
            single metric, our Smart Metrics system is able to make recommendations to the user
            where they could reduce Cardinality in their Time Series Database.
          </p>
        </section>

        {sections.slice(3).map(s => (
          <section key={s.id} id={s.id}>
            <h2>{s.label}</h2>
          </section>
        ))}
      </main>
    </div>
  )
}

export default CaseStudy

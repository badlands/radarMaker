<html>

<head>
<meta http-equiv="Content-type" content="text/html; charset=utf-8">
<title>{$RADAR_TITLE}</title>
<link rel="shortcut icon" href="https://www.zalando.de/favicon.ico">

<script src="https://d3js.org/d3.v5.min.js"></script>
<script src="radar.js"></script>

<link rel="stylesheet" href="radar.css">
</head>

<body>

<svg id="radar"></svg>

<script>
radar_visualization({
  svg_id: "radar",
  width: 1450,
  height: 1000,
  colors: {
    background: "#fff",
    grid: "#bbb",
    inactive: "#ddd"
  },
  title: "{$RADAR_TITLE}",
  quadrants: [
    { name: "Languages" },
    { name: "Infrastructure" },
    { name: "Frameworks" },
    { name: "Data Management" }
  ],
  rings: [
    { name: "ADOPT", color: "#93c47d" },
    { name: "TRIAL", color: "#93d2c2" },
    { name: "ASSESS", color: "#fbdb84" },
    { name: "HOLD", color: "#efafa9" }
  ],
  print_layout: true,
  // zoomed_quadrant: 0,
  entries: {$RADAR_ENTRIES}
});
</script>

<table>
<tr>
<td>

<h3>What is the Tech Radar?</h3>

<p>
The {$RADAR_TITLE} is a list of technologies, complemented by an assessment result, called <em>ring assignment</em>. We use four rings with the following semantics:
</p>

<ul>
<li><strong>ADOPT</strong> &mdash; Technologies we have high confidence in to serve our purpose, also in large scale. Technologies with a usage culture in our production environment, low risk and recommended to be widely used.</li>
<li><strong>TRIAL</strong> &mdash; Technologies that we have seen work with success in project work to solve a real problem; first serious usage experience that confirm benefits and can uncover limitations. TRIAL technologies are slightly more risky; some engineers in our organization walked this path and will share knowledge and experiences.</li>
<li><strong>ASSESS</strong> &mdash; Technologies that are promising and have clear potential value-add for us; technologies worth to invest some research and prototyping efforts in to see if it has impact. ASSESS technologies have higher risks; they are often brand new and highly unproven in our organisation. You will find some engineers that have knowledge in the technology and promote it, you may even find teams that have started a prototyping effort.</li>
<li><strong>RETIRE</strong> &mdash; Technologies not recommended to be used for new projects. Technologies that we think are not (yet) worth to (further) invest in. RETIRE technologies should not be used for new projects, but usually can be continued for existing projects.</li>
</ul>

</td><td>

<h3>What is the purpose?</h3>

<p>
The Tech Radar is a tool to inspire and support engineering teams to pick the best technologies for new projects; it provides a platform to share knowledge and experience in technologies, to reflect on technology decisions and continuously evolve our technology landscape. Based on the <a href="https://www.thoughtworks.com/radar">pioneering work of ThoughtWorks</a>, our Tech Radar sets out the changes in technologies that are interesting in software development &mdash; changes that we think our engineering teams should pay attention to and consider using in their projects.
</p>

<h3>How do we maintain it?</h3>

<p>
The Tech Radar is maintained by the <em>ICT Architects</em>.
</p>

</td></tr>
</table>

</body>
</html>
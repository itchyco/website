document.documentElement.classList.add('js');
/* ===== EDIT YOUR CONTENT HERE (used by every page) ===== */
const games = [
  { title:"Game One", tag:"Demos", text:"One or two sentences about what the player does and why it's fun.",
    description:"A longer description for the featured spot: the story, the setting, how it plays, and how long a session takes.",
    image:"", video:"", color:["#f97f78","#f3fbf8"], link:"https://itch.io/", cta:"Play now" },
  { title:"Game Two", tag:"Demos", text:"Describe the setting, the mood, and the main mechanic in plain words.",
    description:"", image:"", video:"", color:["#0a0a0a","#f97f78"], link:"https://itch.io/", cta:"Play now" },
  { title:"Game Three", tag:"In development", text:"A short teaser for the game you're working on next.",
    description:"", image:"", video:"", color:["#f3fbf8","#5aa896"], link:"#news", cta:"Follow progress" }
];

const concepts = [
  { type:"Concept", title:"Concept title one", text:"A short summary of the idea and the problem it solves.",
    description:"A longer description for the featured spot: what the idea is, how it would work, and what you would like people to take from it.",
    image:"", color:["#0a0a0a","#f97f78"], link:"https://github.com/itchyco/itchyco", cta:"Read the write-up" },
  { type:"Research", title:"Research title two", text:"What you investigated, and what you found out.",
    description:"", image:"", color:["#f3fbf8","#5aa896"], link:"https://github.com/itchyco/itchyco", cta:"Read the notes" },
  { type:"Concept", title:"Concept title three", text:"Describe the system or design in one or two sentences.",
    description:"", image:"", color:["#f97f78","#f3fbf8"], link:"https://github.com/itchyco/itchyco", cta:"See the diagram" }
];

const news = [
  { date:"2026-10-04", text:"The studio site is live. More games and home labs are on the way." }
];
const profile = {
  name:"Rachel",                       // add your surname here
  role:"IT support and systems · Creative director",
  email:"hello@example.com",
  github:"https://github.com/itchyco/itchyco",
  linkedin:"",                         // paste your LinkedIn URL to show a LinkedIn button
  itch:"https://itch.io/",
  resume:"",                           // e.g. "resume.pdf" (upload the file next to index.html) to show a résumé button
  photo:""                             // e.g. "images/me.jpg" to show a portrait on the About page
};

const about = {
  summary:[
    "I hold an Information Systems degree and I'm pursuing IT support roles. I like turning a confusing problem into a clear fix, and writing the documentation that helps the next person solve it faster.",
    "Outside of work I run a home lab for practising virtualization, Windows Server administration, networking and ticketing workflows, and I'm documenting that work and my troubleshooting guides on GitHub. I also direct small game projects, from concept and art to story."
  ],
  facts:[
    ["Focus","IT support and systems administration"],
    ["Also","Game concept and creative direction"],
    ["Open to","IT support roles and creative collaborations"]
  ],
  skills:[
    { title:"IT support", items:["Troubleshooting and documentation","Ticketing systems","Windows Server administration","Software installs and configuration"] },
    { title:"Systems and networking", items:["Virtualization (VMware ESXi, Proxmox VE)","Networking fundamentals","Linux and macOS environments","Backup and disk imaging (3-2-1 rule)"] },
    { title:"Creative direction", items:["Game concepts","Art direction","Story and narrative text","Video concepts"] }
  ],
  timeline:[
    { when:"Year – Year", title:"IT support intern", org:"Company name", text:"Describe what you handled day to day: tickets, setups, user support and the tools you used." },
    { when:"Year", title:"Information Systems degree", org:"University name", text:"Mention a final project or the modules most relevant to IT support." }
  ],
  certs:[]   // e.g. { title:"CompTIA A+", issuer:"CompTIA", year:"2026" } — the Certifications section appears once you add one
};
/* ===== END CONTENT ===== */

const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pick = (el, list) => list.slice(0, +el.dataset.limit || list.length);

const BP_SVG = `<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
<g fill="none" stroke="#eaf2ff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
<rect x="124" y="28" width="72" height="30" rx="2"/><line x1="136" y1="43" x2="184" y2="43" stroke-dasharray="4 3"/>
<rect x="30" y="120" width="64" height="40" rx="2"/><rect x="128" y="120" width="64" height="40" rx="2"/><rect x="226" y="120" width="64" height="40" rx="2"/>
<path d="M160 58V90M62 120V90H258V120M160 90V120"/><circle cx="160" cy="90" r="3" fill="#eaf2ff"/>
<path d="M30 176H94M30 172v8M94 172v8" stroke-width="1"/></g>
<g fill="#eaf2ff" font-family="ui-monospace,Menlo,monospace" font-size="9" letter-spacing="1">
<text x="124" y="22">SWITCH</text><text x="30" y="114">NODE A</text><text x="128" y="114">NODE B</text><text x="226" y="114">NODE C</text>
<text x="42" y="190">64 MM</text><text x="248" y="192" font-size="8">FIG. 01</text></g></svg>`;
// your own picture if "image" is set, otherwise a blueprint-style drawing
const bpArt = (c, label) => c.image
  ? `<div class="art" role="img" aria-label="${esc(c.title)} ${label}" style="background-image:url('${esc(c.image)}')"></div>`
  : `<div class="art bp" role="img" aria-label="${esc(c.title)} blueprint placeholder">${BP_SVG}</div>`;

// clean placeholder shown when a game has no "image" yet
const PLAY_SVG = `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="rgba(10,12,13,.4)" stroke="#fff" stroke-width="2"/><path d="M26 20l20 12-20 12z" fill="#fff"/></svg>`;
const gameArt = g => g.video
  ? `<div class="art vid" role="img" aria-label="${esc(g.title)} trailer"><video src="${esc(g.video)}"${g.image ? ` poster="${esc(g.image)}"` : ''} muted loop playsinline preload="metadata"></video></div>`
  : g.image
  ? `<div class="art" role="img" aria-label="${esc(g.title)} artwork" style="background-image:url('${esc(g.image)}')"></div>`
  : `<div class="art ph" role="img" aria-label="${esc(g.title)} placeholder artwork" style="background-image:linear-gradient(135deg, ${g.color[0]}, ${g.color[1]})">${PLAY_SVG}</div>`;

// animated letters: wraps every character of .letters headings in a span
function splitLetters(el){
  if (el.dataset.split) return;
  el.dataset.split = '1';
  el.setAttribute('aria-label', el.innerHTML.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').trim());
  let i = 0, l = 0;
  const walk = node => [...node.childNodes].forEach(n => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      [...n.textContent].forEach(ch => {
        if (ch === ' ') { frag.append(' '); return; }
        const s = document.createElement('span');
        s.className = 'ch'; s.setAttribute('aria-hidden', 'true'); s.style.setProperty('--i', i++); s.style.setProperty('--l', l); s.textContent = ch;
        frag.append(s);
      });
      n.replaceWith(frag);
    } else if (n.nodeType === 1) { if (n.tagName === 'BR') { l++; i = 0; } else walk(n); }
  });
  walk(el);
}
const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealObs = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); } }), {threshold:.15}) : null;
const videoObs = !calm && 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
  e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause(); }), {threshold:.5}) : null;

const gl = document.getElementById('games-list');
const featuredGame = gl && gl.dataset.limit === '1';
if (gl) gl.innerHTML = pick(gl, games).map(g => {
  if (featuredGame) {
    return `<article class="concept feature">
      <div><span class="tag">${esc(g.tag)}</span><h3>${esc(g.title)}</h3><p>${esc(g.text)}</p><a class="btn" href="${esc(g.link)}">${esc(g.cta)}</a></div>
      <div class="side">${gameArt(g)}
      ${g.description ? `<p class="desc">${esc(g.description)}</p>` : ''}</div></article>`;
  }
  return `<article class="game">
    ${gameArt(g)}
    <div><span class="tag">${esc(g.tag)}</span><h3>${esc(g.title)}</h3><p>${esc(g.text)}</p>
    <a class="btn" href="${esc(g.link)}">${esc(g.cta)}</a></div></article>`;
}).join('');

const cl = document.getElementById('concepts-list');
const featured = cl && cl.dataset.limit === '1';
if (cl) cl.innerHTML = pick(cl, concepts).map(c => {
  if (featured) {
    return `<article class="concept feature">
      <div><span class="tag">${esc(c.type)}</span><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p><a href="${esc(c.link)}">${esc(c.cta)}</a></div>
      <div class="side">${bpArt(c, 'picture')}
      ${c.description ? `<p class="desc">${esc(c.description)}</p>` : ''}</div></article>`;
  }
  return `<article class="concept">${bpArt(c, 'drawing')}<span class="tag">${esc(c.type)}</span>
    <h3>${esc(c.title)}</h3><p>${esc(c.text)}</p><a href="${esc(c.link)}">${esc(c.cta)}</a></article>`;
}).join('');

const nl = document.getElementById('news-list');
if (nl) nl.innerHTML = pick(nl, news).map(n =>
  `<li><time datetime="${esc(n.date)}">${new Date(n.date+'T00:00').toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})}</time><span>${esc(n.text)}</span></li>`).join('');

document.getElementById('year').textContent = new Date().getFullYear();

const byId = id => document.getElementById(id);
const btn = (href, label, cls) => `<a class="btn ${cls}" href="${esc(href)}"${/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : ''}>${esc(label)}</a>`;
const contactHtml = [
  btn('mailto:' + profile.email, 'Email me', ''),
  profile.resume && btn(profile.resume, 'Download résumé', 'ghost'),
  profile.linkedin && btn(profile.linkedin, 'LinkedIn', 'ghost'),
  profile.github && btn(profile.github, 'GitHub', 'ghost'),
  profile.itch && btn(profile.itch, 'itch.io', 'ghost')
].filter(Boolean).join('');
document.querySelectorAll('.contact-links').forEach(el => el.innerHTML = contactHtml);
const heroMail = byId('hero-mail'); if (heroMail) heroMail.href = 'mailto:' + profile.email;
const fl = byId('footer-links');
if (fl) fl.innerHTML = [['Email','mailto:' + profile.email],['GitHub',profile.github],['LinkedIn',profile.linkedin],['itch.io',profile.itch]]
  .filter(l => l[1]).map(l => `<a href="${esc(l[1])}"${/^https?:/.test(l[1]) ? ' target="_blank" rel="noopener"' : ''}>${esc(l[0])}</a>`).join('');

if (byId('about-lede')) byId('about-lede').textContent = `${profile.name}, ${profile.role}`;
if (byId('about-summary')) byId('about-summary').innerHTML = about.summary.map(p => `<p>${esc(p)}</p>`).join('');
if (byId('about-facts')) byId('about-facts').innerHTML = about.facts.map(f => `<dt>${esc(f[0])}</dt><dd>${esc(f[1])}</dd>`).join('');
if (byId('portrait') && profile.photo) byId('portrait').innerHTML = `<img src="${esc(profile.photo)}" alt="Portrait of ${esc(profile.name)}">`;
if (byId('skills-list')) byId('skills-list').innerHTML = about.skills.map(s =>
  `<article class="panel"><h3>${esc(s.title)}</h3><ul>${s.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul></article>`).join('');
if (byId('timeline-list')) byId('timeline-list').innerHTML = about.timeline.map(t =>
  `<article class="panel"><span class="when">${esc(t.when)}</span><h3>${esc(t.title)}</h3><p class="org">${esc(t.org)}</p><p>${esc(t.text)}</p></article>`).join('');
if (byId('certs-sec') && about.certs.length) {
  byId('certs-sec').hidden = false;
  byId('certs-list').innerHTML = about.certs.map(c =>
    `<article class="panel"><h3>${esc(c.title)}</h3><p class="org">${esc(c.issuer)}</p><span class="when">${esc(c.year)}</span></article>`).join('');
}

document.querySelectorAll('.letters').forEach(splitLetters);
document.querySelectorAll('.game,.concept').forEach(el => {
  el.classList.add('reveal');
  revealObs ? revealObs.observe(el) : el.classList.add('in');
});
document.querySelectorAll('.art.vid').forEach(a => {
  const v = a.querySelector('video');
  if (videoObs) videoObs.observe(v); else v.controls = true;
  a.onclick = () => v.paused ? v.play() : v.pause();
});

/* ===== drifting confetti dots (the one moving thing on the page) ===== */
(() => {
  const cv = document.getElementById('stars'); if (!cv) return; const ctx = cv.getContext('2d');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w, h, stars = [];
  function size(){
    const r = devicePixelRatio || 1;
    w = cv.clientWidth; h = cv.clientHeight;
    cv.width = w*r; cv.height = h*r; ctx.setTransform(r,0,0,r,0,0);
    stars = Array.from({length: Math.round(w*h/6000)}, () => ({
      x:Math.random()*w, y:Math.random()*h, z:Math.random()*.9+.1, p:Math.random()*6.28 }));
  }
  function draw(t){
    ctx.clearRect(0,0,w,h);
    for (const s of stars){
      if (!still){ s.x -= s.z*.12; if (s.x < 0) s.x = w; }
      const a = .35 + .35*Math.sin(t/1200 + s.p);
      ctx.fillStyle = s.p > 3.6 ? `rgba(249,127,120,${still ? .8*s.z : a*s.z + .25})` : `rgba(10,10,10,${still ? .5*s.z : (a*s.z + .25)*.8})`;
      ctx.fillRect(s.x, s.y, s.z*3+1, s.z*3+1);
    }
    if (!still) requestAnimationFrame(draw);
  }
  addEventListener('resize', () => { size(); if (still) draw(0); });
  size(); draw(0);
})();

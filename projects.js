<script type="module">
async function loadProjects(){
  const grid = document.getElementById('project-grid');
  if (!grid) return;
  try{
    const res = await fetch('./projects.json', {cache:'no-store'});
    const data = await res.json();
    const list = data.projects || [];
    grid.innerHTML = list.length ? '' : '<p class="muted">No projects yet. Add some in <code>projects.json</code>.</p>';
    for (const p of list){
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <img class="thumb" src="${p.image||'img/placeholder.svg'}" alt="${p.title} preview" />
        <h3>${p.title}</h3>
        <p>${p.summary||''}</p>
        ${p.impact ? `<p class="muted small">Impact: <strong>${p.impact}</strong></p>` : ''}
        ${Array.isArray(p.tags) ? `<ul class="tags">` + p.tags.map(t=>`<li>${t}</li>`).join('') + `</ul>` : ''}
        <div class="buttons">
          ${p.repo_url ? `<a class="btn secondary" href="${p.repo_url}" target="_blank" rel="noopener">GitHub</a>` : ''}
          ${p.live_url ? `<a class="btn" href="${p.live_url}" target="_blank" rel="noopener">Live</a>` : ''}
          <a class="btn" href="project.html?id=${encodeURIComponent(p.id)}">Details</a>
        </div>`;
      grid.appendChild(card);
    }
  }catch(e){
    grid.innerHTML = '<p class="muted">Could not load projects.json</p>';
    console.error(e);
  }
}
loadProjects();
</script>

// projects.js — renders Featured Projects from projects.json into #project-grid

async function loadProjects(){
  const grid = document.getElementById('project-grid');
  if (!grid) return;

  try{
    const res = await fetch('./projects.json', {cache:'no-store'});
    if (!res.ok) throw new Error('projects.json not found');
    const data = await res.json();
    const items = (data.projects || []);

    if (!items.length){
      grid.innerHTML = `<p class="muted">Projects coming soon — use the <a href="./project-builder.html">Project Builder</a> to add some.</p>`;
      return;
    }

    grid.innerHTML = items.map(p => {
      const tags = Array.isArray(p.tags) ? p.tags.map(t=>`<li>${t}</li>`).join('') : '';
      const img  = p.image ? `<img class="thumb" src="${p.image}" alt="${p.title} preview">` : '';
      const live = p.live_url ? `<a class="btn" href="${p.live_url}" target="_blank" rel="noopener">Live</a>` : '';
      const repo = p.repo_url ? `<a class="btn secondary" href="${p.repo_url}" target="_blank" rel="noopener">GitHub</a>` : '';
      return `
        <article class="card">
          ${img}
          <h3>${p.title}</h3>
          <p class="small muted">${p.summary || ''}</p>
          ${tags ? `<ul class="tags">${tags}</ul>` : ''}
          <div class="buttons">
            <a class="btn" href="./project.html?id=${encodeURIComponent(p.id)}">Case Study</a>
            ${live}${repo}
          </div>
        </article>
      `;
    }).join('');
  }catch(err){
    console.error(err);
    grid.innerHTML = `<p class="muted">Couldn’t load projects. Make sure <code>projects.json</code> is in the repo root.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', loadProjects);

// Respuestas iniciales: edítalas o agrega las tuyas aquí.
const RESPUESTAS = [
  {id:'s1', autor:'Equipo del proyecto', tema:'URSS',
   texto:'Sin la URSS desapareció el contrapeso militar e ideológico. En 1992 un borrador del Pentágono ya planteaba impedir que surgiera otra potencia rival. Estados Unidos pasó de contener a un adversario a administrar un orden con él en el centro.'},
  {id:'s2', autor:'Equipo del proyecto', tema:'URSS',
   texto:'La OTAN no se disolvió con el Pacto de Varsovia: se amplió desde 1999 hacia Europa del Este. Para quienes hablan de imperialismo, esto muestra influencia política y militar que crece incluso cuando termina la causa que la justificaba.'},
  {id:'s3', autor:'Equipo del proyecto', tema:'11-S',
   texto:'El 11-S dio una justificación nueva y global: la guerra contra el terror. Con ella se invadió Afganistán, luego Irak, y se extendieron bases, drones y vigilancia a países muy distintos entre sí, sin un enemigo con territorio definido.'},
  {id:'s4', autor:'Equipo del proyecto', tema:'11-S',
   texto:'En lo interno, la Ley Patriota y la ampliación de poderes de seguridad normalizaron la excepción. El mismo marco legal permitió operar en el exterior con menos límites que antes.'},
  {id:'s5', autor:'Voz crítica', tema:'Crítica',
   texto:'No todos aceptan la palabra «imperialista». Algunos autores prefieren hablar de hegemonía: liderazgo apoyado en alianzas, instituciones y comercio. Sostienen que EE. UU. no anexa territorios y que parte de su poder se basa en el consentimiento de aliados. El debate vale la pena incluirlo en tu respuesta final.'}
];
const K_USER='foro_respuestas_usuario', K_VOTOS='foro_votos';
const leer=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}};
const guardar=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let filtro='todas';
let votos=leer(K_VOTOS,{});
let propias=leer(K_USER,[]);

function render(){
  const todas=[...RESPUESTAS,...propias].filter(r=>filtro==='todas'||r.tema===filtro);
  const lista=document.getElementById('lista');
  lista.innerHTML='';
  todas.forEach(r=>{
    const art=document.createElement('article');
    art.className='resp'; art.dataset.tema=r.tema;
    const meta=document.createElement('div'); meta.className='meta';
    meta.textContent=r.autor+' · '+r.tema;
    const p=document.createElement('p'); p.textContent=r.texto;
    const b=document.createElement('button'); b.className='voto';
    const marcado=!!votos[r.id];
    b.setAttribute('aria-pressed',marcado);
    b.textContent='De acuerdo ('+(marcado?1:0)+')';
    b.addEventListener('click',()=>{votos[r.id]=!votos[r.id];guardar(K_VOTOS,votos);render()});
    art.append(meta,p,b); lista.append(art);
  });
  document.getElementById('conteo').textContent=todas.length+(todas.length===1?' respuesta':' respuestas');
}
document.querySelectorAll('.chip').forEach(c=>c.addEventListener('click',()=>{
  document.querySelectorAll('.chip').forEach(x=>x.classList.remove('activo'));
  c.classList.add('activo'); filtro=c.dataset.f; render();
}));
document.getElementById('formulario').addEventListener('submit',e=>{
  e.preventDefault();
  propias.push({id:'u'+Date.now(),autor:document.getElementById('f-autor').value.trim(),
    tema:document.getElementById('f-tema').value,texto:document.getElementById('f-texto').value.trim()});
  guardar(K_USER,propias); e.target.reset();
  document.getElementById('aviso').textContent='Respuesta publicada. Solo se ve en este navegador.';
  render();
});
document.querySelectorAll('.marca').forEach(m=>m.addEventListener('click',()=>{
  document.querySelectorAll('.marca').forEach(x=>x.setAttribute('aria-selected',x===m));
  document.querySelectorAll('.evento').forEach(ev=>ev.hidden=ev.id!=='ev-'+m.dataset.ev);
}));
document.querySelectorAll('figure img').forEach(img=>img.addEventListener('error',()=>{
  const d=document.createElement('div'); d.className='sin-imagen';
  d.textContent='Coloca tu imagen en '+img.dataset.nombre; img.replaceWith(d);
}));
render();

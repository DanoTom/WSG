/* masters-core.jsx — IndexHub · Yearly · MonthlySpread · Daily
   Cada uno 1080×810 vía <Page>. Versión en BLANCO + interactiva:
   los datos de muestra del bundle se sustituyen por campos rellenables. */

// ════════════════════════════ ÍNDICE / HUB ════════════════════════════
function IndexHub({ theme = 'clay' }) {
  const p = getPal(theme);
  const routes = [
    { n: '01', icon: 'leaf',      label: 'Portada',     meta: '6 colorways',        href: '#portada' },
    { n: '02', icon: 'grid',      label: 'Año',         meta: 'vista anual + metas', href: '#anual' },
    { n: '03', icon: 'cal',       label: 'Mes',         meta: 'mensual',             href: '#mensual' },
    { n: '04', icon: 'week',      label: 'Semana',      meta: 'lun · dom',           href: '#semana' },
    { n: '05', icon: 'sun',       label: 'Día',         meta: 'diario',              href: '#diario' },
    { n: '06', icon: 'users',     label: 'Pacientes',   meta: 'directorio + fichas', href: '#directorio' },
    { n: '07', icon: 'clipboard', label: 'Supervisión', meta: 'casos · devoluciones', href: '#supervision' },
    { n: '08', icon: 'cap',       label: 'Formación',   meta: 'cursos · horas',      href: '#formacion' },
    { n: '09', icon: 'bookmark',  label: 'Cultura',     meta: 'leer · ver · oír',    href: '#cultura' },
    { n: '10', icon: 'receipt',   label: 'Finanzas',    meta: 'cobros · gastos',     href: '#finanzas' },
    { n: '11', icon: 'note',      label: 'Notas',       meta: 'rayado + punteado',   href: '#notas' },
  ];
  const sections = CLINIC_TABS;
  const secHref = { pacientes: '#directorio', supervision: '#supervision', formacion: '#formacion', cultura: '#cultura', finanzas: '#finanzas' };
  return (
    <Page theme={theme} currentNav="indice" padding={0}>
      <div style={{ display: 'flex', height: '100%' }}>
        {/* ── HERO IZQUIERDA ── */}
        <div style={{ flex: '1 1 0', padding: '40px 36px 32px 40px', display: 'flex', flexDirection: 'column' }}>
          <Eyebrow color={p.deep}>Índice · hub interactivo</Eyebrow>
          <div style={{ marginTop: 26 }}>
            <div style={{ fontFamily: LP.serif, fontWeight: 500, fontSize: 52, lineHeight: 1.02, color: LP.ink }}>Tu consultorio,</div>
            <div style={{ fontFamily: LP.serif, fontWeight: 500, fontSize: 52, lineHeight: 1.04, color: LP.ink }}>
              en una <span style={{ fontStyle: 'italic', color: p.deep }}>sola libreta</span>.
            </div>
          </div>
          <div style={{ marginTop: 14, fontFamily: LP.sans, fontSize: 13, lineHeight: 1.55, color: LP.ink2, maxWidth: 440 }}>
            Agenda hiperenlazada, fichas de pacientes, supervisión, formación y finanzas.
            Toca una pestaña para entrar. Cambia la paleta, conserva la calma.
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 24 }}>
            {sections.map((s) => (
              <LinkChip key={s.key} theme={theme} icon={s.icon} href={secHref[s.key]}>{s.label}</LinkChip>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 26 }}>
            <Eyebrow color={LP.ink3}>Los 12 meses</Eyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginTop: 14 }}>
              {MONTHS_ES.map((m, i) => (
                <a key={m} href="#mensual" className="lp-link" style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '9px 10px', textDecoration: 'none',
                  border: `1px solid ${LP.line}`, borderRadius: 6, background: LP.paper,
                }}>
                  <span style={{ fontFamily: LP.mono, fontSize: 9, color: p.deep, fontWeight: 600 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontFamily: LP.sans, fontSize: 11.5, color: LP.ink2, fontWeight: 500 }}>{m.slice(0, 3).toLowerCase()}.</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── DIRECTORIO DERECHA (bloque tint) ── */}
        <div style={{ width: 392, flexShrink: 0, background: p.tint, padding: '34px 34px 26px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 30, color: p.ink }}>Directorio</span>
            <span style={{ fontFamily: LP.mono, fontSize: 9, letterSpacing: '.12em', color: p.deep, textTransform: 'uppercase' }}>11 rutas</span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {routes.map((r, i) => (
              <a key={r.n} href={r.href} className="lp-link" style={{
                display: 'flex', alignItems: 'center', gap: 12, flex: 1, textDecoration: 'none',
                borderTop: i ? `1px solid ${p.mid}55` : 'none',
              }}>
                <span style={{ fontFamily: LP.mono, fontSize: 10, color: p.deep, width: 18 }}>{r.n}</span>
                <Icon name={r.icon} size={15} stroke={1.3} color={p.ink} />
                <span style={{ fontFamily: LP.sans, fontSize: 13, fontWeight: 600, color: LP.ink, width: 96 }}>{r.label}</span>
                <span style={{ flex: 1, fontFamily: LP.sans, fontSize: 10, color: p.ink, opacity: .72 }}>{r.meta}</span>
                <Icon name="arrowR" size={13} color={p.deep} />
              </a>
            ))}
          </div>
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${p.mid}66`, fontFamily: LP.mono, fontSize: 8, lineHeight: 1.6, color: p.ink, opacity: .7 }}>
            Herramienta de organización. No reemplaza la historia clínica legal ni un sistema certificado de registros. Resguarda tu dispositivo.
          </div>
        </div>
      </div>
    </Page>
  );
}

// ════════════════════════════ VISTA ANUAL ════════════════════════════
function Yearly({ theme = 'clay', year = 2025 }) {
  const p = getPal(theme);
  const goals = [
    { icon: 'users',     label: 'Pacientes' },
    { icon: 'clipboard', label: 'Supervisión' },
    { icon: 'cap',       label: 'Formación' },
    { icon: 'book',      label: 'Lecturas' },
    { icon: 'receipt',   label: 'Finanzas' },
    { icon: 'heart',     label: 'Autocuidado' },
    { icon: 'chart',     label: 'Investigación' },
  ];
  return (
    <Page theme={theme} currentNav="ano" padding={32}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
        <Eyebrow color={p.deep} line={false}>Año · vista anual</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <input type="text" className="lp-field" name="ano-year" placeholder="AAAA" maxLength={4} style={{ width: 120, fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 46, color: LP.ink, lineHeight: 1, textAlign: 'right' }} />
          <span style={{ fontFamily: LP.mono, fontSize: 9, letterSpacing: '.12em', color: LP.ink3, textTransform: 'uppercase' }}>sin fechar · inicio lunes</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 26 }}>
        {/* 12 mini-calendarios 4×3 (referencia visual, año {year}) */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gridTemplateRows: 'repeat(3,1fr)', gap: '22px 20px' }}>
          {MONTHS_ES.map((m, i) => (
            <div key={m}>
              <MiniCalendar theme={theme} month={i} year={year} weekStart={1} />
            </div>
          ))}
        </div>
        {/* columna lateral */}
        <div style={{ width: 256, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: p.tint, borderRadius: 8, padding: '16px 18px' }}>
            <Eyebrow color={p.deep} line={false}>Intención del año</Eyebrow>
            <textarea className="lp-area" name="ano-intencion" placeholder="…" style={{ width: '100%', minHeight: 64, fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 19, lineHeight: 1.3, color: p.ink, marginTop: 8 }} />
          </div>
          <div style={{ marginTop: 18 }}>
            <Eyebrow color={LP.ink3}>Metas profesionales</Eyebrow>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 11 }}>
              {goals.map((g, i) => (
                <div key={g.label} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <Icon name={g.icon} size={13} color={p.deep} />
                  <span style={{ fontFamily: LP.sans, fontSize: 11, fontWeight: 600, color: LP.ink2, width: 86 }}>{g.label}</span>
                  <WInput name={'ano-meta-' + i} size={11} style={{ flex: 1, height: 14 }} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 18 }}>
            <Eyebrow color={LP.ink3}>Soltar este año</Eyebrow>
            <div style={{ marginTop: 11, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <CB theme={theme} name={'ano-soltar-cb-' + i} />
                  <WInput name={'ano-soltar-' + i} style={{ flex: 1, height: 14 }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ════════════════════════════ MENSUAL ════════════════════════════
// Sin fechar → rejilla 6×7 en blanco (el cliente escribe la fecha y las notas).
function MonthlySpread({ theme = 'clay', weekStart = 1 }) {
  const p = getPal(theme);
  const dows = weekStart === 1 ? DOW_LUN : DOW_DOM;
  const rows = 6;
  const cells = Array.from({ length: rows * 7 });

  return (
    <Page theme={theme} currentNav="mes" padding={0}>
      <Spine left="61.5%" />
      <div style={{ display: 'flex', height: '100%' }}>
        {/* ── CALENDARIO ── */}
        <div style={{ width: '61.5%', padding: '28px 26px 26px 34px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <input type="text" className="lp-field" name="mes-nombre" placeholder="Mes" style={{ width: 200, fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 40, color: LP.ink, lineHeight: 1 }} />
              <input type="text" className="lp-field" name="mes-anio" placeholder="AAAA" maxLength={4} style={{ width: 56, fontFamily: LP.mono, fontSize: 11, color: LP.ink3 }} />
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <LinkChip theme={theme} radio name="mes-inicio" value="lun" mono>LUN</LinkChip>
              <LinkChip theme={theme} radio name="mes-inicio" value="dom" mono>DOM</LinkChip>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', marginBottom: 4 }}>
            {dows.map((d, i) => (
              <div key={i} style={{ fontFamily: LP.mono, fontSize: 10, letterSpacing: '.1em', color: LP.ink3, textAlign: 'center', paddingBottom: 6 }}>{d}</div>
            ))}
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(7,minmax(0,1fr))', gridTemplateRows: `repeat(${rows},1fr)`, border: `1px solid ${LP.lineSoft}`, borderRight: 'none', borderBottom: 'none' }}>
            {cells.map((_, i) => {
              const isWeekend = weekStart === 1 ? (i % 7 >= 5) : (i % 7 === 0 || i % 7 === 6);
              return (
                <div key={i} style={{
                  borderRight: `1px solid ${LP.lineSoft}`, borderBottom: `1px solid ${LP.lineSoft}`,
                  background: isWeekend ? '#00000005' : 'transparent',
                  padding: '4px 5px', display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden', minWidth: 0,
                }}>
                  <input type="text" className="lp-field" name={'mes-c' + i + '-d'} placeholder="·" style={{ fontFamily: LP.sans, fontSize: 11, fontWeight: 600, color: isWeekend ? LP.ink4 : LP.ink2, width: 24, flexShrink: 0 }} />
                  <textarea className="lp-area" name={'mes-c' + i + '-n'} style={{ flex: 1, fontFamily: LP.sans, fontSize: 9, color: LP.ink2, lineHeight: 1.25 }} />
                </div>
              );
            })}
          </div>
          {/* leyenda de tipos de evento (referencia de color del bundle) */}
          <div style={{ display: 'flex', gap: 14, marginTop: 10, flexWrap: 'wrap' }}>
            {['sesion', 'supervision', 'formacion', 'cultural', 'personal'].map((t) => {
              const et = eventTypes(theme)[t];
              return (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: LP.sans, fontSize: 9.5, color: LP.ink3 }}>
                  <span style={{ width: 6, height: 6, borderRadius: et.dot === 'soft' ? 1.5 : '50%', background: et.dot === 'hollow' ? 'transparent' : et.color, border: et.dot === 'hollow' ? `1.3px solid ${et.color}` : 'none' }} />
                  {et.label}
                </span>
              );
            })}
          </div>
        </div>

        {/* ── PANEL DERECHO ── */}
        <div style={{ flex: 1, padding: '28px 34px 26px 28px', display: 'flex', flexDirection: 'column', gap: 16, boxSizing: 'border-box' }}>
          <div style={{ background: p.tint, borderRadius: 8, padding: '13px 15px' }}>
            <Eyebrow color={p.deep} line={false}>Foco del mes</Eyebrow>
            <textarea className="lp-area" name="mes-foco" placeholder="…" style={{ width: '100%', minHeight: 46, fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 18, lineHeight: 1.3, color: p.ink, marginTop: 6 }} />
          </div>

          <div>
            <Eyebrow color={LP.ink3}>Supervisiones del mes</Eyebrow>
            <div style={{ marginTop: 9, display: 'flex', flexDirection: 'column', gap: 7 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <CB theme={theme} name={'mes-sup-cb-' + i} />
                  <input type="text" className="lp-field" name={'mes-sup-d-' + i} placeholder="·" style={{ fontFamily: LP.mono, fontSize: 10, color: p.deep, width: 24 }} />
                  <WInput name={'mes-sup-' + i} style={{ flex: 1, height: 14 }} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow color={LP.ink3}>Cobros / pagos</Eyebrow>
            <div style={{ marginTop: 9, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px 16px' }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CB theme={theme} name={'mes-cobro-cb-' + i} />
                  <input type="text" className="lp-field" name={'mes-cobro-d-' + i} placeholder="·" style={{ fontFamily: LP.mono, fontSize: 10, color: p.deep, width: 20 }} />
                  <WInput name={'mes-cobro-' + i} style={{ flex: 1, height: 13 }} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <Eyebrow color={LP.ink3}>Hábitos profesionales</Eyebrow>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 9 }}>
              <ProgressBar theme={theme} label="Notas al día" name="mes-hab-notas" />
              <ProgressBar theme={theme} label="Descanso entre sesiones" name="mes-hab-descanso" />
              <ProgressBar theme={theme} label="Cierre del consultorio" name="mes-hab-cierre" />
              <ProgressBar theme={theme} label="Lectura profesional" name="mes-hab-lectura" />
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Eyebrow color={LP.ink3}>Reflexión clínica</Eyebrow>
            <div style={{ marginTop: 12 }}>
              <RuledLines n={3} gap={22} name="mes-reflexion" />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ════════════════════════════ DIARIO ════════════════════════════
function Daily({ theme = 'clay' }) {
  const p = getPal(theme);
  const hours = [];
  for (let h = 7; h <= 22; h++) hours.push(h);
  const micro = ['Energía', 'Ánimo', 'Sesiones hoy', 'Pausa'];
  const selfcare = ['Pausa entre sesiones', 'Comida sin pantalla', 'Agua', 'Aire / caminar', 'Cierre del día'];
  return (
    <Page theme={theme} currentNav="dia" padding={0}>
      <div style={{ display: 'flex', height: '100%' }}>
        {/* ── COL 1 · agenda horaria ── */}
        <div style={{ width: 322, flexShrink: 0, padding: '26px 22px 22px 34px', borderRight: `1px solid ${LP.lineSoft}`, display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
          <a href="#mensual" className="lp-link" style={{ fontFamily: LP.mono, fontSize: 9, letterSpacing: '.08em', color: p.deep, textDecoration: 'none', marginBottom: 6 }}>‹ volver al mes</a>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
            <input type="text" className="lp-field" name="dia-num" placeholder="00" maxLength={2} style={{ width: 96, fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 72, lineHeight: .82, color: LP.ink }} />
            <div style={{ paddingBottom: 6 }}>
              <input type="text" className="lp-field" name="dia-dow" placeholder="día" style={{ width: 120, fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 22, color: p.deep, lineHeight: 1 }} />
              <input type="text" className="lp-field" name="dia-mes" placeholder="mes" style={{ width: 120, fontFamily: LP.mono, fontSize: 9.5, letterSpacing: '.1em', color: LP.ink3, textTransform: 'uppercase', marginTop: 3 }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 5, marginTop: 14, flexWrap: 'wrap' }}>
            {micro.map((m, i) => (
              <span key={m} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 8px', border: `1px solid ${LP.line}`, borderRadius: 14, fontFamily: LP.sans, fontSize: 9, fontWeight: 600, color: LP.ink2 }}>
                {m}<input type="text" className="lp-field" name={'dia-micro-' + i} style={{ width: 30, fontFamily: LP.mono, fontSize: 8.5, color: p.deep, letterSpacing: '-.04em' }} />
              </span>
            ))}
          </div>
          <div style={{ flex: 1, marginTop: 14, display: 'flex', flexDirection: 'column' }}>
            {hours.map((h) => (
              <div key={h} style={{ flex: 1, display: 'flex', alignItems: 'stretch', gap: 8, borderTop: `1px solid ${LP.lineSoft}`, minHeight: 0 }}>
                <span style={{ fontFamily: LP.mono, fontSize: 9, color: LP.ink3, width: 30, paddingTop: 3, flexShrink: 0 }}>{h}:00</span>
                <input type="text" className="lp-field" name={'dia-h' + h} style={{ flex: 1, margin: '3px 0', fontFamily: LP.sans, fontSize: 11, color: p.ink, minWidth: 0 }} />
              </div>
            ))}
          </div>
        </div>

        {/* ── COL 2 · prioridades / to-do ── */}
        <div style={{ flex: 1, padding: '26px 24px 22px', display: 'flex', flexDirection: 'column', gap: 16, boxSizing: 'border-box', borderRight: `1px solid ${LP.lineSoft}` }}>
          <div>
            <Eyebrow color={p.deep}>Las tres del día</Eyebrow>
            <div style={{ marginTop: 11, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CB theme={theme} name={'dia-tres-cb-' + i} />
                  <span style={{ fontFamily: LP.serif, fontStyle: 'italic', fontSize: 15, color: p.deep, width: 16 }}>{i + 1}</span>
                  <WInput name={'dia-tres-' + i} style={{ flex: 1, height: 17 }} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: p.tint, borderRadius: 8, padding: '12px 14px' }}>
            <Eyebrow color={p.deep} line={false}>Foco del día</Eyebrow>
            <textarea className="lp-area" name="dia-foco" placeholder="…" style={{ width: '100%', minHeight: 44, fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 17, lineHeight: 1.3, color: p.ink, marginTop: 6 }} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Eyebrow color={LP.ink3}>To-do</Eyebrow>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CB theme={theme} name={'dia-todo-cb-' + i} />
                  <WInput name={'dia-todo-' + i} lineColor={i < 6 ? LP.line : LP.lineSoft} style={{ flex: 1, height: 15 }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── COL 3 · autocuidado / admin ── */}
        <div style={{ width: 268, flexShrink: 0, padding: '26px 30px 22px 24px', display: 'flex', flexDirection: 'column', gap: 16, boxSizing: 'border-box' }}>
          <div>
            <Eyebrow color={LP.ink3}>Autocuidado profesional</Eyebrow>
            <div style={{ marginTop: 11, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {selfcare.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <CB theme={theme} name={'dia-self-' + i} />
                  <span style={{ fontFamily: LP.sans, fontSize: 11, color: LP.ink2 }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <Eyebrow color={LP.ink3}>Para supervisar</Eyebrow>
            <DottedBox theme={theme} minHeight={66} area name="dia-supervisar" placeholder="¿Qué caso me movilizó hoy y quiero llevar a supervisión?" style={{ marginTop: 11 }} />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Eyebrow color={LP.ink3}>Pendientes administrativos</Eyebrow>
            <div style={{ marginTop: 12 }}>
              <RuledLines n={4} gap={20} name="dia-admin" />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

Object.assign(window, { IndexHub, Yearly, MonthlySpread, Daily });

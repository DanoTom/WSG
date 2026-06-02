/* masters-practice.jsx — Supervision · Training · Culture · Finance
   Todas 1080×810 vía <Page>. Versión en BLANCO + interactiva. */

function StarRating({ theme = 'clay', name, n = 5 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {Array.from({ length: n }).map((_, i) => (
        <CB key={i} theme={theme} size={11} name={name + '-' + i} style={{ borderRadius: '50%' }} />
      ))}
    </span>
  );
}

// ════════════════════════════ SUPERVISIÓN ════════════════════════════
function Supervision({ theme = 'clay' }) {
  const p = getPal(theme);
  const cols = '64px 92px 1fr 1.3fr';
  const baseRows = 6;
  return (
    <Page theme={theme} tab="supervision" padding={32}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <Eyebrow color={p.deep} line={false}>Supervisión</Eyebrow>
          <div style={{ fontFamily: LP.serif, fontWeight: 500, fontSize: 40, lineHeight: 1, color: LP.ink, marginTop: 4 }}>Supervisión</div>
        </div>
        <span style={{ display: 'flex', alignItems: 'center', gap: 7, maxWidth: 280 }}>
          <Icon name="clock" size={13} color={LP.ink3} />
          <span style={{ fontFamily: LP.sans, fontSize: 10, fontStyle: 'italic', color: LP.ink3, lineHeight: 1.35 }}>Tus supervisiones aparecen marcadas en el mensual, semanal y diario.</span>
        </span>
      </div>

      <div style={{ display: 'flex', gap: 28 }}>
        {/* columna izquierda */}
        <div style={{ width: 336, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ background: p.tint, borderRadius: 10, padding: '18px 20px' }}>
            <Eyebrow color={p.deep} line={false}>Próxima supervisión</Eyebrow>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 8 }}>
              <input type="text" className="lp-field" name="sup-prox-fecha" placeholder="fecha" style={{ width: 120, fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 38, color: LP.ink, lineHeight: 1 }} />
              <input type="text" className="lp-field" name="sup-prox-hora" placeholder="00:00" style={{ width: 60, fontFamily: LP.mono, fontSize: 9.5, color: p.deep }} />
            </div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 11 }}>
              <FieldLine label="Supervisor/a" labelW={84} name="sup-supervisor" />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 84, fontFamily: LP.sans, fontSize: 10.5, fontWeight: 600, color: LP.ink2 }}>Modalidad</span>
                <LinkChip theme={theme} radio name="sup-modalidad" value="individual">Individual</LinkChip>
                <LinkChip theme={theme} radio name="sup-modalidad" value="grupal">Grupal</LinkChip>
              </div>
            </div>
            <div style={{ marginTop: 14 }}>
              <div style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: '.14em', textTransform: 'uppercase', color: p.deep, marginBottom: 9 }}>Casos a llevar</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CB theme={theme} name={'sup-caso-cb-' + i} />
                    <input type="text" className="lp-field" name={'sup-caso-code-' + i} placeholder="—" style={{ fontFamily: LP.mono, fontSize: 11, fontWeight: 600, color: LP.ink, width: 40 }} />
                    <WInput name={'sup-caso-' + i} lineColor={`${p.mid}66`} style={{ flex: 1, height: 14 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Eyebrow color={LP.ink3}>Bibliografía sugerida</Eyebrow>
            <div style={{ marginTop: 11, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CB theme={theme} name={'sup-biblio-cb-' + i} />
                  <WInput name={'sup-biblio-' + i} style={{ flex: 1, height: 15 }} />
                  <span style={{ fontFamily: LP.mono, fontSize: 8, color: LP.ink3, textTransform: 'uppercase', letterSpacing: '.1em' }}>leído</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* registro (auto-crece) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Eyebrow color={LP.ink3}>Registro de supervisiones</Eyebrow>
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: cols, gap: 12, paddingBottom: 8, borderBottom: `1px solid ${LP.line}` }}>
            {['Fecha', 'Supervisor/a', 'Casos', 'Devoluciones'].map((h) => (
              <span key={h} style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: '.12em', textTransform: 'uppercase', color: LP.ink3 }}>{h}</span>
            ))}
          </div>
          <div data-grow="sup" style={{ flex: 1, overflowY: 'auto', minHeight: 0, maxHeight: 470 }}>
            {Array.from({ length: baseRows }).map((_, i) => (
              <div key={i} className="lp-grow-row" style={{ display: 'grid', gridTemplateColumns: cols, gap: 12, alignItems: 'center', height: 44, borderBottom: `1px solid ${LP.lineSoft}` }}>
                <input type="text" className="lp-field" name={'sup-' + i + '-fecha'} placeholder="·" style={{ fontFamily: LP.mono, fontSize: 10, color: p.deep }} />
                <input type="text" className="lp-field" name={'sup-' + i + '-sup'} style={{ fontFamily: LP.sans, fontSize: 11, color: LP.ink2 }} />
                <input type="text" className="lp-field" name={'sup-' + i + '-casos'} style={{ fontFamily: LP.mono, fontSize: 10.5, fontWeight: 600, color: LP.ink }} />
                <input type="text" className="lp-field" name={'sup-' + i + '-dev'} style={{ fontFamily: LP.sans, fontSize: 11, color: LP.ink2 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

// ════════════════════════════ FORMACIÓN ════════════════════════════
function Training({ theme = 'clay' }) {
  const p = getPal(theme);
  return (
    <Page theme={theme} tab="formacion" padding={32}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <Eyebrow color={p.deep} line={false}>Formación</Eyebrow>
          <div style={{ fontFamily: LP.serif, fontWeight: 500, fontSize: 40, lineHeight: 1, color: LP.ink, marginTop: 4 }}>Formación</div>
        </div>
        <span style={{ fontFamily: LP.mono, fontSize: 9.5, letterSpacing: '.1em', color: LP.ink3, textTransform: 'uppercase' }}>cursos · seminarios · posgrados</span>
      </div>

      {/* 3 cards de cursada */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 18 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ border: `1px solid ${LP.line}`, borderRadius: 10, padding: '16px 17px', background: LP.paper, display: 'flex', flexDirection: 'column', gap: 11 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
              <Icon name="cap" size={18} color={p.deep} />
              <div style={{ display: 'flex', gap: 4 }}>
                <LinkChip theme={theme} radio name={'form-curso-' + i + '-st'} value="curso" mono>En curso</LinkChip>
                <LinkChip theme={theme} radio name={'form-curso-' + i + '-st'} value="completo" mono>Completo</LinkChip>
              </div>
            </div>
            <div>
              <input type="text" className="lp-field" name={'form-curso-' + i + '-name'} placeholder="Curso / posgrado" style={{ fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 19, lineHeight: 1.1, color: LP.ink }} />
              <input type="text" className="lp-field" name={'form-curso-' + i + '-inst'} placeholder="institución · modalidad" style={{ fontFamily: LP.sans, fontSize: 10.5, color: LP.ink3, marginTop: 4 }} />
            </div>
            <ProgressBar theme={theme} name={'form-curso-' + i + '-h'} suffix=" h" />
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline', paddingTop: 2 }}>
              <input type="text" className="lp-field" name={'form-curso-' + i + '-next'} placeholder="próxima fecha" style={{ fontFamily: LP.sans, fontSize: 10, fontWeight: 600, color: p.deep, textAlign: 'right' }} />
            </div>
          </div>
        ))}
      </div>

      {/* fila inferior */}
      <div style={{ display: 'flex', gap: 24, marginTop: 24 }}>
        <div style={{ width: 256, flexShrink: 0, background: p.tint, borderRadius: 10, padding: '18px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Eyebrow color={p.deep} line={false}>Horas acumuladas</Eyebrow>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
            <input type="text" className="lp-field" name="form-horas" placeholder="0" style={{ width: 130, fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 64, lineHeight: .85, color: LP.ink }} />
            <span style={{ fontFamily: LP.mono, fontSize: 10, color: p.deep }}>h / créditos</span>
          </div>
          <div style={{ fontFamily: LP.sans, fontSize: 10, color: p.ink, marginTop: 8, opacity: .8 }}>Para matrícula y formación continua.</div>
        </div>

        <div style={{ flex: 1 }}>
          <Eyebrow color={LP.ink3}>Próximas fechas</Eyebrow>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 11 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CB theme={theme} name={'form-fecha-cb-' + i} />
                <input type="text" className="lp-field" name={'form-fecha-d-' + i} placeholder="·" style={{ fontFamily: LP.mono, fontSize: 10, color: p.deep, width: 50 }} />
                <WInput name={'form-fecha-' + i} style={{ flex: 1, height: 14 }} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <Eyebrow color={LP.ink3}>Lecturas profesionales pendientes</Eyebrow>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CB theme={theme} name={'form-lectura-cb-' + i} />
                <WInput name={'form-lectura-' + i} style={{ flex: 1, height: 15 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

// ════════════════════════════ AGENDA CULTURAL ════════════════════════════
function Culture({ theme = 'clay' }) {
  const p = getPal(theme);
  const blocks = [
    { icon: 'book', title: 'Libros' },
    { icon: 'film', title: 'Cine / Series' },
    { icon: 'mic', title: 'Charlas / Podcasts' },
    { icon: 'flower', title: 'Arte / Muestras' },
  ];
  return (
    <Page theme={theme} tab="cultura" padding={32}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <Eyebrow color={p.deep} line={false}>Agenda cultural</Eyebrow>
          <div style={{ fontFamily: LP.serif, fontWeight: 500, fontSize: 40, lineHeight: 1, color: LP.ink, marginTop: 4 }}>Cultura</div>
        </div>
        <span style={{ fontFamily: LP.mono, fontSize: 9.5, letterSpacing: '.1em', color: LP.ink3, textTransform: 'uppercase' }}>por leer · ver · oír</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gridTemplateRows: 'repeat(2,1fr)', gap: 16, height: 432 }}>
        {blocks.map((b, i) => (
          <div key={i} style={{ border: `1px solid ${LP.line}`, borderRadius: 10, padding: '15px 18px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 11 }}>
              <span style={{ width: 28, height: 28, borderRadius: '50%', background: p.tint, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={b.icon} size={15} color={p.deep} />
              </span>
              <span style={{ fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 19, color: LP.ink }}>{b.title}</span>
            </div>
            <div style={{ fontFamily: LP.mono, fontSize: 7.5, letterSpacing: '.14em', textTransform: 'uppercase', color: LP.ink3, marginBottom: 7 }}>Por ver / leer</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
              {[0, 1, 2].map((j) => (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <CB theme={theme} name={'cult-' + i + '-cb-' + j} size={12} />
                  <WInput name={'cult-' + i + '-item-' + j} lineColor={LP.lineSoft} style={{ flex: 1, height: 13 }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 9, paddingTop: 9, borderTop: `1px solid ${LP.lineSoft}` }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.deep }} />
                <span style={{ fontFamily: LP.sans, fontSize: 9.5, color: LP.ink3 }}>En curso</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: LP.sans, fontSize: 9.5, color: LP.ink3 }}>Valoración</span>
                <StarRating theme={theme} name={'cult-' + i + '-star'} />
              </span>
            </div>
          </div>
        ))}
      </div>

      <DottedBox theme={theme} label="Para pensar / compartir" minHeight={56} area name="cult-pensar" style={{ marginTop: 18 }} />
    </Page>
  );
}

// ════════════════════════════ FINANZAS ════════════════════════════
function Finance({ theme = 'clay' }) {
  const p = getPal(theme);
  const cats = ['Alquiler consultorio', 'Supervisión', 'Formación', 'Impuestos', 'Software / herramientas', 'Otros'];
  const cols = '36px 1fr 64px 76px 120px';
  const baseRows = 9;
  return (
    <Page theme={theme} tab="finanzas" padding={0}>
      <div style={{ display: 'flex', height: '100%' }}>
        {/* izquierda (tint) */}
        <div style={{ width: 392, flexShrink: 0, background: p.tint, padding: '30px 30px 24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
          <Eyebrow color={p.deep} line={false}>Finanzas · resumen mensual</Eyebrow>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18 }}>
            {[['Entra', 'fin-entra', 'left'], ['Sale', 'fin-sale', 'center'], ['Queda', 'fin-queda', 'right']].map(([l, dv, al]) => (
              <div key={dv} style={{ textAlign: al }}>
                <div style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: '.16em', textTransform: 'uppercase', color: p.deep, marginBottom: 4 }}>{l}</div>
                <div data-derive={dv} style={{ fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 34, lineHeight: 1, color: p.ink }}>$0</div>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: `${p.mid}66`, margin: '22px 0 18px' }} />
          <div style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: '.14em', textTransform: 'uppercase', color: p.deep, marginBottom: 14 }}>Gastos del consultorio</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {cats.map((c, i) => (
              <ProgressBar key={i} theme={theme} label={c} name={'gasto-' + i} prefix="$" />
            ))}
          </div>
          <DottedBox theme={theme} label="Nota financiera" minHeight={50} area name="fin-nota" style={{ marginTop: 'auto', borderColor: `${p.mid}88` }} />
        </div>

        {/* derecha · ledger (auto-crece) */}
        <div style={{ flex: 1, padding: '30px 34px 24px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', minHeight: 0 }}>
          <Eyebrow color={LP.ink3}>Cobros del mes</Eyebrow>
          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: cols, gap: 10, paddingBottom: 8, borderBottom: `1px solid ${LP.line}` }}>
            {['Día', 'Paciente', 'Modalidad', 'Importe', 'Estado'].map((h) => (
              <span key={h} style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: '.12em', textTransform: 'uppercase', color: LP.ink3 }}>{h}</span>
            ))}
          </div>
          <div data-grow="led" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
            {Array.from({ length: baseRows }).map((_, i) => (
              <div key={i} className="lp-grow-row" style={{ display: 'grid', gridTemplateColumns: cols, gap: 10, alignItems: 'center', height: 40, borderBottom: `1px solid ${LP.lineSoft}` }}>
                <input type="text" className="lp-field" name={'led-' + i + '-d'} placeholder="·" style={{ fontFamily: LP.mono, fontSize: 10, color: p.deep }} />
                <input type="text" className="lp-field" name={'led-' + i + '-code'} placeholder="—" style={{ fontFamily: LP.mono, fontSize: 11, fontWeight: 600, color: LP.ink }} />
                <input type="text" className="lp-field" name={'led-' + i + '-mod'} style={{ fontFamily: LP.sans, fontSize: 10.5, color: LP.ink2 }} />
                <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 1, fontFamily: LP.mono, fontSize: 11, color: LP.ink }}>$<input type="text" inputMode="numeric" className="lp-field lp-num" name={'led-' + i + '-amt'} style={{ width: 56, fontFamily: LP.mono, fontSize: 11, color: LP.ink }} /></span>
                <span style={{ display: 'flex', gap: 4 }}>
                  <LinkChip theme={theme} radio name={'led-' + i + '-st'} value="Cobrado" mono style={{ padding: '3px 7px', fontSize: 9 }}>Cobrado</LinkChip>
                  <LinkChip theme={theme} radio name={'led-' + i + '-st'} value="Pendiente" mono style={{ padding: '3px 7px', fontSize: 9 }}>Pend.</LinkChip>
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
            <span style={{ fontFamily: LP.mono, fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: LP.ink3 }}>Total cobrado</span>
            <span data-derive="ledger-cobrado" style={{ fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 34, color: p.ink, lineHeight: 1 }}>$0</span>
          </div>
        </div>
      </div>
    </Page>
  );
}

Object.assign(window, { Supervision, Training, Culture, Finance });

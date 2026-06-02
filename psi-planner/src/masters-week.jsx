/* masters-week.jsx — Semanal (plantilla única). Página 1080×810.
   weekStart 1 (lunes) por defecto; sin fechar → columnas en blanco. */

function WeeklySpread({ theme = 'clay', weekStart = 1 }) {
  const p = getPal(theme);
  const DOW_FULL_LUN = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  const DOW_FULL_DOM = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const dows = weekStart === 1 ? DOW_FULL_LUN : DOW_FULL_DOM;
  const days = dows.map((d, i) => ({ dow: d, weekend: weekStart === 1 ? i >= 5 : (i === 0 || i === 6) }));
  const habits = ['Notas al día', 'Descanso entre sesiones', 'Lectura profesional', 'Cierre del consultorio'];

  return (
    <Page theme={theme} currentNav="semana" padding={0}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px 34px 22px', boxSizing: 'border-box' }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <span style={{ fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 38, color: LP.ink, lineHeight: 1 }}>Semana</span>
            <input type="text" className="lp-field" name="sem-rango" placeholder="— · mes" style={{ width: 180, fontFamily: LP.mono, fontSize: 10.5, letterSpacing: '.1em', color: LP.ink3 }} />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <LinkChip theme={theme} radio name="sem-inicio" value="lun" mono>INICIO LUN</LinkChip>
            <LinkChip theme={theme} radio name="sem-inicio" value="dom" mono>INICIO DOM</LinkChip>
          </div>
        </div>

        {/* 7 columnas de día */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(7,minmax(0,1fr))', border: `1px solid ${LP.lineSoft}`, borderRight: 'none' }}>
          {days.map((d, i) => (
            <div key={i} style={{
              borderRight: `1px solid ${LP.lineSoft}`,
              background: d.weekend ? '#00000004' : 'transparent',
              display: 'flex', flexDirection: 'column', minWidth: 0,
            }}>
              <div style={{ padding: '8px 10px 7px', borderBottom: `1px solid ${LP.lineSoft}`, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: LP.mono, fontSize: 9.5, letterSpacing: '.08em', textTransform: 'uppercase', color: d.weekend ? LP.ink4 : LP.ink3 }}>{d.dow}</span>
                <input type="text" className="lp-field" name={'sem-d' + i + '-num'} placeholder="·" style={{ width: 28, textAlign: 'right', fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 26, lineHeight: .8, color: LP.ink }} />
              </div>
              <textarea className="lp-area" name={'sem-d' + i + '-c'} style={{ flex: 1, padding: '8px 7px', fontFamily: LP.sans, fontSize: 10, color: LP.ink2, lineHeight: 1.4 }} />
            </div>
          ))}
        </div>

        {/* tira inferior */}
        <div style={{ display: 'flex', gap: 26, marginTop: 16, height: 168 }}>
          {/* Top 3 */}
          <div style={{ width: 234, flexShrink: 0 }}>
            <Eyebrow color={p.deep}>Top 3 de la semana</Eyebrow>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <CB theme={theme} name={'sem-top-cb-' + i} />
                  <span style={{ fontFamily: LP.serif, fontStyle: 'italic', fontSize: 16, color: p.deep, width: 16 }}>{i + 1}</span>
                  <WInput name={'sem-top-' + i} style={{ flex: 1, height: 18 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Hábitos 4 × 7 días → toggles */}
          <div style={{ flex: '0 0 auto', width: 392 }}>
            <Eyebrow color={LP.ink3}>Hábitos profesionales</Eyebrow>
            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '150px repeat(7, 1fr)', gap: '0 0', alignItems: 'center', marginBottom: 6 }}>
                <span />
                {dows.map((d, i) => (
                  <span key={i} style={{ fontFamily: LP.mono, fontSize: 7.5, color: LP.ink3, textAlign: 'center' }}>{d[0]}</span>
                ))}
              </div>
              {habits.map((h, r) => (
                <div key={h} style={{ display: 'grid', gridTemplateColumns: '150px repeat(7, 1fr)', alignItems: 'center', marginBottom: 7 }}>
                  <span style={{ fontFamily: LP.sans, fontSize: 10, color: LP.ink2, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: 8 }}>{h}</span>
                  {dows.map((d, c) => (
                    <span key={c} style={{ display: 'flex', justifyContent: 'center' }}>
                      <CB theme={theme} size={13} name={'sem-hab-' + r + '-' + c} />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Notas */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Eyebrow color={LP.ink3}>Notas de la semana</Eyebrow>
            <div style={{ marginTop: 14 }}>
              <RuledLines n={4} gap={22} name="sem-notas" />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

Object.assign(window, { WeeklySpread });

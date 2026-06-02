/* covers.jsx — Portada (1 diseño, mostrada en los 6 colorways).
   Composición puramente tipográfica (sin motivo gráfico). */

function Cover({ theme = 'clay' }) {
  const p = getPal(theme);
  return (
    <div className="lp-paper lp-page" style={{ width: 1080, height: 810 }}>
      {/* marco fino doble */}
      <div style={{ position: 'absolute', inset: 30, border: `1px solid ${LP.line}` }} />
      <div style={{ position: 'absolute', inset: 38, border: `1px solid ${p.mid}` }} />

      {/* esquinas tint */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 360, height: 360, background: `radial-gradient(circle at top left, ${p.tint} 0%, transparent 62%)`, opacity: .7 }} />
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 360, height: 360, background: `radial-gradient(circle at bottom right, ${p.tint} 0%, transparent 62%)`, opacity: .7 }} />

      <div style={{
        position: 'absolute', inset: 38, display: 'flex', flexDirection: 'column',
        alignItems: 'center', padding: '60px 90px', boxSizing: 'border-box',
      }}>
        {/* eyebrow superior */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 28, height: 1, background: p.mid }} />
          <span style={{ fontFamily: LP.mono, fontSize: 11, letterSpacing: '.34em', textTransform: 'uppercase', color: LP.ink3 }}>Edición sin fechar</span>
          <span style={{ width: 28, height: 1, background: p.mid }} />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {/* kicker */}
          <div style={{ fontFamily: LP.mono, fontSize: 13, letterSpacing: '.4em', textTransform: 'uppercase', color: p.deep, marginBottom: 30 }}>
            Psicología clínica
          </div>

          {/* wordmark */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: LP.serif, fontWeight: 500, fontSize: 100, lineHeight: 0.94, letterSpacing: '.045em', textTransform: 'uppercase', color: LP.ink }}>
              Planificador
            </div>
            <div style={{ fontFamily: LP.serif, fontWeight: 500, fontSize: 100, lineHeight: 1.0, letterSpacing: '.045em', textTransform: 'uppercase', color: LP.ink }}>
              Profesional
            </div>
          </div>

          {/* acento italic con hairlines */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 30 }}>
            <span style={{ width: 84, height: 1, background: p.mid }} />
            <span style={{ fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 32, color: p.deep, whiteSpace: 'nowrap' }}>
              planner clínico
            </span>
            <span style={{ width: 84, height: 1, background: p.mid }} />
          </div>

          <div style={{ marginTop: 22, fontFamily: LP.sans, fontSize: 14, fontWeight: 500, letterSpacing: '.05em', color: LP.ink2, textAlign: 'center' }}>
            para psicólogos y terapeutas
          </div>
        </div>

        {/* pie */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span style={{ fontFamily: LP.mono, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: LP.ink3 }}>200+ páginas · hiperenlazado</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: p.deep }} />
            <span style={{ fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 17, color: p.ink }}>{p.name}</span>
          </div>
          <span style={{ fontFamily: LP.mono, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: LP.ink3 }}>secreto profesional</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Cover });

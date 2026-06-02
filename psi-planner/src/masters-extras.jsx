/* masters-extras.jsx — Notes · Stickers. Páginas 1080×810 vía <Page>. */

// ════════════════════════════ NOTAS ════════════════════════════
function Notes({ theme = 'clay' }) {
  const p = getPal(theme);
  return (
    <Page theme={theme} currentNav="notas" padding={0}>
      <div style={{ display: 'flex', height: '100%', position: 'relative' }}>
        <Spine left="50%" />
        {/* rayado */}
        <div style={{ width: '50%', padding: '28px 36px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
          <Eyebrow color={p.deep}>Rayado</Eyebrow>
          <textarea className="lp-area" name="notas-rayado" style={{
            flex: 1, marginTop: 18, lineHeight: '24px', color: LP.ink, fontSize: 14,
            backgroundImage: `repeating-linear-gradient(${LP.lineSoft} 0 1px, transparent 1px 24px)`,
            backgroundPosition: '0 6px', backgroundAttachment: 'local',
          }} />
          <div style={{ fontFamily: LP.mono, fontSize: 8, lineHeight: 1.6, color: LP.ink4, marginTop: 12 }}>
            Herramienta de organización. No reemplaza la historia clínica legal ni un sistema certificado de registros. Resguarda tu dispositivo.
          </div>
        </div>
        {/* punteado */}
        <div style={{ width: '50%', padding: '28px 36px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
          <Eyebrow color={p.deep}>Punteado</Eyebrow>
          <textarea className="lp-area" name="notas-punteado" style={{
            flex: 1, marginTop: 18, lineHeight: '18px', color: LP.ink, fontSize: 13,
            backgroundImage: `radial-gradient(${LP.line} 1px, transparent 1.4px)`,
            backgroundSize: '18px 18px', backgroundPosition: '4px 8px', backgroundAttachment: 'local',
          }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
            <span style={{ fontFamily: LP.serif, fontStyle: 'italic', fontSize: 14, color: LP.ink3 }}>espacio para pensar entre sesiones</span>
          </div>
        </div>
      </div>
    </Page>
  );
}

// ════════════════════════════ STICKERS ════════════════════════════
function ExSticker({ children, bg, color, border, radius = 20, style }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
      padding: '8px 14px', borderRadius: radius, background: bg, color,
      border: `2px solid ${border || '#fff'}`,
      boxShadow: '0 1.5px 4px rgba(60,50,40,.16)',
      fontFamily: LP.sans, fontWeight: 700, fontSize: 12, letterSpacing: '.04em',
      lineHeight: 1, whiteSpace: 'nowrap', ...style,
    }}>{children}</span>
  );
}

function StickerRow({ label, children }) {
  return (
    <div>
      <div style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: '.16em', textTransform: 'uppercase', color: LP.ink3, marginBottom: 12 }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>{children}</div>
    </div>
  );
}

function Stickers({ theme = 'clay' }) {
  const p = getPal(theme);
  const banners = [
    { t: 'HOY', icon: 'sun' }, { t: 'SESIÓN', icon: 'user' }, { t: 'SUPERVISIÓN', icon: 'clipboard' },
    { t: 'FORMACIÓN', icon: 'cap' }, { t: 'COBRAR', icon: 'receipt' }, { t: 'LEER', icon: 'book' },
  ];
  const estados = [
    { t: 'activo', c: STATUS_COLORS.activo }, { t: 'pausa', c: STATUS_COLORS.pausa },
    { t: 'alta', c: STATUS_COLORS.alta }, { t: 'derivar', c: p.deep }, { t: 'seguimiento', c: LP.ink2 },
  ];
  const citas = ['presencial', 'online', 'primera vez'];
  const moods = ['🙂', '😐', '😔', '😴', '😣'];
  const trackers = [
    { label: 'Sesiones', icon: 'user' }, { label: 'Horas superv.', icon: 'clipboard' },
    { label: 'Lecturas', icon: 'book' }, { label: 'Descanso', icon: 'heart' },
  ];
  return (
    <Page theme={theme} currentNav="" padding={32}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <Eyebrow color={p.deep} line={false}>Stickers funcionales</Eyebrow>
          <div style={{ fontFamily: LP.serif, fontWeight: 500, fontSize: 36, lineHeight: 1, color: LP.ink, marginTop: 4 }}>Hoja de stickers</div>
        </div>
        <span style={{ fontFamily: LP.mono, fontSize: 9.5, letterSpacing: '.1em', color: LP.ink3, textTransform: 'uppercase' }}>recorta · pega · marca</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <StickerRow label="Banners de sección">
          {banners.map((b) => (
            <ExSticker key={b.t} bg={p.deep} color="#fff" radius={8}>
              <Icon name={b.icon} size={13} color="#fff" />{b.t}
            </ExSticker>
          ))}
        </StickerRow>

        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          <StickerRow label="Estado clínico">
            {estados.map((e) => (
              <ExSticker key={e.t} bg={LP.paper} color={LP.ink} border={e.c}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: e.c }} />{e.t}
              </ExSticker>
            ))}
          </StickerRow>
          <StickerRow label="Tipo de cita">
            {citas.map((c) => (
              <ExSticker key={c} bg={p.tint} color={p.ink} border={p.mid}>{c}</ExSticker>
            ))}
          </StickerRow>
        </div>

        <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
          <StickerRow label="Ánimo / energía">
            {moods.map((m, i) => (
              <span key={i} style={{ width: 42, height: 42, borderRadius: '50%', background: LP.paper, border: '2px solid #fff', boxShadow: '0 1.5px 4px rgba(60,50,40,.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{m}</span>
            ))}
            {['●●●●●', '●●●○○', '●○○○○'].map((e, i) => (
              <ExSticker key={i} bg={p.tint} color={p.deep} border={p.mid} radius={14} style={{ fontFamily: LP.mono, letterSpacing: '-.04em' }}>{e}</ExSticker>
            ))}
          </StickerRow>
        </div>

        <StickerRow label="Trackers (counter)">
          {trackers.map((t) => (
            <span key={t.label} style={{ width: 116, height: 92, borderRadius: 12, background: LP.paper, border: '2px solid #fff', boxShadow: '0 1.5px 5px rgba(60,50,40,.16)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Icon name={t.icon} size={18} color={p.deep} />
              <span style={{ fontFamily: LP.sans, fontSize: 10, fontWeight: 700, color: LP.ink2 }}>{t.label}</span>
              <span style={{ fontFamily: LP.mono, fontSize: 12, color: p.deep }}>0 / 0</span>
            </span>
          ))}
          <span style={{ width: 116, height: 92, borderRadius: 12, background: p.tint, border: '2px solid #fff', boxShadow: '0 1.5px 5px rgba(60,50,40,.16)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5, padding: 8 }}>
            <span style={{ fontFamily: LP.mono, fontSize: 8, letterSpacing: '.14em', color: p.deep }}>NOTA</span>
            <span style={{ width: '80%', height: 1, background: `${p.mid}88` }} />
            <span style={{ width: '80%', height: 1, background: `${p.mid}88` }} />
            <span style={{ width: '80%', height: 1, background: `${p.mid}88` }} />
          </span>
        </StickerRow>

        <StickerRow label="Listas rápidas">
          {['Pendientes', 'Para supervisar', 'Cobrar'].map((t) => (
            <span key={t} style={{ width: 168, borderRadius: 10, background: LP.paper, border: '2px solid #fff', boxShadow: '0 1.5px 5px rgba(60,50,40,.16)', padding: '11px 13px', display: 'flex', flexDirection: 'column', gap: 7 }}>
              <span style={{ fontFamily: LP.serif, fontStyle: 'italic', fontSize: 14, color: p.deep, marginBottom: 2 }}>{t}</span>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <CB theme={theme} size={11} />
                  <span style={{ flex: 1, height: 1, background: LP.lineSoft }} />
                </span>
              ))}
            </span>
          ))}
        </StickerRow>
      </div>
    </Page>
  );
}

Object.assign(window, { Notes, Stickers });

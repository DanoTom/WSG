/* masters-guide.jsx — Guía de uso (página imprimible, en el estilo del bundle).
   No estaba en el handoff original; se añade a pedido del cliente para
   explicar el uso, la persistencia local y la privacidad. 1080×810. */

function Guide({ theme = 'clay' }) {
  const p = getPal(theme);
  const cards = [
    { icon: 'leaf', t: 'Qué es', d: 'Un cuaderno clínico digital y en blanco. Lo rellenás vos y queda guardado para volver cuando quieras.' },
    { icon: 'home', t: 'Privado por diseño', d: 'Todo se guarda en TU dispositivo, dentro de este navegador. No se envía nada por internet: sin nube, sin servidores, sin seguimiento. Funciona sin conexión.' },
    { icon: 'check', t: 'Se guarda solo', d: 'Cada cosa que escribís o marcás se guarda automáticamente. Al reabrir el mismo archivo en el mismo navegador, todo reaparece.' },
    { icon: 'grid', t: 'Cómo navegar', d: 'Barra superior: ‹ › cambian de página; Índice y Año saltan directo. También sirven las pestañas y los enlaces. Teclado: ← →.' },
    { icon: 'folder', t: 'Copia de seguridad', d: 'Exportar descarga un archivo .json con todo lo escrito. Importar lo restaura. Ideal para respaldar o pasar a otro dispositivo.' },
    { icon: 'file', t: 'Imprimir / PDF', d: 'Botón Imprimir (o Ctrl/Cmd+P). Genera las páginas a tamaño exacto para imprimir o guardar como PDF.' },
    { icon: 'drop', t: 'Personalizar', d: 'Los puntos de color de la barra cambian la paleta. Probá cuál te acompaña mejor; tu elección se recuerda.' },
    { icon: 'edit', t: 'Borrar', d: 'Borrar página vacía solo la página actual; Borrar todo reinicia el cuaderno. Ambos piden confirmación.' },
  ];
  return (
    <Page theme={theme} currentNav="" padding={30}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <Eyebrow color={p.deep} line={false}>Guía de uso</Eyebrow>
            <div style={{ fontFamily: LP.serif, fontWeight: 500, fontSize: 38, lineHeight: 1, color: LP.ink, marginTop: 4 }}>Cómo usar tu planificador</div>
          </div>
          <span style={{ fontFamily: LP.mono, fontSize: 9.5, letterSpacing: '.1em', color: LP.ink3, textTransform: 'uppercase' }}>léeme primero</span>
        </div>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gridAutoRows: '1fr', gap: 14 }}>
          {cards.map((c) => (
            <div key={c.t} style={{ border: `1px solid ${LP.line}`, borderRadius: 10, padding: '15px 19px', background: LP.paper, display: 'flex', gap: 14, alignItems: 'flex-start', minWidth: 0 }}>
              <span style={{ width: 38, height: 38, borderRadius: '50%', background: p.tint, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name={c.icon} size={19} color={p.deep} />
              </span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 21, color: LP.ink, marginBottom: 4 }}>{c.t}</div>
                <div style={{ fontFamily: LP.sans, fontSize: 13.5, lineHeight: 1.55, color: LP.ink2 }}>{c.d}</div>
              </div>
            </div>
          ))}
        </div>

        <DottedBox theme={theme} label="Importante" minHeight={56} style={{ marginTop: 14, borderColor: `${p.mid}88` }}>
          <span style={{ fontFamily: LP.sans, fontSize: 12.5, lineHeight: 1.55, color: LP.ink2 }}>
            Herramienta de organización personal. <b>No reemplaza la historia clínica legal</b> ni un sistema
            certificado de registros. Resguardá tu dispositivo (contraseña, copias de seguridad) y cumplí la
            normativa de protección de datos de tu país. Si borrás los datos del navegador o usás otro
            equipo sin Importar tu archivo, no verás lo escrito antes.
          </span>
        </DottedBox>
      </div>
    </Page>
  );
}

Object.assign(window, { Guide });

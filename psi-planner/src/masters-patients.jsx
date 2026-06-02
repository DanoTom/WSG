/* masters-patients.jsx — PatientDirectory · PatientCard · SessionLog
   Núcleo del producto. En BLANCO: código/iniciales por el cliente, sin
   nombres reales, línea de confidencialidad al pie. Todas 1080×810. */

// ════════════════════════════ DIRECTORIO ════════════════════════════
function PatientDirectory({ theme = 'clay' }) {
  const p = getPal(theme);
  const cols = '20px 70px 1fr 96px 80px 86px';
  const baseRows = 9;
  return (
    <Page theme={theme} tab="pacientes" padding={0}>
      <div style={{ display: 'flex', height: '100%' }}>
        {/* hero */}
        <div style={{ width: 300, flexShrink: 0, background: p.tint, padding: '36px 30px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
          <Eyebrow color={p.deep} line={false}>Pacientes</Eyebrow>
          <div style={{ fontFamily: LP.serif, fontWeight: 500, fontSize: 52, lineHeight: 1, color: LP.ink, marginTop: 10 }}>Pacientes</div>
          <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 11 }}>
            {[['activo', 'activos'], ['pausa', 'en pausa'], ['alta', 'alta']].map(([k, l]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <StatusDot kind={k} size={9} />
                <input type="text" className="lp-field" name={'dir-stat-' + k} placeholder="·" style={{ width: 30, fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 24, color: LP.ink }} />
                <span style={{ fontFamily: LP.sans, fontSize: 12, color: p.ink }}>{l}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 26 }}>
            <div style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: '.16em', textTransform: 'uppercase', color: p.deep, marginBottom: 10 }}>Filtrar</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              <LinkChip theme={theme}>Activos</LinkChip>
              <LinkChip theme={theme}>Pausa</LinkChip>
              <LinkChip theme={theme}>Alta</LinkChip>
            </div>
          </div>
          <a href="#ficha" className="lp-link" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, color: p.deep, textDecoration: 'none' }}>
            <Icon name="plus" size={14} color={p.deep} />
            <span style={{ fontFamily: LP.sans, fontSize: 12, fontWeight: 600 }}>Nuevo paciente</span>
          </a>
        </div>

        {/* lista (auto-crece) */}
        <div style={{ flex: 1, padding: '32px 34px 26px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', minHeight: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 12, alignItems: 'center', paddingBottom: 9, borderBottom: `1px solid ${LP.line}` }}>
            {['', 'Código', 'Frecuencia', 'Día / hora', 'Próxima', ''].map((h, i) => (
              <span key={i} style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: '.14em', textTransform: 'uppercase', color: LP.ink3 }}>{h}</span>
            ))}
          </div>
          <div data-grow="dir" style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
            {Array.from({ length: baseRows }).map((_, i) => (
              <div key={i} className="lp-grow-row" style={{ display: 'grid', gridTemplateColumns: cols, gap: 12, alignItems: 'center', height: 38, borderBottom: `1px solid ${LP.lineSoft}` }}>
                <StatusDot kind="activo" size={8} hollow />
                <input type="text" className="lp-field" name={'dir-' + i + '-code'} placeholder="—" style={{ fontFamily: LP.mono, fontSize: 12, fontWeight: 600, color: LP.ink }} />
                <input type="text" className="lp-field" name={'dir-' + i + '-freq'} style={{ fontFamily: LP.sans, fontSize: 11, color: LP.ink2 }} />
                <input type="text" className="lp-field" name={'dir-' + i + '-when'} style={{ fontFamily: LP.sans, fontSize: 11, color: LP.ink2 }} />
                <input type="text" className="lp-field" name={'dir-' + i + '-next'} style={{ fontFamily: LP.mono, fontSize: 10, color: p.deep }} />
                <a href="#ficha" className="lp-link" style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end', color: p.deep, textDecoration: 'none' }}>
                  <span style={{ fontFamily: LP.sans, fontSize: 10.5, fontWeight: 600 }}>ver ficha</span>
                  <Icon name="arrowR" size={12} color={p.deep} />
                </a>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <ConfidentialFooter />
          </div>
        </div>
      </div>
    </Page>
  );
}

// ════════════════════════════ FICHA DE PACIENTE ════════════════════════════
function PatientCard({ theme = 'clay' }) {
  const p = getPal(theme);
  return (
    <Page theme={theme} tab="pacientes" padding={0}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '28px 34px 18px', boxSizing: 'border-box' }}>
        {/* cabecera */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 16, borderBottom: `1px solid ${LP.line}` }}>
          <div>
            <a href="#directorio" className="lp-link" style={{ fontFamily: LP.mono, fontSize: 9, letterSpacing: '.08em', color: p.deep, textDecoration: 'none' }}>‹ directorio</a>
            <Eyebrow color={p.deep} line={false} style={{ marginTop: 4 }}>Ficha de paciente</Eyebrow>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, marginTop: 6 }}>
              <input type="text" className="lp-field" name="ficha-codigo" placeholder="—" style={{ width: 150, fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 56, lineHeight: .85, color: LP.ink }} />
              <div style={{ paddingBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontFamily: LP.sans, fontSize: 10, fontWeight: 600, color: LP.ink2 }}>Nombre</span>
                  <WInput name="ficha-nombre" style={{ width: 150, height: 14 }} />
                </div>
                <div style={{ fontFamily: LP.sans, fontSize: 9, fontStyle: 'italic', color: LP.ink4, marginTop: 4 }}>usa código o iniciales</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
              <LinkChip theme={theme} radio name="ficha-estado" value="activo">Activo</LinkChip>
              <LinkChip theme={theme} radio name="ficha-estado" value="pausa">Pausa</LinkChip>
              <LinkChip theme={theme} radio name="ficha-estado" value="alta">Alta</LinkChip>
            </div>
            <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, fontFamily: LP.mono, fontSize: 9.5, color: LP.ink3, letterSpacing: '.06em' }}>
              INICIO ·<input type="text" className="lp-field" name="ficha-inicio" placeholder="__/__/____" style={{ width: 96, fontFamily: LP.mono, fontSize: 9.5, color: LP.ink }} />
            </div>
          </div>
        </div>

        {/* dos columnas */}
        <div style={{ flex: 1, display: 'flex', gap: 28, paddingTop: 18, position: 'relative' }}>
          {/* ENCUADRE (tint) */}
          <div style={{ width: 350, flexShrink: 0, background: p.tint, borderRadius: 8, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 13 }}>
            <Eyebrow color={p.deep} line={false}>Encuadre</Eyebrow>
            <FieldLine label="Edad" labelW={80} name="ficha-edad" />
            <FieldLine label="Contacto" labelW={80} name="ficha-contacto" />
            <FieldLine label="Derivado/a por" labelW={80} name="ficha-derivado" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 80, fontFamily: LP.sans, fontSize: 10.5, fontWeight: 600, color: LP.ink2 }}>Modalidad</span>
              <LinkChip theme={theme} radio name="ficha-modalidad" value="presencial">Presencial</LinkChip>
              <LinkChip theme={theme} radio name="ficha-modalidad" value="online">Online</LinkChip>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 80, fontFamily: LP.sans, fontSize: 10.5, fontWeight: 600, color: LP.ink2 }}>Frecuencia</span>
              <LinkChip theme={theme} radio name="ficha-frecuencia" value="semanal">Semanal</LinkChip>
              <LinkChip theme={theme} radio name="ficha-frecuencia" value="quincenal">Quincenal</LinkChip>
            </div>
            <FieldLine label="Día y hora" labelW={80} name="ficha-diahora" />
            <FieldLine label="Honorario" labelW={80} hint="$ por sesión" mono name="ficha-honorario" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 80, fontFamily: LP.sans, fontSize: 10.5, fontWeight: 600, color: LP.ink2 }}>Cobertura</span>
              <LinkChip theme={theme} radio name="ficha-cobertura" value="particular">Particular</LinkChip>
              <LinkChip theme={theme} radio name="ficha-cobertura" value="cobertura">Con cobertura</LinkChip>
            </div>
          </div>

          <Spine left="350px" style={{ top: 24, bottom: 8 }} />

          {/* clínico */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, paddingLeft: 4 }}>
            <div>
              <Eyebrow color={LP.ink3}>Motivo de consulta</Eyebrow>
              <div style={{ marginTop: 11 }}><RuledLines n={3} gap={20} name="ficha-motivo" /></div>
            </div>
            <div>
              <Eyebrow color={LP.ink3}>Antecedentes relevantes</Eyebrow>
              <div style={{ marginTop: 11 }}><RuledLines n={3} gap={20} name="ficha-antecedentes" /></div>
            </div>
            <div>
              <Eyebrow color={LP.ink3}>Objetivos terapéuticos</Eyebrow>
              <div style={{ marginTop: 11, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CB theme={theme} name={'ficha-obj-cb-' + i} />
                    <WInput name={'ficha-obj-' + i} style={{ flex: 1, height: 15 }} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <Eyebrow color={LP.ink3}>Hitos / evolución</Eyebrow>
              <div style={{ marginTop: 11, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input type="text" className="lp-field" name={'ficha-hito-d-' + i} placeholder="__/__/__" style={{ fontFamily: LP.mono, fontSize: 9, color: p.deep, width: 56 }} />
                    <WInput name={'ficha-hito-' + i} style={{ flex: 1, height: 15 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12 }}><ConfidentialFooter /></div>
      </div>
    </Page>
  );
}

// ════════════════════════════ REGISTRO DE SESIÓN ════════════════════════════
function SessionLog({ theme = 'clay' }) {
  const p = getPal(theme);
  return (
    <Page theme={theme} tab="pacientes" padding={0}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '28px 34px 18px', boxSizing: 'border-box' }}>
        {/* cabecera */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 16, borderBottom: `1px solid ${LP.line}` }}>
          <div>
            <Eyebrow color={p.deep} line={false}>Registro de sesión</Eyebrow>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginTop: 6 }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
                <span style={{ fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 54, lineHeight: .85, color: LP.ink }}>N.º</span>
                <input type="text" className="lp-field" name="reg-num" placeholder="—" style={{ width: 70, fontFamily: LP.serif, fontStyle: 'italic', fontWeight: 500, fontSize: 54, lineHeight: .85, color: LP.ink }} />
              </div>
              <div style={{ paddingBottom: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: LP.mono, fontSize: 9.5, color: LP.ink3 }}>
                  FECHA ·<input type="text" className="lp-field" name="reg-fecha" placeholder="__/__/____" style={{ width: 92, fontFamily: LP.mono, fontSize: 9.5, color: LP.ink }} />
                </div>
                <a href="#ficha" style={{ display: 'flex', alignItems: 'center', gap: 5, color: p.deep, textDecoration: 'none' }} className="lp-link">
                  <Icon name="user" size={12} color={p.deep} />
                  <input type="text" className="lp-field" name="reg-paciente" placeholder="código" style={{ width: 70, fontFamily: LP.mono, fontSize: 11, fontWeight: 600, color: p.deep }} />
                  <Icon name="arrowR" size={11} color={p.deep} />
                </a>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: LP.mono, fontSize: 8.5, letterSpacing: '.14em', textTransform: 'uppercase', color: LP.ink3, marginBottom: 8 }}>Asistencia</div>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
              <LinkChip theme={theme} radio name="reg-asistencia" value="asistio">Asistió</LinkChip>
              <LinkChip theme={theme} radio name="reg-asistencia" value="falto">Faltó</LinkChip>
              <LinkChip theme={theme} radio name="reg-asistencia" value="reprogramo">Reprogramó</LinkChip>
            </div>
          </div>
        </div>

        {/* dos columnas */}
        <div style={{ flex: 1, display: 'flex', gap: 30, paddingTop: 18, position: 'relative' }}>
          <Spine left="50%" style={{ top: 24, bottom: 8 }} />
          {/* izquierda */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 15, paddingRight: 4 }}>
            <div>
              <Eyebrow color={LP.ink3}>Estado del paciente hoy</Eyebrow>
              <div style={{ marginTop: 11 }}><RuledLines n={1} name="reg-estado" /></div>
            </div>
            <div>
              <Eyebrow color={LP.ink3}>Temas trabajados</Eyebrow>
              <div style={{ marginTop: 11 }}><RuledLines n={4} gap={21} name="reg-temas" /></div>
            </div>
            <div style={{ flex: 1 }}>
              <Eyebrow color={LP.ink3}>Intervenciones / técnicas</Eyebrow>
              <div style={{ marginTop: 11 }}><RuledLines n={3} gap={21} name="reg-intervenciones" /></div>
            </div>
          </div>
          {/* derecha */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 15, paddingLeft: 6 }}>
            <div>
              <Eyebrow color={LP.ink3}>Tareas / indicaciones</Eyebrow>
              <div style={{ marginTop: 11, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CB theme={theme} name={'reg-tarea-cb-' + i} />
                    <WInput name={'reg-tarea-' + i} style={{ flex: 1, height: 15 }} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Eyebrow color={LP.ink3}>Para la próxima sesión</Eyebrow>
              <div style={{ marginTop: 11 }}><RuledLines n={2} gap={21} name="reg-proxima" /></div>
            </div>
            <div style={{ flex: 1 }}>
              <Eyebrow color={LP.ink3}>Observaciones</Eyebrow>
              <DottedBox theme={theme} minHeight={86} area name="reg-observaciones" style={{ marginTop: 11 }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: LP.mono, fontSize: 9.5, color: p.deep, letterSpacing: '.06em' }}>
            PRÓXIMA CITA ·<input type="text" className="lp-field" name="reg-proxcita" placeholder="__/__/____" style={{ width: 96, fontFamily: LP.mono, fontSize: 9.5, color: p.deep }} />
          </span>
          <ConfidentialFooter style={{ textAlign: 'right' }} />
        </div>
      </div>
    </Page>
  );
}

Object.assign(window, { PatientDirectory, PatientCard, SessionLog });

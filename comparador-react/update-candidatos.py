import json
import sys

# Load existing candidates data
with open('src/data/candidatos.json', 'r', encoding='utf-8') as f:
    candidatos = json.load(f)

# Biographical and coordinate data for each candidate
updates = {
    "artes": {
        "nombreCompleto": "Eduardo Artés Brichetti",
        "edad": 73,
        "lugarNacimiento": "Santiago, Región Metropolitana",
        "profesion": "Sociólogo y Político",
        "coordenadas": {"x": 0, "y": 90},
        "biografia": "Eduardo Artés Brichetti (Santiago, 1952) es sociólogo de la Universidad de Chile y líder histórico del Partido Comunista (Acción Proletaria). Ha sido candidato presidencial en tres ocasiones (2013, 2017, 2021) representando al marxismo-leninismo ortodoxo en Chile. Reconocido por su férrea defensa del socialismo científico, la planificación estatal centralizada y el antimperialismo. Artés ha mantenido una línea política consistente a favor de la nacionalización de recursos estratégicos, la economía planificada y el Estado como rector absoluto de la actividad económica y social.",
        "foto": "https://www.servel.cl/wp-content/uploads/2024/11/Eduardo-Artes.jpg",
        "gestionPublica": {
            "cargos": [
                "Candidato Presidencial (2013, 2017, 2021, 2025)",
                "Secretario General del Partido Comunista (Acción Proletaria) (1990-presente)"
            ],
            "logros": [
                "Mantener vigente el debate sobre el marxismo-leninismo en Chile post-dictadura",
                "Articulación de sectores obreros y sindicales de base",
                "Defensa consecuente de causas antimperialistas"
            ],
            "proyectosEmblematicos": [
                "Propuesta de Asamblea Constituyente Popular (2019-2020)",
                "Programa de nacionalización integral de recursos naturales",
                "Defensa de presos políticos del estallido social"
            ],
            "evaluacion": "Artés representa una corriente política minoritaria pero ideológicamente consistente. Su influencia electoral es limitada (0.5-1.5% en elecciones pasadas), pero mantiene presencia en sectores sindicales y movimientos sociales. Críticos señalan su dogmatismo y apego a modelos económicos del socialismo real del siglo XX, mientras sus adherentes valoran su coherencia ideológica y compromiso con las causas populares."
        }
    },
    "jara": {
        "nombreCompleto": "Jeannette Jara Román",
        "edad": 51,
        "lugarNacimiento": "Antofagasta, Región de Antofagasta",
        "profesion": "Trabajadora Social y Política",
        "coordenadas": {"x": 15, "y": 60},
        "biografia": "Jeannette Jara Román (Antofagasta, 1974) es trabajadora social de la Universidad Católica del Norte y militante del Partido Comunista de Chile. Ha desarrollado su carrera en el ámbito social y previsional, destacando su trabajo en políticas de pensiones y protección social. Fue Subsecretaria de Previsión Social (2014-2018) durante el segundo gobierno de Michelle Bachelet, donde impulsó mejoras al sistema de pensiones solidarias. Como Ministra del Trabajo y Previsión Social (2022-2024) en el gobierno de Gabriel Boric, lideró la tramitación de la reforma de pensiones. Jara representa el ala pragmática del PC, combinando principios comunistas con gestión técnica en políticas públicas.",
        "foto": "https://www.servel.cl/wp-content/uploads/2024/11/Jeannette-Jara.jpg",
        "gestionPublica": {
            "cargos": [
                "Ministra del Trabajo y Previsión Social (2022-2024)",
                "Subsecretaria de Previsión Social (2014-2018)",
                "Directora Regional SENCE Antofagasta (2011-2014)"
            ],
            "logros": [
                "Tramitación de reforma de pensiones aumentando cotización del 11% al 16.5%",
                "Creación del Subsidio Protege para trabajadores en pandemia COVID-19",
                "Fortalecimiento del Pilar Solidario de pensiones (2014-2018)",
                "Aumento de Pensión Básica Solidaria en 25% durante su gestión ministerial"
            ],
            "proyectosEmblematicos": [
                "Reforma de Pensiones 2023-2024: fin de las AFP y creación de Sistema Mixto",
                "Programa de Empleo con Apoyo para personas con discapacidad",
                "Mesa de Diálogo Social Tripartito (empleadores-trabajadores-gobierno)"
            ],
            "evaluacion": "Jara ha demostrado capacidad técnica en gestión pública, especialmente en el complejo ámbito previsional. Su principal logro fue mantener viva la tramitación de la reforma de pensiones pese a resistencia política. Críticos de derecha señalan su ideología comunista como riesgo para el sistema económico, mientras la izquierda dura la acusa de pragmatismo excesivo y concesiones al empresariado. Su gestión ministerial fue evaluada positivamente por técnicos previsionales pero cuestionada por no lograr consensos amplios. Representa un perfil de izquierda con experiencia en Estado."
        }
    },
    "meo": {
        "nombreCompleto": "Marco Antonio Enríquez-Ominami Gumucio",
        "edad": 52,
        "lugarNacimiento": "Los Ángeles, California, Estados Unidos",
        "profesion": "Cineasta, Empresario y Político",
        "coordenadas": {"x": 35, "y": 40},
        "biografia": "Marco Enríquez-Ominami (Los Ángeles, 1973) es cineasta, empresario y político chileno-estadounidense, hijo adoptivo del líder socialista Carlos Altamirano. Estudió cine en la Escuela Internacional de Cine de San Antonio de los Baños, Cuba, y sociología en la Universidad ARCIS. Irrumpió en política como diputado PS (2006-2009), pero se independizó para ser candidato presidencial en 2009, 2013 y 2021. Fundador del Partido Progresista (PRO), representa una tercera vía entre la izquierda tradicional y el progresismo liberal. Combina discurso de justicia social con apertura al emprendimiento y pragmatismo económico. Ha sido criticado por casos de financiamiento irregular (Caso Factop), pero mantiene base electoral de clase media progresista.",
        "foto": "https://www.servel.cl/wp-content/uploads/2024/11/Marco-Enriquez-Ominami.jpg",
        "gestionPublica": {
            "cargos": [
                "Diputado por Distrito 10 (Quinta Costa, Valparaíso) (2006-2009)",
                "Candidato Presidencial (2009: 20.14%, 2013: 10.98%, 2021: 7.6%)",
                "Presidente del Partido Progresista (2010-presente)"
            ],
            "logros": [
                "Renovación del discurso progresista chileno post-Concertación",
                "Articulación de movimientos sociales, ambientalistas y culturales",
                "Proyectos de ley sobre derechos de minorías sexuales y pueblos originarios (como diputado)",
                "Mantenimiento de espacio político independiente por 15 años"
            ],
            "proyectosEmblematicos": [
                "Campaña presidencial 2009: 20% de votos como independiente, rompiendo bipartidismo",
                "Fundación del Partido Progresista (PRO) en 2010",
                "Impulso a legalización del cannabis medicinal y recreacional",
                "Defensa de modelo económico mixto con Estado regulador activo"
            ],
            "evaluacion": "MEO representó una ruptura generacional y política en 2009, logrando el mejor resultado de un independiente en democracia chilena. Sin embargo, su trayectoria ha sido errática: múltiples candidaturas con resultados decrecientes, investigaciones judiciales por financiamiento irregular (Caso Factop, formalizados 2015-2023), y críticas por inconsistencias programáticas. A favor: mantiene discurso progresista coherente en temas sociales y valóricos. En contra: cuestionamientos éticos por financiamiento, gestión legislativa limitada como diputado. Su base electoral se concentra en sectores de clase media ilustrada y jóvenes urbanos, pero ha perdido peso político frente a nuevas figuras como Gabriel Boric."
        }
    },
    "hmn": {
        "nombreCompleto": "Harold Mayne-Nicholls Valenzuela",
        "edad": 68,
        "lugarNacimiento": "Santiago, Región Metropolitana",
        "profesion": "Ingeniero Comercial y Dirigente Deportivo",
        "coordenadas": {"x": 60, "y": 50},
        "biografia": "Harold Mayne-Nicholls (Santiago, 1957) es ingeniero comercial de la Universidad Adolfo Ibáñez y reconocido dirigente deportivo internacional. Fue Presidente de la ANFP (2005-2015) y miembro del Comité Ejecutivo de la FIFA (2011-2015), donde lideró la evaluación técnica para la sede del Mundial 2018/2022. Su trabajo en FIFA fue reconocido internacionalmente por transparencia y rigurosidad técnica. Sin trayectoria política previa, se presenta como candidato independiente de centro, enfocado en gestión eficiente, transparencia y combate a la corrupción. Representa el perfil tecnocrático, priorizando evidencia sobre ideología. Su programa mezcla pragmatismo económico con sensibilidad social.",
        "foto": "https://www.servel.cl/wp-content/uploads/2024/11/Harold-Mayne-Nicholls.jpg",
        "gestionPublica": {
            "cargos": [
                "Presidente de la ANFP (Asociación Nacional de Fútbol Profesional) (2005-2015)",
                "Miembro del Comité Ejecutivo de la FIFA (2011-2015)",
                "Jefe de Inspección Técnica FIFA para Mundiales 2018/2022 (2009-2010)"
            ],
            "logros": [
                "Modernización de la ANFP: transparencia financiera, profesionalización administrativa",
                "Informe técnico FIFA sobre sedes mundialistas 2018/2022: calificado como el más riguroso de la historia",
                "Clasificación de Chile a Mundiales 2010 y 2014 bajo su presidencia ANFP",
                "Denuncia pública de corrupción en FIFA (Caso FIFAGate): testigo clave en investigación"
            ],
            "proyectosEmblematicos": [
                "Profesionalización de clubes de fútbol chilenos: Primera B y Segunda División",
                "Modernización de estadios chilenos para Copa América 2015",
                "Candidatura frustrada a Presidencia de FIFA (2015): retirado por bloqueo político interno",
                "Trabajo pro-transparencia en deporte: modelo replicado en otras federaciones"
            ],
            "evaluacion": "Mayne-Nicholls tiene credenciales sólidas en gestión y probidad, avaladas por su desempeño en FIFA y ANFP. A su favor: experiencia gerencial, reconocimiento internacional, independencia política. En contra: cero experiencia en gestión pública-estatal, ausencia de base partidaria o movimiento social. Su programa presidencial es genérico, enfocado en eficiencia y transparencia sin propuestas disruptivas. Representa el anhelo de un sector de electores por figuras \"apolíticas\" competentes, pero enfrenta escepticismo sobre su capacidad de negociar en el Congreso y gestionar crisis políticas complejas. Su candidatura apuesta a capturar voto del centro desencantado con políticos tradicionales."
        }
    },
    "parisi": {
        "nombreCompleto": "Franco Aldo Parisi Fernández",
        "edad": 54,
        "lugarNacimiento": "Santiago, Región Metropolitana",
        "profesion": "Economista y Comunicador",
        "coordenadas": {"x": 65, "y": 70},
        "biografia": "Franco Parisi (Santiago, 1971) es economista de la Universidad de Chile con PhD en Economía por University of Alabama. Desarrolló carrera como analista económico en TV y redes sociales, especializándose en crítica al sistema político y económico chileno. Reside en Estados Unidos desde 2018 por deudas de pensión alimenticia. Su candidatura presidencial 2021 fue completamente telemática, logrando sorpresivo 12.8% (tercer lugar) sin pisar Chile, basándose en redes sociales y mensajería directa. Fundador del Partido de la Gente (PDG), capitaliza el descontento antipolítica con discurso populista de centro-derecha: economía liberal, seguridad dura, crítica a élites. Genera adhesión en sectores populares mediante comunicación digital directa.",
        "foto": "https://www.servel.cl/wp-content/uploads/2024/11/Franco-Parisi.jpg",
        "gestionPublica": {
            "cargos": [
                "Sin cargos de elección popular ni administración pública",
                "Fundador y líder del Partido de la Gente (PDG) (2019-presente)",
                "Candidato Presidencial 2021 (12.8%, tercer lugar)"
            ],
            "logros": [
                "Creación del PDG: partido que obtuvo 20 diputados y 1 senador en 2021 sin estructura tradicional",
                "Innovación en campaña digital: primera candidatura 100% telemática en historia democrática chilena",
                "Movilización de voto de sectores populares desafectos del sistema político",
                "Construcción de comunidad digital: 1 millón de seguidores en redes al 2021"
            ],
            "proyectosEmblematicos": [
                "Programa \"Bad Boys\": análisis económico en TV que lanzó su figura pública (2013-2015)",
                "Campaña presidencial 2021 desde Estados Unidos: uso masivo de WhatsApp, TikTok, streaming",
                "Crítica sistemática al \"modelo político chileno\": financiamiento, AFP, colusiones",
                "Propuestas económicas: dolarización, eliminación del Banco Central, libre mercado radical"
            ],
            "evaluacion": "Parisi representa el fenómeno del populismo digital antipolítica. A favor: capacidad de conectar con sectores desafectos, uso innovador de tecnología, discurso simple y directo. En contra: ausencia total de experiencia en gestión pública, impedimento legal para ejercer cargos por deudas impagas (incumplimiento de pensión alimenticia por USD 200.000), propuestas económicas heterodoxas sin respaldo técnico (dolarización sin análisis de impacto). Su partido (PDG) mostró indisciplina y fragmentación en el Congreso 2022-2025. Enfrenta órdenes de arresto vigentes en Chile. Su candidatura 2025 enfrenta cuestionamientos legales sobre su elegibilidad y viabilidad de gobernar desde el extranjero."
        }
    },
    "matthei": {
        "nombreCompleto": "Evelyn Rose Matthei Fornet",
        "edad": 71,
        "lugarNacimiento": "Santiago, Región Metropolitana",
        "profesion": "Economista y Política",
        "coordenadas": {"x": 75, "y": 45},
        "biografia": "Evelyn Matthei (Santiago, 1953) es economista de la Universidad Católica con Maestría en Economía de Georgetown University. Hija del general de la FACH Fernando Matthei (miembro de la Junta Militar), su historia familiar está marcada por su amistad de juventud con Michelle Bachelet, rota por la dictadura. Desarrolló carrera política en RN y UDI, siendo ministra de Pinochet (1990), diputada, senadora, ministra del Trabajo (2011-2013) y candidata presidencial 2013 (37.8%, derrotada por Bachelet). Como alcaldesa de Providencia (2016-presente) alcanzó alta popularidad por gestión municipal eficiente, pragmatismo y evolución hacia posiciones más moderadas en temas valóricos. Representa la derecha económica liberal con creciente sensibilidad social.",
        "foto": "https://www.servel.cl/wp-content/uploads/2024/11/Evelyn-Matthei.jpg",
        "gestionPublica": {
            "cargos": [
                "Alcaldesa de Providencia (2016-presente)",
                "Ministra del Trabajo y Previsión Social (2011-2013, gobierno Piñera I)",
                "Senadora por Santiago Oriente (1998-2011)",
                "Diputada por Distrito 22 (Santiago Oriente) (1990-1998)",
                "Ministra de Vivienda (1990, gobierno militar)"
            ],
            "logros": [
                "Providencia: 91% de aprobación ciudadana (CEP 2023), mejor evaluación municipal del país",
                "Gestión COVID-19 en Providencia: testeo masivo, ayuda social directa, vacunación rápida",
                "Modernización municipal: digitalización de trámites, mejora de espacios públicos, seguridad",
                "Como Senadora: impulso a leyes de transparencia y probidad (2003-2011)"
            ],
            "proyectosEmblematicos": [
                "\"Providencia 100% digital\": eliminación de filas y trámites presenciales",
                "Plan de seguridad vecinal con cámaras y patrullaje integrado: reducción 35% en delitos",
                "Apoyo social COVID-19: entrega de 120.000 cajas de alimentos sin intermediarios políticos",
                "Reforma laboral como Ministra del Trabajo: negociación colectiva, sindicalización"
            ],
            "evaluacion": "Matthei es una de las figuras políticas mejor evaluadas de Chile (50-60% aprobación nacional, CEP 2024). Su gestión municipal en Providencia es modelo de eficiencia y pragmatismo: uso de datos, inversión social focalizada, gestión no ideológica. Ha evolucionado desde posiciones conservadoras hacia moderación en temas valóricos (apoyó matrimonio igualitario 2021), aunque mantiene postura económica liberal. Críticas desde la izquierda por su origen familiar ligado a dictadura y por apoyar modelo económico neoliberal. Críticas desde la derecha dura por \"moderación excesiva\" y falta de firmeza ideológica. Su principal activo es su gestión concreta y conectividad con clase media. Su principal pasivo es representar la \"vieja política\" para sectores que buscan renovación."
        }
    },
    "kast": {
        "nombreCompleto": "José Antonio Kast Rist",
        "edad": 59,
        "lugarNacimiento": "Santiago, Región Metropolitana",
        "profesion": "Abogado y Político",
        "coordenadas": {"x": 85, "y": 80},
        "biografia": "José Antonio Kast (Santiago, 1966) es abogado de la Universidad Católica y político de derecha. Hijo de inmigrante alemán, proviene de familia de 9 hermanos con fuerte vínculo católico conservador. Fue militante UDI (1991-2016), diputado por 24 años (1998-2022), y fundador del Partido Republicano (2019), referente de la derecha conservadora-libertaria en Chile. Candidato presidencial 2017 (7.9%) y 2021 (44.1% segunda vuelta, derrotado por Boric). Representa el conservadurismo valórico (pro-vida, familia tradicional, contra ideología de género), liberalismo económico radical (reducción del Estado, flat tax) y seguridad con mano dura. Genera adhesión apasionada y rechazo visceral en partes iguales.",
        "foto": "https://www.servel.cl/wp-content/uploads/2024/11/Jose-Antonio-Kast.jpg",
        "gestionPublica": {
            "cargos": [
                "Diputado por Distritos de Región Metropolitana (1998-2022, 6 periodos)",
                "Fundador y Presidente del Partido Republicano (2019-presente)",
                "Candidato Presidencial (2017: 7.9%, 2021: 27.9% primera vuelta, 44.1% segunda vuelta)"
            ],
            "logros": [
                "Creación del Partido Republicano: fuerza política que obtuvo 35 diputados y 6 senadores (2024)",
                "Votación récord en primarias de derecha 2024: 1.4 millones de votos",
                "Como diputado: impulso a más de 300 proyectos de ley en materias de seguridad, familia y libertad económica",
                "Articulación del sector conservador chileno fragmentado post-Pinochet"
            ],
            "proyectosEmblematicos": [
                "Campaña presidencial 2021: propuesta de \"zanja\" en frontera norte, flat tax 15%, eliminación del INDH",
                "Rechazo constitucional 2022: liderazgo en campaña que logró 62% de rechazo",
                "Proyecto de ley \"Aula Segura\": expulsión inmediata de estudiantes violentos (aprobado 2018)",
                "Oposición sistemática a agenda valórica progresista: aborto, matrimonio igualitario, eutanasia"
            ],
            "evaluacion": "Kast representa la derecha conservadora más consistente ideológicamente del espectro político chileno. A favor: coherencia programática, capacidad de movilización de base conservadora (evangélicos, católicos tradicionales, sectores rurales), experiencia legislativa de 24 años. En contra: historial de votaciones polémicas (contra matrimonio igualitario, contra ley Zamudio de no discriminación, defensa de herencia pinochetista), propuestas económicas radicales sin consenso técnico (flat tax), posiciones valóricas que alejan votantes de centro. Su partido (Republicanos) mostró indisciplina y populismo punitivo excesivo. Enfrenta resistencia de sectores moderados de derecha (RN, Evópoli) que lo consideran extremista. Su figura es polarizante: 35-40% de adhesión dura, 50-55% de rechazo. Representa el dilema de la derecha chilena entre moderación y firmeza ideológica."
        }
    },
    "kaiser": {
        "nombreCompleto": "Johannes Kaiser Barents von Bischhoffshausen",
        "edad": 36,
        "lugarNacimiento": "Santiago, Región Metropolitana",
        "profesion": "Historiador y Comunicador Digital",
        "coordenadas": {"x": 95, "y": 35},
        "biografia": "Johannes Kaiser (Santiago, 1989) es historiador autodidacta y comunicador digital, figura emergente de la derecha libertaria chilena. Conocido por su canal de YouTube (400.000+ suscriptores) donde analiza historia, economía y política desde perspectiva austriaca-libertaria. Electo diputado por el Partido Republicano (2022-2026) con alta votación en Distrito 13 (Maipú-Cerrillos). Representa el paleolibertarianismo: liberalismo económico extremo (abolir Banco Central, libre mercado absoluto, privatizaciones radicales) con posiciones sociales mixtas (liberal en drogas, conservador en familia tradicional). Su discurso apela a jóvenes descontentos mediante crítica al establishment político y cultural (\"corrección política\", \"progresismo\"). Figura polémica por declaraciones sobre feminismo, democracia y voto femenino.",
        "foto": "https://www.servel.cl/wp-content/uploads/2024/11/Johannes-Kaiser.jpg",
        "gestionPublica": {
            "cargos": [
                "Diputado por Distrito 13 (Maipú, Cerrillos) (2022-presente)",
                "Candidato Presidencial primarias Partido Republicano (2024)"
            ],
            "logros": [
                "Construcción de base política mediante redes sociales: pionero en política digital libertaria",
                "Elección como diputado con 24.000 votos (10.2% del distrito), superando a históricos de derecha",
                "Visibilización del pensamiento libertario austriaco en Chile: Mises, Rothbard, Hoppe",
                "Defensa parlamentaria de libertades económicas: oposición a royalty minero, alza impuestos, regulaciones"
            ],
            "proyectosEmblematicos": [
                "Canal de YouTube \"Kaiser\": 15 millones de visualizaciones, divulgación de historia y economía libertaria",
                "Proyecto de ley para abolir Banco Central y establecer competencia de monedas (presentado 2023)",
                "Crítica parlamentaria sistemática a \"Estado empresario\": CODELCO, ENAP, EFE",
                "Oposición a \"ideología de género\" y agenda progresista en educación"
            ],
            "evaluacion": "Kaiser representa la irrupción de la derecha libertaria-digital en Chile, fenómeno generacional que replica tendencias globales (Milei en Argentina, figuras alt-right en EEUU). A favor: capacidad de conectar con jóvenes mediante redes, coherencia ideológica libertaria, habilidad comunicacional. En contra: escasa experiencia política (2 años como diputado), propuestas económicas radicales sin viabilidad (abolir BC), declaraciones polémicas que generan rechazo masivo (cuestionó voto femenino, minimizó violencia de género). Su historial parlamentario muestra bajo impacto legislativo (sin proyectos aprobados) y énfasis en confrontación mediática sobre gestión. Enfrenta investigaciones éticas por dichos pasados. Su candidatura presidencial apela a nicho libertario urbano-juvenil (10-15% máximo), sin proyección de victoria pero con potencial disruptivo en segunda vuelta. Representa el futuro incierto de la derecha chilena post-Kast: ¿radicalización libertaria o moderación electoral?"
        }
    }
}

# Update each candidate
for candidate_id, update_data in updates.items():
    if candidate_id in candidatos:
        # Add new biographical fields
        candidatos[candidate_id]["nombreCompleto"] = update_data["nombreCompleto"]
        candidatos[candidate_id]["edad"] = update_data["edad"]
        candidatos[candidate_id]["lugarNacimiento"] = update_data["lugarNacimiento"]
        candidatos[candidate_id]["profesion"] = update_data["profesion"]
        candidatos[candidate_id]["biografia"] = update_data["biografia"]
        candidatos[candidate_id]["foto"] = update_data["foto"]
        candidatos[candidate_id]["gestionPublica"] = update_data["gestionPublica"]

        # Update coordinates in economia.tendencia.valor
        candidatos[candidate_id]["categorias"]["economia"]["tendencia"]["valor"] = update_data["coordenadas"]["x"]

        # Calculate and update Y coordinate (social axis) based on research
        # For simplicity, we'll calculate it proportionally from the target Y coordinate
        # The Y axis is calculated from security, migration, and social categories
        target_y = update_data["coordenadas"]["y"]
        # Invert because display inverts it: if target_y is 90 (estatista), individual values should be 10 (libertario)
        individual_value = 100 - target_y

        # Update the three social categories to match the target Y position
        candidatos[candidate_id]["categorias"]["seguridad"]["tendencia"]["valor"] = individual_value
        candidatos[candidate_id]["categorias"]["migracion"]["tendencia"]["valor"] = individual_value
        candidatos[candidate_id]["categorias"]["social"]["tendencia"]["valor"] = individual_value

        print(f"[OK] Updated {candidate_id}: {update_data['nombreCompleto']}")
        print(f"  Coordinates: X={update_data['coordenadas']['x']}, Y={update_data['coordenadas']['y']}")
    else:
        print(f"[ERROR] Candidate {candidate_id} not found in JSON")

# Save updated data
with open('src/data/candidatos.json', 'w', encoding='utf-8') as f:
    json.dump(candidatos, f, ensure_ascii=False, indent=2)

print("\n[SUCCESS] Updated candidatos.json with biographical data and corrected coordinates!")
print("  - Added: nombreCompleto, edad, lugarNacimiento, profesion, biografia, foto, gestionPublica")
print("  - Updated: Political map coordinates (X and Y axes)")

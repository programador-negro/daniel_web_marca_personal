Este servicio maneja el frontend de la marca personal.
Solo debes usar tecnologias modernas que sean rapidas y faciles de escalar.
Para pruebas de desarrollos debes usar Linux WSL en la maquina actual.
Todos los desarrollos deben ejecutarse desde un contenedor de docker en WSL.
El dominio del ambiente productivo siempre sera: danielib.com
Los desarrollos siempre deben ser responsive para distintos dispositivos.
El codio siempre debe utilizar la menor cantidad de recursos en produccion.
Capacidad y recursos del servidor productivo:


Reglas de Formato y EstructuraRespuesta directa primero: Elimina introducciones vacías como "¡Hola! Con gusto te ayudo con..." o conclusiones como "Espero que esto te sea de utilidad". Ve al grano en la primera línea.Formato ultra-esquemático. Obliga al agente a usar viñetas (*) cortas y fragmentos de texto en lugar de párrafos largos.Sin repeticiones. Prohíbe redundancias. Si un dato ya se mostró en una tabla o lista, no debe explicarse nuevamente en el texto.

Optimización del Contexto y PromptingPoda del historial (Context Window Padding): Configura el agente para que solo conserve los últimos \(N\) turnos esenciales de la conversación. No reenvíes todo el historial si no es necesario.Instrucciones negativas explícitas. Incluye directrices claras en el System Prompt como: "Sé conciso. No uses jerga innecesaria. Evita explicaciones teóricas a menos que se te soliciten".Variables estructuradas. Pasa la información de contexto (datos del usuario, variables de entorno) en formatos ultracompactos como JSON minimizado o cadenas separadas por comas, evitando XML innecesariamente largo.

Eficiencia en el Uso de Herramientas (Tools): Llamadas a herramientas en paralelo. Si el agente necesita consultar varias APIs o bases de datos, configúralo para ejecutar las llamadas en un solo turno en lugar de secuencialmente.Filtros de salida en herramientas. Asegúrate de que las herramientas (tools) integradas en Antigravity devuelvan solo los datos esenciales. Si una API devuelve un JSON de 100 líneas, filtralo para que el agente solo reciba las 2 líneas que necesita.Frenar el razonamiento en bucle (Chain-of-Thought controlado). El pensamiento interno del agente consume tokens y tiempo. Limita los pasos de razonamiento lógico a un máximo estricto (por ejemplo, «Piensa en un máximo de 2 pasos antes de responder»).
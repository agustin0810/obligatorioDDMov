# Entrega obligatorio DD. Móviles
## Integrantes: Leandro Miranda y Agustin Maciel
Repositorio para desarrollo del obligatorio de DDMoviles - Leandro Miranda y Agustin Maciel.

### ÍNDICE.
<b>1. [Lectura del problema](#lectura-del-problema)</b>
<br><b> 2. [Casos de uso](#casos-de-uso)</b>
<br><b> 3. [Diseño de la interfaz grafica](#dise%C3%B1o-de-interfaz-gr%C3%A1fica)</b>
<br><b> 4. [Problemas surgidos](#problemas-surgidos)</b>
<br><b> 5. [Diseño del sistema](#diseño-del-sistema)</b>
<br><b> 6. [MER](#mer)</b>
<br><b> 7. [Enlaces y adjuntos](#enlaces-y-adjuntos)</b>

### Lectura del problema.
La aplicación surge a partir de algunos requerimientos proporcionados por la
empresa cliente, que tiene la necesidad de plasmar su realidad actual, de una
forma automatizada informáticamente para lograr una mayor eficiencia.
A partir de esta lectura se resuelve lo siguiente:

 - Permitir administrar Usuarios, Autos, Tratamientos, Insumos y
   Repuestos con sus atributos correspondientes.
 - Mostrar al usuario listados específicos.

	
Además de estos requerimientos funcionales, se definen de igual forma
algunos no funcionales.

 - La persistencia de los datos se debe abordar de forma que cada
   usuario pueda ver sus propios activos, por esto se acuerda el uso del
   gestor sqlite.
 - La amigabilidad de la interfaz gráfica se considera importante, por
   esto se busca impulsar el uso de prácticas y librerías que reflejen
   en la aplicación pantallas sencillas y claras.

 ### Casos de uso.
Las funcionalidades de la aplicación se adaptan a lo pedido por letra, pudiendo cumplir con absolutamente todo lo que se requiere por parte del cliente. Para presentar al usuario una aplicación que cumpla las expectativas, se diseñaron distintas pantallas para gestionar los activos que se mencionan en la letra. A modo de ejemplo, tomamos como objeto de este análisis a los usuarios para brindar una especie de manual que servirá al usuario como guía al momento de utilizar la aplicación.

Estos son algunos casos de uso:

 - Visualización de activos:
Se busca con esta pantalla que el usuario tenga acceso a visualizar y buscar las características de cada objeto que le parezcan pertinentes.
Además dentro de cada ítem, se da la posibilidad de eliminar o modificar las características.
Aplica actualmente a todos los objetos.
<img src="https://i.imgur.com/MnsCT7j.jpg" alt="Pantalla de visualización" width="150" title="Pantalla de visualización">

 - Eliminado de activos:
Como se especifica en la ventana anterior, dentro de cada ítem visualizado se puede realizar el borrado de cada objeto.
Aplica actualmente a todos los objetos

 - Alta de activos:
Además, se introduce la funcionalidad de realizar el agregado de objetos a la base de datos, estas pantallas constan de formularios sencillos que permiten al usuario ingresar los datos correspondientes.
Aplica actualmente a todos los objetos.

<img src="https://i.imgur.com/IgArJJ0.jpg" width="150" alt="Pantalla de agregado" title="Pantalla de agregado">

 - Modificación de activos:
Para el modificado de activos, la pantalla presenta un diseño muy similar al de la pantalla de agregado, con diferencias al momento de rellenar los campos, ya que estos se completan automáticamente con los datos del activo seleccionado.
Aplica actualmente a todos los activos.

<img src="https://i.imgur.com/mwv1omw.jpg" width="150" alt="Pantalla de modificado" title="Pantalla de modificado">

### Diseño de interfaz gráfica.
Algunas consideraciones que tuvimos en cuenta a la hora de diseñar la interfaz gráfica fueron las siguientes:

• La aplicación no será utilizada por personas especializadas en el área IT, por ende la interfaz debe ser sumamente amigable y presentar componentes agradables e intuitivos.
• El diseño de las pantallas de cada activo deben ser similares entre sí para facilitar el proceso de aprendizaje del uso de la aplicación.
• Presentar una interfaz sencilla con colores no muy llamativos, para representar la seriedad y la característica de la empresa (en este caso se utilizó el color azul).
Estas aclaraciones se suman a los requerimientos dados por letra.

### Problemas surgidos.
Entre los principales problemas, se presentaron demoras a la hora de conectar la aplicación con la base de datos. Esto significa el tiempo de análisis, elección (de la forma en que se iba a utilizar la base de datos), diseño del modelo y creación de la base de datos.
Luego se presentaron problemas a la hora de integrar la librería expo-sqlite en el sistema, pero refiriendo a documentación y artículos lograron ser solucionados, resultando en una aplicación completamente persistente de forma local, tal como lo piden los requerimientos.
A estos contratiempos se le suman demoras generales, en cuanto a tiempos de cada integrante, conocimientos de cada uno, aprendizaje y puesta en común de los cambios. Siendo en esta última actividad muy importante el hecho de dedicar tiempo a utilizar la herramienta Github para reunir los cambios y analizar posibles errores de la aplicación.

### Diseño del sistema.
Además de lo mencionado anteriormente, se toman algunas decisiones con respecto al sistema y la forma en que se manejan los datos.
Sin dejar fuera los requerimientos que se imparten en la letra, consideramos que, principalmente en las entidades relacionadas a los tratamientos, debíamos realizar algunos cambios para cumplir con lo que el cliente pide.

En la sección de la letra donde se detalla la información con respecto a los tratamientos, insumos y repuestos, se menciona que la relación entre cualquiera de los dos últimos y los tratamientos es Na1. Por lo tanto un insumo o repuesto va a pertenecer a una reparación y una reparación va a tener varios insumos o repuestos.
Sin embargo, en la lista de detalles de cada activo del cliente, existe una relación de dependencia en tratamientos, es decir que los tratamientos tienen en su entidad un valor que se liga con un tratamiento o un repuesto.

A partir de esto, se decidió invertir un poco el diseño y agregar en insumos y repuestos un atributo que referencie al tratamiento, así cumpliendo con lo de que un tratamiento puede tener varios insumos o repuestos, y a su vez un repuesto o insumo pertenece a un solo tratamiento.
También cabe aclarar que la entidad repuesto e insumo incluye la cantidad de los mismo que se utilizan en la reparación, por esto es que se puede relacionar directamente con un tratamiento, sin tener una ‘relación’ de por medio.

### MER.

<img src="https://i.imgur.com/5CS2fuz.png" width="650" alt="MER" title="MER">

### Enlaces y adjuntos.

Esta sección se reserva para información anexa al proyecto, presentando la aplicación y concluyendo con un vídeo demostrativo de la aplicación en funcionamiento.

Algunas capturas adicionales:	

<img src="https://i.imgur.com/I1wTEzB.jpg" width="150" alt="Captura de modificación" title="Captura de modificación">
<img src="https://i.imgur.com/MnsCT7j.jpg" width="150" alt="Captura de visualización" title="Captura de visualización">
<img src="https://i.imgur.com/86SSfAr.jpg" width="150" alt="Captura de listado detallado" title="Captura de listado detallado">
<img src="https://i.imgur.com/Ru5h32X.jpg" width="150" alt="Captura de activo eliminado" title="Captura de activo eliminado">
<img src="https://i.imgur.com/IgArJJ0.jpg" width="150" alt="Captura de agregado de activo" title="Captura de agregado de activo">

Video demostrativo https://www.youtube.com/watch?v=AM8wesqe7zo&ab_channel=AgustinMaciel

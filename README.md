# Primera entrega obligatorio DD. Móviles
## Integrantes: Leandro Miranda y Agustin Maciel
Repositorio para desarrollo del obligatorio de DDMoviles - Leandro Miranda y Agustin Maciel.

### ÍNDICE.
<b>1. [Lectura del problema](#lectura-del-problema)</b>
<br><b> 2. [Casos de uso](#casos-de-uso)</b>
<br><b> 3. [Próximos avances](#pr%C3%B3ximos-avances)</b>
<br><b> 4. [Problemas surgidos](#problemas-surgidos)</b>



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
Las funcionalidades realizadas hasta la fecha se centran en la visualización y
administración de los activos que más destacan en la aplicación.
Esto significa que al día de la fecha, se entrega un sistema capaz de
administrar usuarios y vehículos.
Estos son algunos casos de uso:

 - Visualización de activos:
Se busca con esta pantalla que el usuario tenga acceso a visualizar y
buscar las características de cada objeto que le parezcan pertinentes.
Además dentro de cada ítem, se da la posibilidad de eliminar o modificar las
características.
Aplica actualmente a Usuarios, Autos y Reparaciones.

 - Eliminado de activos:
Como se especifica en la ventana anterior, dentro de cada ítem
visualizado se puede realizar el borrado de cada objeto.
Aplica actualmente a Usuarios, Autos y Reparaciones.

 - Alta de activos:
Además, se introduce la funcionalidad de realizar el agregado de
objetos a la base de datos, estas pantallas constan de formularios sencillos
que permiten al usuario ingresar los datos correspondientes.
Aplica actualmente a Usuarios, Autos y Reparaciones.

 - Modificación de activos:
Para el modificado de activos, la pantalla presenta un diseño muy
similar al de la pantalla de agregado, con diferencias al momento de rellenar
los campos, ya que estos se completan automáticamente con los datos del
activo seleccionado.
Aplica actualmente a Usuarios, Autos y Reparaciones.

### Próximos avances.
Con los avances realizados hasta el día de hoy consideramos que la
coordinación de los próximos pasos va está relacionada con el desarrollo de
los puntos restantes que consideramos en el documento anteriormente.
Entre ellos destacamos los siguientes como más próximos:
 - Desarrollar la creación, borrado, administración y listado de
Repuestos e Insumos.
 - Validar los campos y crear restricciones de identidad entre los
distintos objetos.

### Problemas surgidos.
Entre los principales problemas, se presentaron demoras a la hora de
conectar la aplicación con la base de datos. Esto significa el tiempo de
análisis, elección (de la forma en que se iba a utilizar la base de datos),
diseño del modelo y creación de la base de datos.
Luego se presentaron problemas a la hora de integrar la librería expo-sqlite
en el sistema, pero refiriendo a documentación y artículos lograron ser
solucionados, resultando en una aplicación completamente persistente
localmente, tal como lo piden los requerimientos

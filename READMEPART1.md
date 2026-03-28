# Event Filters with URL State
## Parte 1 del laboratorio
#### Link del video de explicación: https://drive.google.com/file/d/1wYiz2rbOlmO7d6zt18KFup2GQt_ZDqk1/view?usp=drive_link

En esta parte se modifico el proyecto para que se pueda hacer busqueda con hasta 3 filtros de categoria, precio y estado, y que dichos filtros se vean reflejados en la URL sin necesidad de
recargar la pagina siempre para reflejar los cambios y asegurarse de que persistan si se recarga la pagina, a su vez se añadio la funcionalidad total al boton de limpiar filtros para
asegurarse que su efecto se reflejara tanto en el funcionamiento de la busqueda como en el apartado visual para indicar al usuario que todos los filtros se limpiaron.

## Definition of Done

| Criterio            | Descripción                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| Actualización URL  | Seleccionar un filtro cambia la URL (?category=music)                       |
| Filtros persisten       | Recargar la página mantiene los filtros                              |
| Filtrado en servidor | Los filtros se aplican en el servidor, no en el cliente                   |
| Estado activo      | Filtros seleccionados resaltados visualmente                           |
| Botón de reinicio  | "Limpiar todo" restablece los filtros                                       |
| Filtros combinados | Se pueden usar múltiples filtros al mismo tiempo                            |
| Estado vacío       | Muestra "No se encontraron eventos" cuando no hay resultados                |



# Optimistic Event Registration
## Parte 2 del laboratorio
#### Link del video de explicación: https://drive.google.com/file/d/1QPPWtLKefpdzs65uCJgJYte706XNyeQs/view?usp=drive_link

En esta parte se añadio la funcionalidad de registrarse a un evento de manera correcta siguiendo las restricciones correspondientes, como disponibilidad del evento y cantidad de espacios
restantes para registrarse, asegurandose de que el registro funcionara correctamente y sin errores inesperados respetando todos los limites necesarios.

## Definition of Done

| Criterio              | Descripción                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| Retroalimentación inmediata | El contador aumenta inmediatamente al hacer clic                     |
| Uso de useOptimistic | Implementa el hook useOptimistic de React 19                                |
| Botón deshabilitado  | No se puede hacer clic mientras se está registrando                         |
| Manejo de errores    | Revierte el contador si el servidor falla                                   |
| Mensaje de éxito     | Muestra confirmación después del éxito                                  |
| Verificación de capacidad | No permite registrarse si el evento está lleno                         |
| Indicador de carga   | Muestra un spinner durante la acción                                        |


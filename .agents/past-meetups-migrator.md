---
name: past-meetups-migrator
description: Mueve un meetup que ya ocurrio al archivo de eventos pasados y deja los demas proximos. Usalo cuando un meetup ya ocurrio y hay que pasarlo a la galeria.
---

# Past meetups migrator

Antes de mover nada, pregunta esto y espera la respuesta:

Hay algun meetup planeado para registrarlo despues de la migracion?

## Migrar el que ya ocurrio

Si `upcomingEvents` en `src/features/events/upcoming.ts` esta vacio, no hay nada que migrar. Dilo y no inventes un evento pasado.

Si hay eventos, mueve solo el que ya ocurrio. Deja los demas en la lista.

1. Copia su carpeta al archivo de pasados, en `src/features/events/`. No borres los originales de promo hasta que la copia este registrada.
2. Registralo al inicio de `pastEvents` en `src/features/events/index.ts`. El mas nuevo va primero.
3. El tipo pasado pide `photos`. Dejalo en `[]` si todavia no hay galeria.
4. Quitale ese evento a `upcomingEvents`. No vacies la lista si quedan otros.

## Despues de migrar

Si `upcomingEvents` queda vacio, `/eventos/proximos` muestra este texto, sin cambiarle una letra:

Ups! Por el momento no hay eventos planeados, vuelve aqui despues para ver si hay algo ;)

Si quedan proximos, dejalo asi. Si ademas hay uno nuevo por registrar, no lo crees en este paso. Pasa primero por `upcoming-meetups-checker`: foto de Luma, link de Luma, flyers del programa, nombre, fecha textual y ubicacion.

Recuerda pedir la galeria de fotos del evento que acabas de pasar al archivo, para integrarla en ese evento pasado. La primera foto es el mosaico ancho de arriba; suele ser la foto de grupo. No inventes fotos ni nombres de personas. Hasta que lleguen, esa pagina pasada muestra el ticket de Luma y el programa, y no muestra la seccion Fotos.

# SpaceXSI Villahermosa

Sitio en Next.js para SpaceXSI Villahermosa, desplegado en Vercel.

## Requisitos

- Node.js 26, la misma versión de `.nvmrc`, de `engines` en `package.json` y del build de Vercel. Con nvm: `nvm use`.
- pnpm 12.15, la versión de `packageManager`. Node 26 ya no trae Corepack: `npm i -g pnpm@12.15.0`.

## Desarrollo

```bash
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variables de entorno

Las dos son opcionales y solo afectan a las páginas de créditos. Para desarrollo, copia `.env.example` a `.env.local`; en Vercel, agrégalas en Settings > Environment Variables.

| Variable            | Si existe                                                                                                    | Si no existe                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| `CREDITS_CLAIM_URL` | En `/creditos/con-cuenta`, "Canjear créditos" muestra un QR con este link y el botón "Canjear ahora" lo abre | Ese flujo muestra el aviso de que no hay ningún evento en curso, sin QR ni botón |
| `LUMA_EVENT_URL`    | El logo de Luma, arriba a la derecha, abre el evento en otra pestaña                                         | No se muestra el logo                                                            |

`/creditos/sin-cuenta` no usa `CREDITS_CLAIM_URL`: tiene su propio link fijo. Solo cuentan los links `http://` o `https://`. Las páginas se generan en el build, así que cambiar una variable requiere un nuevo deploy.

## Créditos

`/creditos` es un menú sobre la propia página de créditos, desenfocada, con dos opciones. Cada una abre su flujo, y los dos pintan la misma página (`CreditsWall`); solo cambia el link que canjean.

| Ruta                   | Pregunta                                     | Link que canjea                                                                                        |
| ---------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `/creditos/con-cuenta` | ¿Ya tienes una cuenta con o sin suscripción? | El de `CREDITS_CLAIM_URL`. Sin él, no hay QR ni botón                                                  |
| `/creditos/sin-cuenta` | ¿Todavía no tienes una cuenta?               | Siempre el de `TRIAL_CLAIM_URL`, en `src/features/credits/claim-links.ts`: no depende de ningún evento |

Bajo el QR, el botón "Canjear ahora" abre el mismo link. Los flujos llevan `noindex` porque su HTML trae el link de canje.

El Grok Bot de las páginas de créditos es un port de [grok-bot-meetup](https://github.com/MatiasBoldrini/grok-bot-meetup). Su motor, en `src/lib/grok-bot/`, es de Jérémy Perret, con licencia MIT.

## Build de producción

```bash
pnpm build
pnpm start
```

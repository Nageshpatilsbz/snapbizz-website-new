import { renderToReadableStream, renderToString } from 'react-dom/server'
import App from './App'
import { pages, getPage } from './lib/seo'

export { pages, getPage }

export async function render(pathname: string): Promise<string> {
  const errors: unknown[] = []
  const stream = await renderToReadableStream(<App pathname={pathname} />, { onError: (error) => { errors.push(error) } })
  await stream.allReady
  if (errors.length) throw new AggregateError(errors, `Unable to prerender ${pathname}`)
  await stream.cancel()
  return renderToString(<App pathname={pathname} />)
}

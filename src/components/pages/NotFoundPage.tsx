import { Container } from '../ui/Container'
import { Button } from '../ui/Button'

export function NotFoundPage() {
  return (
    <section className="brand-wash min-h-[70vh] pb-20 pt-32">
      <Container>
        <p className="font-semibold text-brand-blue-dark">404</p>
        <h1 className="mt-4 text-4xl font-bold">Page not found</h1>
        <p className="my-6">This address does not match a SnapBizz page. Explore our solutions or return to the homepage.</p>
        <Button href="#top">Back to home</Button>
      </Container>
    </section>
  )
}

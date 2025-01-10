import Container from "./Container.tsx";

export default function Footer() {
  return (
    <footer className="py-4">
      <Container>
        <p className="text-center font-bold text-neutral-600">
          Developer:{" "}
          <a
            href="https://o-veselyi.vercel.app/"
            target="_blank"
            className="text-yellow-600 underline hover:no-underline"
          >
            sany0chekk
          </a>
        </p>
      </Container>
    </footer>
  );
}

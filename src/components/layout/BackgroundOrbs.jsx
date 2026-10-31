export default function BackgroundOrbs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div
        className="orb -left-24 top-10 h-96 w-96"
        style={{ background: "var(--orb-1)" }}
      />
      <div
        className="orb -right-32 top-1/3 h-[28rem] w-[28rem]"
        style={{ background: "var(--orb-2)", animationDelay: "-7s" }}
      />
      <div
        className="orb bottom-0 left-1/3 h-80 w-80"
        style={{ background: "var(--orb-3)", animationDelay: "-10s" }}
      />
    </div>
  );
}
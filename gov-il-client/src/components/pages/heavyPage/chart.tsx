export default function HeavyChart() {
  const now = performance.now();
  while (performance.now() - now < 1000);
  
  return <h1> Heavy Chart</h1>;
}

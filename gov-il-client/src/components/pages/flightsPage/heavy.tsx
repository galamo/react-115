export default function HeavyCalenderComponent() {
  const now = performance.now();
  while (performance.now() - now < 1000);

  return <div> Finished Loaded Heavy Component</div>;
}

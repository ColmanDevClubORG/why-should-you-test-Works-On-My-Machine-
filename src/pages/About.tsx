export const About = () => {
  return (
    <div className="app-container">
      <header>
        <h1>About This Project</h1>
        <p className="subtitle">Learning the ropes of modern web testing.</p>
      </header>

      <main className="card" style={{ textAlign: 'left', maxWidth: '800px' }}>
        <h2>The Vision</h2>
        <p>
          Testing isn't just about finding bugs; it's about providing a safety net that allows developers to move fast and break things... without breaking the entire production environment.
        </p>
        <h2>What we cover:</h2>
        <ul>
          <li><strong>Unit Testing:</strong> Testing individual functions and components in isolation (Vitest).</li>
          <li><strong>Component Testing:</strong> Testing UI interactions and states (Storybook).</li>
          <li><strong>E2E Testing:</strong> Testing the entire user journey from start to finish (Playwright).</li>
        </ul>
      </main>
    </div>
  );
};

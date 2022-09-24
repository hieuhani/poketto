export const NetworksView: React.FunctionComponent = () => {
  return (
    <div className="flex flex-col">
      <button className="px-3 py-2 text-left">
        <h3>Devnet</h3>
        <p>https://fullnode.devnet.aptoslabs.com</p>
      </button>
      <button className="px-3 py-2 text-left">
        <h3>Localhost</h3>
        <p>http://0.0.0.0:8080</p>
      </button>
    </div>
  );
};

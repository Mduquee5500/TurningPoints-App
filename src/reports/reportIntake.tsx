export default function ReportIntake() {
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold">Intake Reporting</h3>
      <form className="mt-4">
        <div className="mb-4">
          <label className="block">Field 1</label>
          <input
            className="input"
            type="text"
            placeholder="Enter information"
          />
        </div>
        <div className="mb-4">
          <label className="block">Field 2</label>
          <input
            className="input"
            type="text"
            placeholder="Enter information"
          />
        </div>
      </form>
    </div>
  );
}

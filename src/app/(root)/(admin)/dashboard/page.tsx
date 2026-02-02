export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Welcome back 👋</h1>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border p-4">Card 1</div>
        <div className="rounded-lg border p-4">Card 2</div>
        <div className="rounded-lg border p-4">Card 3</div>
        <div className="rounded-lg border p-4">Card 4</div>
      </div>
    </div>
  )
}

export default function SpecializationDetailPage({
  params,
}: {
  params: { programId: string; specializationId: string }
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1>Specialization: {params.specializationId}</h1>
      {/* Will show Lessons */}
    </div>
  )
}

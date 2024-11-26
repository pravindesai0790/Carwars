export default async function Details({params}: {params: {id: string}}) {
  const {id} = await params;
  return (
    <div>Details for {id}</div>
  )
}
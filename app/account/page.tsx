export default function Account({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log(searchParams);

  if (!searchParams.code) return <p>You must login first</p>;

  return <p>Account info</p>;
}

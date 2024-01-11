export default function CustomerInfo({
  displayName,
  address,
  email,
  phone
}: {
  displayName: string;
  address?: string;
  email?: string | null;
  phone?: string;
}) {
  return (
    <div className="mb-6 grid gap-4 px-4 sm:grid-cols-2">
      <p>Full name: {displayName}</p>
      <p className="sm:col-start-1 sm:row-start-2">Address: {address}</p>
      <p className="sm:col-start-2 sm:row-start-1">E-mail: {email}</p>
      <p>Phone number: {phone}</p>
    </div>
  );
}

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
    <div className="grid grid-cols-2 gap-4">
      <p>Full name: {displayName}</p>
      <p className="col-start-1 row-start-2">Address: {address}</p>
      <p className="col-start-2 row-start-1">E-mail: {email}</p>
      <p>Phone number: {phone}</p>
    </div>
  );
}

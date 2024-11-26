import { fetchCustomerById, fetchCustomers } from "@/app/lib/data";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const customers = await fetchCustomers();

  return customers.map((customer) => ({
    id: customer.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const id = (await params).id;

  const customer = await fetchCustomerById(id);

  return {
    title: customer.name,
    openGraph: {
      images: [customer.image_url],
    },
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const customer = await fetchCustomerById(id);
  if (!customer) {
    notFound();
  }
  return (
    <main>
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-gray-500">Name: {customer.name}</p>
        <p className="text-sm text-gray-500">Email: {customer.email}</p>
        <Image
          src={customer.image_url}
          className="rounded-full"
          alt={`${customer.name}'s profile picture`}
          width={100}
          height={100}
        />
      </div>
    </main>
  );
}

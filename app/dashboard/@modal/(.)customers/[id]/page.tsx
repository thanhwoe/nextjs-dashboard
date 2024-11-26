import { fetchCustomerById } from "@/app/lib/data";
import { Modal } from "@/app/ui/modal";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const customer = await fetchCustomerById(id);

  return (
    <Modal>
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
    </Modal>
  );
}

import { notFound, redirect } from "next/navigation";
import PaymentContent from "@/components/modules/Tourist/Payment/PaymentContent";

interface PaymentPageProps {
  params: {
    bookingId: string;
  };
}

import { getBookingById } from "@/services/tourist/booking.service";
import { getUserInfo } from "@/services/auth/getUserInfo";

async function getBookingDetails(bookingId: string) {
  try {
    const result = await getBookingById(bookingId);
    
    if (!result.success) {
      return null;
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching booking:", error);
    return null;
  }
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  const { bookingId } = await params;
  const booking = await getBookingDetails(bookingId);
  const user = await getUserInfo()
  if (!booking) {
    notFound();
  }

  // If already paid, redirect to booking details
  if (booking.paymentStatus === "SUCCEEDED") {
    redirect(`/dashboard/bookings/${bookingId}`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <PaymentContent booking={booking} user={user} />
    </div>
  );
}

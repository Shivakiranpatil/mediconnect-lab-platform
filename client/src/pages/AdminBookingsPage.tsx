import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Filter, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Appointment } from "@shared/schema";

export default function AdminBookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Appointment | null>(null);

  const { data: bookings = [], isLoading } = useQuery<Appointment[]>({
    queryKey: ['/api/admin/bookings'],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest('PATCH', `/api/admin/bookings/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/bookings'] });
      setSelectedBooking(null);
    },
  });

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = !searchTerm || 
      booking.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.address?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      confirmed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      collected: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    return (
      <Badge className={`${styles[status] || styles.pending} border capitalize`}>
        {status}
      </Badge>
    );
  };

  const mockBookings: Appointment[] = [
    { id: 'BK-001', userId: '1', labId: '1', bundleId: '1', status: 'pending', appointmentTime: new Date(), address: 'Business Bay, Dubai', city: 'Dubai', totalPrice: '699', paymentStatus: 'pending', notes: '', createdAt: new Date() },
    { id: 'BK-002', userId: '2', labId: '1', bundleId: '2', status: 'confirmed', appointmentTime: new Date(), address: 'Marina, Dubai', city: 'Dubai', totalPrice: '349', paymentStatus: 'paid', notes: '', createdAt: new Date() },
    { id: 'BK-003', userId: '3', labId: '2', bundleId: '1', status: 'completed', appointmentTime: new Date(), address: 'JBR, Dubai', city: 'Dubai', totalPrice: '199', paymentStatus: 'paid', notes: '', createdAt: new Date() },
    { id: 'BK-004', userId: '4', labId: '2', bundleId: '3', status: 'cancelled', appointmentTime: new Date(), address: 'Downtown, Dubai', city: 'Dubai', totalPrice: '449', paymentStatus: 'refunded', notes: '', createdAt: new Date() },
  ];

  const displayBookings = bookings.length > 0 ? filteredBookings : mockBookings;

  return (
    <AdminLayout title="Bookings" subtitle="Manage all customer bookings">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                data-testid="input-search-bookings"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white" data-testid="select-status-filter">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="collected">Collected</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-700/30">
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Booking ID</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Date</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Location</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Payment</th>
                <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Amount</th>
                <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-400">
                    <Clock className="w-8 h-8 mx-auto mb-2 animate-spin" />
                    Loading bookings...
                  </td>
                </tr>
              ) : displayBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-400">
                    No bookings found
                  </td>
                </tr>
              ) : (
                displayBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-700/20 transition-colors" data-testid={`row-booking-${booking.id}`}>
                    <td className="px-6 py-4 text-sm font-medium text-white">{booking.id}</td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {booking.appointmentTime ? new Date(booking.appointmentTime).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">{booking.address || booking.city}</td>
                    <td className="px-6 py-4">{getStatusBadge(booking.status || 'pending')}</td>
                    <td className="px-6 py-4">
                      <Badge className={booking.paymentStatus === 'paid' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}>
                        {booking.paymentStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-white text-right font-medium">AED {booking.totalPrice}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-slate-400 hover:text-white"
                          onClick={() => setSelectedBooking(booking)}
                          data-testid={`button-view-${booking.id}`}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {booking.status === 'pending' && (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-emerald-400 hover:text-emerald-300"
                              onClick={() => updateStatusMutation.mutate({ id: booking.id, status: 'confirmed' })}
                              data-testid={`button-confirm-${booking.id}`}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-red-400 hover:text-red-300"
                              onClick={() => updateStatusMutation.mutate({ id: booking.id, status: 'cancelled' })}
                              data-testid={`button-cancel-${booking.id}`}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Booking Details - {selectedBooking?.id}</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Status</p>
                  <p className="font-medium capitalize">{selectedBooking.status}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Payment</p>
                  <p className="font-medium capitalize">{selectedBooking.paymentStatus}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="font-medium">{selectedBooking.address}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Amount</p>
                  <p className="font-medium">AED {selectedBooking.totalPrice}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                {selectedBooking.status === 'pending' && (
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => updateStatusMutation.mutate({ id: selectedBooking.id, status: 'confirmed' })}
                  >
                    Confirm Booking
                  </Button>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => updateStatusMutation.mutate({ id: selectedBooking.id, status: 'collected' })}
                  >
                    Mark as Collected
                  </Button>
                )}
                {selectedBooking.status === 'collected' && (
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => updateStatusMutation.mutate({ id: selectedBooking.id, status: 'completed' })}
                  >
                    Mark as Complete
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}

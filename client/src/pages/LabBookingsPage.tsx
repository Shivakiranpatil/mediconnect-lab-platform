import LabLayout from "@/components/LabLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, Clock, MapPin, User, Phone, 
  CheckCircle, XCircle, Eye, Navigation
} from "lucide-react";
import { motion } from "framer-motion";

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  bundleName: string;
  scheduledDate: string;
  scheduledTime: string;
  address: string;
  status: 'pending' | 'confirmed' | 'collected' | 'completed' | 'cancelled';
  notes?: string;
}

export default function LabBookingsPage() {
  const { toast } = useToast();

  const { data: bookings = [], isLoading } = useQuery<Booking[]>({
    queryKey: ['/api/lab/bookings'],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest('PATCH', `/api/lab/bookings/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/lab/bookings'] });
      toast({ title: "Booking Updated", description: "Status has been updated successfully." });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'collected': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'completed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    }
  };

  const mockBookings: Booking[] = [
    { id: 'BK-2001', customerName: 'Ahmed Hassan', customerPhone: '+971 50 123 4567', bundleName: 'Full Body Checkup', scheduledDate: '2026-01-14', scheduledTime: '09:00', address: 'Business Bay, Tower 3, Apt 1204, Dubai', status: 'pending' },
    { id: 'BK-2002', customerName: 'Sara Ali Mohammed', customerPhone: '+971 55 987 6543', bundleName: 'Heart Health Panel', scheduledDate: '2026-01-14', scheduledTime: '10:30', address: 'Marina Walk, Building 8, Villa 12, Dubai', status: 'confirmed' },
    { id: 'BK-2003', customerName: 'Khalid Omar', customerPhone: '+971 52 456 7890', bundleName: 'Essential Health Check', scheduledDate: '2026-01-14', scheduledTime: '14:00', address: 'JBR, Sadaf Tower, Floor 15, Dubai', status: 'collected' },
    { id: 'BK-2004', customerName: 'Maryam Ahmed', customerPhone: '+971 58 321 0987', bundleName: "Women's Wellness", scheduledDate: '2026-01-13', scheduledTime: '16:30', address: 'Downtown Dubai, Burj Khalifa Blvd, Dubai', status: 'completed' },
  ];

  const displayBookings = bookings.length > 0 ? bookings : mockBookings;
  const pendingBookings = displayBookings.filter(b => b.status === 'pending');
  const confirmedBookings = displayBookings.filter(b => b.status === 'confirmed');
  const activeBookings = displayBookings.filter(b => ['collected'].includes(b.status));
  const completedBookings = displayBookings.filter(b => ['completed', 'cancelled'].includes(b.status));

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/40 backdrop-blur-xl rounded-xl p-5 border border-slate-700/50"
      data-testid={`lab-booking-${booking.id}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-slate-500 font-mono">{booking.id}</span>
            <Badge className={getStatusColor(booking.status)} data-testid={`status-${booking.id}`}>
              {booking.status}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold text-white" data-testid={`customer-${booking.id}`}>{booking.customerName}</h3>
          <p className="text-teal-400 font-medium">{booking.bundleName}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center gap-2 text-slate-400">
          <Calendar className="w-4 h-4" />
          <span>{booking.scheduledDate}</span>
          <Clock className="w-4 h-4 ml-2" />
          <span>{booking.scheduledTime}</span>
        </div>
        <div className="flex items-start gap-2 text-slate-400">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span className="line-clamp-2">{booking.address}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Phone className="w-4 h-4" />
          <span>{booking.customerPhone}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-slate-700/50">
        {booking.status === 'pending' && (
          <>
            <Button 
              size="sm" 
              className="flex-1 bg-teal-600 hover:bg-teal-700"
              onClick={() => updateStatusMutation.mutate({ id: booking.id, status: 'confirmed' })}
              data-testid={`confirm-${booking.id}`}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Confirm
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-red-500/50 text-red-400 hover:bg-red-500/20"
              onClick={() => updateStatusMutation.mutate({ id: booking.id, status: 'cancelled' })}
              data-testid={`reject-${booking.id}`}
            >
              <XCircle className="w-4 h-4" />
            </Button>
          </>
        )}
        {booking.status === 'confirmed' && (
          <>
            <Button 
              size="sm" 
              className="flex-1 bg-purple-600 hover:bg-purple-700"
              onClick={() => updateStatusMutation.mutate({ id: booking.id, status: 'collected' })}
              data-testid={`collect-${booking.id}`}
            >
              <Navigation className="w-4 h-4 mr-1" />
              Mark Collected
            </Button>
            <Button size="sm" variant="outline" className="border-slate-600 text-slate-300" data-testid={`navigate-${booking.id}`}>
              <MapPin className="w-4 h-4" />
            </Button>
          </>
        )}
        {booking.status === 'collected' && (
          <Button 
            size="sm" 
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
            onClick={() => updateStatusMutation.mutate({ id: booking.id, status: 'completed' })}
            data-testid={`complete-${booking.id}`}
          >
            <CheckCircle className="w-4 h-4 mr-1" />
            Mark Completed
          </Button>
        )}
        {['completed', 'cancelled'].includes(booking.status) && (
          <Button size="sm" variant="outline" className="flex-1 border-slate-600 text-slate-300" data-testid={`view-${booking.id}`}>
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </Button>
        )}
      </div>
    </motion.div>
  );

  return (
    <LabLayout title="Bookings" subtitle="Manage your sample collection appointments">
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="pending" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white" data-testid="tab-pending">
            Pending ({pendingBookings.length})
          </TabsTrigger>
          <TabsTrigger value="confirmed" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white" data-testid="tab-confirmed">
            Confirmed ({confirmedBookings.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white" data-testid="tab-active">
            In Progress ({activeBookings.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white" data-testid="tab-history">
            History ({completedBookings.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {pendingBookings.length === 0 ? (
            <Card className="bg-slate-800/40 border-slate-700">
              <CardContent className="p-12 text-center">
                <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No pending bookings</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="confirmed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {confirmedBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)}
          </div>
        </TabsContent>
      </Tabs>
    </LabLayout>
  );
}

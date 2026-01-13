import LabLayout from "@/components/LabLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Clock, Save, Copy, Calendar } from "lucide-react";

interface DaySchedule {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  breakStart?: string;
  breakEnd?: string;
}

const timeSlots = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
];

export default function LabHoursPage() {
  const { toast } = useToast();
  
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    { day: 'Monday', isOpen: true, openTime: '07:00', closeTime: '20:00' },
    { day: 'Tuesday', isOpen: true, openTime: '07:00', closeTime: '20:00' },
    { day: 'Wednesday', isOpen: true, openTime: '07:00', closeTime: '20:00' },
    { day: 'Thursday', isOpen: true, openTime: '07:00', closeTime: '20:00' },
    { day: 'Friday', isOpen: true, openTime: '09:00', closeTime: '18:00' },
    { day: 'Saturday', isOpen: true, openTime: '08:00', closeTime: '16:00' },
    { day: 'Sunday', isOpen: false, openTime: '09:00', closeTime: '15:00' },
  ]);

  const [maxBookingsPerSlot, setMaxBookingsPerSlot] = useState('4');
  const [slotDuration, setSlotDuration] = useState('30');

  const updateDay = (dayIndex: number, updates: Partial<DaySchedule>) => {
    setSchedule(s => s.map((day, i) => 
      i === dayIndex ? { ...day, ...updates } : day
    ));
  };

  const copyToAll = (sourceIndex: number) => {
    const source = schedule[sourceIndex];
    setSchedule(s => s.map((day, i) => 
      i !== sourceIndex ? { ...day, openTime: source.openTime, closeTime: source.closeTime, isOpen: source.isOpen } : day
    ));
    toast({ title: "Schedule Copied", description: `${source.day}'s schedule copied to all days.` });
  };

  const handleSave = () => {
    toast({ title: "Schedule Saved", description: "Your working hours have been updated." });
  };

  return (
    <LabLayout title="Working Hours" subtitle="Set your availability for sample collections">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-800/40 border-slate-700">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Open Days</p>
                  <p className="text-xl font-bold text-white" data-testid="stat-open-days">{schedule.filter(d => d.isOpen).length}/7</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/40 border-slate-700">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Slot Duration</p>
                  <Select value={slotDuration} onValueChange={setSlotDuration}>
                    <SelectTrigger className="w-32 bg-transparent border-none text-xl font-bold text-white p-0 h-auto" data-testid="select-slot-duration">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 min</SelectItem>
                      <SelectItem value="30">30 min</SelectItem>
                      <SelectItem value="45">45 min</SelectItem>
                      <SelectItem value="60">60 min</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/40 border-slate-700">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Max per Slot</p>
                  <Select value={maxBookingsPerSlot} onValueChange={setMaxBookingsPerSlot}>
                    <SelectTrigger className="w-24 bg-transparent border-none text-xl font-bold text-white p-0 h-auto" data-testid="select-max-bookings">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/40 border-slate-700">
          <CardHeader className="border-b border-slate-700">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Weekly Schedule</CardTitle>
              <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700" data-testid="button-save-schedule">
                <Save className="w-4 h-4 mr-2" />
                Save Schedule
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-700">
              {schedule.map((day, i) => (
                <div 
                  key={day.day} 
                  className={`grid grid-cols-5 gap-4 px-6 py-4 items-center ${!day.isOpen ? 'opacity-50' : ''}`}
                  data-testid={`schedule-${day.day.toLowerCase()}`}
                >
                  <div className="flex items-center gap-3">
                    <Switch 
                      checked={day.isOpen}
                      onCheckedChange={(checked) => updateDay(i, { isOpen: checked })}
                      data-testid={`switch-${day.day.toLowerCase()}`}
                    />
                    <span className="font-medium text-white">{day.day}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">From</span>
                    <Select 
                      value={day.openTime} 
                      onValueChange={(value) => updateDay(i, { openTime: value })}
                      disabled={!day.isOpen}
                    >
                      <SelectTrigger className="w-24 bg-slate-700 border-slate-600 text-white" data-testid={`open-${day.day.toLowerCase()}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-400">To</span>
                    <Select 
                      value={day.closeTime} 
                      onValueChange={(value) => updateDay(i, { closeTime: value })}
                      disabled={!day.isOpen}
                    >
                      <SelectTrigger className="w-24 bg-slate-700 border-slate-600 text-white" data-testid={`close-${day.day.toLowerCase()}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(time => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="text-sm text-slate-400">
                    {day.isOpen && (
                      <span>
                        {(() => {
                          const open = parseInt(day.openTime.split(':')[0]);
                          const close = parseInt(day.closeTime.split(':')[0]);
                          return `${close - open} hours`;
                        })()}
                      </span>
                    )}
                    {!day.isOpen && <span className="text-red-400">Closed</span>}
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => copyToAll(i)}
                      className="text-slate-400 hover:text-white"
                      disabled={!day.isOpen}
                      data-testid={`copy-${day.day.toLowerCase()}`}
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy to all
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-amber-500/10 border-amber-500/30">
          <CardContent className="p-4 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-400 mt-0.5" />
            <div>
              <p className="font-medium text-amber-400">Holiday Schedule</p>
              <p className="text-sm text-amber-300/70">
                Remember to update your schedule for UAE holidays and special occasions.
                You can temporarily close by toggling off specific days.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </LabLayout>
  );
}

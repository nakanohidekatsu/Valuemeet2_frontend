'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Search, Filter, Plus, Calendar, Users, Clock } from 'lucide-react';
import CreateMeetingModal from '@/components/CreateMeetingModal';

const initialMeetings = [
  {
    id: 1,
    title: '週次チーム会議',
    date: '2025-01-15',
    time: '10:00-11:00',
    participants: 5,
    status: 'scheduled',
    location: '会議室A'
  },
  {
    id: 2,
    title: 'プロジェクト進捗確認',
    date: '2025-01-15', 
    time: '14:00-15:30',
    participants: 8,
    status: 'scheduled',
    location: 'オンライン'
  },
  {
    id: 3,
    title: '月次レビュー',
    date: '2025-01-16',
    time: '16:00-17:00',
    participants: 12,
    status: 'scheduled',
    location: '大会議室'
  },
  {
    id: 4,
    title: '企画ブレインストーミング',
    date: '2025-01-17',
    time: '13:00-14:30',
    participants: 6,
    status: 'draft',
    location: '会議室B'
  },
  {
    id: 5,
    title: 'クライアント打ち合わせ',
    date: '2025-01-18',
    time: '15:00-16:00',
    participants: 4,
    status: 'scheduled',
    location: 'オンライン'
  },
  {
    id: 6,
    title: '四半期戦略会議',
    date: '2025-01-20',
    time: '09:00-12:00',
    participants: 15,
    status: 'draft',
    location: '大会議室'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled': return 'bg-green-100 text-green-700';
    case 'draft': return 'bg-yellow-100 text-yellow-700';
    case 'completed': return 'bg-gray-100 text-gray-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'scheduled': return '予定';
    case 'draft': return '下書き';
    case 'completed': return '完了';
    default: return '不明';
  }
};

export default function MeetingManagement() {
  const [meetings, setMeetings] = useState(initialMeetings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleCreateMeeting = (meetingData: any) => {
    const newMeeting = {
      id: meetingData.id,
      title: meetingData.title,
      date: meetingData.date,
      time: `${meetingData.startTime}-${meetingData.endTime}`,
      participants: meetingData.participantCount,
      status: meetingData.status,
      location: meetingData.location
    };
    setMeetings(prev => [newMeeting, ...prev]);
  };

  const handleViewDetails = (meetingId: number) => {
    router.push(`/meeting/${meetingId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">会議管理</h1>
        <Button 
          className="bg-orange-600 hover:bg-orange-700"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          新しい会議の作成
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="会議を検索..."
            className="pl-10 bg-white border-gray-300"
          />
        </div>
        <Button variant="outline" className="border-gray-300 flex-shrink-0">
          <Filter className="h-4 w-4 mr-2" />
          フィルター
        </Button>
      </div>

      {/* Meetings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meetings.map((meeting) => (
          <Card key={meeting.id} className="bg-white hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {meeting.title}
                </CardTitle>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(meeting.status)}`}>
                  {getStatusText(meeting.status)}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                {meeting.date}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                {meeting.time}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                {meeting.participants}名参加予定
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-4 h-4 mr-2 flex items-center justify-center">
                  📍
                </div>
                {meeting.location}
              </div>
              <div className="pt-3 border-t border-gray-200">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    編集
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewDetails(meeting.id)}
                  >
                    詳細
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateMeetingModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onCreateMeeting={handleCreateMeeting}
      />
    </div>
  );
}
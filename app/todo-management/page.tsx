'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, CheckCircle, Circle, AlertCircle } from 'lucide-react';
import TodoExtractionModal from '@/components/TodoExtractionModal';

const initialTodos = [
  {
    id: 1,
    title: '資料作成（企画書）',
    description: '新プロジェクトの企画書を作成する',
    assignee: '田中太郎',
    dueDate: '2025-01-20',
    priority: 'high',
    status: 'pending',
    meetingTitle: '企画会議',
    createdAt: '2025-01-10'
  },
  {
    id: 2,
    title: 'クライアント連絡',
    description: '進捗状況をクライアントに報告',
    assignee: '佐藤花子',
    dueDate: '2025-01-18',
    priority: 'medium',
    status: 'in_progress',
    meetingTitle: 'プロジェクト進捗確認',
    createdAt: '2025-01-12'
  },
  {
    id: 3,
    title: 'システム要件定義',
    description: 'システムの詳細要件を定義する',
    assignee: '山田一郎',
    dueDate: '2025-01-25',
    priority: 'high',
    status: 'pending',
    meetingTitle: '技術検討会議',
    createdAt: '2025-01-11'
  },
  {
    id: 4,
    title: '予算計画書更新',
    description: 'Q1の予算計画書を最新版に更新',
    assignee: '鈴木次郎',
    dueDate: '2025-01-22',
    priority: 'medium',
    status: 'completed',
    meetingTitle: '月次レビュー',
    createdAt: '2025-01-09'
  },
  {
    id: 5,
    title: 'テストケース作成',
    description: 'ユーザビリティテストのケースを作成',
    assignee: '高橋三郎',
    dueDate: '2025-01-30',
    priority: 'low',
    status: 'pending',
    meetingTitle: '品質管理会議',
    createdAt: '2025-01-13'
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-700';
    case 'medium': return 'bg-yellow-100 text-yellow-700';
    case 'low': return 'bg-green-100 text-green-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const getPriorityText = (priority: string) => {
  switch (priority) {
    case 'high': return '高';
    case 'medium': return '中';
    case 'low': return '低';
    default: return '不明';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'in_progress': return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    case 'pending': return <Circle className="h-5 w-5 text-gray-400" />;
    default: return <Circle className="h-5 w-5 text-gray-400" />;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed': return '完了';
    case 'in_progress': return '進行中';
    case 'pending': return '未着手';
    default: return '不明';
  }
};

export default function TodoManagement() {
  const [todos, setTodos] = useState(initialTodos);
  const [isExtractionModalOpen, setIsExtractionModalOpen] = useState(false);

  const handleAddTodos = (newTodos: any[]) => {
    setTodos(prev => [...newTodos, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Todo管理</h1>
        <Button 
          className="bg-orange-600 hover:bg-orange-700"
          onClick={() => setIsExtractionModalOpen(true)}
        >
          <Download className="h-4 w-4 mr-2" />
          Todoの抽出
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Todoを検索..."
            className="pl-10 bg-white border-gray-300"
          />
        </div>
        <Button variant="outline" className="border-gray-300 flex-shrink-0">
          <Filter className="h-4 w-4 mr-2" />
          フィルター
        </Button>
      </div>

      {/* Todo List */}
      <div className="space-y-4">
        {todos.map((todo) => (
          <Card key={todo.id} className="bg-white hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 pt-1">
                  {getStatusIcon(todo.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{todo.title}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(todo.priority)}>
                        優先度: {getPriorityText(todo.priority)}
                      </Badge>
                      <Badge variant="outline">
                        {getStatusText(todo.status)}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{todo.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">担当者:</span> {todo.assignee}
                    </div>
                    <div>
                      <span className="font-medium">期限:</span> {todo.dueDate}
                    </div>
                    <div>
                      <span className="font-medium">会議:</span> {todo.meetingTitle}
                    </div>
                    <div>
                      <span className="font-medium">作成日:</span> {todo.createdAt}
                    </div>
                  </div>
                  <div className="flex items-center justify-end mt-4 space-x-2">
                    <Button size="sm" variant="outline">
                      編集
                    </Button>
                    <Button size="sm" variant="outline">
                      詳細
                    </Button>
                    {todo.status !== 'completed' && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        完了
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <TodoExtractionModal
        open={isExtractionModalOpen}
        onOpenChange={setIsExtractionModalOpen}
        onAddTodos={handleAddTodos}
      />
    </div>
  );
}
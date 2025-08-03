import { useState } from 'react'
import { Search, Filter, Download, MoreHorizontal, MapPin } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const UsersTable = ({ users = [] }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.country.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue = a[sortBy]
    let bValue = b[sortBy]
    
    if (sortBy === 'visits') {
      aValue = parseInt(aValue)
      bValue = parseInt(bValue)
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const exportData = () => {
    const csvContent = [
      ['الاسم', 'البريد الإلكتروني', 'تاريخ الانضمام', 'الحالة', 'عدد الزيارات', 'آخر دخول', 'البلد'],
      ...sortedUsers.map(user => [
        user.name,
        user.email,
        user.joinDate,
        user.status,
        user.visits,
        user.lastLogin,
        user.country
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'users_data.csv'
    link.click()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>جدول المستخدمين ({sortedUsers.length})</CardTitle>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Button variant="outline" size="sm" onClick={exportData}>
              <Download className="w-4 h-4 ml-2" />
              تصدير CSV
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 ml-2" />
              فلترة
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="البحث عن المستخدمين..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="text-right cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('name')}
              >
                الاسم {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="text-right">البريد الإلكتروني</TableHead>
              <TableHead 
                className="text-right cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('joinDate')}
              >
                تاريخ الانضمام {sortBy === 'joinDate' && (sortOrder === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="text-right">الحالة</TableHead>
              <TableHead 
                className="text-right cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('visits')}
              >
                عدد الزيارات {sortBy === 'visits' && (sortOrder === 'asc' ? '↑' : '↓')}
              </TableHead>
              <TableHead className="text-right">آخر دخول</TableHead>
              <TableHead className="text-right">البلد</TableHead>
              <TableHead className="text-right">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'نشط' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-medium">{user.visits}</span>
                </TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm">{user.country}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>عرض التفاصيل</DropdownMenuItem>
                      <DropdownMenuItem>إرسال رسالة</DropdownMenuItem>
                      <DropdownMenuItem>تعديل</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">حذف</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {sortedUsers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">لا توجد نتائج للبحث "{searchTerm}"</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default UsersTable


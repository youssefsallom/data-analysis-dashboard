import { useState, useEffect } from 'react'
import { Bell, X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const LiveNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  // إشعارات وهمية
  const mockNotifications = [
    {
      id: 1,
      type: 'success',
      title: 'مستخدم جديد',
      message: 'انضم يوسف علي إلى المنصة',
      timestamp: new Date(),
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'تحديث البيانات',
      message: 'تم تحديث إحصائيات المبيعات',
      timestamp: new Date(Date.now() - 300000),
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'تنبيه أمان',
      message: 'محاولة دخول مشبوهة من IP جديد',
      timestamp: new Date(Date.now() - 600000),
      read: true
    }
  ]

  useEffect(() => {
    setNotifications(mockNotifications)
    
    // محاكاة إشعارات جديدة كل 30 ثانية
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        type: ['success', 'info', 'warning'][Math.floor(Math.random() * 3)],
        title: 'إشعار جديد',
        message: 'تم تحديث البيانات تلقائياً',
        timestamp: new Date(),
        read: false
      }
      
      setNotifications(prev => [newNotification, ...prev.slice(0, 4)])
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      default:
        return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'success':
        return 'border-l-green-500 bg-green-50'
      case 'warning':
        return 'border-l-orange-500 bg-orange-50'
      default:
        return 'border-l-blue-500 bg-blue-50'
    }
  }

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-white/10 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 z-50">
          <Card className="shadow-xl border-0">
            <CardContent className="p-0">
              <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">الإشعارات</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    لا توجد إشعارات جديدة
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-l-4 border-b last:border-b-0 cursor-pointer hover:bg-muted/50 transition-colors ${
                        getTypeColor(notification.type)
                      } ${!notification.read ? 'bg-opacity-100' : 'bg-opacity-50'}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3 rtl:space-x-reverse">
                        {getIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm">{notification.title}</p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.timestamp.toLocaleString('ar-SA')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default LiveNotifications


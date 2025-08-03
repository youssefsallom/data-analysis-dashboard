import { Clock, User, ShoppingBag, UserPlus, Settings } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'login':
        return <User className="w-4 h-4 text-blue-500" />
      case 'purchase':
        return <ShoppingBag className="w-4 h-4 text-green-500" />
      case 'signup':
        return <UserPlus className="w-4 h-4 text-purple-500" />
      case 'update':
        return <Settings className="w-4 h-4 text-orange-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'login':
        return 'bg-blue-50 border-blue-200'
      case 'purchase':
        return 'bg-green-50 border-green-200'
      case 'signup':
        return 'bg-purple-50 border-purple-200'
      case 'update':
        return 'bg-orange-50 border-orange-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 ml-2" />
          الأنشطة الحديثة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`p-3 rounded-lg border ${getActivityColor(activity.type)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  {getActivityIcon(activity.type)}
                  <div>
                    <p className="font-medium text-sm">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default RecentActivity


import { Home, BarChart3, Users, FileText, Settings, TrendingUp, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'الصفحة الرئيسية', icon: Home, color: 'from-blue-500 to-blue-600' },
    { id: 'analytics', label: 'التحليلات', icon: BarChart3, color: 'from-green-500 to-green-600' },
    { id: 'users', label: 'المستخدمون', icon: Users, color: 'from-purple-500 to-purple-600' },
    { id: 'reports', label: 'التقارير', icon: FileText, color: 'from-orange-500 to-orange-600' },
    { id: 'trends', label: 'الاتجاهات', icon: TrendingUp, color: 'from-pink-500 to-pink-600' },
    { id: 'settings', label: 'الإعدادات', icon: Settings, color: 'from-gray-500 to-gray-600' },
  ]

  return (
    <aside className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white w-64 min-h-screen p-4 shadow-2xl relative overflow-hidden">
      {/* تأثير الخلفية */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-indigo-900/10" />
      
      <div className="relative z-10">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-6 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            القائمة الرئيسية
          </h2>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start text-right group relative overflow-hidden transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105' 
                      : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 hover:scale-102'
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {/* تأثير الخلفية المتحركة */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse" />
                  )}
                  
                  <div className="flex items-center w-full relative z-10">
                    <div className={`p-2 rounded-lg mr-3 transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/20 shadow-lg' 
                        : 'bg-gray-700 group-hover:bg-gray-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  
                  {/* مؤشر النشاط */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-r-full" />
                  )}
                </Button>
              )
            })}
          </nav>
        </div>
        
        <div className="mt-auto pt-8">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 p-4 rounded-xl shadow-xl relative overflow-hidden">
            {/* تأثير الخلفية المتحركة */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-pulse" />
            
            <div className="relative z-10">
              <div className="flex items-center mb-3">
                <Activity className="w-5 h-5 mr-2" />
                <h3 className="font-semibold">إحصائيات سريعة</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="opacity-90">آخر تحديث:</span>
                  <span className="font-medium">اليوم</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">الحالة:</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse" />
                    <span className="font-medium text-green-200">متصل</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">المستخدمين النشطين:</span>
                  <span className="font-medium">1,204</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar


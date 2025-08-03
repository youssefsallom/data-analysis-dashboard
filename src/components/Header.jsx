import { Search, User, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LiveNotifications from './LiveNotifications'

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white p-4 shadow-2xl relative overflow-hidden">
      {/* تأثير الخلفية المتحركة */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 animate-pulse" />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">Y</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                لوحة تحكم تحليل البيانات
              </h1>
              <span className="text-sm opacity-75 block">Youssef Sallom Dashboard</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-400 transition-colors" />
            <Input 
              placeholder="البحث..." 
              className="pl-10 pr-4 bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:bg-white/20 focus:border-white/40 transition-all duration-300 w-64"
            />
          </div>
          
          <LiveNotifications />
          
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:scale-110 transition-all duration-300">
            <Settings className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white/10 rounded-full px-3 py-2 hover:bg-white/20 transition-all duration-300 cursor-pointer group">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium group-hover:text-blue-200 transition-colors">المدير</span>
          </div>
        </div>
      </div>
      
      {/* خط متدرج في الأسفل */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400" />
    </header>
  )
}

export default Header


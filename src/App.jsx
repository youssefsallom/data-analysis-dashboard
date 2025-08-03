import { useState, useEffect } from 'react'
import { Users, Eye, ShoppingCart, DollarSign, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import StatsCard from './components/StatsCard'
import Charts from './components/Charts'
import UsersTable from './components/UsersTable'
import RecentActivity from './components/RecentActivity'
import TopPages from './components/TopPages'
import { fetchDashboardData, updateLiveData } from './data/mockData'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(null)

  // جلب البيانات عند تحميل التطبيق
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDashboardData()
        setDashboardData(data)
        setLastUpdated(new Date().toLocaleString('ar-SA'))
      } catch (error) {
        console.error('خطأ في جلب البيانات:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // تحديث البيانات كل 30 ثانية (محاكاة البيانات الحية)
  useEffect(() => {
    if (!dashboardData) return

    const interval = setInterval(() => {
      const updatedData = updateLiveData(dashboardData)
      setDashboardData(updatedData)
      setLastUpdated(new Date().toLocaleString('ar-SA'))
    }, 30000)

    return () => clearInterval(interval)
  }, [dashboardData])

  // دالة تحديث يدوي
  const handleRefresh = async () => {
    setLoading(true)
    try {
      const data = await fetchDashboardData()
      setDashboardData(data)
      setLastUpdated(new Date().toLocaleString('ar-SA'))
    } catch (error) {
      console.error('خطأ في تحديث البيانات:', error)
    } finally {
      setLoading(false)
    }
  }

  const getIconComponent = (iconName) => {
    const icons = {
      Users,
      Eye,
      ShoppingCart,
      DollarSign
    }
    return icons[iconName] || Users
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p>جاري تحميل البيانات...</p>
          </div>
        </div>
      )
    }

    if (!dashboardData) {
      return (
        <div className="text-center p-8">
          <p>حدث خطأ في تحميل البيانات</p>
          <Button onClick={handleRefresh} className="mt-4">
            إعادة المحاولة
          </Button>
        </div>
      )
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* شريط التحديث */}
            <div className="flex items-center justify-between bg-card p-4 rounded-lg">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm text-muted-foreground">
                  آخر تحديث: {lastUpdated}
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ml-2 ${loading ? 'animate-spin' : ''}`} />
                تحديث
              </Button>
            </div>

            {/* البطاقات الإحصائية */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardData.stats.map((stat, index) => (
                <StatsCard 
                  key={stat.id} 
                  title={stat.title}
                  value={stat.value.toLocaleString()}
                  change={`${stat.change > 0 ? '+' : ''}${stat.change}%`}
                  changeType={stat.changeType}
                  icon={getIconComponent(stat.icon)}
                  color={stat.color}
                />
              ))}
            </div>
            
            {/* الرسوم البيانية */}
            <Charts data={dashboardData} />
            
            {/* الأنشطة الحديثة والصفحات الأكثر زيارة */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentActivity activities={dashboardData.recentActivities} />
              <TopPages pages={dashboardData.topPages} />
            </div>

            {/* جدول المستخدمين */}
            <UsersTable users={dashboardData.users} />
          </div>
        )
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">التحليلات المتقدمة</h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ml-2 ${loading ? 'animate-spin' : ''}`} />
                تحديث
              </Button>
            </div>
            <Charts data={dashboardData} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TopPages pages={dashboardData.topPages} />
              <RecentActivity activities={dashboardData.recentActivities} />
            </div>
          </div>
        )
      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">إدارة المستخدمين</h2>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleRefresh}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ml-2 ${loading ? 'animate-spin' : ''}`} />
                تحديث
              </Button>
            </div>
            <UsersTable users={dashboardData.users} />
            <RecentActivity activities={dashboardData.recentActivities} />
          </div>
        )
      case 'reports':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">التقارير</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardData.stats.map((stat, index) => (
                <StatsCard 
                  key={stat.id} 
                  title={stat.title}
                  value={stat.value.toLocaleString()}
                  change={`${stat.change > 0 ? '+' : ''}${stat.change}%`}
                  changeType={stat.changeType}
                  icon={getIconComponent(stat.icon)}
                  color={stat.color}
                />
              ))}
            </div>
            <TopPages pages={dashboardData.topPages} />
          </div>
        )
      case 'trends':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">الاتجاهات</h2>
            <Charts data={dashboardData} />
          </div>
        )
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">الإعدادات</h2>
            <div className="bg-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">إعدادات لوحة التحكم</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>التحديث التلقائي</span>
                  <span className="text-green-600">مُفعل (كل 30 ثانية)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>آخر تحديث</span>
                  <span>{lastUpdated}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>عدد المستخدمين المعروضين</span>
                  <span>{dashboardData.users.length}</span>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}

export default App


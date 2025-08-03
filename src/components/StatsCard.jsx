import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AnimatedCounter from './AnimatedCounter'

const StatsCard = ({ title, value, change, changeType, icon: Icon, color }) => {
  const isPositive = changeType === 'positive'
  
  // استخراج القيمة الرقمية والبادئة/اللاحقة
  const numericValue = value.toString().replace(/[^0-9]/g, '')
  const prefix = value.toString().includes('$') ? '$' : ''
  const suffix = ''
  
  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 group relative overflow-hidden">
      {/* تأثير الخلفية المتدرجة */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          {title}
        </CardTitle>
        <div className={`p-3 rounded-full ${color} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="mb-2">
          <AnimatedCounter 
            value={numericValue} 
            prefix={prefix} 
            suffix={suffix}
            duration={1500}
          />
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <div className={`flex items-center mr-2 px-2 py-1 rounded-full ${
            isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {isPositive ? (
              <TrendingUp className="w-3 h-3 ml-1" />
            ) : (
              <TrendingDown className="w-3 h-3 ml-1" />
            )}
            <span className="font-medium">
              {change}
            </span>
          </div>
          <span>من الشهر الماضي</span>
        </div>
        
        {/* شريط التقدم المصغر */}
        <div className="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${color.replace('bg-', 'bg-')} transition-all duration-1000 ease-out`}
            style={{ 
              width: `${Math.min(Math.abs(parseFloat(change.replace('%', ''))), 100)}%` 
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default StatsCard


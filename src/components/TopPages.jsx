import { Eye, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const TopPages = ({ pages }) => {
  const maxViews = Math.max(...pages.map(page => page.views))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Eye className="w-5 h-5 ml-2" />
          الصفحات الأكثر زيارة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pages.map((page, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="font-medium text-sm">{page.page}</span>
                  <span className="text-xs text-muted-foreground">
                    {page.views.toLocaleString()} زيارة
                  </span>
                </div>
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {page.bounce < 40 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-xs ${
                    page.bounce < 40 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {page.bounce}% معدل الارتداد
                  </span>
                </div>
              </div>
              <Progress 
                value={(page.views / maxViews) * 100} 
                className="h-2"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default TopPages


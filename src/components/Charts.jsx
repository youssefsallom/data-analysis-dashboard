import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Charts = ({ data }) => {
  if (!data) return null

  const { trafficSources, monthlyGrowth, deviceBreakdown } = data

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* الرسم البياني الدائري */}
      <Card>
        <CardHeader>
          <CardTitle>نسبة الزيارات حسب المصدر</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trafficSources}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {trafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* الرسم البياني المساحي */}
      <Card>
        <CardHeader>
          <CardTitle>نمو المستخدمين والمبيعات</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="users" 
                stackId="1"
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.6}
                name="المستخدمون" 
              />
              <Area 
                type="monotone" 
                dataKey="visits" 
                stackId="2"
                stroke="#82ca9d" 
                fill="#82ca9d" 
                fillOpacity={0.6}
                name="الزيارات" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* الرسم البياني العمودي */}
      <Card>
        <CardHeader>
          <CardTitle>توزيع المستخدمين حسب الجهاز</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deviceBreakdown}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="device" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#8884d8" name="عدد المستخدمين" />
              <Bar dataKey="percentage" fill="#82ca9d" name="النسبة المئوية" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* الرسم البياني الخطي للمبيعات */}
      <Card>
        <CardHeader>
          <CardTitle>اتجاه المبيعات الشهرية</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#ff7300" 
                strokeWidth={3}
                dot={{ fill: '#ff7300', strokeWidth: 2, r: 6 }}
                name="المبيعات ($)" 
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

export default Charts


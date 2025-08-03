// بيانات وهمية للوحة التحكم
export const dashboardData = {
  stats: [
    {
      id: 'users',
      title: 'عدد المستخدمين',
      value: 1204,
      change: 12.5,
      changeType: 'positive',
      icon: 'Users',
      color: 'bg-blue-500',
      trend: [1100, 1150, 1180, 1204]
    },
    {
      id: 'visits',
      title: 'عدد الزيارات',
      value: 53980,
      change: 8.2,
      changeType: 'positive',
      icon: 'Eye',
      color: 'bg-green-500',
      trend: [48000, 50000, 52000, 53980]
    },
    {
      id: 'conversions',
      title: 'التحويلات',
      value: 4300,
      change: 15.3,
      changeType: 'positive',
      icon: 'ShoppingCart',
      color: 'bg-purple-500',
      trend: [3800, 4000, 4100, 4300]
    },
    {
      id: 'sales',
      title: 'المبيعات',
      value: 9845,
      change: -2.1,
      changeType: 'negative',
      icon: 'DollarSign',
      color: 'bg-orange-500',
      trend: [10200, 10100, 9950, 9845]
    }
  ],

  trafficSources: [
    { name: 'مباشر', value: 45, color: '#4bc0c0' },
    { name: 'بحث', value: 25, color: '#ff6384' },
    { name: 'وسائط اجتماعية', value: 15, color: '#ffcd56' },
    { name: 'إحالة', value: 15, color: '#36a2eb' }
  ],

  monthlyGrowth: [
    { month: 'يناير', users: 1200, sales: 8500, visits: 45000 },
    { month: 'فبراير', users: 1350, sales: 9200, visits: 48000 },
    { month: 'مارس', users: 1100, sales: 7800, visits: 42000 },
    { month: 'أبريل', users: 1450, sales: 10200, visits: 52000 },
    { month: 'مايو', users: 1600, sales: 11500, visits: 55000 },
    { month: 'يونيو', users: 1204, sales: 9845, visits: 53980 }
  ],

  deviceBreakdown: [
    { device: 'سطح المكتب', users: 2400, percentage: 60 },
    { device: 'الجوال', users: 1800, percentage: 30 },
    { device: 'التابلت', users: 600, percentage: 10 }
  ],

  users: [
    { 
      id: 1, 
      name: 'أحمد خالد', 
      email: 'ahmad@example.com', 
      joinDate: '2025-07-15', 
      status: 'نشط', 
      visits: 45,
      lastLogin: '2025-08-02',
      country: 'السعودية'
    },
    { 
      id: 2, 
      name: 'ليلى سالم', 
      email: 'leila@example.com', 
      joinDate: '2025-07-18', 
      status: 'نشط', 
      visits: 32,
      lastLogin: '2025-08-01',
      country: 'الإمارات'
    },
    { 
      id: 3, 
      name: 'محمد درويش', 
      email: 'mohammad@example.com', 
      joinDate: '2025-07-20', 
      status: 'غير نشط', 
      visits: 12,
      lastLogin: '2025-07-25',
      country: 'مصر'
    },
    { 
      id: 4, 
      name: 'فاطمة أحمد', 
      email: 'fatima@example.com', 
      joinDate: '2025-07-22', 
      status: 'نشط', 
      visits: 67,
      lastLogin: '2025-08-02',
      country: 'الكويت'
    },
    { 
      id: 5, 
      name: 'عمر حسن', 
      email: 'omar@example.com', 
      joinDate: '2025-07-25', 
      status: 'نشط', 
      visits: 23,
      lastLogin: '2025-08-01',
      country: 'قطر'
    },
    { 
      id: 6, 
      name: 'نور الدين', 
      email: 'nour@example.com', 
      joinDate: '2025-07-28', 
      status: 'غير نشط', 
      visits: 8,
      lastLogin: '2025-07-30',
      country: 'البحرين'
    },
    { 
      id: 7, 
      name: 'سارة محمود', 
      email: 'sara@example.com', 
      joinDate: '2025-07-30', 
      status: 'نشط', 
      visits: 34,
      lastLogin: '2025-08-02',
      country: 'الأردن'
    },
    { 
      id: 8, 
      name: 'يوسف علي', 
      email: 'youssef@example.com', 
      joinDate: '2025-08-01', 
      status: 'نشط', 
      visits: 15,
      lastLogin: '2025-08-02',
      country: 'لبنان'
    }
  ],

  recentActivities: [
    {
      id: 1,
      user: 'أحمد خالد',
      action: 'تسجيل دخول',
      timestamp: '2025-08-02 14:30',
      type: 'login'
    },
    {
      id: 2,
      user: 'فاطمة أحمد',
      action: 'إجراء عملية شراء',
      timestamp: '2025-08-02 14:15',
      type: 'purchase'
    },
    {
      id: 3,
      user: 'يوسف علي',
      action: 'إنشاء حساب جديد',
      timestamp: '2025-08-02 13:45',
      type: 'signup'
    },
    {
      id: 4,
      user: 'سارة محمود',
      action: 'تحديث الملف الشخصي',
      timestamp: '2025-08-02 13:20',
      type: 'update'
    }
  ],

  topPages: [
    { page: 'الصفحة الرئيسية', views: 15420, bounce: 25.3 },
    { page: 'المنتجات', views: 8930, bounce: 32.1 },
    { page: 'من نحن', views: 5670, bounce: 45.2 },
    { page: 'اتصل بنا', views: 3240, bounce: 38.7 },
    { page: 'المدونة', views: 2890, bounce: 52.1 }
  ]
}

// دالة لمحاكاة جلب البيانات من API
export const fetchDashboardData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dashboardData)
    }, 500) // محاكاة تأخير الشبكة
  })
}

// دالة لتحديث البيانات بشكل عشوائي (محاكاة البيانات الحية)
export const updateLiveData = (currentData) => {
  const updatedStats = currentData.stats.map(stat => {
    const randomChange = (Math.random() - 0.5) * 0.1 // تغيير عشوائي بين -5% و +5%
    const newValue = Math.round(stat.value * (1 + randomChange))
    const newChange = ((newValue - stat.value) / stat.value) * 100
    
    return {
      ...stat,
      value: newValue,
      change: parseFloat(newChange.toFixed(1)),
      changeType: newChange >= 0 ? 'positive' : 'negative'
    }
  })

  return {
    ...currentData,
    stats: updatedStats,
    lastUpdated: new Date().toLocaleString('ar-SA')
  }
}


import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { format, parseISO, startOfMonth, endOfMonth, isWithinInterval, subMonths, subDays, subWeeks, subYears, startOfDay, startOfWeek, startOfYear } from 'date-fns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, DollarSign, TrendingUp, TrendingDown, ShoppingBag, Wallet, Gift, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { useSavingsData } from '@/hooks/useSavingsData';

const SavingsAndSpent = () => {
  const { data: savingsData, loading, loadingMore, error, hasMore, refetch, loadMore } = useSavingsData();
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [trendsFilter, setTrendsFilter] = useState('6months'); // New filter for trends
  const [timeRangeFilter, setTimeRangeFilter] = useState('all'); // New comprehensive time filter
  const [expandedOrders, setExpandedOrders] = useState(new Set()); // Track expanded orders

  // Infinite scroll functionality (auto-enabled)
  const handleScroll = useCallback(() => {
    if (loadingMore || !hasMore) return;
    
    const scrolledToBottom = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 1000;
    if (scrolledToBottom) {
      console.log('🔄 Infinite scroll triggered - loading more orders');
      loadMore();
    }
  }, [loadingMore, hasMore, loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Use the new API data structure for monthly trends (previous_four_months_stats)
  const monthlyTrendsData = useMemo(() => {
    if (!savingsData?.previous_four_months_stats) {
      return [];
    }
    
    // Map the API data and sort in ascending chronological order (July to current month)
    const mappedData = savingsData.previous_four_months_stats.map(monthData => ({
      month: monthData.month_label,
      savings: monthData.total_savings,
      spending: monthData.total_spending,
      orders: monthData.total_orders,
      discountSavings: monthData.total_discount_savings,
      walletBonuses: monthData.total_wallet_bonuses,
      // Add month index for proper sorting
      monthIndex: new Date(`${monthData.month_label} 1, 2024`).getMonth()
    }));
    
    // Sort by month index in ascending order (earliest month first)
    return mappedData.sort((a, b) => a.monthIndex - b.monthIndex);
  }, [savingsData]);

  // Filter orders based on time range filter
  const getFilteredOrdersByTimeRange = useMemo(() => {
    if (!savingsData?.results) return [];
    
    const now = new Date();
    let startDate;
    
    switch (timeRangeFilter) {
      case 'yesterday':
        startDate = startOfDay(subDays(now, 1));
        return savingsData.results.filter(order => {
          const orderDate = parseISO(order.created_at);
          return format(orderDate, 'yyyy-MM-dd') === format(startDate, 'yyyy-MM-dd');
        });
      
      case 'lastweek':
        startDate = startOfWeek(subWeeks(now, 1));
        const endOfLastWeek = endOfMonth(startDate);
        return savingsData.results.filter(order => {
          const orderDate = parseISO(order.created_at);
          return isWithinInterval(orderDate, { start: startDate, end: endOfLastWeek });
        });
      
      case 'lastmonth':
        startDate = startOfMonth(subMonths(now, 1));
        const endOfLastMonth = endOfMonth(startDate);
        return savingsData.results.filter(order => {
          const orderDate = parseISO(order.created_at);
          return isWithinInterval(orderDate, { start: startDate, end: endOfLastMonth });
        });
      
      case 'lastyear':
        startDate = startOfYear(subYears(now, 1));
        const endOfLastYear = endOfMonth(startDate);
        return savingsData.results.filter(order => {
          const orderDate = parseISO(order.created_at);
          return isWithinInterval(orderDate, { start: startDate, end: endOfLastYear });
        });
      
      case 'all':
      default:
        return savingsData.results;
    }
  }, [timeRangeFilter, savingsData]);

  // Filter orders based on selected month (keeping old functionality)
  const filteredOrders = useMemo(() => {
    let orders = getFilteredOrdersByTimeRange;
    
    if (selectedMonth !== 'all') {
      orders = orders.filter(order => {
        const orderDate = parseISO(order.created_at);
        const monthName = format(orderDate, 'MMMM').toLowerCase();
        return monthName === selectedMonth;
      });
    }
    
    return orders;
  }, [selectedMonth, getFilteredOrdersByTimeRange]);

  // Use the API-provided monthly trends data (no filtering needed since API gives us exactly 4 months)
  const filteredTrendsData = monthlyTrendsData;

  // Calculate filtered stats based on filtered orders
  const filteredStats = useMemo(() => {
    if (!savingsData?.results) {
      return {
        totalOrders: 0,
        totalSavings: 0,
        totalSpending: 0
      };
    }

    if (selectedMonth === 'all' && timeRangeFilter === 'all') {
      return {
        totalOrders: savingsData.results.length,
        totalSavings: savingsData.results.reduce((sum, order) => {
          const orderSavings = order.order_items_details.reduce((itemSum, item) => 
            itemSum + (parseFloat(item.price) - parseFloat(item.discounted_price)), 0);
          return sum + orderSavings;
        }, 0),
        totalSpending: savingsData.results.reduce((sum, order) => sum + parseFloat(order.paid_amount), 0)
      };
    }

    const orderSavings = filteredOrders.reduce((sum, order) => {
      const orderSavings = order.order_items_details.reduce((itemSum, item) => 
        itemSum + (parseFloat(item.price) - parseFloat(item.discounted_price)), 0);
      return sum + orderSavings;
    }, 0);

    return {
      totalOrders: filteredOrders.length,
      totalSavings: orderSavings,
      totalSpending: filteredOrders.reduce((sum, order) => sum + parseFloat(order.paid_amount), 0)
    };
  }, [selectedMonth, timeRangeFilter, filteredOrders, savingsData]);

  // Prepare chart data
  const savingsBreakdownData = useMemo(() => {
    if (!savingsData?.overall_stats) {
      return [
        { name: 'Discount Savings', value: 0, color: '#378157' },
        { name: 'Wallet Bonuses', value: 0, color: '#f8c636' },
      ];
    }
    return [
      { name: 'Discount Savings', value: savingsData.overall_stats.total_discount_savings, color: '#378157' },
      { name: 'Wallet Bonuses', value: savingsData.overall_stats.total_wallet_bonuses, color: '#f8c636' },
    ];
  }, [savingsData]);

  const comparisonData = useMemo(() => {
    const currentStats = selectedMonth === 'all' ? savingsData?.overall_stats : filteredStats;
    if (!currentStats) {
      return [
        { name: 'Total Saved', amount: 0 },
        { name: 'Total Spent', amount: 0 },
      ];
    }
    return [
      { name: 'Total Saved', amount: selectedMonth === 'all' ? currentStats.total_savings : currentStats.totalSavings },
      { name: 'Total Spent', amount: selectedMonth === 'all' ? currentStats.total_spending : currentStats.totalSpending },
    ];
  }, [selectedMonth, savingsData, filteredStats]);

  // Calculate savings rate
  const savingsRate = useMemo(() => {
    const currentStats = selectedMonth === 'all' ? savingsData?.overall_stats : filteredStats;
    if (!currentStats) return 0;
    
    const totalSavings = selectedMonth === 'all' ? currentStats.total_savings : currentStats.totalSavings;
    const totalSpending = selectedMonth === 'all' ? currentStats.total_spending : currentStats.totalSpending;
    
    return totalSavings + totalSpending > 0 
      ? ((totalSavings / (totalSavings + totalSpending)) * 100).toFixed(1)
      : 0;
  }, [selectedMonth, savingsData, filteredStats]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-idl-green"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Unable to Fetch Savings Data</h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">{error}</p>
          <button 
            onClick={refetch} 
            className="bg-idl-green text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Try Again
          </button>
          <p className="text-xs text-gray-500 mt-4">
            If the problem persists, please contact our support team.
          </p>
        </div>
      </div>
    );
  }

  if (!savingsData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="bg-gray-100 border border-gray-200 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No Savings Data Available</h2>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            We couldn't find any savings information for your account at the moment.
          </p>
          <button 
            onClick={refetch} 
            className="bg-idl-green text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Refresh Data
          </button>
        </div>
      </div>
    );
  }

  const { user_details, overall_stats, contextual_month_stats, results } = savingsData;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Mobile-First Layout - No padding, full width */}
      <div className="w-full">
        
        {/* TOP SECTION - Savings Widget Summary (2/5 of viewport) */}
        <div className="h-[40vh] bg-gradient-to-br from-idl-green via-green-600 to-emerald-700 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 left-8 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-4 w-16 h-16 border border-idl-yellow rounded-full"></div>
            <div className="absolute bottom-16 right-12 w-20 h-20 border border-white/50 rounded-full"></div>
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          
          <div className="relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="px-6 pt-8 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-white text-2xl font-bold tracking-tight">Your Savings Dashboard</h1>
                  <p className="text-green-100 text-sm font-medium mt-1">Welcome back, {user_details.userName}</p>
                </div>
              </div>
            </div>

            {/* Main Savings Display */}
            <div className="flex-1 px-6 flex flex-col justify-center">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-white text-base font-semibold">Financial Overview</span>
                </div>
              </div>

              {/* Savings vs Spending Row */}
              <div className="flex items-center justify-center gap-8 mb-6">
                {/* Savings */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="bg-green-200/30 p-1.5 rounded-full">
                      <DollarSign className="h-4 w-4 text-green-100" />
                    </div>
                    <span className="text-green-100 text-sm font-medium">Total Saved</span>
                  </div>
                  <div className="text-white text-3xl font-bold tracking-tight">
                    ${overall_stats.total_savings.toFixed(2)}
                  </div>
                  <div className="text-green-200 text-xs font-medium mt-1">
                    {overall_stats.total_orders} orders
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>

                {/* Spending */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="bg-orange-200/30 p-1.5 rounded-full">
                      <ShoppingBag className="h-4 w-4 text-orange-100" />
                    </div>
                    <span className="text-orange-100 text-sm font-medium">Total Spent</span>
                  </div>
                  <div className="text-white text-3xl font-bold tracking-tight">
                    ${overall_stats.total_spending.toFixed(2)}
                  </div>
                  <div className="text-orange-200 text-xs font-medium mt-1">
                    {savingsRate}% saved
                  </div>
                </div>
              </div>

              {/* Savings Highlights */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-idl-yellow" />
                    <span className="text-white text-sm font-medium">
                      ${overall_stats.total_discount_savings.toFixed(2)} discounts
                    </span>
                  </div>
                </div>
                <div className="bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-idl-yellow" />
                    <span className="text-white text-sm font-medium">
                      ${overall_stats.total_wallet_bonuses.toFixed(2)} rewards
                    </span>
                  </div>
                </div>
              </div>

              {/* Message
              <div className="text-center px-4">
                <p className="text-green-100 text-sm leading-relaxed max-w-xs mx-auto">
                  Keep shopping smart with IdealMart and watch your savings grow every month!
                </p>
              </div> */}
            </div>
          </div>
        </div>

        {/* CHART SECTION - Enhanced visual summary with indicators */}
        <div className="bg-white px-6 py-8 border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-idl-green/10 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-idl-green" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Last 4 Months Performance</h3>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-idl-green rounded-full"></div>
                <span className="text-gray-600 font-medium">Savings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-gray-600 font-medium">Spending</span>
              </div>
            </div>
          </div>
          
          <div className="h-48 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl p-6">
            {filteredTrendsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="savingsAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#378157" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#378157" stopOpacity={0.02}/>
                    </linearGradient>
                    <linearGradient id="spendingAreaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0.02}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                  <Line 
                    type="monotone" 
                    dataKey="savings" 
                    stroke="#378157" 
                    strokeWidth={3} 
                    dot={{ fill: '#378157', r: 5, strokeWidth: 3, stroke: 'white' }}
                    activeDot={{ r: 7, stroke: '#378157', strokeWidth: 3, fill: '#378157' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="spending" 
                    stroke="#f97316" 
                    strokeWidth={3} 
                    dot={{ fill: '#f97316', r: 5, strokeWidth: 3, stroke: 'white' }}
                    activeDot={{ r: 7, stroke: '#f97316', strokeWidth: 3, fill: '#f97316' }}
                  />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 13, fill: '#374151', fontWeight: 600 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    tickFormatter={(value) => `$${value}`}
                    width={50}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      `$${value.toFixed(2)}`, 
                      name === 'savings' ? '💰 Total Saved' : '🛒 Total Spent'
                    ]}
                    labelFormatter={(label) => `📅 ${label}`}
                    labelStyle={{ color: '#374151', fontWeight: 700, marginBottom: '8px' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '2px solid #e5e7eb', 
                      borderRadius: '16px', 
                      fontSize: '13px',
                      fontWeight: 500,
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      padding: '12px'
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No trend data available</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM SECTION - Order History (3/5 of remaining viewport) */}
        <div className="bg-white">
          {/* Filter Section */}
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-idl-green/10 p-2 rounded-full">
                  <ShoppingBag className="h-5 w-5 text-idl-green" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Order History</h2>
                  <p className="text-sm text-gray-600">
                    {filteredOrders.length}{savingsData?.count > filteredOrders.length ? ` of ${savingsData.count}` : ''} orders • ${filteredStats.totalSavings.toFixed(2)} total saved
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={timeRangeFilter} onValueChange={setTimeRangeFilter}>
                  <SelectTrigger className="w-[130px] h-9 text-xs border-2 border-gray-200 focus:border-idl-green">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All time</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="lastweek">Last week</SelectItem>
                    <SelectItem value="lastmonth">Last month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Expandable Order List */}
          <div className="divide-y divide-gray-100">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gray-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <ShoppingBag className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filter or check back later</p>
                <button 
                  onClick={() => setTimeRangeFilter('all')}
                  className="bg-idl-green text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors font-medium"
                >
                  View all orders
                </button>
              </div>
            ) : (
              filteredOrders.map((order) => {
                const totalOrderSavings = order.order_items_details.reduce((sum, item) => 
                  sum + (parseFloat(item.price) - parseFloat(item.discounted_price)), 0);
                const isExpanded = expandedOrders.has(order.id);
                
                return (
                  <div key={order.id} className="bg-white hover:bg-gray-50/50 transition-all duration-200">
                    {/* Order Summary Row - Clickable */}
                    <div 
                      className="flex items-center justify-between p-5 cursor-pointer"
                      onClick={() => {
                        const newExpanded = new Set(expandedOrders);
                        if (isExpanded) {
                          newExpanded.delete(order.id);
                        } else {
                          newExpanded.add(order.id);
                        }
                        setExpandedOrders(newExpanded);
                      }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="bg-idl-green/10 px-3 py-1 rounded-full">
                              <span className="font-bold text-idl-green text-sm">#{order.order_id}</span>
                            </div>
                            <span className="text-sm text-gray-600 font-medium">
                              {format(parseISO(order.created_at), 'MMM dd, yyyy')}
                            </span>
                          </div>
                          <Badge 
                            className={`text-xs font-semibold ${
                              order.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : order.status === 'pending'
                                ? 'bg-idl-yellow/20 text-yellow-800 border border-yellow-200'
                                : 'bg-gray-100 text-gray-800 border border-gray-200'
                            }`}
                          >
                            {order.status.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-xl font-bold text-gray-900">
                                ${parseFloat(order.paid_amount).toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-500 font-medium">Amount Paid</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-idl-green">
                                ${totalOrderSavings.toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-500 font-medium">You Saved</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="text-sm text-gray-600 font-medium">
                                {order.order_items_details.length} item{order.order_items_details.length > 1 ? 's' : ''}
                              </div>
                              <div className="text-xs text-gray-500 capitalize">
                                {order.payment_method.replace('_', ' ')}
                              </div>
                            </div>
                            <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                              <ChevronDown className="h-5 w-5 text-idl-green" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Order Details */}
                    {isExpanded && (
                      <div className="px-5 pb-5 bg-gradient-to-br from-gray-50/50 to-green-50/30 border-t border-gray-100">
                        <div className="py-4">
                          {/* Individual Items */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="bg-idl-green/10 p-1.5 rounded-full">
                                <ShoppingBag className="h-4 w-4 text-idl-green" />
                              </div>
                              <h4 className="font-semibold text-gray-900">Order Details</h4>
                            </div>
                            
                            {order.order_items_details.map((item, index) => {
                              const originalPrice = parseFloat(item.price);
                              const discountedPrice = parseFloat(item.discounted_price);
                              const savings = originalPrice - discountedPrice;
                              const savingsPercentage = ((savings / originalPrice) * 100).toFixed(0);
                              
                              return (
                                <div key={index} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                  <div className="flex gap-4">
                                    {item.productImage && (
                                      <div className="relative">
                                        <img 
                                          src={item.productImage} 
                                          alt={item.product_name}
                                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-gray-200"
                                        />
                                        {savings > 0 && (
                                          <div className="absolute -top-2 -right-2 bg-idl-green text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                            -{savingsPercentage}%
                                          </div>
                                        )}
                                      </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <div className="font-semibold text-gray-900 mb-1 text-sm leading-tight">
                                        {item.product_name}
                                      </div>
                                      <div className="text-xs text-gray-500 mb-3 font-medium">
                                        📍 {item.store_name}
                                      </div>
                                      
                                      {/* Price Breakdown */}
                                      <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                          <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-400 line-through font-medium">
                                              ${originalPrice.toFixed(2)}
                                            </span>
                                            <span className="text-lg font-bold text-gray-900">
                                              ${discountedPrice.toFixed(2)}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="text-right">
                                          <div className="text-sm font-bold text-idl-green">
                                            +${savings.toFixed(2)}
                                          </div>
                                          <div className="text-xs text-gray-500 font-medium">saved</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          
                          {/* Order Total Summary */}
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            <div className="bg-gradient-to-r from-idl-green to-green-600 rounded-xl p-4 text-white">
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <TrendingUp className="h-4 w-4" />
                                Order Summary
                              </h4>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-green-100">Total Amount:</span>
                                  <span className="font-bold text-lg">
                                    ${parseFloat(order.paid_amount).toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-green-100">Total Savings:</span>
                                  <span className="font-bold text-lg text-idl-yellow">
                                    ${totalOrderSavings.toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-sm pt-2 border-t border-green-500">
                                  <span className="text-green-100">Payment Method:</span>
                                  <span className="font-medium capitalize">
                                    {order.payment_method.replace('_', ' ')}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Auto-scroll Pagination */}
          {hasMore && filteredOrders.length > 0 && (
            <div className="px-6 py-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="text-center">
                {/* Progress Bar */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-3">
                    Showing {filteredOrders.length} of {savingsData?.count || 0} total orders
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-idl-green to-green-600 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${Math.min((filteredOrders.length / (savingsData?.count || 1)) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {Math.round(Math.min((filteredOrders.length / (savingsData?.count || 1)) * 100, 100))}% loaded
                  </p>
                </div>

                {/* Auto-scroll Instruction */}
                {!loadingMore && (
                  <p className="text-xs text-gray-500">
                    Scroll down to automatically load more orders
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Loading More Indicator */}
          {loadingMore && (
            <div className="px-6 py-6 border-t border-gray-200 bg-white">
              <div className="flex items-center justify-center gap-3 text-idl-green">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-idl-green"></div>
                <span className="text-sm font-medium">Loading more orders...</span>
              </div>
            </div>
          )}

          {/* No More Orders Indicator */}
          {!hasMore && filteredOrders.length > 0 && (
            <div className="px-6 py-8 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="text-center">
                <div className="bg-gray-100 border border-gray-200 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No More Orders to Load</h3>
                <p className="text-sm text-gray-600 mb-1">
                  You've reached the end of your order history
                </p>
                <p className="text-xs text-gray-500">
                  {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'} total
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavingsAndSpent;

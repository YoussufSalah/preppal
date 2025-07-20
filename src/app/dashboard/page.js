'use client'
import React, { useEffect, useState } from 'react';
import { User, Calendar, Trophy, TrendingUp, FileText, Brain, Zap, Target, Award, Star, Flame, BookOpen, Clock, BarChart3 } from 'lucide-react';
import { getCurrentUser, signOut, } from "../../utils/auth.js";
import { apiService } from '@/utils/APIService.js';
import { getWeeklyActivity } from '@/utils/getWeeklyActivity.js';
import dayjs from "dayjs";


const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [email, setEmail] = useState('');
  const [username, setUsername] =  useState('');
  const [joinDate, setJoinDate] = useState('');
  const [totalSummaryCount, setTotalSummaryCount] = useState(0);
  const [totalFlashcardCount, setTotalFlashcardCount] = useState(0);
  const [totalQuizCount, setTotalQuizCount] = useState(0);
  const [studyTime, setStudyTime] = useState(0);
  const [weeklyData, setWeeklyData] = useState([]);

const accessToken =
  typeof window !== "undefined"
    ? localStorage.getItem("accessToken")
    : null;

useEffect(() => {
  const fetchStatsAndUser = async () => {
    try {
      const res = await apiService.getUserStats(accessToken);
      console.log("📊 Stats fetched:", res);

      const stats = res?.data?.stats;

      if (stats) {
        setEmail(stats.email || "youremail@preppal.com");
        setUsername(stats.username || "YourUsername");

        const formattedDate = new Date(stats.joinedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setJoinDate(formattedDate);

        setStudyTime(stats.totalStudyTime || 0);
      }
    } catch (err) {
      console.log("❌ Failed to fetch stats:", err);
      setEmail("youremail@preppal.com");
      setUsername("YourUsername");
    }
  };

  fetchStatsAndUser();
}, []);


useEffect(() => {
  const fetchStats = async () => {
    if (!accessToken) {
      console.log("⚠️ No access token found.");
      return;
    }

    try {
      const res = await apiService.getUserStats(accessToken);
      console.log("📊 Full Stats fetched:", res);

      const stats = res?.data?.stats;
      const usage = stats?.usage;

      if (usage) {
        setTotalSummaryCount(usage.summariesGenerated || 0);
        setTotalFlashcardCount(usage.flashcardsCreated || 0);
        setTotalQuizCount(usage.quizzesTaken || 0);

        console.log("📄 Summary count:", usage.summariesGenerated);
        console.log("🧠 Flashcard count:", usage.flashcardsCreated);
        console.log("❓ Quiz count:", usage.quizzesTaken);
      }
    } catch (error) {
      console.error("❌ Failed to fetch usage stats:", error);
    }
  };

  fetchStats();
}, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const rawData = await getWeeklyActivity();

      const formatted = rawData.map((entry) => ({
        day: dayjs(entry.date).format("ddd"),
        summaries: entry.summaries,
        quizzes: entry.quizzes,
        flashcards: entry.flashcards,
      }));

      setWeeklyData(formatted);
    } catch (error) {
      console.error("Failed to fetch weekly activity:", error);
    }
  };

  fetchData(); // ← THIS WAS MISSING
}, []);



const hours = Math.floor(studyTime / 60);
const minutes = studyTime % 60;
  // Mock user data
  const userData = {
    name: "john",
    streak: 12,
    accuracy: 87
  };

  const badges = [
    { id: 1, name: "Quick Learner", description: "Complete 10 quizzes", icon: Brain, earned: true, color: "bg-blue-500" },
    { id: 2, name: "Streak Master", description: "Maintain 7-day streak", icon: Flame, earned: true, color: "bg-orange-500" },
    { id: 3, name: "Summary Pro", description: "Generate 25 summaries", icon: FileText, earned: true, color: "bg-green-500" },
    { id: 4, name: "Flashcard Champion", description: "Create 100 flashcards", icon: Zap, earned: true, color: "bg-purple-500" },
    { id: 5, name: "Perfect Score", description: "Score 100% on a quiz", icon: Target, earned: false, color: "bg-yellow-500" },
    { id: 6, name: "Study Warrior", description: "Study for 100 hours", icon: Award, earned: false, color: "bg-red-500" }
  ];

  const recentActivity = [
    { id: 1, type: "summary", title: "Advanced Mathematics Chapter 5", time: "2 hours ago" },
    { id: 2, type: "quiz", title: "Biology Quiz - Cell Structure", time: "5 hours ago", score: 85 },
    { id: 3, type: "flashcard", title: "Spanish Vocabulary Set 3", time: "1 day ago" },
    { id: 4, type: "summary", title: "World History - Renaissance", time: "2 days ago" }
  ];

 
  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-gray-600 text-sm font-medium truncate">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-gray-500 text-xs sm:text-sm mt-1 truncate">{subtitle}</p>}
        </div>
        <div className={`${color} p-2 sm:p-3 rounded-lg flex-shrink-0 ml-2`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const Badge = ({ badge }) => (
    <div className={`relative p-3 sm:p-4 rounded-xl border-2 transition-all hover:scale-105 ${
      badge.earned 
        ? 'bg-white border-gray-200 shadow-sm' 
        : 'bg-gray-50 border-gray-100 opacity-60'
    }`}>
      <div className="flex flex-col items-center text-center">
        <div className={`${badge.color} p-2 sm:p-3 rounded-full mb-2 sm:mb-3 ${!badge.earned && 'grayscale'}`}>
          <badge.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{badge.name}</h3>
        <p className="text-xs sm:text-sm text-gray-600 leading-tight">{badge.description}</p>
        {badge.earned && (
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-green-500 rounded-full p-1">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white fill-current" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto sm:mx-0">
              <span className="text-white text-2xl sm:text-3xl font-bold">
                {username ? username.split(' ').map(n => n.charAt(0).toUpperCase()).join('') : 'U'}
              </span>
            </div>
            <div className="flex-1 text-center sm:text-left ml-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">{username}</h2>
              <p className="text-gray-600 text-sm sm:text-base break-all">{email}</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Member since {joinDate}</p>
            </div>
            <div className="text-center sm:text-right">
              <div className="flex items-center justify-center sm:justify-end space-x-2 text-green-600 mb-2">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold text-sm sm:text-base">Pro Member</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500">Level 12 Learner</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <StatCard 
            icon={FileText} 
            title="Total Summaries" 
            value={totalSummaryCount} 
            subtitle="This month: 12"
            color="bg-blue-500" 
          />
          <StatCard 
            icon={Brain} 
            title="Quizzes Taken" 
            value={totalQuizCount} 
            subtitle={`${userData.accuracy}% avg score`}
            color="bg-green-500" 
          />
          <StatCard 
            icon={Zap} 
            title="Flashcards Created" 
            value={totalFlashcardCount} 
            subtitle="Across 8 subjects"
            color="bg-purple-500" 
          />
          <StatCard 
            icon={Clock} 
            title="Study Time" 
            value={`${hours ? `${hours}h ` : ""}${minutes}m`}
            subtitle="This month"
            color="bg-orange-500" 
          />
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex px-3 sm:px-6 overflow-x-auto scrollbar-hide">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'badges', label: 'Achievements', icon: Trophy },
                { id: 'activity', label: 'Recent Activity', icon: Clock }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
                
                {/* Mobile Layout: Vertical Cards */}
                <div className="block sm:hidden space-y-3">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900">{day.day}</p>
                        <div className="flex space-x-2">
                          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                            {day.summaries}
                          </span>
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                            {day.quizzes}
                          </span>
                          <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">
                            {day.flashcards}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>{day.summaries} summaries</span>
                        <span>{day.quizzes} quizzes</span>
                        <span>{day.flashcards} flashcards</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Layout: Original Grid */}
                <div className="hidden sm:grid grid-cols-7 gap-4">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="text-center">
                      <p className="text-sm font-medium text-gray-600 mb-2">{day.day}</p>
                      <div className="space-y-1">
                        <div className="bg-blue-100 rounded px-2 py-1">
                          <span className="text-xs text-blue-700">{day.summaries} summaries</span>
                        </div>
                        <div className="bg-green-100 rounded px-2 py-1">
                          <span className="text-xs text-green-700">{day.quizzes} quizzes</span>
                        </div>
                        <div className="bg-purple-100 rounded px-2 py-1">
                          <span className="text-xs text-purple-700">{day.flashcards} cards</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'badges' && (
              <div>
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Achievements</h3>
                  <span className="text-xs sm:text-sm text-gray-600">
                    {badges.filter(b => b.earned).length} of {badges.length} earned
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {badges.map((badge) => (
                    <Badge key={badge.id} badge={badge} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3 sm:space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-lg flex-shrink-0 ${
                        activity.type === 'summary' ? 'bg-blue-100' :
                        activity.type === 'quiz' ? 'bg-green-100' : 'bg-purple-100'
                      }`}>
                        {activity.type === 'summary' && <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />}
                        {activity.type === 'quiz' && <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />}
                        {activity.type === 'flashcard' && <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{activity.title}</p>
                        <p className="text-xs sm:text-sm text-gray-600">{activity.time}</p>
                      </div>
                      {activity.score && (
                        <div className="text-right flex-shrink-0">
                          <span className="text-base sm:text-lg font-semibold text-green-600">{activity.score}%</span>
                          <p className="text-xs text-gray-500">Score</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
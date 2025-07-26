'use client'
import React, { useEffect, useState } from 'react';
import { User, Calendar, Trophy, TrendingUp, FileText, Brain, Zap, Target, Award, Star, Flame, BookOpen, Clock, BarChart3, Coins } from 'lucide-react';
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
  const [isProMember, setIsProMember] = useState(false);
  const [credits, setCredits] = useState(0);


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
        setCredits(stats.availableCredits || 0);

        const formattedDate = new Date(stats.joinedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setJoinDate(formattedDate);

        setStudyTime(stats.totalStudyTime || 0);

      if(
        typeof stats.subscription === "object" && 
        stats.subscription.name === "pro" &&
        stats.subscription.isActive
      ) {
        setIsProMember(true);
      } else{
        setIsProMember(false);
      }
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
      console.log("📅 Weekly Activity:", rawData);


      const formatted = rawData.map((entry) => ({
        day: dayjs(entry.date).format("ddd"), // e.g., "Mon", "Tue"
        summaries: entry.summaries,
        quizzes: entry.quizzes,
        flashcards: entry.flashcards,
      }));

      setWeeklyData(formatted); // ✅ This updates what you're mapping in the UI
    } catch (error) {
      console.error("Failed to fetch weekly activity:", error);
    }
  };

  fetchData();
}, []);



const hours = Math.floor(studyTime / 60);
const minutes = studyTime % 60;

 
  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-gray-600 text-sm font-medium truncate">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`${color} p-2 sm:p-3 rounded-lg flex-shrink-0 ml-2`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
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
              {isProMember && ( 
              <div className="flex items-center justify-center sm:justify-end space-x-2 text-green-600 mb-2">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold text-sm sm:text-base">Pro Member</span>
              </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <StatCard 
            icon={FileText} 
            title="Total Summaries" 
            value={totalSummaryCount} 
            color="bg-blue-500" 
          />
          <StatCard 
            icon={Brain} 
            title="Quizzes Taken" 
            value={totalQuizCount} 
            color="bg-green-500" 
          />
          <StatCard 
            icon={Zap} 
            title="Flashcards Created" 
            value={totalFlashcardCount} 
            color="bg-purple-500" 
          />
          <StatCard 
            icon={Clock} 
            title="Study Time" 
            value={`${hours ? `${hours}h ` : ""}${minutes}m`}
            color="bg-orange-500" 
          />
          <StatCard
            icon={Coins}
            title={"Credits Remaining"}
            value={credits}
            color="bg-yellow-500"
          />
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 sm:mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex px-3 sm:px-6 overflow-x-auto scrollbar-hide">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
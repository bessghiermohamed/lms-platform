'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, BookOpen, Users, FileText, Calendar,
  MessageCircle, ChevronLeft, ChevronRight, Search,
  Phone, Mail, MapPin, Clock, Star, ArrowLeft,
  Menu, X, Home, BookMarked, Bell, Settings,
  Download, PlayCircle, File, ExternalLink,
  TrendingUp, Award, Target, Layers,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

/* ─── Types ─────────────────────────────────────────────── */
type PageView = 'home' | 'courses' | 'course-detail' | 'contact';

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  progress?: number;
  image: string;
  sections: CourseSection[];
}

interface CourseSection {
  id: number;
  title: string;
  description: string;
  resources: Resource[];
}

interface Resource {
  id: number;
  title: string;
  type: 'pdf' | 'video' | 'link';
  duration?: string;
}

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

/* ─── Data ──────────────────────────────────────────────── */

const CATEGORIES = ['الكل', 'العلوم', 'التقنية', 'اللغات', 'الرياضيات', 'الأدب'];

const COURSES: Course[] = [
  {
    id: 1,
    title: 'الرياضيات التحليلية',
    description: 'تعلم أساسيات التفاضل والتكامل والتحليل الرياضي مع تمارين تطبيقية متنوعة وحلول مفصلة.',
    category: 'الرياضيات',
    instructor: 'د. أحمد المنصوري',
    duration: '16 أسبوع',
    students: 234,
    rating: 4.8,
    progress: 65,
    image: '📐',
    sections: [
      {
        id: 1, title: 'مقدمة في النهايات', description: 'تعريف النهايات وخصائصها',
        resources: [
          { id: 1, title: 'محاضرة: مفهوم النهاية', type: 'video', duration: '45 دقيقة' },
          { id: 2, title: 'ملخص النهايات', type: 'pdf' },
          { id: 3, title: 'تمارين النهايات', type: 'pdf' },
        ],
      },
      {
        id: 2, title: 'الاشتقاق', description: 'قواعد الاشتقاق وتطبيقاتها',
        resources: [
          { id: 4, title: 'محاضرة: قواعد الاشتقاق', type: 'video', duration: '50 دقيقة' },
          { id: 5, title: 'تمارين تطبيقية', type: 'pdf' },
        ],
      },
      {
        id: 3, title: 'التكامل', description: 'التكامل غير المحدد والمحدد',
        resources: [
          { id: 6, title: 'محاضرة: التكامل', type: 'video', duration: '55 دقيقة' },
          { id: 7, title: 'جدول التكاملات', type: 'pdf' },
          { id: 8, title: 'مراجع إضافية', type: 'link' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'الفيزياء الحديثة',
    description: 'استكشف عالم الفيزياء الحديثة من النسبية إلى ميكانيكا الكم مع أمثلة عملية.',
    category: 'العلوم',
    instructor: 'د. سارة الحسيني',
    duration: '14 أسبوع',
    students: 189,
    rating: 4.6,
    progress: 40,
    image: '⚛️',
    sections: [
      {
        id: 1, title: 'النسبية الخاصة', description: 'مبادئ نظرية آينشتاين',
        resources: [
          { id: 1, title: 'محاضرة: مبادئ النسبية', type: 'video', duration: '40 دقيقة' },
          { id: 2, title: 'ملاحظات المحاضرة', type: 'pdf' },
        ],
      },
      {
        id: 2, title: 'ميكانيكا الكم', description: 'مقدمة في فيزياء الكم',
        resources: [
          { id: 3, title: 'محاضرة: مبدأ عدم اليقين', type: 'video', duration: '35 دقيقة' },
          { id: 4, title: 'تمارين ميكانيكا الكم', type: 'pdf' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'برمجة Python المتقدمة',
    description: 'تعلم البرمجة بلغة Python من الأساسيات حتى المشاريع المتقدمة والذكاء الاصطناعي.',
    category: 'التقنية',
    instructor: 'م. يوسف خالد',
    duration: '20 أسبوع',
    students: 456,
    rating: 4.9,
    progress: 25,
    image: '💻',
    sections: [
      {
        id: 1, title: 'أساسيات Python', description: 'المتغيرات، الحلقات، الدوال',
        resources: [
          { id: 1, title: 'محاضرة: المتغيرات والأنواع', type: 'video', duration: '30 دقيقة' },
          { id: 2, title: 'تمارين الحلقات', type: 'pdf' },
          { id: 3, title: 'بيئة التطوير', type: 'link' },
        ],
      },
      {
        id: 2, title: 'هياكل البيانات', description: 'القوائم، القواميس، المجموعات',
        resources: [
          { id: 4, title: 'محاضرة: القوائم والمصفوفات', type: 'video', duration: '45 دقيقة' },
          { id: 5, title: 'مشروع تطبيقي', type: 'pdf' },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'اللغة الإنجليزية الأكاديمية',
    description: 'تحسين مهاراتك في الكتابة والقراءة والمحادثة باللغة الإنجليزية الأكاديمية.',
    category: 'اللغات',
    instructor: 'أ. ليلى عمر',
    duration: '12 أسبوع',
    students: 312,
    rating: 4.7,
    image: '🌐',
    sections: [
      {
        id: 1, title: 'الكتابة الأكاديمية', description: 'أساسيات كتابة المقالات البحثية',
        resources: [
          { id: 1, title: 'محاضرة: هيكل المقال', type: 'video', duration: '35 دقيقة' },
          { id: 2, title: 'قائمة المراجع', type: 'pdf' },
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'الكيمياء العضوية',
    description: 'دراسة المركبات العضوية وتفاعلاتها وآلياتها في الكيمياء الحديثة.',
    category: 'العلوم',
    instructor: 'د. محمد الفارسي',
    duration: '16 أسبوع',
    students: 156,
    rating: 4.5,
    image: '🧪',
    sections: [
      {
        id: 1, title: 'مدخل الكيمياء العضوية', description: 'التركيب والروابط',
        resources: [
          { id: 1, title: 'محاضرة: الألكانات', type: 'video', duration: '40 دقيقة' },
          { id: 2, title: 'نماذج ثلاثية الأبعاد', type: 'link' },
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'الأدب العربي الحديث',
    description: 'رحلة في عالم الأدب العربي من النهضة حتى العصر الحديث مع تحليل النصوص.',
    category: 'الأدب',
    instructor: 'د. فاطمة الزهراء',
    duration: '14 أسبوع',
    students: 198,
    rating: 4.8,
    image: '📚',
    sections: [
      {
        id: 1, title: 'مدرسة الديوان', description: 'أحمد شوقي وحافظ إبراهيم',
        resources: [
          { id: 1, title: 'محاضرة: شعر أحمد شوقي', type: 'video', duration: '50 دقيقة' },
          { id: 2, title: 'نصوص مختارة', type: 'pdf' },
        ],
      },
    ],
  },
];

const NEWS: NewsItem[] = [
  { id: 1, title: 'افتتاح التسجيل للفصل الدراسي الجديد', excerpt: 'يسر إدارة المنصة الإعلان عن افتتاح باب التسجيل في جميع المقررات للفصل الدراسي الثاني.', date: '2026-04-28', category: 'إعلان' },
  { id: 2, title: 'ورشة عمل: مهارات البحث العلمي', excerpt: 'ندعوكم لحضور ورشة عمل مجانية حول أساسيات البحث العلمي وكيفية كتابة البحوث الأكاديمية.', date: '2026-04-25', category: 'فعالية' },
  { id: 3, title: 'تحديث جديد: نظام التقييم التفاعلي', excerpt: 'أضفنا ميزة جديدة تتيح للطلاب متابعة تقدمهم بشكل أفضل مع إحصائيات مفصلة.', date: '2026-04-20', category: 'تحديث' },
  { id: 4, title: 'نتائج مسابقة البرمجة السنوية', excerpt: 'تهانينا للفائزين في مسابقة البرمجة السنوية! شارك فيها أكثر من 200 طالب من مختلف التخصصات.', date: '2026-04-15', category: 'أخبار' },
];

const UPCOMING_EVENTS = [
  { date: '5 مايو', title: 'محاضرة: الذكاء الاصطناعي في التعليم', time: '10:00 صباحاً' },
  { date: '8 مايو', title: 'ورشة: تصميم التطبيقات التعليمية', time: '2:00 مساءً' },
  { date: '12 مايو', title: 'اختبار نصفي: الرياضيات التحليلية', time: '9:00 صباحاً' },
  { date: '15 مايو', title: 'ندوة: مستقبل التعلم الرقمي', time: '4:00 مساءً' },
];

/* ─── Animation Variants ───────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: 'easeOut' },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

/* ═══════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════ */

function Navbar({ activePage, onNavigate }: { activePage: PageView; onNavigate: (p: PageView) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { label: string; page: PageView; icon: React.ElementType }[] = [
    { label: 'الرئيسية', page: 'home', icon: Home },
    { label: 'المقررات', page: 'courses', icon: BookOpen },
    { label: 'اتصل بنا', page: 'contact', icon: MessageCircle },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E4E9F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#2D5BA6]">Omni<span className="text-[#E86252]">-school</span></span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer"
                style={{
                  color: activePage === item.page ? '#2D5BA6' : '#5F6D7E',
                  background: activePage === item.page ? '#EBF5FF' : 'transparent',
                }}
              >
                {item.label}
                {activePage === item.page && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 right-3 left-3 h-0.5 rounded-full bg-[#2D5BA6]"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-[#F1F5F9] transition-colors cursor-pointer">
              <Bell className="w-5 h-5 text-[#5F6D7E]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E86252] rounded-full" />
            </button>
            <button className="p-2 rounded-lg hover:bg-[#F1F5F9] transition-colors cursor-pointer">
              <Settings className="w-5 h-5 text-[#5F6D7E]" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#E4E9F0] bg-white overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => { onNavigate(item.page); setMobileOpen(false); }}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                  style={{
                    color: activePage === item.page ? '#2D5BA6' : '#5F6D7E',
                    background: activePage === item.page ? '#EBF5FF' : 'transparent',
                  }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="bg-[#1A2332] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#2D5BA6] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Omni<span className="text-[#E86252]">-school</span></span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              منصة تعليمية متكاملة تهدف إلى تقديم تجربة تعلم رقمية متميزة مستوحاة من أفضل المنصات العالمية.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-[#E86252]">روابط سريعة</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">الرئيسية</li>
              <li className="hover:text-white transition-colors cursor-pointer">المقررات</li>
              <li className="hover:text-white transition-colors cursor-pointer">البرنامج السنوي</li>
              <li className="hover:text-white transition-colors cursor-pointer">اتصل بنا</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold mb-4 text-[#E86252]">تواصل معنا</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> info@omni-school.edu</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +213 555 123 456</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> الجزائر العاصمة</li>
            </ul>
          </div>
        </div>

        <Separator className="my-6 bg-[#2A3A4A]" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Omni-school. جميع الحقوق محفوظة.</p>
          <p>صُنع بـ ❤️ للتعليم</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   STAT CARD (Dashboard style)
   ═══════════════════════════════════════════════════════════ */

function StatCard({ icon: Icon, label, value, color, index }: {
  icon: React.ElementType; label: string; value: string | number; color: string; index: number;
}) {
  return (
    <motion.div custom={index} variants={fadeUp} initial="hidden" animate="visible" className="card-hover">
      <Card className="border border-[#E4E9F0] overflow-hidden">
        <CardContent className="p-5 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0`} style={{ background: color + '15' }}>
            <Icon className="w-6 h-6" style={{ color }} strokeWidth={2} />
          </div>
          <div>
            <p className="text-sm text-[#5F6D7E]">{label}</p>
            <p className="text-2xl font-bold" style={{ color }}>{value}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════════════ */

function HomePage({ onNavigate, onSelectCourse }: { onNavigate: (p: PageView) => void; onSelectCourse: (id: number) => void }) {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl gradient-primary text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-10 left-20 w-48 h-48 rounded-full bg-[#E86252]/30 blur-2xl" />
        </div>
        <div className="relative px-6 sm:px-10 py-12 sm:py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className="bg-white/20 text-white border-white/30 text-xs mb-4">مرحباً بك في Omni-school</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              تعلّم بلا حدود
              <br />
              <span className="text-[#FFB4A8]">مستقبلك يبدأ من هنا</span>
            </h1>
            <p className="text-white/80 text-sm sm:text-base max-w-xl leading-relaxed mb-8">
              منصة تعليمية متكاملة توفر لك مقررات متنوعة وأدوات تفاعلية لمساعدتك في رحلتك التعليمية. مستوحاة من أفضل المنصات العالمية مثل Moodle.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => onNavigate('courses')}
                className="bg-white text-[#2D5BA6] hover:bg-gray-100 font-semibold cursor-pointer h-11 px-6"
              >
                استعرض المقررات
                <BookOpen className="w-4 h-4 mr-2" />
              </Button>
              <Button
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 cursor-pointer h-11 px-6"
              >
                تعرّف علينا
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Row */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={BookOpen} label="المقررات" value={6} color="#2D5BA6" index={0} />
          <StatCard icon={Users} label="الطلاب النشطين" value="1,545" color="#E86252" index={1} />
          <StatCard icon={Award} label="الشهادات" value={89} color="#52C27F" index={2} />
          <StatCard icon={TrendingUp} label="معدل الإنجاز" value="87%" color="#F5A623" index={3} />
        </div>
      </section>

      {/* My Courses (Moodle style) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A2332]">مقرراتي</h2>
            <p className="text-sm text-[#5F6D7E] mt-1">تابع تقدمك في المقررات المسجل فيها</p>
          </div>
          <button
            onClick={() => onNavigate('courses')}
            className="text-sm text-[#2D5BA6] hover:underline flex items-center gap-1 cursor-pointer"
          >
            عرض الكل <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COURSES.slice(0, 3).map((course, i) => (
            <motion.div
              key={course.id}
              custom={i}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -4 }}
              className="card-hover cursor-pointer"
              onClick={() => onSelectCourse(course.id)}
            >
              <Card className="border border-[#E4E9F0] overflow-hidden h-full">
                {/* Course Header */}
                <div className="h-24 gradient-primary flex items-center justify-center relative">
                  <span className="text-4xl">{course.image}</span>
                  <Badge className="absolute top-3 left-3 bg-white/90 text-[#2D5BA6] text-xs border-0">
                    {course.category}
                  </Badge>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-[#1A2332] text-sm mb-1">{course.title}</h3>
                    <p className="text-xs text-[#5F6D7E]">{course.instructor}</p>
                  </div>
                  {/* Progress */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#5F6D7E]">التقدم</span>
                      <span className="font-semibold text-[#2D5BA6]">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2 bg-[#F1F5F9]" />
                  </div>
                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-[#5F6D7E] pt-1">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{course.students}</span>
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-[#F5A623]" />{course.rating}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* News & Upcoming Events */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* News */}
        <Card className="border border-[#E4E9F0]">
          <CardHeader className="pb-3 border-b border-[#E4E9F0]">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#2D5BA6]" />
              <CardTitle className="text-base font-bold">آخر الأخبار</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E4E9F0]">
              {NEWS.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="px-5 py-4 hover:bg-[#F8FAFB] transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-[10px] px-2 py-0 border-[#E4E9F0] text-[#5F6D7E]">
                          {item.category}
                        </Badge>
                        <span className="text-[10px] text-[#5F6D7E]">{item.date}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-[#1A2332] truncate">{item.title}</h4>
                      <p className="text-xs text-[#5F6D7E] mt-1 line-clamp-1">{item.excerpt}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border border-[#E4E9F0]">
          <CardHeader className="pb-3 border-b border-[#E4E9F0]">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#E86252]" />
              <CardTitle className="text-base font-bold">الأحداث القادمة</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#E4E9F0]">
              {UPCOMING_EVENTS.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="px-5 py-4 hover:bg-[#F8FAFB] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#EBF5FF] flex flex-col items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-[#2D5BA6]">{event.date.split(' ')[0]}</span>
                      <span className="text-[10px] text-[#5F6D7E]">{event.date.split(' ')[1]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-[#1A2332] truncate">{event.title}</h4>
                      <p className="text-xs text-[#5F6D7E] mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" />{event.time}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COURSES PAGE
   ═══════════════════════════════════════════════════════════ */

function CoursesPage({ onSelectCourse }: { onSelectCourse: (id: number) => void }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('الكل');

  const filtered = useMemo(() => {
    return COURSES.filter((c) => {
      const matchSearch = c.title.includes(search) || c.description.includes(search) || c.instructor.includes(search);
      const matchCat = activeCategory === 'الكل' || c.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1A2332]">المقررات الدراسية</h1>
        <p className="text-sm text-[#5F6D7E] mt-1">تصفح جميع المقررات المتاحة وسجل في ما يناسبك</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5F6D7E]" />
          <Input
            placeholder="ابحث عن مقرر..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 pr-10 border-[#E4E9F0] focus:border-[#2D5BA6] focus:ring-[#2D5BA6]/20"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            style={{
              background: activeCategory === cat ? '#2D5BA6' : '#F1F5F9',
              color: activeCategory === cat ? '#FFFFFF' : '#5F6D7E',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              custom={i}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              whileHover={{ y: -6 }}
              className="card-hover cursor-pointer"
              onClick={() => onSelectCourse(course.id)}
            >
              <Card className="border border-[#E4E9F0] overflow-hidden h-full">
                <div className="h-32 gradient-primary flex items-center justify-center relative">
                  <span className="text-5xl">{course.image}</span>
                  <Badge className="absolute top-3 left-3 bg-white/90 text-[#2D5BA6] text-xs border-0">
                    {course.category}
                  </Badge>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 rounded-md px-2 py-0.5">
                    <Star className="w-3 h-3 text-[#F5A623] fill-[#F5A623]" />
                    <span className="text-xs font-semibold text-[#1A2332]">{course.rating}</span>
                  </div>
                </div>
                <CardContent className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-[#1A2332] mb-1">{course.title}</h3>
                    <p className="text-xs text-[#5F6D7E] leading-relaxed line-clamp-2">{course.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#5F6D7E]">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{course.students} طالب</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{course.duration}</span>
                  </div>
                  <Separator className="bg-[#E4E9F0]" />
                  <p className="text-xs text-[#5F6D7E]">{course.instructor}</p>
                  {course.progress !== undefined && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#5F6D7E]">التقدم</span>
                        <span className="font-semibold text-[#2D5BA6]">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-1.5 bg-[#F1F5F9]" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-12 h-12 text-[#E4E9F0] mx-auto mb-3" />
          <p className="text-[#5F6D7E]">لا توجد مقررات تطابق بحثك</p>
        </div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   COURSE DETAIL PAGE
   ═══════════════════════════════════════════════════════════ */

function CourseDetailPage({ courseId, onBack }: { courseId: number; onBack: () => void }) {
  const course = COURSES.find((c) => c.id === courseId);
  const [activeTab, setActiveTab] = useState('content');

  if (!course) {
    return (
      <div className="text-center py-20">
        <p className="text-[#5F6D7E]">المقرر غير موجود</p>
        <Button onClick={onBack} className="mt-4 cursor-pointer" style={{ background: '#2D5BA6' }}>العودة</Button>
      </div>
    );
  }

  const resourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="w-5 h-5 text-[#E86252]" />;
      case 'pdf': return <FileText className="w-5 h-5 text-[#2D5BA6]" />;
      case 'link': return <ExternalLink className="w-5 h-5 text-[#52C27F]" />;
      default: return <File className="w-5 h-5 text-[#5F6D7E]" />;
    }
  };

  const resourceLabel = (type: string) => {
    switch (type) {
      case 'video': return 'فيديو';
      case 'pdf': return 'ملف PDF';
      case 'link': return 'رابط خارجي';
      default: return 'ملف';
    }
  };

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-[#2D5BA6] hover:text-[#E86252] transition-colors cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
        العودة للمقررات
      </button>

      {/* Course Header */}
      <Card className="border border-[#E4E9F0] overflow-hidden">
        <div className="h-36 sm:h-44 gradient-primary flex items-center justify-center relative">
          <span className="text-6xl sm:text-7xl">{course.image}</span>
          <Badge className="absolute top-4 left-4 bg-white/90 text-[#2D5BA6] text-xs border-0">
            {course.category}
          </Badge>
        </div>
        <CardContent className="p-5 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-[#1A2332] mb-2">{course.title}</h1>
          <p className="text-sm text-[#5F6D7E] leading-relaxed mb-4">{course.description}</p>
          <div className="flex flex-wrap gap-4 text-xs text-[#5F6D7E]">
            <span className="flex items-center gap-1.5 bg-[#F1F5F9] px-3 py-1.5 rounded-lg">
              <Users className="w-4 h-4" />{course.students} طالب
            </span>
            <span className="flex items-center gap-1.5 bg-[#F1F5F9] px-3 py-1.5 rounded-lg">
              <Clock className="w-4 h-4" />{course.duration}
            </span>
            <span className="flex items-center gap-1.5 bg-[#F1F5F9] px-3 py-1.5 rounded-lg">
              <Star className="w-4 h-4 text-[#F5A623]" />{course.rating}
            </span>
            <span className="flex items-center gap-1.5 bg-[#F1F5F9] px-3 py-1.5 rounded-lg">
              <Layers className="w-4 h-4" />{course.sections.length} أقسام
            </span>
          </div>
          {course.progress !== undefined && (
            <div className="mt-4 p-4 bg-[#EBF5FF] rounded-xl">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#2D5BA6] font-medium">تقدمك في المقرر</span>
                <span className="font-bold text-[#2D5BA6]">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2.5 bg-[#DBEAFE]" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Course Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#F1F5F9] h-10 p-1 rounded-lg">
          <TabsTrigger value="content" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4">المحتوى</TabsTrigger>
          <TabsTrigger value="info" className="text-xs data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md px-4">معلومات</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-4 space-y-4">
          {course.sections.map((section, si) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: si * 0.1 }}
            >
              <Card className="border border-[#E4E9F0] overflow-hidden">
                <CardHeader className="pb-2 bg-[#F8FAFB] border-b border-[#E4E9F0]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-[#2D5BA6] text-white text-xs font-bold flex items-center justify-center">
                      {si + 1}
                    </div>
                    <div>
                      <CardTitle className="text-sm font-bold text-[#1A2332]">{section.title}</CardTitle>
                      <p className="text-[11px] text-[#5F6D7E] mt-0.5">{section.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-[#F1F5F9]">
                    {section.resources.map((res) => (
                      <div
                        key={res.id}
                        className="flex items-center justify-between px-4 py-3 hover:bg-[#F8FAFB] transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          {resourceIcon(res.type)}
                          <div>
                            <p className="text-sm font-medium text-[#1A2332] group-hover:text-[#2D5BA6] transition-colors">
                              {res.title}
                            </p>
                            <p className="text-[11px] text-[#5F6D7E]">{resourceLabel(res.type)}{res.duration ? ` - ${res.duration}` : ''}</p>
                          </div>
                        </div>
                        <button className="p-1.5 rounded-lg hover:bg-[#EBF5FF] transition-colors cursor-pointer">
                          <Download className="w-4 h-4 text-[#2D5BA6]" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="info" className="mt-4">
          <Card className="border border-[#E4E9F0]">
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-[#5F6D7E]">المحاضر</p>
                  <p className="text-sm font-semibold text-[#1A2332]">{course.instructor}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F6D7E]">المدة</p>
                  <p className="text-sm font-semibold text-[#1A2332]">{course.duration}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F6D7E]">عدد الطلاب</p>
                  <p className="text-sm font-semibold text-[#1A2332]">{course.students} طالب</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-[#5F6D7E]">التقييم</p>
                  <p className="text-sm font-semibold text-[#1A2332] flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#F5A623] fill-[#F5A623]" />{course.rating} / 5
                  </p>
                </div>
              </div>
              <Separator className="bg-[#E4E9F0]" />
              <div>
                <p className="text-xs text-[#5F6D7E] mb-1">وصف المقرر</p>
                <p className="text-sm text-[#1A2332] leading-relaxed">{course.description}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONTACT PAGE
   ═══════════════════════════════════════════════════════════ */

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'يرجى إدخال الاسم';
    if (!form.email.trim()) e.email = 'يرجى إدخال البريد الإلكتروني';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'البريد غير صحيح';
    if (!form.subject.trim()) e.subject = 'يرجى إدخال الموضوع';
    if (!form.message.trim()) e.message = 'يرجى إدخال الرسالة';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setTimeout(() => {
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 600);
  };

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="visible" exit="exit" className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1A2332]">اتصل بنا</h1>
        <p className="text-sm text-[#5F6D7E] mt-1">نسعد بتواصلكم واستفساراتكم</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-4">
          {[
            { icon: Mail, label: 'البريد الإلكتروني', value: 'info@omni-school.edu', color: '#2D5BA6' },
            { icon: Phone, label: 'الهاتف', value: '+213 555 123 456', color: '#E86252' },
            { icon: MapPin, label: 'العنوان', value: 'الجزائر العاصمة', color: '#52C27F' },
            { icon: Clock, label: 'ساعات العمل', value: 'الأحد - الخميس: 8ص - 5م', color: '#F5A623' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border border-[#E4E9F0] card-hover">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: item.color + '15' }}>
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-xs text-[#5F6D7E]">{item.label}</p>
                    <p className="text-sm font-semibold text-[#1A2332]">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="border border-[#E4E9F0]">
            <CardContent className="p-6">
              <AnimatePresence>
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10 space-y-3"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#ECFDF5] flex items-center justify-center mx-auto">
                      <Star className="w-8 h-8 text-[#52C27F]" />
                    </div>
                    <h2 className="text-lg font-bold text-[#1A2332]">تم إرسال رسالتك بنجاح!</h2>
                    <p className="text-sm text-[#5F6D7E]">سنتواصل معك في أقرب وقت ممكن</p>
                    <Button onClick={() => setSuccess(false)} className="mt-3 cursor-pointer text-white" style={{ background: '#2D5BA6' }}>
                      إرسال رسالة أخرى
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium">الاسم الكامل</Label>
                        <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="أدخل اسمك" className="h-10 border-[#E4E9F0] focus:border-[#2D5BA6]" />
                        {errors.name && <p className="text-[11px] text-[#E85252]">{errors.name}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-sm font-medium">البريد الإلكتروني</Label>
                        <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="example@edu.dz" className="h-10 border-[#E4E9F0] focus:border-[#2D5BA6]" dir="ltr" />
                        {errors.email && <p className="text-[11px] text-[#E85252]">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">الموضوع</Label>
                      <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="موضوع الرسالة" className="h-10 border-[#E4E9F0] focus:border-[#2D5BA6]" />
                      {errors.subject && <p className="text-[11px] text-[#E85252]">{errors.subject}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">الرسالة</Label>
                      <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="اكتب رسالتك هنا..." rows={5} className="border-[#E4E9F0] focus:border-[#2D5BA6] resize-none" />
                      {errors.message && <p className="text-[11px] text-[#E85252]">{errors.message}</p>}
                    </div>
                    <Button type="submit" className="w-full h-11 text-white font-semibold cursor-pointer transition-all hover:shadow-lg" style={{ background: 'linear-gradient(135deg, #2D5BA6, #E86252)' }}>
                      <MessageCircle className="w-4 h-4 ml-2" />
                      إرسال الرسالة
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════ */

export default function OmniSchoolApp() {
  const [activePage, setActivePage] = useState<PageView>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const handleNavigate = (page: PageView) => {
    setActivePage(page);
    setSelectedCourseId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCourse = (id: number) => {
    setSelectedCourseId(id);
    setActivePage('course-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromCourse = () => {
    setActivePage('courses');
    setSelectedCourseId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFB]">
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {activePage === 'home' && (
            <motion.div key="home">
              <HomePage onNavigate={handleNavigate} onSelectCourse={handleSelectCourse} />
            </motion.div>
          )}
          {activePage === 'courses' && (
            <motion.div key="courses">
              <CoursesPage onSelectCourse={handleSelectCourse} />
            </motion.div>
          )}
          {activePage === 'course-detail' && selectedCourseId && (
            <motion.div key={`course-${selectedCourseId}`}>
              <CourseDetailPage courseId={selectedCourseId} onBack={handleBackFromCourse} />
            </motion.div>
          )}
          {activePage === 'contact' && (
            <motion.div key="contact">
              <ContactPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

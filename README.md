# منصة التعليم الإلكتروني | LMS Platform

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-black)

منصة تعليم إلكتروني متكاملة تدعم اللغة العربية مع واجهة RTL احترافية.

## المميزات

- 🔐 **نظام تسجيل دخول** - لدورين: المعلم والطالب
- 👨‍🏫 **لوحة تحكم المعلم** - إحصائيات، رفع واجبات، إدارة طلاب
- 🎓 **لوحة تحكم الطالب** - إحصائيات، تسليم واجبات، جدول محاضرات
- 📚 **صفحة المقررات** - عرض المقررات المتاحة مع بطاقات تفاعلية
- 📩 **نموذج التواصل** - تواصل مع إدارة المنصة
- 📱 **تصميم متجاوب** - يعمل على جميع الأجهزة
- 🌐 **دعم كامل للعربية** - اتجاه RTL مع خطوط عربية

## بيانات الاختبار

| الدور | اسم المستخدم | كلمة المرور |
|-------|-------------|-------------|
| معلم | `teacher` | `123` |
| طالب | `student` | `123` |

## التقنيات المستخدمة

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Icons:** Lucide React
- **Database:** Prisma + SQLite

## التشغيل المحلي

```bash
# تثبيت المكتبات
npm install

# تشغيل الخادم المحلي
npm run dev
```

ثم افتح [http://localhost:3000](http://localhost:3000) في المتصفح.

## هيكل المشروع

```
src/
├── app/
│   ├── layout.tsx      # التصميم الرئيسي (RTL)
│   ├── page.tsx         # الصفحة الرئيسية (كل المنصة)
│   └── globals.css      # الأنماط العامة وألوان المنصة
├── components/
│   └── ui/              # مكونات shadcn/ui
├── hooks/               # React Hooks مخصصة
└── lib/
    ├── db.ts            # اتصال قاعدة البيانات
    └── utils.ts         # وظائف مساعدة
```

## الترخيص

هذا المشروع مفتوح المصدر تحت ترخيص MIT.

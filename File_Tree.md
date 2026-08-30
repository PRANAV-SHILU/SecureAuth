<div align="right">Last Modified: 1-Sep-2026</div>

# File Tree: LookSphere

**Root Path:** `LookSphere`

```text
├── ⚙️ .gitignore
├── 📁 Backend
│   ├── ⚙️ .env.example
│   ├── ⚙️ .gitignore
│   ├── 📝 APIs.md
│   ├── 📝 File_Tree.md
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── 📝 Readme.md
│   └── 📁 src
│       ├── 📁 config
│       │   ├── 📄 cloudinaryConfig.js
│       │   └── 📄 db.js
│       ├── 📁 controllers
│       │   ├── 📄 admin.controller.js
│       │   ├── 📄 auth.controller.js
│       │   ├── 📄 contact.controller.js
│       │   ├── 📄 post.controller.js
│       │   └── 📄 user.controller.js
│       ├── 📄 index.js
│       ├── 📁 middlewares
│       │   ├── 📄 auth.middleware.js
│       │   ├── 📄 role.middleware.js
│       │   └── 📄 upload.middleware.js
│       ├── 📁 models
│       │   ├── 📄 contact.model.js
│       │   ├── 📄 posts.model.js
│       │   └── 📄 users.model.js
│       ├── 📁 routes
│       │   ├── 📄 admin.route.js
│       │   ├── 📄 auth.routes.js
│       │   ├── 📄 contact.route.js
│       │   ├── 📄 post.routes.js
│       │   └── 📄 user.routes.js
│       ├── 📁 utils
│       │   ├── 📄 asyncHandler.js
│       │   ├── 📄 cloudinaryUpload.js
│       │   └── 📄 errorHandler.js
│       └── 📁 validators
│           ├── 📄 auth.validator.js
│           ├── 📄 contact.validator.js
│           ├── 📄 post.validator.js
│           └── 📄 user.validator.js
├── 📝 File_Tree.md
├── 📁 frontend
│   ├── ⚙️ .env.example
│   ├── ⚙️ .gitignore
│   ├── 📝 Design.md
│   ├── 📄 eslint.config.js
│   ├── 📝 File_Tree.md
│   ├── 🌐 index.html
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── 📁 public
│   │   ├── 🖼️ favicon.png
│   │   ├── 📄 manifest.json
│   │   ├── 🖼️ og-image.jpg
│   │   ├── 📄 robots.txt
│   │   └── 📄 sitemap.xml
│   ├── 📝 README.md
│   ├── 📁 src
│   │   ├── 📁 actions
│   │   │   ├── 📄 changePasswordAction.jsx
│   │   │   ├── 📄 contactAction.jsx
│   │   │   ├── 📄 editProfileAction.jsx
│   │   │   ├── 📄 loginAction.jsx
│   │   │   ├── 📄 logoutAction.jsx
│   │   │   ├── 📄 registerAction.jsx
│   │   │   └── 📄 uploadAction.jsx
│   │   ├── 📁 components
│   │   │   ├── 📁 about
│   │   │   │   ├── 📄 AboutDeveloper.jsx
│   │   │   │   ├── 📄 AboutFeatures.jsx
│   │   │   │   ├── 📄 AboutHero.jsx
│   │   │   │   ├── 📄 AboutJourney.jsx
│   │   │   │   └── 📄 AboutTechStack.jsx
│   │   │   ├── 📁 admin
│   │   │   │   ├── 📄 AdminSidebar.jsx
│   │   │   │   └── 📄 ContactCard.jsx
│   │   │   ├── 📁 dashboard
│   │   │   │   ├── 📄 LatestPostsTab.jsx
│   │   │   │   ├── 📄 MetricsTab.jsx
│   │   │   │   └── 📄 RecentActivityTab.jsx
│   │   │   ├── 📄 ErrorBoundary.jsx
│   │   │   ├── 📄 Footer.jsx
│   │   │   ├── 📄 Header.jsx
│   │   │   ├── 📁 home
│   │   │   │   ├── 📄 ActivityFeed.jsx
│   │   │   │   ├── 📄 AppShowcase.jsx
│   │   │   │   ├── 📄 CTASection.jsx
│   │   │   │   ├── 📄 HeroSection.jsx
│   │   │   │   ├── 📄 HowItWorks.jsx
│   │   │   │   ├── 📄 ReleasesAndVision.jsx
│   │   │   │   ├── 📄 SecurityPrivacy.jsx
│   │   │   │   ├── 📄 SupportAndPolicies.jsx
│   │   │   │   ├── 📄 TechStack.jsx
│   │   │   │   ├── 📄 ThemePreview.jsx
│   │   │   │   ├── 📄 WhatYouCanDo.jsx
│   │   │   │   └── 📄 WhyLookSphere.jsx
│   │   │   └── 📄 PageNotFound.jsx
│   │   ├── 📁 context
│   │   │   └── 📄 ContactFormContext.jsx
│   │   ├── 📁 hooks
│   │   │   └── 📄 useDocumentMetadata.js
│   │   ├── 📁 Layout
│   │   │   └── 📄 AppLayout.jsx
│   │   ├── 📁 loaders
│   │   │   ├── 📄 adminContactLoader.jsx
│   │   │   ├── 📄 authLoader.jsx
│   │   │   ├── 📄 creatorsLoader.jsx
│   │   │   ├── 📄 dashboardLoader.jsx
│   │   │   ├── 📄 editProfileLoader.jsx
│   │   │   ├── 📄 feedLoader.jsx
│   │   │   ├── 📄 myInquiriesLoader.jsx
│   │   │   ├── 📄 postDetailLoader.jsx
│   │   │   ├── 📄 profileLoader.jsx
│   │   │   └── 📄 redirectIfAuthenticated.jsx
│   │   ├── 🎨 main.css
│   │   ├── 📄 main.jsx
│   │   ├── 📁 modals
│   │   │   ├── 📄 ConfirmationModal.jsx
│   │   │   ├── 📄 PostDetailModal.jsx
│   │   │   └── 📄 UploadMediaModal.jsx
│   │   ├── 📁 network
│   │   │   ├── 📄 adminApi.js
│   │   │   ├── 📄 apiClient.js
│   │   │   ├── 📄 authApi.js
│   │   │   ├── 📄 cacheInterceptor.js
│   │   │   ├── 📄 contactApi.js
│   │   │   ├── 📄 endpoints.js
│   │   │   ├── 📄 postApi.js
│   │   │   └── 📄 userApi.js
│   │   ├── 📁 pages
│   │   │   ├── 📄 About.jsx
│   │   │   ├── 📄 AdminContact.jsx
│   │   │   ├── 📄 ChangePassword.jsx
│   │   │   ├── 📄 ContactUs.jsx
│   │   │   ├── 📄 Creators.jsx
│   │   │   ├── 📄 Dashboard.jsx
│   │   │   ├── 📄 EditProfile.jsx
│   │   │   ├── 📄 Explore.jsx
│   │   │   ├── 📄 FAQ.jsx
│   │   │   ├── 📄 Feed.jsx
│   │   │   ├── 📄 Home.jsx
│   │   │   ├── 📄 Login.jsx
│   │   │   ├── 📄 MyInquiries.jsx
│   │   │   ├── 📄 PostDetail.jsx
│   │   │   ├── 📄 PrivacyPolicy.jsx
│   │   │   ├── 📄 Profile.jsx
│   │   │   ├── 📄 Register.jsx
│   │   │   ├── 📄 Roadmap.jsx
│   │   │   ├── 📄 Settings.jsx
│   │   │   ├── 📄 TermsAndConditions.jsx
│   │   │   └── 📄 WhatsNew.jsx
│   │   ├── 📁 routes
│   │   │   └── 📄 router.jsx
│   │   ├── 📁 schema
│   │   │   ├── 📄 contactSchema.jsx
│   │   │   ├── 📄 editProfileSchema.jsx
│   │   │   ├── 📄 loginSchema.jsx
│   │   │   ├── 📄 postSchema.jsx
│   │   │   └── 📄 registerSchema.jsx
│   │   ├── 📁 services
│   │   │   ├── 📄 adminService.js
│   │   │   ├── 📄 authService.js
│   │   │   ├── 📄 contactService.js
│   │   │   ├── 📄 postService.js
│   │   │   └── 📄 userService.js
│   │   ├── 📁 shared-components
│   │   │   ├── 📄 BackButton.jsx
│   │   │   ├── 📄 LegalDocument.jsx
│   │   │   ├── 📄 PageLoader.jsx
│   │   │   ├── 📄 SharedHomeComponents.jsx
│   │   │   └── 📄 SvgIcons.jsx
│   │   ├── 📁 skeletons
│   │   │   ├── 📄 CreatorsSkeleton.jsx
│   │   │   ├── 📄 DashboardSkeleton.jsx
│   │   │   ├── 📄 ExploreSkeleton.jsx
│   │   │   ├── 📄 FeedSkeleton.jsx
│   │   │   ├── 📄 MyInquiriesSkeleton.jsx
│   │   │   └── 📄 ProfileSkeleton.jsx
│   │   └── 📁 utils
│   │       ├── 📄 aboutData.js
│   │       ├── 📄 cloudinaryOptimizer.js
│   │       ├── 📄 faqData.jsx
│   │       ├── 📄 feedRefresher.js
│   │       ├── 📄 privacyPolicyData.js
│   │       ├── 📄 roadmapData.js
│   │       ├── 📄 staticData.jsx
│   │       ├── 📄 styles.js
│   │       ├── 📄 termsAndConditionsData.js
│   │       └── 📄 whatsNewData.js
│   ├── 📄 vercel.json
│   └── 📄 vite.config.js
├── 📝 improvement.md
├── 📝 performance_optimization.md
├── 📝 Readme.md
├── 📝 resolved_issues.md
└── 📝 roadmap.md
```

---

_Generated by Antigravity IDE_

---
**📚 LookSphere Documentation Index:**
- **Root:** [Main Readme](./Readme.md) | [File Tree](./File_Tree.md) | [Roadmap](./roadmap.md) | [Performance](./performance_optimization.md) | [Resolved Issues](./resolved_issues.md)
- **Frontend:** [Frontend Readme](./frontend/README.md) | [Design Specs](./frontend/Design.md) | [Frontend File Tree](./frontend/File_Tree.md)
- **Backend:** [Backend Readme](./Backend/Readme.md) | [API Docs](./Backend/APIs.md) | [Backend File Tree](./Backend/File_Tree.md)
---

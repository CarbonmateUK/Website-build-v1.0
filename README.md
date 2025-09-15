# Carbonmate - SECR & PPN 06/21 Compliance Platform

A comprehensive SaaS platform for UK SMEs to streamline sustainability reporting and generate compliant SECR and PPN 06/21 reports.

## 🎯 Overview

Carbonmate automates carbon emissions calculations and generates professional compliance reports, helping UK SMEs meet SECR (Streamlined Energy and Carbon Reporting) and PPN 06/21 (Procurement Policy Note) requirements.

## ✨ Features

### **Core Functionality**
- 📊 **Automated Carbon Calculations** using UK Government emission factors (2024)
- 📋 **SECR Report Generation** - Professional Word documents
- 📄 **PPN 06/21 Report Generation** - Carbon Reduction Plans
- 🔐 **Secure Authentication** with NextAuth.js
- 📈 **Real-time Dashboard** with emissions statistics
- 📁 **File Upload Processing** (CSV, Excel)
- ⚡ **Background Job Processing** with progress tracking

### **Compliance Features**
- ✅ **SECR Compliance** - All mandatory elements included
- ✅ **PPN 06/21 Compliance** - Net Zero commitment and targets
- ✅ **UK Government Factors** - Latest 2024 emission factors
- ✅ **GHG Protocol Standards** - International alignment
- ✅ **Audit-Ready Reports** - Professional formatting

## 🏗️ Architecture

### **Tech Stack**
- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Authentication**: Credentials provider with bcryptjs
- **File Processing**: multer, xlsx
- **Report Generation**: docx (Word documents)
- **Styling**: Tailwind CSS v3.4.0, Framer Motion
- **Database**: In-memory store (production: Redis/PostgreSQL)

### **Project Structure**
```
carbon-saas/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/[...nextauth]/   # NextAuth configuration
│   │   ├── jobs/                 # Job management API
│   │   └── export/               # Report generation API
│   ├── app/                      # Protected dashboard
│   ├── upload/                   # File upload interface
│   ├── components/               # Reusable components
│   └── layout.tsx               # Global layout
├── lib/                          # Core business logic
│   ├── types.ts                 # TypeScript definitions
│   ├── users.ts                 # User management
│   ├── factors.ts               # Emission factors database
│   ├── units.ts                 # Unit conversion utilities
│   ├── parse.ts                 # File parsing logic
│   ├── jobs.ts                  # Job processing engine
│   └── reports/                 # Report generators
│       ├── secr.ts              # SECR report generator
│       └── ppn.ts               # PPN 06/21 report generator
└── public/                      # Static assets
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd carbon-saas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create `.env.local`:
   ```env
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000
   USERS_JSON=W3sidXNlcm5hbWUiOiJkZW1vIiwicGFzc3dvcmQiOiIkMmIkMTAkLk5VZ0VhLk5VZ0VhLk5VZ0VhLk5VZ0VhLk5VZ0VhLk5VZ0VhLk5VZ0VhLk5VZ0VhLk5VZ0VhLk5VZ0VhIiwicm9sZSI6InVzZXIifV0=
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000)
   - Login with: `demo` / `demo123`

## 📊 Usage

### **1. Upload Data**
- Navigate to `/upload`
- Upload CSV or Excel files with activity data
- Supported columns: `date`, `activity_type`, `quantity`, `unit`, `source`

### **2. Monitor Processing**
- Real-time progress tracking
- Background job processing
- Error handling and validation

### **3. View Results**
- Emissions breakdown by scope
- KPI cards with key metrics
- Accepted/rejected data tables

### **4. Generate Reports**
- **SECR Reports**: Click "Generate SECR Report"
- **PPN Reports**: Click "Generate PPN Report"
- Fill company information form
- Download professional Word documents

## 🔧 API Reference

### **Authentication**
- **POST** `/api/auth/signin` - User login
- **POST** `/api/auth/signout` - User logout

### **Job Management**
- **POST** `/api/jobs` - Create new job (file upload)
- **GET** `/api/jobs` - List user jobs
- **GET** `/api/jobs/[jobId]` - Get job details
- **DELETE** `/api/jobs/[jobId]` - Delete job

### **Report Generation**
- **POST** `/api/export/secr` - Generate SECR report
- **POST** `/api/export/ppn` - Generate PPN 06/21 report

## 📋 Data Format

### **Supported File Types**
- CSV (.csv)
- Excel (.xlsx, .xls)

### **Required Columns**
```csv
date,activity_type,quantity,unit,source
2024-01-15,diesel,100,litre,Company vehicles
2024-01-16,electricity,500,kWh,Office building
2024-01-17,train,50,km,Business travel
```

### **Supported Activity Types**
- **Scope 1**: `diesel`, `petrol`, `natural_gas`, `lpg`
- **Scope 2**: `electricity`
- **Scope 3**: `train`, `flight_domestic`, `flight_international`, `waste_landfill`, `waste_recycling`

## 🛡️ Security

### **Authentication**
- NextAuth.js with credentials provider
- bcryptjs password hashing
- JWT session management
- Route protection middleware

### **Data Protection**
- User data isolation
- Secure file upload handling
- Input validation and sanitization
- Error handling without data exposure

## 🧪 Testing

### **Run Tests**
```bash
npm run test
```

### **Build Verification**
```bash
npm run build
```

### **Linting**
```bash
npm run lint
```

## 📈 Performance

### **Optimizations**
- Server-side rendering (SSR)
- Static generation where possible
- Image optimization with Next.js
- Efficient file processing
- Background job processing
- Real-time progress updates

### **Monitoring**
- Real-time job progress tracking
- Error logging and handling
- Performance metrics
- User activity monitoring

## 🚀 Deployment

### **Production Setup**
1. Set production environment variables
2. Configure database (Redis/PostgreSQL)
3. Set up file storage (AWS S3/Google Cloud)
4. Configure email service
5. Deploy to Vercel/Netlify/AWS

### **Environment Variables**
```env
NEXTAUTH_SECRET=production-secret-key
NEXTAUTH_URL=https://your-domain.com
USERS_JSON=base64-encoded-users-json
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
```

## 📚 Documentation

### **Compliance Standards**
- [SECR Requirements](https://www.gov.uk/guidance/streamlined-energy-and-carbon-reporting)
- [PPN 06/21 Requirements](https://www.gov.uk/government/publications/procurement-policy-note-0621-taking-account-of-carbon-reduction-plans-in-the-procurement-of-major-government-contracts)
- [UK Government Emission Factors](https://www.gov.uk/government/collections/government-conversion-factors-for-company-reporting)

### **Technical Documentation**
- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@carbonmate.co.uk
- LinkedIn: [Carbonmate UK](https://www.linkedin.com/company/carbonmate-uk/)

---

**Built with ❤️ for UK SMEs**
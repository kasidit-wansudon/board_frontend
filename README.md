# Comment Board Application

## Installation & Test Setup
1. Clone repository:
   ```bash
   git clone https://github.com/kasidit-wansudon/board_frontend
   cd board_frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Run unit tests:
   ```bash
   ไม่ได้ทำครับ ใช้แค่ swagger ใน Nest
   ```

## Application Architecture Overview
- **Frontend**: Next.js App Router, React components (TypeScript), TailwindCSS for styling.
- **Backend**: NestJS framework, TypeORM (MySQL), REST API for posts & comments.
- **API Routes**: Next.js Proxy API Routes under `src/app/api` forwards to NestJS backend.

## Libraries & Packages
- **Next.js**: React framework for server-rendered apps.
- **NestJS**: Scalable Node.js backend framework.
- **TypeORM**: ORM for TypeScript & Node.js.
- **TailwindCSS**: Utility-first CSS framework.
- **react-icons**: Icon library for React.
- **class-validator** & **class-transformer**: DTO validation & transformation.
- **Jest** & **@nestjs/testing**: Testing tools for frontend & backend.
- **mysql2**: MySQL driver for Node.js.

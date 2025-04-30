# Vellex - Modern Fashion Store

A modern e-commerce website for a fashion store built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive design optimized for all devices
- Modern UI with smooth animations
- Product categorization and filtering
- Newsletter subscription
- Mobile-friendly navigation
- User authentication with email verification
- MongoDB database integration

## Tech Stack

- **Frontend Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks
- **Database:** MongoDB
- **Authentication:** JWT, Email OTP Verification

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# MongoDB connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vellex-store?retryWrites=true&w=majority

# JWT Secret for authentication
JWT_SECRET=your-secret-key-here

# Email configuration for production
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-email-password
EMAIL_FROM=Vellex Store <noreply@vellexstore.com>

# Test email (Ethereal) for development
TEST_EMAIL_USER=test-email@ethereal.email
TEST_EMAIL_PASSWORD=test-password
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/` - Contains the Next.js pages and layouts
- `components/` - Reusable UI components
- `lib/` - Utility functions and service integrations
- `models/` - MongoDB models
- `context/` - React context for state management
- `public/` - Static assets like images and fonts

## License

This project is open source and available under the [MIT License](LICENSE). 
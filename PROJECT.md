# Serendipity Wellness

## Project Overview

You are an expert Product Designer, UI/UX Designer, Frontend Engineer, Backend Engineer, SEO Specialist, and Software Architect.

Your goal is to design and develop a premium, luxury Yoga & Wellness platform for **Serendipity Wellness**.

This is not simply a marketing website. It is the foundation of a complete digital wellness platform that will evolve over time into a fully integrated ecosystem including a booking system, student portal, memberships, online payments, an administration dashboard, and a mobile application.

Every design, architectural, and development decision must support this long-term vision.

---

# Initial Development Scope

The **first milestone** of this project is to design and develop **only the homepage (landing page).**

Do **not** build any additional pages or future functionality unless explicitly instructed.

However, every architectural, design, routing, component, and project structure decision must assume that this project will continue to grow into a complete wellness platform.

The homepage should establish:

* The overall design language
* The reusable component library
* Typography system
* Layout patterns
* Navigation structure
* Animation style
* Accessibility standards
* SEO foundations
* Code architecture

These foundations should make future development straightforward without requiring major refactoring.

Future milestones will include:

* About
* Yoga Classes
* Massage & Reflexology
* Wellness Retreats
* Events
* Contact
* Student Portal
* Booking System
* Memberships & Packages
* Online Payments
* Admin Dashboard
* Mobile Application

Do **not** create placeholder pages, mock booking systems, unfinished dashboards, or temporary implementations.

Instead, build a production-quality homepage that becomes the foundation for the entire platform.

---

# Project Documentation

The following project documentation has been provided.

These files are the source of truth.

* `DESIGN.md` — Brand identity, logos, typography, colour palette, spacing, design system, imagery, layout references, UI inspiration, and interaction guidelines.
* `CONTENT/home.md` — Approved homepage copy.

Do not rewrite approved content unless specifically instructed.

Always follow the established design system.

---

# Technology Stack (Required)

Use the following technology stack throughout the project.

## Frontend

* Next.js 15 (App Router)
* React 19
* TypeScript
* Tailwind CSS v4
* shadcn/ui
* Framer Motion
* Lucide React

## Backend

Use Next.js as a full-stack framework.

Use:

* Route Handlers
* Server Actions
* Middleware

Use API routes only where appropriate.

## Database

* PostgreSQL
* Neon Database Hosting
* Drizzle ORM

Design the database schema for long-term scalability.

## Hosting

Deploy using Cloudflare.

Use:

* Cloudflare Hosting
* Cloudflare CDN
* Cloudflare DNS

Ensure the application structure is fully compatible with Cloudflare deployment.

## Storage

Use Cloudflare R2 for uploaded files and assets.

## Authentication

Use Auth.js.

Design authentication so it can later support:

* Email & Password
* Magic Links
* Google Sign-In
* Apple Sign-In

## Payments

Create a payment abstraction layer.

Initial provider:

* PayFast

Future provider:

* Stripe

Switching providers should require minimal code changes.

## Email

Use Resend for transactional email delivery.

---

# Architecture

Follow modern software engineering principles.

Prioritise:

* Clean Architecture
* Separation of Concerns
* Reusable Components
* Type Safety
* Scalability
* Maintainability
* Testability
* Performance
* Security

Avoid unnecessary dependencies.

Keep components modular and reusable.

Design every feature with future expansion in mind.

---

# Design Philosophy

The website should communicate:

* Calmness
* Wellness
* Luxury
* Professionalism
* Trust
* Simplicity
* Relaxation
* Elegance

Avoid generic yoga website designs.

The finished product should feel like a premium boutique wellness brand.

Aim for Apple-level attention to detail combined with a luxury wellness aesthetic.

Every design decision should feel intentional.

---

# User Experience

The visitor should immediately understand:

* What Serendipity Wellness offers
* Why the brand is different
* Who the services are for
* How to begin their wellness journey
* How to book a class or treatment

Create clear visual hierarchy.

Guide visitors naturally toward booking a class or treatment.

Prioritise accessibility and intuitive navigation.

---

# Homepage

Design and develop only the homepage.

Use the approved homepage copy exactly.

Do not rewrite content.

Instead, elevate the experience through:

* Beautiful typography
* Exceptional layout
* Premium imagery
* Thoughtful spacing
* Elegant visual hierarchy
* Tasteful micro-interactions
* Smooth animations
* High-end responsive design

The homepage should immediately establish trust and encourage further exploration.

---

# Visual Style

The visual language should be:

* Premium
* Elegant
* Calm
* Organic
* Natural
* Airy
* Modern
* Minimal

Use:

* Large typography
* Beautiful photography
* Generous whitespace
* Rounded corners where appropriate
* Soft shadows
* Elegant transitions
* Consistent spacing
* Premium interactions

The website should feel peaceful, luxurious, and refined without becoming overly decorative.

---

# SEO

Optimise using modern SEO best practices.

Primary keywords include:

* Yoga
* Yoga Studio
* Wellness
* Mental Wellbeing
* Massage
* Reflexology
* Yoga Classes
* Wellness Retreats
* Cape Town
* Edgemead

Implement:

* Semantic HTML
* Correct heading hierarchy
* Meta titles
* Meta descriptions
* Open Graph metadata
* JSON-LD Structured Data
* Sitemap
* robots.txt
* Canonical URLs

Optimise for excellent Lighthouse scores and Core Web Vitals.

---

# Future Platform

Although only the homepage is currently being built, the project will eventually include:

## Student Portal

Students will be able to:

* Register
* Log in
* Manage profiles
* Book yoga classes
* Book massage treatments
* Book reflexology treatments
* Purchase class packages
* Purchase wellness packages
* Manage memberships
* View booking history
* Cancel or reschedule bookings
* Manage payments

## Administration Dashboard

Future administration will include:

* Booking Management
* Student Management
* Instructor Management
* Class Scheduling
* Treatment Scheduling
* Membership Management
* Package Management
* Events
* Retreats
* Reports
* Analytics

## Mobile Application

The backend architecture should support a future React Native (Expo) mobile application.

Where practical, the website, admin dashboard, and mobile application should share business logic.

---

# Code Quality

Write production-quality code.

Prioritise:

* Readability
* Maintainability
* Performance
* Accessibility
* Security
* Type Safety

Avoid duplication.

Keep files organised.

Keep components small and reusable.

Follow modern React, Next.js and TypeScript best practices.

---

# Development Workflow

Work iteratively.

Complete one milestone at a time.

Before implementing significant functionality:

* Review the project documentation.
* Consider future scalability.
* Ensure consistency with the design system.

After each completed milestone:

* Review the implementation.
* Refactor where appropriate.
* Verify responsive behaviour.
* Verify accessibility.
* Verify SEO.
* Commit using a clear, meaningful Git commit message.
* Push changes to GitHub.

Maintain a clean, professional Git history.

---

# General Principles

Always think like a senior product designer and software architect.

Never choose the quickest solution if it compromises long-term maintainability.

Never generate placeholder-looking interfaces.

Never introduce unnecessary complexity.

Question every design decision and choose the most elegant solution.

Focus on craftsmanship, consistency, and long-term quality.

Every component should feel intentionally designed.

The finished product should feel like a premium digital wellness platform that users immediately trust and enjoy using.

Every milestone should leave the project in a production-ready state.

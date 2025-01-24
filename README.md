Nike Shoes - E-commerce Website

Introduction

I have created an e-commerce website for selling shoes, offering the best user experience. This platform is built with Next.js 14 for the frontend and provides high-quality shoes for both men and women. The backend is powered by Sanity, ensuring dynamic data updates and a seamless shopping experience.

Technology Stack

Frontend: Next.js (v14)

Backend: Sanity CMS

Data Migration: Mock API, with data imported into Sanity using a migration script file (importSanityData.mjs). The data is retrieved using Groq queries and rendered dynamically on the UI.

Project Aim

The primary goal of this project is to:

Deliver authenticated products with a focus on customer trust.

Provide the best user experience, where users feel confident and comfortable.

Create a dynamic, modern, and visually appealing marketplace.

Live Link

Access the deployed website here: [Nike Shoes E-commerce Website](https://nike-shoes-ecommerce-marketplace.vercel.app/)

Project Structure

Documents

Day 1:

Laying the Foundation

Relationship Diagram: Day_1_RelationShip.jpg

Main Page Design: Day_1_mainpage.jpg

Schema Overview: Day_1_schema.jpg

Product Services Diagram: day_1_product_services.jpg

Day 2: Building Blocks of Our Platform: System Architecture and Component Interactions (Day 2 Building Blocks of Our Platform_ System Architecture and Component Interactions.pdf)

Day 3: API Integration Report (Day 3 - API Integration Report - Nike Shoes Store.pdf)

Day 4: Dynamic Marketplace Development Report (Day 4 Dynamic Marketplace Development_ Hackathon.pdf)

Day 5: Testing, Error Handling, and Backend Refinement (Day 5 - Testing, Error Handling, and Backend Integration Refinement.pdf)

Day 6: Deployment and Staging Setup (Day 6 - Deployment & Staging Setup.pdf)

Performance Test Report: (Performance Test Report.pdf)

Progress Overview: (Shoes Marketplace_ Progress Overview(Days 1-6).pdf)

Test Case Report: (Test Case Report.csv)

Folder Structure

Public

Contains static assets like images and icons, including favicon.ico.

Scripts

importSanityData.mjs: Migration script used to import data from a mock API to Sanity.

Source Code (src)

app Directory:

Routes:

home: Main landing page.

searchbar: Search functionality for products.

category: Browse products by categories.

men & women: Gender-specific product collections.

filterpanel: Filters for price, size, and other attributes.

cart: Shopping cart page.

wishlist: User’s saved items.

header & footer: Navigation and footer components.

order & checkout: Order placement and checkout pages.

ordertracking: Track product delivery.

signin & joinus: User authentication and registration.

components Directory:

UI Components:

Category.tsx: Displays product categories.

Essential.tsx: Highlights essential items.

Feature.tsx: Showcases featured products.

Footer.tsx: Footer layout.

Hero.tsx: Homepage hero section.

Navbar.tsx: Navigation bar.

SearchBar.tsx: Product search functionality.

OrderSummary.tsx: Summary of the user’s order.

Pagination.tsx: Paginated product lists.

ProductpageClient.tsx: Renders individual product pages.

OrderTracking.tsx: Displays order tracking status.

data Directory:

products.json: Static data for products.

sanity Directory:

sanity.cli.ts & sanity.config.ts: Configuration files for Sanity CMS.

Configuration Files

next.config.js & next.config.mjs: Next.js configurations.

tailwind.config.ts: Tailwind CSS setup.

package.json: Project dependencies.

tsconfig.json: TypeScript configuration.

Routes and Functionality

Home: Dynamic hero section, featured products, and essential categories.

Search Bar: Efficient product search across the catalog.

Categories: Filter by men’s, women’s, or other specific product categories.

Filter Panel: Sort and filter products by price, size, and ratings.

Product Pages: Displays detailed information about individual products.

Cart: Manage items added to the shopping cart.

Wishlist: Save products for future purchase.

Checkout: Secure and streamlined order processing.

Order Tracking: Track shipping and delivery updates.

Authentication: Sign-in and registration functionality.

Usage

Clone the repository:

git clone https://github.com/your-username/Nike_Shoes.git
cd Nike_Shoes

Install dependencies:

npm install

Set up environment variables in .env.local:

NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset
NEXT_PUBLIC_SANITY_API_VERSION=2023-01-01

Run the development server:

npm run dev

Open http://localhost:3000 in your browser.

Contact

Author: Maaz

GitHub: Areeba-irfan

Email: the.areebairfan@gmail.com

Feel free to reach out for questions, feedback, or contributions!

